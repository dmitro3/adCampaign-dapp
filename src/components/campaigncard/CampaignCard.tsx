import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { useSignAndExecuteTransactionBlock,useCurrentAccount } from "@mysten/dapp-kit";
import { createAffiliate, fetchAffiliateProfile } from "../../common/services/api.services";
import { generateCampaignUrl } from "../../common/helpers";
import { CAMPAIGN_CONFIG, CAMPAIGN_PACKAGE_ID } from "../../common/config";
import AddressURL from '../AddressURL/AddressURL';
import useCoinAddress from "../../common/customHooks/coinAddress/useCoinAddress";
import CardStats from '../cardstats/CardStats';
import CardIconLabel from '../CardIconLabel/CardIconLabel';
import CardPrice from '../cardprice/CardPrice';
import CardReaction from '../cardreaction/CardReaction';
import CustomButton from '../CustomButton/CustomButton';
import './CampaignCard.css';

interface CampaignCardProps {
    imageSrc: string;
    label: string;
    clicks: number;
    title: string;
    daysLeft: number;
    costPerClick: number;
    currentPrice: number;
    totalPrice: number;
    likes: number;
    dislikes: number;
    startDate: string;
    endDate: string;
    walletAddress: string;
    description: string;
    url: string;
    campaignInfoAddress: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({
    imageSrc,
    label,
    clicks,
    title,
    daysLeft,
    costPerClick,
    currentPrice,
    totalPrice,
    likes,
    dislikes,
    endDate,
    walletAddress,
    description,
    url,
    campaignInfoAddress
}) => {
    const account  = useCurrentAccount() as {address: string};
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [campaignUrl, setCampaignUrl] = useState('');
    const maxCoinValueAddress = useCoinAddress();
    const [addCoinPayload, setAddCoinPayload] = useState({
        coins: '',
        message: ''
    });
    const [ViewMore, setViewMore] = useState(false);


    const toggleViewMore = () => {
        setViewMore(!ViewMore);
    };


    const handleAddCoins = () => {
        setLoading(true);
        setError(false);
        toast.loading('Adding coins...');

        return new Promise<void>((resolve, reject) => {
            const txb = new TransactionBlock();

            if (!txb.pure || !txb.object) {
                console.error('TransactionBlock methods not available', txb);
                setLoading(false);
                setError(true);
                toast.error('Transaction setup error.');
                return;
            }

            try {
                txb.moveCall({
                    arguments: [
                        txb.object(CAMPAIGN_CONFIG),
                        txb.object(campaignInfoAddress),
                        txb.pure.string(addCoinPayload.message),
                        txb.pure.u64(addCoinPayload.coins),
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
                            toast.success('Coins added successfully!');
                            resolve();
                        },
                        onError: (error) => {
                            setLoading(false);
                            setError(true);
                            toast.dismiss();
                            toast.error('Error in transaction.');
                            reject(error);
                            console.error('Error in transaction', error);
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
            toast.dismiss();
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

    const handleSubmit = async () => {
        try {
            setLoading(true);
            setError(false);
            toast.loading('Submitting...');
            const campaignUrl = generateCampaignUrl();
            const affiliateProfile = await getAffiliateProfile();
            const response = await createAffiliate({
                originalUrl: url,
                campaignUrl,
                walletAddress: account.address,
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

    return (
        <div className={`card bg-white ff-tertiary ${ViewMore ? 'View-more' : ''}`}>
            <Toaster />
            <div className="card-image">
                <img src={imageSrc} alt="Card Image" />
                <div className="card-label bg-white flex ff-tertiary font-color-yellow-orange font-weight-700 justify-center">
                    {label}
                </div>
                <div className="card-reactions ff-tertiary flex align-center">
                    <CardReaction src="./like.png" alt="Like Image" count={likes} />
                    <CardReaction src="./dislike.png" alt="Dislike Image" count={dislikes} />
                </div>
            </div>
            <div className="card-content bg-white">
                <div className='flex'>
                    <p className='add-money bg-white flex font-size-14'>
                        <CustomButton title="$ Add Money" onClick={handleAddCoins} color='#4880FF' backgroundColor='white' className='add-money-btn' />
                    </p>
                    <CardStats src='./star.png' clicks={clicks} />
                </div>
                <div className='titleStyles'>
                    <h3 className='ff-tertiary font-weight-800'>{title}</h3>
                    <AddressURL address={campaignInfoAddress}  />
                </div>
                <div className="card-meta flex justify-between font-size-14 text-gray">
                    <CardIconLabel src="./duration.png" text={`${daysLeft} days left`} />
                    <CardIconLabel src="./user.png" text={`$${costPerClick} per click`} />
                </div>
                <CardPrice onClick={handleSubmit} currentPrice={currentPrice} totalPrice={totalPrice} />
                <div className="card-extra-info font-size-14 text-gray">
                    <a href={url} target="_blank" rel="noopener noreferrer">Visit Campaign</a>
                    { campaignUrl && <a href={campaignUrl} target="_blank" rel="noopener noreferrer">Campaign URL</a>}
                </div>
                {ViewMore && (
                     <p>Description: {description}</p>
                )}
                <CustomButton border="none" backgroundColor="white" color='black' title={ViewMore ? 'View Less' : 'View More'} onClick={toggleViewMore}/>
            </div>
        </div>
    );
}

export default CampaignCard;
