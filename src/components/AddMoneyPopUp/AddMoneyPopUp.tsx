import OvalInputBox from '../ovalInputBox/OvalInputBox';
import CustomButton from '../CustomButton/CustomButton';
import './AddMoneyPopUp.scss'; 

const AddMoneyPopUp = ({ imageSrc, titleText, onClick, handleInputCoins, handleInputMessage, moneyAmount, moneyMessage,handleclose }:any) => {
 
  // todo - implement it 
  const handleInputBlur = () => {
    
  };

  return (
    <div className='add-money-popup'>
      <div className="add-money-component bg-white align-center">
        <div className='close-button flex'>
          <CustomButton onClick={handleclose} title="X" color="black" backgroundColor="white" border="none"/>
        </div>
        <section className=' flex justify-center flex-column align-center'> 
          <div>
            <img src={imageSrc} alt="Campaign" className="campaign-image" />
          </div>
          <h2 className='text-center font-size-32 ff-tertiary font-weight-800'>{titleText}</h2>
          <div>
              <OvalInputBox
                endIcon={null} 
                handleChange={handleInputCoins}
                handleBlur={handleInputBlur}
                name="money"
                placeholder="Enter amount"
                value={moneyAmount}
                type="number"
              />
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
          <div>
            <CustomButton onClick={onClick} title="Submit" color="white" backgroundColor="#006AFF" width="150px" border="none" />
          </div>
        </ section>
      </div>
      
    </div>
  );
};

export default AddMoneyPopUp;
