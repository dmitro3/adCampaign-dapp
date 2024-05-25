import CampaignCard from '../campaigncard/CampaignCard';
import './CampaignExplorer.scss';

const dummyData = [
    {
        imageSrc: './public/journey.png',
        label: 'Social',
        clicks: 2345,
        title: 'California Sunset/Twilight Boat Cruise',
        daysLeft: 2,
        costPerClick: 3,
        currentPrice: 48.25,
        totalPrice: 360
    },
    {
        imageSrc: './public/journey.png',
        label: 'Social',
        clicks: 2345,
        title: 'California Sunset/Twilight Boat Cruise',
        daysLeft: 2,
        costPerClick: 3,
        currentPrice: 48.25,
        totalPrice: 360
    },
    {
        imageSrc: './public/journey.png',
        label: 'Social',
        clicks: 2345,
        title: 'California Sunset/Twilight Boat Cruise',
        daysLeft: 2,
        costPerClick: 3,
        currentPrice: 48.25,
        totalPrice: 360
    },
    {
        imageSrc: './public/journey.png',
        label: 'Social',
        clicks: 2345,
        title: 'California Sunset/Twilight Boat Cruise',
        daysLeft: 2,
        costPerClick: 3,
        currentPrice: 48.25,
        totalPrice: 360
    },
    {
        imageSrc: './public/journey.png',
        label: 'Social',
        clicks: 2345,
        title: 'California Sunset/Twilight Boat Cruise',
        daysLeft: 2,
        costPerClick: 3,
        currentPrice: 48.25,
        totalPrice: 360
    },
    {
        imageSrc: './public/journey.png',
        label: 'Social',
        clicks: 2345,
        title: 'California Sunset/Twilight Boat Cruise',
        daysLeft: 2,
        costPerClick: 3,
        currentPrice: 48.25,
        totalPrice: 360
    },
];

export default function CampaignExplorer() {
    return (
        <div className='flex justify-center'>
        <div className="campaign-explorer">
            {dummyData.map((campaign, index) => (
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
                />
            ))}
        </div>
        </div>
    );
}
