import './CardMetaItem.css'; 


interface CardMetaItemProps {
    src: string;
    text: string;
}

export default function CardMetaItem({ src, text }: CardMetaItemProps) {
    return (
        <div className="flex align-center">
            <img src={src} alt={text} />
            <span>{text}</span>
        </div>
    );
}
