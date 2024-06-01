import React from 'react';
import './InfoCard.css';

interface InfoCardProps {
  toolkitContent: string;
  type: 'img' | 'text';
  onClick?: () => void;
}

const InfoCard: React.FC<InfoCardProps> = ({ toolkitContent, type }) => {
  return (
    <div className="info-icon-container" >
      {type === 'img' && (
        <>
          <img src="/info.svg" alt="Info Icon" className="info-icon" />
          <div className="toolkit-content ff-primary font-weight-500">
            {toolkitContent}
          </div>
        </>
      )}
      {type === 'text' && (
        <>
          <div className='viewmore-text ff-primary font-size-14'>ViewMore</div>
          <div className="toolkit-text">
            <p className='ff-primary font-size-16 font-weight-800'>Description:</p>
            {toolkitContent}
          </div>
        </>
      )}
    </div>
  );
};

export default InfoCard;
