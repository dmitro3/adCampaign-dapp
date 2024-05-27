import React from 'react';
import './Filters.css';

type FiltersProps = {
    onSort: (option: string) => void;
    onFilter: (option: string) => void;
};

const Filters: React.FC<FiltersProps> = ({ onSort, onFilter }) => {
    return (
        <div className="filters">
            <button onClick={() => onSort('timeLeft')}>Time left</button>
            <button onClick={() => onSort('trustLikes')}>Trust/Likes</button>
            <button onClick={() => onSort('trustLikes')}>status</button>
            <button onClick={() => onSort('rateClick')}>Rate/Click</button>
            <select onChange={(e) => onFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="Social">Social</option>
                <option value="Travel">Travel</option>
                <option value="Adventure">Adventure</option>
            </select>
        </div>
    );
};

export default Filters;
