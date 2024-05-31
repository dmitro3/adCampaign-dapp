import './InfoCard.css';

const InfoCard = ({ toolkitContent}:any) => {
  return (
    <div className="info-icon-container">
      <img src="/info.png" alt="Info Icon" className="info-icon" />
      <div className="toolkit-content">
        {toolkitContent}
      </div>
    </div>
  );
};


export default InfoCard;
