import CardStats from '../reuseablecomponent/cardstats/CardStats';
import CardMetaItem from '../reuseablecomponent/cardmetaitem/CardMetaItem';
import CardPrice from '../reuseablecomponent/cardprice/CardPrice';
import CardReaction from '../reuseablecomponent/cardreaction/CardReaction';
import './CampaignCard.css';

export default function CampaignCard() {
    return (
        <div className="card">
            <div className="card-image">
                <img src="./public/journey.png" alt="Card Image" />
                <div className="card-label flex font-color-yellow-orange font-weight-700 justify-center ">Social</div>
                <div className="card-reactions">
                    <CardReaction src="./public/like.png" alt="Like Image" />
                    <CardReaction src="./public/dislike.png" alt="Dislike Image" />
                </div>
            </div>
            <div className="card-content">
                <CardStats src='./public/star.png' clicks={2345} />
                <h3>California Sunset/Twilight Boat Cruise</h3>
                <div className="card-meta">
                    <CardMetaItem src="./public/duration.png" text="2 days left" />
                    <CardMetaItem src="./public/visit.png" text="$3 per click" />
                </div>
                <CardPrice currentPrice={48.25} totalPrice={360} />
            </div>
        </div>
    );
}
