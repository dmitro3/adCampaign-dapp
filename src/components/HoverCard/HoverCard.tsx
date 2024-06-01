import AddressURL from '../AddressURL/AddressURL';
import './HoverCard.css';

const HoverCard = ({ campaigns }: any) => {
  return (
    <div className="ad-campaign-list">
      {campaigns.map((campaign: any, index: any) => (
        <div key={index} className="ad-campaign-item flex justify-space-around">
          <span className="campaign-name ff-primary font-weight-700 font-size-16">
            ${campaign.price / 1e9}
          </span>
          <AddressURL type={'object'} address={campaign.name} />
        </div>
      ))}
    </div>
  );
};

export default HoverCard;
