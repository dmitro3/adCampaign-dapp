import OvalInputBox from '../ovalInputBox/OvalInputBox';
import CustomButton from '../CustomButton/CustomButton';
import './AddMoneyPopUp.css'; 

const AddMoneyPopUp = ({ imageSrc, titleText, onClick, handleInputCoins, handleInputMessage, moneyAmount, moneyMessage,handleclose }:any) => {
 
  const handleInputBlur = () => {

  };

  return (
    <div className='add-money-popup'>
      <div className="add-money-component bg-white flex align-center">
        <div className='close-button flex'>
          <CustomButton onClick={handleclose} title="X" color="black" backgroundColor="white" border="none"/>
        </div>
        <div className='flex justify-center'>
          <img src={imageSrc} alt="Campaign" className="campaign-image" />
        </div>
        <h2 className='text-center font-size-32 ff-tertiary font-weight-800'>{titleText}</h2>
        <div className='inputs flex justify-center'>
          <div className="input-container flex justify-center">
            <OvalInputBox
              endIcon={null} 
              handleChange={handleInputCoins}
              handleBlur={handleInputBlur}
              name="money"
              placeholder="Enter amount"
              value={moneyAmount}
              type="number"
            />
          </div>
        </div>
        <div className='inputs flex justify-center'>
          <div className="input-container flex justify-center">
            <OvalInputBox
              endIcon={null} 
              handleChange={handleInputMessage}
              handleBlur={handleInputBlur}
              name="Message"
              placeholder="Enter Message"
              value={moneyMessage}
              type="text"
            />
          </div>
        </div>
        <div className='flex justify-center'>
          <CustomButton onClick={onClick} title="Submit" color="white" backgroundColor="#006AFF" width="150px" border="none" />
        </div>
      </div>
    </div>
  );
};

export default AddMoneyPopUp;
