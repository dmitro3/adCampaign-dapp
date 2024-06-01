import React from 'react';
import './Filters.css';
import Dropdown from '../DropDown/DropDown';
interface FiltersProps {
    onSort: (sortKey: string) => void;
    onFilter: (filterValue: string) => void;
    sortOptions: string[];
    categoryOptions: string[];
}

const Filters: React.FC<FiltersProps> = ({ onSort, onFilter, sortOptions, categoryOptions }) => {
    const handleSort = (sortKey: string) => {
        onSort(sortKey);
    };

    const handleFilter = (filterValue: string) => {
        onFilter(filterValue);
    };

    return (
        <div className="filters">
            <Dropdown 
                imageSrc="/arrowdown.png" 
                text="Sort By"
                options={sortOptions}
                onSelect={handleSort}
                droptype='/sort.svg'
            />
            <Dropdown 
                imageSrc="/arrowdown.png" 
                text="All Categories"
                options={categoryOptions}
                onSelect={handleFilter}
                droptype='/filter.svg'
            />
        </div>
    );
};

export default Filters;
