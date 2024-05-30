import './CardPrice.css'; 

interface CardPriceProps {
    currentPrice: number;
    totalPrice: number;
    onClick?: () => void;
}

export default function CardPrice({ currentPrice, totalPrice, onClick }: CardPriceProps) {  
    return (
        <div className="card-price-container">
            <div className="card-price flex font-size-16 justify-between align-center">
                <div className="price-details flex align-center">
                    {/* <span className="current-price text-black font-size-24 font-weight-800">${currentPrice}</span> */}
                    <div className="mt-13">
                        <span className="total-price font-size-16 font-weight-500">  $ {totalPrice}</span>
                        <p className="pool-amount font-size-10">Pool amount</p>
                    </div>
                </div>
                <button onClick={onClick} className='flex align-center text-black bg-white font-weight-700 share-btn'>
                    <p>Share & Earn</p>
                    <img src="/share.png" alt="share" />
                </button>
            </div>
        </div>
    );
}
