import './button.css'

  const Button = ({ title, type, color, width, height ,onClick, disabled }: any) => {
    return (
      <button className={`button-${color}`} style={{width: width, height: height}} onClick={onClick} disabled={disabled} type={type}>
        {title}
      </button>
    );
  }
  
  export default Button;
  