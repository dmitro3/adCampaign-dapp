import './CardPrice.css'; 
import Button from '../button/button'

interface CardPriceProps {
    currentPrice: number;
    totalPrice: number;
}
export default function CardPrice({ currentPrice, totalPrice }: CardPriceProps) {
    return (
        <div className="card-price flex justify-space-between align-center">
            <div className="flex align-center justify-space-between">
                <span className="font-size-24">${currentPrice}</span>
                <span className="font-size-16"> / ${totalPrice}</span>
            </div>
            <Button title="Earn Now" color="white"/>
        </div>
    );
}
