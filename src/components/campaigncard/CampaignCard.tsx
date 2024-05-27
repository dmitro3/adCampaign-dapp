import CardStats from '../CardStats/CardStats';
import CardIconLabel from '../CardIconLabel/CardIconLabel';
import CardPrice from '../CardPrice/CardPrice';
import CardReaction from '../CardReaction/CardReaction';
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
    dislikes 
}) => {
    return (
        <div className="card bg-white ff-tertiary">
            <div className="card-image">
                <img src={imageSrc} alt="Card Image" />
                <div className="card-label bg-white flex ff-tertiary font-color-yellow-orange font-weight-700 justify-center ">
                    {label}
                </div>
                <div className="card-reactions ff-tertiary flex align-center">
                    <CardReaction src="./like.png" alt="Like Image" count={likes} />
                    <CardReaction src="./dislike.png" alt="Dislike Image" count={dislikes} />
                </div>
            </div>
            <div className="card-content bg-white">
                <div className='flex'>
                <p className='add-money bg-white flex font-size-14'> <CustomButton title="$ Add Money" color='#4880FF' backgroundColor='white'   className='add-money-btn'/> </p>
                <CardStats src='./star.png' clicks={clicks} />
                </div>
                <h3 className='ff-tertiary font-weight-800'>{title}</h3>
                <div className="card-meta flex justify-between font-size-14 text-gray">
                    <CardIconLabel src="./duration.png" text={`${daysLeft} days left`} />
                    <CardIconLabel src="./user.png" text={`$${costPerClick} per click`} />
                </div>
                <CardPrice currentPrice={currentPrice} totalPrice={totalPrice} />
            </div>
        </div>
    );
}

export default CampaignCard;
