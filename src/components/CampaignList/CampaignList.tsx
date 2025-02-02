import  { useState, useEffect } from 'react';
import moment from 'moment';
import toast, { Toaster } from 'react-hot-toast';
import { fetchCampaigns } from "../../common/services/api.services";
import { useCurrentAccount } from '@mysten/dapp-kit';
import StartCampaignBtn from '../startcampaignbtn/StartCampaignBtn';
import Filters from '../filters/Filters';
import Pagination from '../pagination/Pagination';
import { LikesProvider } from '../LikeDislikeContext/LikeDislikeContext';
import { currencyConverter, currencyConverterIntoSUI } from '../../common/helpers';
import ShareLink from '../ShareLink/ShareLink';
import Navbar from '../navbar/navbar';
import CampaignCard from '../campaigncard/CampaignCard';
import Footer from '../footer/footer';
import './CampaignList.scss';

type Campaign = {
    imageSrc: string;
    category: string;
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
    validClicks: number;
    campaignInfoAddress: string;
    validclicks: number;
    companyXProfile: string;
    campaignvideolink: string;
};

const formatDate = (epoch: number) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString('en-US');
};

export default function CampaignList() {
    const account  = useCurrentAccount() as {address: string};
    const [campaignUrl, setCampaignUrl] = useState('');
    const [data, setData] = useState<Campaign[]>([]);
    const [activePopUp, setActivePopUp] = useState<string | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [sortOption, setSortOption] = useState<string>('');
    const [filterOption, setFilterOption] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const sortOptions = ['Rates Per Click', 'Time Left', 'Budget Left','Likes Count'];
    const categoryOptions = [
       'All', 'Defi', 'NFT', 'Social', 'Marketplace', 'Meme Coin',
        'Dev Tooling', 'Wallets', 'DAO’s', 'Gaming', 'Bridge', 'DEX','SUI Overflow', 'Others'
    ];
    const handleSort = (sortKey: string) => {
        setSortOption(sortKey);
    };

    const handleFilter = (filterValue: string) => {
        setFilterOption(filterValue);
    };

    const getData = async () => {
        try {
            toast.loading('Loading...');
            const { campaigns, totalPages } = await fetchCampaigns({ page: currentPage, limit: 12, category: filterOption, sortBy: sortOption });
            if(campaigns.length === 0){
                toast.dismiss();
                toast.error('No campaigns found');
            } 
            setTotalPages(totalPages);
            const transformedData = campaigns.map((campaign: any) => ({
                imageSrc: campaign?.banner,
                category: campaign?.category,
                clicks: campaign.validClicks+campaign.invalidClicks,
                validclicks: campaign.validClicks,
                title: campaign?.companyName,
                daysLeft: `${Math.ceil((campaign?.endDate - moment().unix()) / (60 * 60 * 24))} days left`,
                costPerClick: currencyConverter(campaign?.cpc),
                currentPrice: 0,
                totalPrice: currencyConverter(campaign?.campaignBudget),
                likes: campaign?.likes?.length,
                dislikes: campaign?.dislikes?.length,
                startDate: formatDate(campaign?.startDate),
                endDate: campaign?.endDate,
                walletAddress: campaign?.campaignWalletAddress,
                description: campaign?.description || 'No description available',
                url: campaign?.originalUrl,
                campaignInfoAddress: campaign?.campaignInfoAddress,
                companyXProfile: campaign?.companyXProfile,
                campaignvideolink: campaign?.campaignvideolink,
            }));
            toast.dismiss();
            setData(transformedData);
        } catch (err) {
            toast.error('Error in fetching campaigns');
        }
    };

    useEffect(() => {
        getData();
    }, [sortOption, filterOption, currentPage]);

    useEffect(() => {
        setCampaigns(data);
    }, [data]);

    const togglePopUp = (campaignId: string) => {
        setActivePopUp(prevPopUp => prevPopUp === campaignId ? null : campaignId);
    };

    const toggleShareLink = (url: string) => {
        setCampaignUrl(url);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
 
    return (
        <div className='campaign-list-container'>
            <Toaster />
            <div className='campaign-list-container text-black'>
                <Navbar page='campaign' color='white' textColor='black' />
                <div className='card-container'>
                    <div className='mt-68 flex justify-between align-center mt-l-r-30'>
                        <div className='campaign-start-text '>
                            <h1 className='campaign-title'>Start Your Campaign Now</h1>
                            <p className='campaign-subtitle'>
                            Launch your campaign and reach Global audience easily. <br /> Get started with real-time payments and secure transactions.
                            </p>
                        </div>
                        <StartCampaignBtn line1='Start your' line2='campaign now' />
                    </div>
                    <div className='mt-68 campaign-header flex justify-between mt-l-r-30'>
                        <div className='campaign-subtext'>
                            <div>
                                <h1 className='text-black font-weight-700 font-size-52'>All Campaigns</h1>
                                <p className='text-gray font-size-20'>Join campaigns below and earn rewards for each valid click. Share your referral links and start earning</p>
                            </div>
                        </div>
                        <Filters onSort={handleSort} onFilter={handleFilter} sortOptions={sortOptions} categoryOptions={categoryOptions} />
                    </div>
                    <div className="campaign-list">
                        {campaigns.map((campaign, index) => (
                            <LikesProvider>
                            <CampaignCard
                                key={index}
                                width={'card-width-392'}
                                imageSrc={campaign.imageSrc}
                                category={campaign.category}
                                clicks={campaign.clicks}
                                validclicks={campaign.validclicks}
                                title={campaign.title}
                                costPerClick={currencyConverterIntoSUI(campaign.costPerClick)}
                                totalPrice={currencyConverterIntoSUI(campaign.totalPrice)}
                                likes={campaign?.likes}
                                dislikes={campaign?.dislikes}
                                startDate={campaign.startDate}
                                endDate={campaign.endDate}
                                walletAddress={account?.address}
                                description={campaign.description}
                                url={campaign.url}
                                campaignInfoAddress={campaign.campaignInfoAddress}
                                togglePopUp={() => togglePopUp(campaign.title)}
                                popUp={activePopUp === campaign.title}
                                viewMoreToggle={false}
                                index={index}
                                handleShareUrl={toggleShareLink}
                                companyXProfile={campaign?.companyXProfile}
                                campaignvideolink={campaign?.campaignvideolink}
                                />
                                </LikesProvider>
                        ))}
                    </div>
                    {campaignUrl && <ShareLink url={campaignUrl} handleToggle={toggleShareLink} />}
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
                <Footer />
            </div>
        </div>
    );
}
