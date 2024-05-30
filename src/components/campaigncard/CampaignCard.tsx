import React, { useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { createAffiliate, fetchAffiliateProfile } from "../../common/services/api.services";
import { currencyConverter, currencyConverterIntoSUI, generateCampaignUrl } from "../../common/helpers";
import { CAMPAIGN_CONFIG, CAMPAIGN_PACKAGE_ID } from "../../common/config";
import AddressURL from '../AddressURL/AddressURL';
import AddMoneyPopUp from '../AddMoneyPopUp/AddMoneyPopUp';
import useCoinAddress from "../../common/customHooks/coinAddress/useCoinAddress";
import MetricsOverview from '../MetricsOverview/MetricsOverview';
import CardIconLabel from '../CardIconLabel/CardIconLabel';
import CardPrice from '../cardprice/CardPrice';
import moment from 'moment';
import CardReaction from '../cardreaction/CardReaction';
import CustomButton from '../CustomButton/CustomButton';
import ShareLink from '../ShareLink/ShareLink';
import { addSupporters } from '../../common/services/api.services';
import './CampaignCard.css';



interface CampaignCardProps {
    imageSrc: string;
    category: string;
    clicks: number;
    title: string;
    daysLeft: any;
    costPerClick: number;
    totalPrice: number;
    likes: number;
    dislikes: number;
    startDate: string;
    endDate: string;
    walletAddress: string;
    description: string;
    url: string;
    campaignInfoAddress: string;
    togglePopUp: () => void;
    popUp: boolean;
    viewMoreToggle?:boolean;
    width?: string,
}

const CampaignCard: React.FC<CampaignCardProps> = (campaign) => {
    const {
        imageSrc,
        category,
        clicks,
        title,
        daysLeft,
        costPerClick,
        totalPrice,
        likes,
        dislikes,
        endDate,
        walletAddress,
        description,
        url,
        campaignInfoAddress,
        togglePopUp,
        popUp,
        width,
        viewMoreToggle = true,
    } = campaign;
    const navigate = useNavigate();
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [campaignUrl, setCampaignUrl] = useState('');
    const maxCoinValueAddress = useCoinAddress();
    const [addCoinPayload, setAddCoinPayload] = useState({
        coins: '',
        message: ''
    });
    const [viewMore, setViewMore] = useState(viewMoreToggle );

    const handleInputCoins = (e: any) => {
        setAddCoinPayload({
            ...addCoinPayload,
            coins:  e.target.value,
        });
    };
    const handleInputMessage = (e: any) => {
        setAddCoinPayload({
            ...addCoinPayload,
            message: e.target.value,
        });
    }

    const toggleViewMore = () => {
        setViewMore(!viewMore);
    };
    const toggleShareLink = () => {
        setCampaignUrl('');
    };


    const handleAddCoins = () => {
        setLoading(true);
        setError(false);
        toast.loading('Adding...');

        return new Promise<void>((resolve, reject) => {
            const txb = new TransactionBlock();

            if (!txb.pure || !txb.object) {
                console.error('TransactionBlock methods not available', txb);
                setLoading(false);
                setError(true);
                toast.dismiss();
                toast.error('Transaction setup error.');
                return;
            }

            const coinsInSUI =  currencyConverterIntoSUI(parseFloat(addCoinPayload.coins))

            try {
                txb.moveCall({
                    arguments: [
                        txb.object(CAMPAIGN_CONFIG),
                        txb.object(campaignInfoAddress),
                        txb.pure.string(addCoinPayload.message),
                        txb.pure.u64(coinsInSUI),
                        txb.object(maxCoinValueAddress)
                    ],
                    target: `${CAMPAIGN_PACKAGE_ID}::campaign_fund::update_campaign_pool`,
                });

                signAndExecute(
                    {
                        transactionBlock: txb,
                        options: {
                            showEffects: true,
                        },
                    },
                    {
                        onSuccess: async (tx: any) => {
                            setLoading(false);
                            toast.dismiss();
                            await addSupporters({
                                campaignConfig: CAMPAIGN_CONFIG,
                                campaignInfoAddress: campaignInfoAddress,
                                message: addCoinPayload.message,
                                coins: coinsInSUI,
                                maxCoinValueAddress: maxCoinValueAddress,
                                walletAddress,
                                transactionDigest: tx?.effects?.transactionDigest
                            });
                            toast.success('Coins added successfully!');
                            resolve();
                        },
                        onError: (error) => {
                            setLoading(false);
                            setError(true);
                            toast.dismiss();
                            toast.error('Error in transaction. Try to add more coins');
                            reject(error);
                            console.error('Error in transaction', error);
                        },
                        onSettled: () => {
                            if(togglePopUp){
                                togglePopUp()
                            }
                           
                        }
                    }
                );
            } catch (error) {
                console.error('Error during transaction setup', error);
                setLoading(false);
                setError(true);
                toast.dismiss();
                toast.error('Error during transaction setup.');
                reject(error);
            }
        });
    };

    const getAffiliateProfile = async () => {
        try {
            setLoading(true);
            toast.loading('Fetching affiliate profile...');
            const profileDetails = await fetchAffiliateProfile({ walletAddress });
            setLoading(false);
            // toast.dismiss();
            if (profileDetails.length) {
                return profileDetails[0].profileAddress;
            } 
            else {
                return null;
            }
        } catch (error) {
            setLoading(false);
            toast.dismiss();
            toast.error('Error fetching affiliate profile.');
            console.error('Error fetching affiliate profile', error);
            throw error; 
        }
    };

    const validateCampaignLive = (endDate: any) => {
        console.log('end date---', endDate, '---type---', typeof(endDate));
        const currentTime = moment().unix();
        return endDate > currentTime;
    }

    const handleAffiliateCreationURL = async () => {
        try {
            if(!validateCampaignLive(endDate)){
                toast.error('Campaign already ended')
                return;
            };
            toast.loading('Creating URL...')
            setError(false);
            const campaignUrl = generateCampaignUrl();
            const affiliateProfile = await getAffiliateProfile();
            const response = await createAffiliate({
                originalUrl: url,
                campaignUrl,
                cpc: costPerClick,
                walletAddress,
                campaignInfoAddress: campaignInfoAddress,
                profileAddress: affiliateProfile,
                expirationTime: endDate,
            });
            setCampaignUrl(response?.campaignUrl || '');
            setLoading(false);
            toast.dismiss();
            toast.success('Campaign created successfully!');
        } catch (error) {
            setLoading(false);
            setError(true);
            toast.dismiss();
            toast.error('Error in submission.');
            console.error('Error in handleSubmit', error);
        }
    };
    const Url = "https://" + url;
    const calculateCurrentPrice = () =>{
        return totalPrice - (clicks * costPerClick);
    }

    return (
        <div className={`card bg-white ff-tertiary cursor-pointer ${width} ${viewMore ? 'View-more' : ''}`}>
            {loading}
            {error}
            <Toaster />
            <div className="card-image" onClick={()=>navigate(`/campaign/${campaignInfoAddress}`)}>
                <img src={imageSrc} alt="Card Image" />
                <div className="card-label bg-white flex ff-tertiary font-color-yellow-orange font-weight-700 justify-center">
                    {category}
                </div>
                <div className="card-reactions ff-tertiary flex align-center">
                    <CardReaction src="/like.png" alt="Like Image" count={likes} />
                    <CardReaction src="/dislike.png" alt="Dislike Image" count={dislikes} />
                </div>
            </div>
            <div className="card-content bg-white">
                <div className='flex'>
                    <p className='add-money bg-white flex font-size-14 '>
                        <CustomButton title="$ Add Money" color='#4880FF' onClick={togglePopUp} backgroundColor='white' className='add-money-button' />
                    </p>
                    <MetricsOverview>
                        <img src={'/star.png'} alt={'star'} />
                        <span>{clicks} Clicks</span>
                    </MetricsOverview>
                </div>
                <div className='titleStyles'>
                    <h3 className='ff-tertiary font-weight-800'>{title}</h3>
                    <AddressURL address={campaignInfoAddress}  />
                </div>
                <div className="card-meta flex justify-between font-size-14 text-gray">
                    <CardIconLabel src="/duration.png" text={<span>{ `${daysLeft}`}</span>} alt="duration" />
                    <CardIconLabel src="/user.png" text={<span>{`SUI${currencyConverter(costPerClick)} per click`}</span>} alt="user"/>
                </div>
                <CardPrice onClick={handleAffiliateCreationURL} currentPrice={currencyConverter(calculateCurrentPrice())} totalPrice={currencyConverter(totalPrice)} />
                <div className="card-extra-info font-size-14 text-gray">
                    <a href={Url} target="_blank" rel="noopener noreferrer">Visit Campaign</a>
                </div>
                { viewMore && (
                     <p className='text-gray'>Description: {description}</p>
                )}
                <CustomButton border="none" backgroundColor="white" color='black'  extraStyles='text-gray' title={viewMore ? 'View Less' : 'View More'} onClick={toggleViewMore}/>
            </div>
            {popUp && (
                    <div className="popup-wrapper">
                        <AddMoneyPopUp
                            imageSrc="/money.png"
                            titleText="Add Money for the Campaign"
                            onClick={handleAddCoins}
                            handleInputCoins={handleInputCoins}
                            handleInputMessage={handleInputMessage}
                            moneyAmount={addCoinPayload.coins}
                            moneyMessage={addCoinPayload.message}
                            handleclose={togglePopUp}
                        />
                    </div>
            )}
            {campaignUrl && (
                <div className='popup-wrapper'>
                    <ShareLink url={campaignUrl} handleClose={toggleShareLink} />
                </div>
            )}
        </div>
    );
}

export default CampaignCard;
