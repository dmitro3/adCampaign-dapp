import InfoCard from '../InfoCard/InfoCard';
import './CardPrice.css'; 

interface CardPriceProps {
    currentPrice: number;
    totalPrice: number;
    onClick?: () => void;
    loading: boolean
    toolkitname: string;
}

export default function CardPrice({ totalPrice, onClick, loading,currentPrice,toolkitname }: CardPriceProps) {

    return (
        <div className="card-price-container">
            <div className="card-price flex font-size-16 justify-between align-center">
                <div className="price-details flex align-center">
                    <span className="current-price text-black font-size-24 font-weight-800">$ {currentPrice}</span>
                    <div className="amount-margin">
                        <span className="total-price font-size-16 font-weight-500">  /$ {totalPrice}</span>
                         <div className='flex'>

                        <p className="pool-amount font-size-10">Pool amount in $SUI</p>
                        <div className='info-pool-amount'>

                        <InfoCard  toolkitname={toolkitname} types="img" toolkitContent="Amount affiliates earn/click in Campaign Currency" />
                        </div>

                         </div>
                    </div>
                </div>
                <button onClick={onClick} className='share-earn-btn flex align-center text-black bg-white font-weight-700 font-size-16 share-btn' disabled={loading}>
                    <p className='font-size-16'>Share & Earn</p>
                    <img src="/share.png" alt="share" />
                </button>
            </div>
        </div>
    );
}
