import './HoverCard.css';

const HoverCard= ({ campaigns }:any) => {
  return (
    <div className="ad-campaign-list">
      {campaigns.map((campaign:any, index:any) => (
        <div key={index} className="ad-campaign-item ">
          <img src="/dollar.png" alt="Dollar Icon" className="dollar-icon" />
          <span className="campaign-name ff-primary font-weight-400 font-size-16">{campaign.price} {campaign.name}</span>
        </div>
      ))}
    </div>
  );
};



export default HoverCard;
