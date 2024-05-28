import './CustomButton.css'

  
  const CustomButton= ({ backgroundColor, border,color, disabled, height, onClick,title,width }:any) => {
    return (
      <button className='custom-button-container font-size-16 ff-primary font-weight-400' disabled={disabled} onClick={onClick} style={{backgroundColor,border,color,height,width}}>
        {title}
      </button>
    );
  }
  
  export default CustomButton;
  