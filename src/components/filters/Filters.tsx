import './Filters.css'

interface FiltersProps {
    onSort: (sortKey: string) => void;
    onFilter: (filterValue: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSort, onFilter }) => {
    return (
        <div className="filters">
            <button onClick={() => onSort('Time Left')}>Time Left</button>
            <button onClick={() => onSort('trustLikes')}>Trust/Likes</button>
            <button onClick={() => onSort('status')}>Status</button>
            <button onClick={() => onSort('Rates Per Click')}>Rate/Click</button>
            <select onChange={(e) => onFilter(e.target.value)}>
                <option value="">All</option>
                <option value="Meme Coin">Meme Coin</option>
                <option value="NFT">NFT</option>
                <option value="Wallets">Wallets</option>
            </select>
        </div>
    );
};

export default Filters;
