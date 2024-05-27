import './button.css'

  const Button = ({ title, color, width, height ,onClick }: any) => {
    return (
      <button className={`button-${color}`} style={{width: width, height: height}} onClick={onClick}>
        {title}
      </button>
    );
  }
  
  export default Button;
  