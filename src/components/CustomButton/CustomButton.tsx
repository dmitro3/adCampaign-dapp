import './CustomButton.css'

  
  const CustomButton= ({ backgroundColor, border,color,height, onClick,title,width }:any) => {
    return (
      <button className='custom-button-container font-size-16 ff-primary font-weight-400' onClick={onClick} style={{backgroundColor,border,color,height,width}}>
        {title}
      </button>
    );
  }
  
  export default CustomButton;
  