import { useEffect, useState } from 'react';
import { Formik } from 'formik';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { useCurrentAccount, useSignAndExecuteTransactionBlock, useSuiClientQuery } from '@mysten/dapp-kit';
import OvalInputBox from "../ovalInputBox/OvalInputBox";
import CustomButton from '../CustomButton/CustomButton';
import { createCampaign, uploadImage } from '../../common/services/api.services';
import { getMaxBalanceObjectAddress } from '../../common/helpers';
import { CAMPAIGN_STATUS, createCampaignInitialValues, createCampaignInputFields } from "../../common/constants";
import CustomImageUploader from '../CustomImageUploader/CustomImageUploader';
import { CAMPAIGN_CONFIG, CAMPAIGN_PACKAGE_ID, CLOUDINARY_CLOUD_NAME, UPLOAD_PRESET } from '../../common/config';
import './CreateCampaignForm.scss'

interface ImageFile {
    file: File;
    preview: string;
}

const CreateCampaignForm = ({ setCampaignDetails }: { setCampaignDetails: (details: any) => void }) => {
    const [imageUrl, setImageUrl] = useState<ImageFile | null>(null);
    const [formValues, setFormValues] = useState(createCampaignInitialValues);
    const account = useCurrentAccount() as { address: string };
    const [transactionFinished, setTransactionFinished] = useState(false);
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const [maxCoinValueAddress, setMaxCoinValueAddress] = useState('');

    const suiObject = useSuiClientQuery('getCoins', {
        owner: account?.address as string,
        coinType: '0x2::sui::SUI'
    }) as { data: { data: any[] } };

    const handleImage = async (imageBanner: any) => {
        const image = new FormData();
        image.append("file", imageBanner.file);
        image.append("cloud_name", CLOUDINARY_CLOUD_NAME);
        image.append("upload_preset", UPLOAD_PRESET);
        const imageUrl = await uploadImage(image)
        setImageUrl(imageUrl as any)
    }

    const createCampaignInSUI = (formInputs: any) => {
        try {
            formInputs.startDate = moment().unix();
            formInputs.endDate = '1716993333';
            formInputs.banner = imageUrl;
            const txb = new TransactionBlock();
            txb.moveCall({
                arguments: [
                    txb.object(CAMPAIGN_CONFIG),
                    txb.pure.string(formInputs.companyName),
                    txb.pure.string(formInputs.category),
                    txb.pure.string(formInputs.originalUrl),
                    txb.object(maxCoinValueAddress),
                    txb.pure.u64(parseInt(formInputs.campaignBudget)),
                    txb.pure.u64(parseInt(formInputs.cpc)),
                    txb.pure.u64(parseInt(formInputs.startDate.toString())),
                    txb.pure.u64(parseInt(formInputs.endDate)),
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
                            coinObjectAddress: maxCoinValueAddress,
                            campaignWalletAddress: account.address,
                            campaignInfoAddress: getCampaignObjectAddress(tx.effects?.created || []) || '',
                            packageAddress: CAMPAIGN_PACKAGE_ID,
                            campaignConfig: CAMPAIGN_CONFIG,
                            status: CAMPAIGN_STATUS.ONGOING,
                        });
                        toast.success("success")
                        setTransactionFinished(true)
                        setCampaignDetails(newCampaignDetails);
                    },
                    onError: (error) => {
                        console.log('error--->', error)
                    },
                    onSettled: (data) => {
                        console.log('data--->', data)
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
    function getTimeLeft(endDate:any) {
      let endMoment = moment(endDate, 'YYYY-MM-DD');
      let currentDate = moment(moment().format('YYYY-MM-DD'), 'YYYY-MM-DD');
      let daysLeft = endMoment.diff(currentDate, 'days');
      
      if (daysLeft > 1) {
          return  `${daysLeft} Days Left`;
      } else if (daysLeft === 1) {
          let hoursLeft = endMoment.diff(moment(), 'hours');
          return ` ${hoursLeft} Hours left`;
      } else {
          let hoursLeft = endMoment.diff(moment(), 'hours');
          if (hoursLeft >= 1) {
              return `${hoursLeft} Hours left`;
          } else {
              let minutesLeft = endMoment.diff(moment(), 'minutes');
              return ` ${minutesLeft || 0} Minutes left`;
          }
      }
  }
    useEffect(() => {
        const { companyName, category, originalUrl, campaignBudget, cpc,endDate,description } = formValues;
        const updatedCampaignDetails = {
            imageSrc: imageUrl || "/journey.png",
            label: category || 'category',
            clicks: 0,
            title: companyName || 'companyName',
            daysLeft: getTimeLeft(endDate) || 0,
            costPerClick: parseInt(cpc || '0'),
            currentPrice: 0,
            totalPrice: parseInt(campaignBudget || '0'),
            likes: 0,
            dislikes: 0,
            startDate: moment().format('YYYY-MM-DD'),
            endDate: endDate,
            walletAddress: null,
            description: description || 'Enter your Company Description here',
            url: originalUrl,
            campaignInfoAddress: '',
            togglePopUp: () => {},
            popUp: false
        };
        setCampaignDetails(updatedCampaignDetails);
    }, [formValues, imageUrl]);

    return (
        <>
            <Formik
                initialValues={createCampaignInitialValues}
                validate={values => {
                    const errors = {} as any;
                    if (!values.companyName) {
                        errors.companyName = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setFormValues(values);
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
                }) => {
                    useEffect(() => {
                        setFormValues(values);
                    }, [values]);

                    return (
                        <form onSubmit={handleSubmit}>
                            <Toaster />
                            {createCampaignInputFields.map((field, index) => (
                                <article key={`formik-${index}`}>
                                    {field.type == 'image' ?
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
                                        : <OvalInputBox
                                            placeholder={field.placeholder}
                                            name={field.name}
                                            handleChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values[field.name]}
                                            endIcon={<div className={field.name === 'campaignBudget' ? 'currency' : ''} dangerouslySetInnerHTML={{ __html: field.endIcon as any }}></div>}
                                            type={field.type}
                                        />}
                                    {errors[field.name] && touched[field.name] && errors[field.name]}
                                </article>
                            ))}
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
