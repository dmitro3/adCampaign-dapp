import './CardReaction.css';

interface CardReactionProps {
    src: string;
    alt: string;
    count: number;
    onClick?: () => void;
}

const CardReaction: React.FC<CardReactionProps> = ({ src, alt, count,onClick }) => {
    return (
        <div className="card-reaction flex align-center justify-center bg-white">
            <button><img src={src} alt={alt} onClick={onClick}/> </button>
            <div className="reaction-count bg-white text-black ff-tertiary">{count}</div>
        </div>
    );
}

export default CardReaction;
