import './CardIconLabel.css'; 


interface CardIconLabelProps {
    src: string;
    text: string;
}

export default function CardIconLabel({ src, text }: CardIconLabelProps) {
    return (
        <div className="card-icon-label-container flex align-center justify-between text-gray font-size-14">
            <img src={src} alt={text} />
            <span>{text}</span>
        </div>
    );
}
