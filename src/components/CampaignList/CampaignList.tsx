import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { fetchCampaigns } from "../../common/services/api.services";
import Navbar from '../Navbar/navbar';
import CampaignCard from '../campaigncard/CampaignCard';
import { useCurrentAccount } from '@mysten/dapp-kit';
import StartCampaignBtn from '../startcampaignbtn/StartCampaignBtn';
import Pagination from '../pagination/Pagination';
import './CampaignList.scss';
import { currencyConverter, currencyConverterIntoSUI } from '../../common/helpers';


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
};

const formatDate = (epoch: number) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString('en-US');
};

const ITEMS_PER_PAGE = 20;

export default function CampaignList() {
    const account  = useCurrentAccount() as {address: string};
    const [data, setData] = useState([]);
    const [activePopUp, setActivePopUp] = useState<string | null>(null);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    // const [sortOption, setSortOption] = useState<string>('timeLeft');
    // const [filterOption, setFilterOption] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const getData = async () => {
        try{
            toast.loading('Loading...')
            const response = await fetchCampaigns();

            const transformedData = response.map((campaign: any) => ({
                imageSrc: campaign?.banner,
                category: campaign?.category,
                clicks: 0,
                validClicks: campaign.validClicks,
                title: campaign?.companyName,
                daysLeft: `${Math.ceil((campaign?.endDate - campaign?.startDate) / (60 * 60 * 24))} days left`,
                costPerClick: currencyConverter(campaign?.cpc),
                currentPrice: 0,
                totalPrice: currencyConverter(campaign?.campaignBudget),
                likes: 0,
                dislikes: 0,
                startDate: formatDate(campaign?.startDate),
                endDate: campaign?.endDate,
                walletAddress: campaign?.campaignWalletAddress,
                description: campaign?.description || 'No description available',
                url: campaign?.originalUrl,
                campaignInfoAddress: campaign?.campaignInfoAddress,
            }));
            toast.dismiss()
            setData(transformedData);
        }catch(err){
            toast.error('Error in fetching campaign')
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setCampaigns(data);
    }, [data]);

    const togglePopUp = (campaignId: string) => {
        setActivePopUp(prevPopUp => prevPopUp === campaignId ? null : campaignId);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const paginatedCampaigns = campaigns.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(campaigns.length / ITEMS_PER_PAGE);

    return (
        <div className='campaign-list-container'>
        <Toaster />
        <div className='campaignlistcontainer bg-white text-black'>
            <Navbar page='campaign' color='white' textColor='black'/>
            <div className='card-container'>
                <div className='mt-68 flex justify-space-around align-center'>
                    <div className='campaign-start-text '>
                        <h1 className='campaign-title'>Lorem Ipsum dior random content about ads</h1>
                        <p className='campaign-subtitle'>
                            Lorem Ipsum dior random content about ads etc that can be pushed over here 
                            and tells the story about our product to be added here
                        </p>
                    </div>
                    <StartCampaignBtn line1='Start your' line2='campaign now' />
                </div>
                <div className='mt-68 campaign-header flex justify-space-around align-center'>
                    <div className='campaign-subtext'>

                    <div>
                        <h1 className='text-black font-weight-700 font-size-52'>Campaigns</h1>
                        <p className='text-gray font-size-20'>All the campaigns are listed here</p>
                    </div>
                    </div>
                    <>
                    </>
                </div>
                <div className="campaign-list" >
                    {paginatedCampaigns.map((campaign, index) => (
                        <CampaignCard
                            key={index}
                            width={'card-width-392'}
                            imageSrc={campaign.imageSrc}
                            category={campaign.category}
                            clicks={campaign.validClicks}
                            title={campaign.title}
                            daysLeft={campaign.daysLeft}
                            costPerClick={currencyConverterIntoSUI(campaign.costPerClick)}
                            totalPrice={currencyConverterIntoSUI(campaign.totalPrice)}
                            likes={campaign.likes}
                            dislikes={campaign.dislikes}
                            startDate={campaign.startDate}
                            endDate={campaign.endDate}
                            walletAddress={account?.address}
                            description={campaign.description}
                            url={campaign.url}
                            campaignInfoAddress={campaign.campaignInfoAddress}
                            togglePopUp={() => togglePopUp(campaign.title)}
                            popUp={activePopUp === campaign.title}
                            viewMoreToggle={false}
                        />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
        </div>
    );
}
