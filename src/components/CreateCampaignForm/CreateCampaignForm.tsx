import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useCurrentAccount, useSignAndExecuteTransactionBlock, useSuiClientQuery } from '@mysten/dapp-kit';
import OvalInputBox from "../ovalInputBox/OvalInputBox";
import CustomButton from '../CustomButton/CustomButton';
import { createCampaign, uploadImage } from '../../common/services/api.services';
import { currencyConverterIntoSUI, getMaxBalanceObjectAddress } from '../../common/helpers';
import { CAMPAIGN_STATUS, createCampaignInitialValues, createCampaignInputFields } from "../../common/constants";
import CustomImageUploader from '../CustomImageUploader/CustomImageUploader';
import { CAMPAIGN_CONFIG, CAMPAIGN_PACKAGE_ID, CLOUDINARY_CLOUD_NAME, UPLOAD_PRESET } from '../../common/config';
import './CreateCampaignForm.scss'

interface ImageFile {
    file: File;
    preview: string;
}

const categoryOptions = [
    'Defi', 'NFT', 'Social', 'Marketplace', 'Meme Coin', 'Dev Tooling',
    'Wallets', 'DAO’s', 'Gaming', 'Bridge', 'DEX', 'Others'
];

const CreateCampaignForm = () => {
    const [imageUrl, setImageUrl] = useState<ImageFile | null>(null);
    const account = useCurrentAccount() as { address: string };
    const [transactionFinished, setTransactionFinished] = useState(false);
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const [maxCoinValueAddress, setMaxCoinValueAddress] = useState('');

    const suiObject = useSuiClientQuery('getCoins', {
        owner: account?.address as string,
        coinType: '0x2::sui::SUI'
    }) as { data: { data: any[] } };

    const handleImage = async (imageBanner: any) => {
        try{
            toast.loading('Uploading...');
            const image = new FormData();
            image.append("file", imageBanner.file);
            image.append("cloud_name", CLOUDINARY_CLOUD_NAME);
            image.append("upload_preset", UPLOAD_PRESET);
            const imageUrl = await uploadImage(image)
            setImageUrl(imageUrl as any)
            toast.dismiss();
            toast.success('Successfully uploaded')
        }catch(err){
            toast.error('Error in uploading');
        }
    }

    const createCampaignInSUI = (formInputs: any) => {
        try {
            if(!account?.address){
                toast.error('Please connect your wallet address')
                return;
            }
            formInputs.startDate = moment().unix();
            let momentObjEndDate = moment(formInputs.endDate)
            const unixEndDate = momentObjEndDate.unix() as any;
            formInputs.banner = imageUrl;

            if(unixEndDate < formInputs.startDate){
                toast.error('Expiration date should be future date')
                return;
            }

            toast.loading('Creating...');

            const campaignBudget = currencyConverterIntoSUI(parseFloat(formInputs.campaignBudget))
            const cpc = currencyConverterIntoSUI(parseFloat(formInputs.cpc))
            const txb = new TransactionBlock();
            txb.moveCall({
                arguments: [
                    txb.object(CAMPAIGN_CONFIG),
                    txb.pure.string(formInputs.companyName),
                    txb.pure.string(formInputs.category),
                    txb.pure.string(formInputs.originalUrl),
                    txb.object(maxCoinValueAddress),
                    txb.pure.u64(campaignBudget),
                    txb.pure.u64(cpc),
                    txb.pure.u64(parseInt(formInputs.startDate)),
                    txb.pure.u64(parseInt(unixEndDate)),
                    txb.pure.u64(CAMPAIGN_STATUS.ONGOING),
                    txb.pure.address(account.address),
                ],
                target: `${CAMPAIGN_PACKAGE_ID}::campaign_fund::create_campaign`,
            });

            signAndExecute(
                {
                    transactionBlock: txb,
                    options: {
                        showEffects: true,
                    },
                },
                {
                    onSuccess: (tx) => {
                        createCampaign({
                            ...formInputs,
                            campaignBudget,
                            cpc,
                            endDate: unixEndDate,
                            coinObjectAddress: maxCoinValueAddress,
                            campaignWalletAddress: account.address,
                            campaignInfoAddress: getCampaignObjectAddress(tx.effects?.created || []) || '',
                            packageAddress: CAMPAIGN_PACKAGE_ID,
                            campaignConfig: CAMPAIGN_CONFIG,
                            status: CAMPAIGN_STATUS.ONGOING,
                        });
                        toast.dismiss();
                        toast.success("success")
                        setTransactionFinished(true)
                    },
                    onError: (error) => {
                        toast.dismiss();
                        if(error.message == 'Rejected from user'){
                            toast.error('Rejected from user');
                            return;
                        }
                        toast.error(`Insufficient Gas tokens, Please Add More Gas tokens`);
                        console.log('error--->', error.message)
                    }
                },
            );
        } catch (err) {
            console.log('err--->', err)
        }
    }

    const getCampaignObjectAddress = (txArray: any[]) => {
        for (let i = 0; i < txArray.length; i++) {
            if (txArray[i]?.owner?.Shared) {
                return txArray[i]?.reference.objectId;
            }
        }
    }

    useEffect(() => {
        if (suiObject?.data?.data?.length > 0) {
            const address = getMaxBalanceObjectAddress(suiObject?.data?.data);
            setMaxCoinValueAddress(address);
        }
    }, [suiObject?.data?.data]);

    const handleSubmit = (values: any) => {
        createCampaignInSUI(values);
    }

    return (
        <>
            <Formik
                initialValues={createCampaignInitialValues}
                validate={(values: any) => {
                    const keys = Object.keys(values)
                    const errors = {} as any;
                    for(const key of keys){
                        if ( key!=='banner' && !values[key]) {
                            errors[key] = 'Required';
                        }
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values);
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    isSubmitting,
                }: any) => {

                    return (
                        <form onSubmit={handleSubmit}>
                            <Toaster />
                            {createCampaignInputFields.map((field, index) => (
                                <article key={`formik-${index}`}>
                                    {field.name === 'category'? (
                                        <section>
                                            <select
                                                name="category"
                                                value={values.category}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    if (e.target.value !== 'Others') {
                                                        setFieldValue('otherCategory', '');
                                                    }
                                                }}
                                                onBlur={handleBlur}
                                            >
                                                {categoryOptions.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            {values.category === 'Others' && (
                                                <OvalInputBox
                                                    placeholder="Enter category"
                                                    name="otherCategory"
                                                    handleChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.otherCategory}
                                                />
                                            )}
                                        </section>
                                    ) : field.type == 'image' ? (
                                        <section>
                                            <CustomImageUploader
                                                image={imageUrl}
                                                handleImage={handleImage}
                                                backgroundColor="white"
                                                placeholder={
                                                    <div className='uploader-container'>
                                                        <img src={'/uploader.png'} alt={'uploader-icon'} />
                                                        {field.placeholder}
                                                    </div>
                                                }
                                            />
                                        </section>
                                    ) : (
                                        <OvalInputBox
                                            placeholder={field.placeholder}
                                            name={field.name}
                                            handleChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[field.name]}
                                            endIcon={<div className={field.name === 'campaignBudget' ? 'currency' : ''} dangerouslySetInnerHTML={{ __html: field.endIcon as any }}></div>}
                                            type={field.type}
                                        />
                                    )}
                                    {<p className='text-red'> {errors[field.name] && touched[field.name] && errors[field.name]} </p>}
                                </article>
                            ))}
                            <p className='note font-size-14 ff-tertiary font-weight-600'>Note: A 10% fee is added on top of the campaign budget to cover gas-free, real-time transactions for affiliates.</p>
                            <CustomButton color="blue" title="Create" width="203px" height="50px" type="submit" disabled={isSubmitting} />
                            {transactionFinished &&
                                <div>
                                    <p>Transaction Successfully Completed</p>
                                    <p>Please check assets section in your wallet for receipt ↗️ ⤴</p>
                                    <p>To see updated details navigate to campaigns section</p>
                                </div>}
                        </form>
                    );
                }}
            </Formik>
        </>
    )
}

export default CreateCampaignForm;
