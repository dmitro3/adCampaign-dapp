import CustomButton from '../CustomButton/CustomButton';
import toast from 'react-hot-toast';
import './ShareLink.css';
import { Toaster } from 'react-hot-toast';

const ShareLink = ({ url, handleClose }: { url: string, handleClose: () => void }) => {

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard');
  };

  return (
    <div className='share-link-popup'>
      <Toaster/>
      <div className="share-link-component bg-white align-center">
        <div className='close-button flex'>
          <CustomButton onClick={handleClose} title="X" color="black" backgroundColor="white" border="none"/>
        </div>
        <section className='flex justify-center flex-column align-center'> 
          <h2 className="share-link-title">Share this Link</h2>
          <p className="share-link-instruction">Click the button below to copy the link.</p>
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
