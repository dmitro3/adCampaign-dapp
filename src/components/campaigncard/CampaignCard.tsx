import React, { useState, useEffect } from 'react';
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
import CardReaction from '../cardreaction/CardReaction';
import moment from 'moment';
import CustomButton from '../CustomButton/CustomButton';
import InfoCard from '../InfoCard/InfoCard';
import { addSupporters } from '../../common/services/api.services';
import { getTimeLeft } from '../../common/helpers';
import './CampaignCard.css';
import { useLikes } from '../LikeDislikeContext/LikeDislikeContext';

interface CampaignCardProps {
    imageSrc: string;
    category: string;
    clicks: number;
    title: string;
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
    index?: number;
    handleShareUrl:(url: string)=>void;
    validclicks: number;
    companyXProfile: string;
    campaignvideolink: string;
}

const CampaignCard: React.FC<CampaignCardProps> = (campaign) => {
    const {
        imageSrc,
        category,
        clicks,
        title,
        costPerClick,
        totalPrice,
        endDate,
        walletAddress,
        description,
        url,
        campaignInfoAddress,
        togglePopUp,
        popUp,
        width,
        likes,
        dislikes,
        viewMoreToggle = true,
        index,
        handleShareUrl,
        validclicks,
        companyXProfile,
        campaignvideolink
    } = campaign;
    const navigate = useNavigate();
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const {maxCoinValueAddress} = useCoinAddress();
    const [addCoinPayload, setAddCoinPayload] = useState({
        coins: '',
        message: ''
    });
    const [viewMore, setViewMore] = useState(viewMoreToggle);
    const [currentLikes, setCurrentLikes] = useState(likes);
    const [currentDislikes, setCurrentDislikes] = useState(dislikes);

    const { updateLikes, updateDislikes } = useLikes(); 

    useEffect(() => {
        setCurrentLikes(likes);
        setCurrentDislikes(dislikes);
    }, [likes, dislikes]);

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
  
    const daysleft= getTimeLeft(endDate);

    const handleAddCoins = () => {
        if(walletAddress){
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
                                toast.success('Please refresh updated values');
                                resolve();
                            },
                            onError: (error) => {
                                setLoading(false);
                                setError(true);
                                toast.dismiss();
                                if(error.message == 'Rejected from user'){
                                    toast.error('Rejected from user');
                                }else{
                                    toast.error('Error in transaction. Try to add more coins');
                                }
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
        }else{
            toast.error('Please connect to your wallet address')
        }
    };

    const getAffiliateProfile = async () => {
        try {
            setLoading(true);
            toast.loading('Fetching affiliate profile...');
            const profileDetails = await fetchAffiliateProfile({ walletAddress });
            setLoading(false);
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
        const currentTime = moment().unix();
        return endDate < currentTime;
    }

    const handleAffiliateCreationURL = async () => {
        if(walletAddress){
            try {
                if(validateCampaignLive(endDate)){
                    toast.error('Campaign already expired')
                    return;
                };
                toast.loading('Creating URL...')
                setError(false);
                setLoading(true)
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
                handleShareUrl(response?.campaignUrl || '');
                setLoading(false);
                toast.dismiss();
                toast.success('Campaign created successfully!');
            } catch (error: any) {
                setLoading(false);
                setError(true);
                toast.dismiss();
                if(error?.message?.length>300){
                    toast.error('We are facing very high traffic, please try after sometime or please connect to us for activation');
                }else{
                    toast.error(error.message);
                }
               
                console.error('Error in handleSubmit', error);
            }
        }else{
            toast.error('Please connect to your wallet address')
        }
    };
    const Url = url;
    const calculateCurrentPrice = () =>{
        return totalPrice - (validclicks * costPerClick);
    }

    const handleLikeClick = async () => {
        const data=await updateLikes(campaignInfoAddress,walletAddress) ;
        setCurrentLikes(data?.likes);
        setCurrentDislikes(data?.dislikes);
        };
        
        const handleDislikeClick = async () => {
            const data=await updateDislikes(campaignInfoAddress, walletAddress);
            setCurrentLikes(data?.likes);
        setCurrentDislikes(data?.dislikes);
    };

    return (
        <div className={`card bg-white  ff-tertiary cursor-pointer ${width} ${viewMore ? 'View-more' : ''}`}>
            {loading}
            {error}
            <Toaster />
            {  validateCampaignLive(campaign.endDate) && <p className='text-align-center expired-styles font-size-11'>Campaign Expired</p>}
            <div className="card-image" >
                <img src={imageSrc || '/journey.png'} alt="Card Image" onClick={()=>navigate(`/campaign/${campaignInfoAddress}`)} />
                <div className="card-label bg-white flex ff-tertiary font-size-14 font-color-yellow-orange font-weight-700 justify-center">
                    {category}
                </div>
                <div className='card-reactions'>
                    {walletAddress && <CardReaction src='/like.png' alt='like' count={currentLikes || 0} onClick={handleLikeClick}/>}
                    {walletAddress && <CardReaction src='/dislike.png' alt='dislike' count={currentDislikes || 0} onClick={handleDislikeClick}/>}
                </div>
            </div>
            <div className="card-content bg-white">
                <div className='flex add-money'>
                        <CustomButton title="$ Add Money" color='#4880FF' onClick={togglePopUp} backgroundColor='white' className='add-money-button' />
                    
                    <MetricsOverview>
                        <img src={'/star.png'} alt={'star'} />
                        <span className='font-size-14'>{clicks} Clicks</span>
                    </MetricsOverview>
                </div>
                <div className='titleStyles'>
                {title.length > 30 ? (
                        <h3 className='ff-tertiary font-weight-800 w-240'>{title.substring(0, 30)}...</h3>
                    ) : (
                        <h3 className='ff-tertiary font-size-24 font-weight-800'>{title}</h3>
                    )}
                    <AddressURL type={'object'} address={campaignInfoAddress}  />
                </div>
                <div className="card-meta flex justify-between font-size-14 text-gray">
                    <CardIconLabel  toolkitname={`${index}info1`} src="/duration.png" text={<span>{ `${daysleft}`}</span>} alt="duration" />
                    <CardIconLabel  toolkitname={`${index}info2`} src="/user.png" text={<span>{`${currencyConverter(costPerClick)} $SUI per click`}</span>} alt="user"/>
                    
                </div>
                <div className='flex'>
                <div onClick={toggleViewMore}>
                    {viewMore ? (
                    <p className='text-gray'>Description: {description}</p>
                    ) : (
                    <p className='text-gray'>Description: {description.substring(0, 19)}{description.length > 19 ? '...' : ''}</p>
                    )}
                </div>
                {description.length > 19 && (
                    <div className='view-more-container'>
                    <InfoCard
                        toolkitname={`${index}description`}
                        types="text"
                        toolkitContent={description}
                    />
                    </div>
                )}
                </div>
                <CardPrice onClick={handleAffiliateCreationURL} currentPrice={currencyConverter(calculateCurrentPrice())} totalPrice={currencyConverter(totalPrice)}  loading={loading} toolkitname={`${index}info3`}/>
                <div className="card-extra-info font-size-14 text-gray">
                    <a href={Url} target="_blank" rel="noopener noreferrer">Visit Campaign</a>
                    {companyXProfile && <a href={companyXProfile}>
                    <img className='company-x-profile' src='/twitterx.png' alt="x-profile-logo"></img>
                    </a>}
                    {campaignvideolink && <a href={campaignvideolink}> 
                    <img className='campaign-video-link' src='/video.svg' alt="video-logo"></img>
                    </a>}
                </div>
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
        </div>
    );
}

export default CampaignCard;
