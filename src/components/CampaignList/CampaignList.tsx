import { useState } from 'react';
import { useEffect } from 'react';
import { fetchCampaigns } from "../../common/services/api.services";
import CampaignCard from '../campaigncard/CampaignCard';
import Filters from '../filters/Filters';
import StartCampaignBtn from '../startcampaignbtn/StartCampaignBtn';
import SearchBar from '../searchbar/SearchBar';
import Pagination from '../pagination/Pagination';
import { mockData } from '../../common/constants';
import './CampaignList.scss';

type Campaign = {
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
};

const formatDate = (epoch: number) => {
    const date = new Date(epoch * 1000);
    return date.toLocaleDateString('en-US');
};
const ITEMS_PER_PAGE = 20;

export default function CampaignList() {
    const [data, setData] = useState([]);

    const getData = async () => {
        const response = await fetchCampaigns();
        const transformedData = response.map((campaign: any) => ({
            imageSrc: campaign.banner,
            label: campaign.category,
            clicks: 0,
            title: campaign.companyName,
            daysLeft: Math.ceil((campaign.endDate - campaign.startDate) / (60 * 60 * 24)),
            costPerClick: campaign.cpc/1e9,
            currentPrice: 0,
            totalPrice: campaign.campaignBudget / 1e9,
            likes: 0,
            dislikes: 0,
            startDate: formatDate(campaign.startDate),
            endDate: campaign.endDate,
            walletAddress: campaign.campaignWalletAddress,
            description: campaign.description || 'No description available',
            url: campaign.originalUrl,
            campaignInfoAddress: campaign.campaignInfoAddress,
        }));
        setData(transformedData);
    };

    useEffect(() => {
        getData();
    }, []);
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    useEffect(() => {
        setCampaigns(data);
    }, [data]);
    const [sortOption, setSortOption] = useState<string>('timeLeft');
    const [filterOption, setFilterOption] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleSort = (option: string) => {
        setSortOption(option);
        let sortedCampaigns;
        switch (option) {
            case 'timeLeft':
                sortedCampaigns = [...campaigns].sort((a, b) => a.daysLeft - b.daysLeft);
                break;
            case 'trustLikes':
                sortedCampaigns = [...campaigns].sort((a, b) => b.likes - a.likes);
                break;
            case 'rateClick':
                sortedCampaigns = [...campaigns].sort((a, b) => b.costPerClick - a.costPerClick);
                break;
            default:
                sortedCampaigns = campaigns;
        }
        setCampaigns(sortedCampaigns);
    };
    // todo: implement filter
    const handleFilter = (option: string) => {
        setFilterOption(option);
        let filteredCampaigns;
        if (option === 'all') {
            filteredCampaigns = mockData;
        } else {
            filteredCampaigns = mockData.filter(campaign => campaign.label.toLowerCase() === option.toLowerCase());
        }
        // setCampaigns(filteredCampaigns);
        setCurrentPage(1);
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

        <div className='campaignlistcontainer bg-white text-black'>
            <SearchBar />
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
                    <div className='filter-container align-center'>
                        <Filters onSort={handleSort} onFilter={handleFilter} />
                    </div>
                </div>
                <div className="campaign-list">
                    {paginatedCampaigns.map((campaign, index) => (
                        <CampaignCard
                            key={index}
                            imageSrc={campaign.imageSrc}
                            label={campaign.label}
                            clicks={campaign.clicks}
                            title={campaign.title}
                            daysLeft={campaign.daysLeft}
                            costPerClick={campaign.costPerClick}
                            currentPrice={campaign.currentPrice}
                            totalPrice={campaign.totalPrice}
                            likes={campaign.likes}
                            dislikes={campaign.dislikes}
                            startDate={campaign.startDate}
                            endDate={campaign.endDate}
                            walletAddress={campaign.walletAddress}
                            description={campaign.description}
                            url={campaign.url}
                            campaignInfoAddress={campaign.campaignInfoAddress}
                        />
                    ))}
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
        </div>
    );
}