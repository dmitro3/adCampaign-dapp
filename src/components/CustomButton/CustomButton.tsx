import './CustomButton.css'

  
  const CustomButton= ({ backgroundColor, border,color, disabled, height, onClick,title,width, extraStyles, type }:any) => {
    return (
      <button className={`custom-button-container font-size-16 ff-primary font-weight-400 ${extraStyles}`} type={type} disabled={disabled} onClick={onClick} style={{backgroundColor,border,color,height,width}}>
        {title}
      </button>
    );
  }
  
  export default CustomButton;
  