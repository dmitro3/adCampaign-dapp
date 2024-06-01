import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import CustomButton from '../CustomButton/CustomButton';
import './ShareLink.css';

const ShareLink = ({ url, handleToggle }: { url: string, handleToggle: (url: string) => void }) => {

  const handleClose = () => {
    handleToggle('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard');
    handleClose()
  };

  return (
    <div className='share-link-popup'>
      <Toaster/>
      <div className="share-link-component bg-white align-center">
        <div className='close-button flex'>
          <CustomButton onClick={handleClose} title="X" color="black" backgroundColor="white" border="none"/>
        </div>
        <section className='flex justify-center flex-column align-center'> 
          <h2 className="share-link-title">Share this Link  & Earn</h2>
          <p className="share-link-instruction">Click the button below to copy the link.</p>
          <ul> 
            <li> <b>Generate your unique referral link </b>for this campaign and earn rewards per click.</li>
            <li> <b>Our smart contract ensures </b>you get paid the rate per click times the number of clicks in real-time.</li>
            <li>Amount credit directly from the escrow pool</li>
            <li><b>Keep an eye on campaign leaderboard:</b> Top players receive additional airdrops occasionally.</li>
          </ul>
          <p><b>Note:</b> Revisit anytime to get your referral link from the campaign card.</p>
          <div className="url-container flex justify-center align-center">
            <input type="text" value={url} readOnly className="url-input"/>
            <CustomButton onClick={handleCopy} title="Copy Link" color="white" backgroundColor="#006AFF"/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShareLink;
