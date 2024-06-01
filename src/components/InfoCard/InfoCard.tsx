import { Tooltip as ReactTooltip } from 'react-tooltip';
import './InfoCard.css';

interface InfoCardProps {
  toolkitContent: string;
  types: 'img' | 'text';
  toolkitname: string;
  onClick?: () => void;
  type?: string;
  effect?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ toolkitContent, types,toolkitname }) => {
  return (
    <div className="info-icon-container">
      {types === 'img' && (
        <>
          <img
            src="/info.svg"
            alt="Info Icon"
            className="info-icon"
            data-tooltip-id={toolkitname}
          />
           <ReactTooltip
           variant="light"
           border="1px solid #000000"
           place="top"
           id={toolkitname}
            content={toolkitContent}
          />
        </>
      )}
      {types === 'text' && (
        <>
          <div className='viewmore-text ff-primary font-size-14' data-tooltip-id={toolkitname}>
            ViewMore
          </div>
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
