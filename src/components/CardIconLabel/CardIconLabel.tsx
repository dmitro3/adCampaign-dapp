import './CardIconLabel.css'; 
import InfoCard from '../InfoCard/InfoCard';

interface CardIconLabelProps {
    alt: string;
    src: string;
    text: React.ReactNode;
    width?: string;
    height?: string;
    extraStyles?: string; 
    toolkitname: string;
}

export default function CardIconLabel({ src, alt, text, width, height, extraStyles,toolkitname}: CardIconLabelProps) {
    return (
        <div className={`card-icon-label-container flex align-center justify-between text-gray font-size-16 ${extraStyles}`} style={{width, height}}>
            <img src={src} alt={alt} />
            {text}
            <div className='user-icon'>
            {alt === "user" && <InfoCard  toolkitname={toolkitname} types="img" toolkitContent="Amount affiliates earn/click in Campaign Currency" />}
            </div>
            {alt === "duration" && <InfoCard toolkitname={toolkitname} types="img"toolkitContent="The expiration date of the campaign" />}
        </div>
    );
}
