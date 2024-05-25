
import './CardReaction.css';
interface CardReactionProps {
    src: string;
    alt: string;
}
export default function CardReaction({ src, alt }: CardReactionProps) {
    return (
        <button className="card-reaction">
            <img src={src} alt={alt} />
        </button>
    );
}
