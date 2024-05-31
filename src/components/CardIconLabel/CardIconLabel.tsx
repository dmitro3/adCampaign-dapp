import './CardIconLabel.css'; 
import InfoCard from '../InfoCard/InfoCard';

interface CardIconLabelProps {
    alt: string;
    src: string;
    text: React.ReactNode;
    width?: string;
    height?: string;
    extraStyles?: string; 
}

export default function CardIconLabel({ src, alt, text, width, height, extraStyles }: CardIconLabelProps) {
    return (
        <div className={`card-icon-label-container flex align-center justify-between text-gray font-size-14 ${extraStyles}`} style={{width, height}}>
            <img src={src} alt={alt} />
            {text}
            {alt === "user" && <InfoCard toolkitContent="The amount in Campaign Currency affiliates earn per click" />}
        </div>
    );
}
