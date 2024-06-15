import { useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useCurrentAccount, useSignAndExecuteTransactionBlock } from '@mysten/dapp-kit';
import OvalInputBox from "../ovalInputBox/OvalInputBox";
import CustomButton from '../CustomButton/CustomButton';
import useCoinAddress from '../../common/customHooks/coinAddress/useCoinAddress';
import { createCampaign, splitCoin, uploadImage } from '../../common/services/api.services';
import { currencyConverterIntoSUI } from '../../common/helpers';
import { CAMPAIGN_STATUS, createCampaignInitialValues, createCampaignInputFields } from "../../common/constants";
import CustomImageUploader from '../CustomImageUploader/CustomImageUploader';
import { CAMPAIGN_CONFIG, CAMPAIGN_PACKAGE_ID, CLOUDINARY_CLOUD_NAME, SUI_EXPLORER, UPLOAD_PRESET } from '../../common/config';
import './CreateCampaignForm.scss'

interface ImageFile {
    file: File;
    preview: string;
}

const categoryOptions = [
    'Defi', 'NFT', 'Social', 'Marketplace', 'Meme Coin', 'Dev Tooling',
    'Wallets', 'SUI Overflow', 'DAO', 'Gaming', 'Bridge', 'DEX', 'Others'
];

const CreateCampaignForm = () => {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState<ImageFile | null>(null);
    const account = useCurrentAccount() as { address: string };
    const [transactionFinished, setTransactionFinished] = useState(false);
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const { maxCoinValueAddress, maxCoinValue } = useCoinAddress();
    const [otherCategory, setOtherCategory] = useState<string>('');

    const handleImage = async (imageBanner: any) => {
        try {
            toast.loading('Uploading...');
            const image = new FormData();
            image.append("file", imageBanner.file);
            image.append("cloud_name", CLOUDINARY_CLOUD_NAME);
            image.append("upload_preset", UPLOAD_PRESET);
            const imageUrl = await uploadImage(image)
            setImageUrl(imageUrl as any)
            toast.dismiss();
            toast.success('Successfully uploaded')
        } catch (err) {
            toast.error('Error in uploading');
        }
    }

    const createCampaignInSUI = async (formInputs: any) => {
        try {
            if (!account?.address) {
                toast.error('Please connect your wallet address')
                return;
            }
            if (parseFloat(formInputs.campaignBudget) < 5) {
                toast.error('Minimim budget for the campaign should be 5 SUI')
                return;
            }
            if (parseFloat(formInputs.cpc) < 0.05) {
                toast.error('Minimim cost per click should be 0.05 SUI')
                return;
            }

            formInputs.startDate = moment().unix();
            let momentObjEndDate = moment(formInputs.endDate)
            const unixEndDate = momentObjEndDate.unix() as any;
            formInputs.banner = imageUrl;

            if (unixEndDate < formInputs.startDate) {
                toast.error('Expiration date should be future date')
                return;
            }

            const fees = parseFloat(formInputs.campaignBudget) * (10 / 100)

            const feesInSUI = currencyConverterIntoSUI(fees)
            const campaignBudgetInSUI = currencyConverterIntoSUI(parseFloat(formInputs.campaignBudget))
            const cpc = currencyConverterIntoSUI(parseFloat(formInputs.cpc))

            const totalBudgetInSUI = campaignBudgetInSUI + feesInSUI;
            if (maxCoinValue < totalBudgetInSUI) {
                toast.error(`Please ensure that at least one token object in your wallet has enough fund to cover the campaign creation budget. You can check your wallet balance on ${SUI_EXPLORER}`);
                return;
            }

            toast.loading('Creating...');

            const splittedCoinAddress = await splitCoin({ budget: totalBudgetInSUI, receiverAddress: account?.address })
            const mainCoinAddress = splittedCoinAddress?.address || maxCoinValueAddress;

            const txb = new TransactionBlock();
            txb.moveCall({
                arguments: [
                    txb.object(CAMPAIGN_CONFIG),
                    txb.pure.string(formInputs.companyName),
                    txb.pure.string(formInputs.category),
                    txb.pure.string(formInputs.originalUrl),
                    txb.object(mainCoinAddress),
                    txb.pure.u64(campaignBudgetInSUI),
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
                            campaignBudget: campaignBudgetInSUI,
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
                        setTimeout(() => {
                            navigate('/campaigns')
                        }, 3000)
                    },
                    onError: (error) => {
                        toast.dismiss();
                        if (error.message == 'Rejected from user') {
                            toast.error('Rejected from user');
                            return;
                        }
                        toast.error(`Insufficient Gas tokens, Please Add More Gas tokens, Need help connect with us in telegram channel`);
                        console.log('error--->', error.message)
                    }
                },
            );
        } catch (err: any) {
            toast.error(err.message)
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

    const handleSubmit = (values: any) => {
        if (values.category === 'Others') {
            values.category = otherCategory;
        }
        createCampaignInSUI(values);
    }

    return (
        <>
            <Formik
                initialValues={createCampaignInitialValues}
                validate={(values: any) => {
                    const keys = Object.keys(values)
                    const errors = {} as any;
                    for (const key of keys) {
                        if (key !== 'campaignvideolink' && key !== 'companyXProfile' && key !== 'banner' && !values[key]) {
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
                    isSubmitting,
                }: any) => {

                    return (
                        <form onSubmit={handleSubmit}>
                            <Toaster />
                            {createCampaignInputFields.map((field, index) => (
                                <article key={`formik-${index}`}>
                                    {field.name === 'category' ? (
                                        <section>
                                            <select
                                                name="category"
                                                value={values.category}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    if (e.target.value === 'Others') {
                                                        setOtherCategory('');
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
                                                handleChange={(e:any) => setOtherCategory(e.target.value)}
                                                onBlur={() => {}}
                                                value={otherCategory}
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
