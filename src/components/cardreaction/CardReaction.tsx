import './CardReaction.css';

interface CardReactionProps {
    src: string;
    alt: string;
    count: number;
}

const CardReaction: React.FC<CardReactionProps> = ({ src, alt, count }) => {
    return (
        <div className="card-reaction flex align-center justify-center bg-white">
            <button><img src={src} alt={alt} /> </button>
            <div className="reaction-count bg-white text-black ff-tertiary">{count}</div>
        </div>
    );
}

export default CardReaction;
