import './button.css'
interface ButtonProps {
    title: string;
    color: 'white' | 'blue' | 'black';
    onClick?: () => void;
  }
  
  const Button: React.FC<ButtonProps> = ({ title, color, onClick }) => {
    return (
      <button className={`button-${color}`} onClick={onClick}>
        {title}
      </button>
    );
  }
  
  export default Button;
  