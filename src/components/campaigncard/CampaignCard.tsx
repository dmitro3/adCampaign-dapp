import CardStats from '../reuseablecomponent/cardstats/CardStats';
import CardMetaItem from '../reuseablecomponent/cardmetaitem/CardMetaItem';
import CardPrice from '../reuseablecomponent/cardprice/CardPrice';
import CardReaction from '../reuseablecomponent/cardreaction/CardReaction';
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
}

const CampaignCard: React.FC<CampaignCardProps> = ({ 
    imageSrc, 
    label, 
    clicks, 
    title, 
    daysLeft, 
    costPerClick, 
    currentPrice, 
    totalPrice 
}) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={imageSrc} alt="Card Image" />
                <div className="card-label flex font-card font-color-yellow-orange font-weight-700 justify-center ">
                    {label}
                </div>
                <div className="card-reactions font-card">
                    <CardReaction src="./public/like.png" alt="Like Image" />
                    <CardReaction src="./public/dislike.png" alt="Dislike Image" />
                </div>
            </div>
            <div className="card-content">
                <CardStats src='./public/star.png' clicks={clicks} />
                <h3 className='font-card font-weight-800'>{title}</h3>
                <div className="card-meta">
                    <CardMetaItem src="./public/duration.png" text={`${daysLeft} days left`} />
                    <CardMetaItem src="./public/visit.png" text={`$${costPerClick} per click`} />
                </div>
                <CardPrice currentPrice={currentPrice} totalPrice={totalPrice} />
            </div>
        </div>
    );
}

export default CampaignCard;
