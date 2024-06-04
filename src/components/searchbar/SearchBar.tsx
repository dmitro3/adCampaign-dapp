import React, { useState } from 'react';
import { ConnectButton } from '@mysten/dapp-kit';
import './SearchBar.scss';

const SearchBar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="search-bar flex align-center justify-between bg-white">
            <div className="  search-icon-container flex align-center">
                {searchQuery === '' && <img src="/search.png" alt="search" className="search-icon" />}
                <input
                    type="text"
                    placeholder="Search"
                    className="search-input text-black bg-white"
                    value={searchQuery}
                    onChange={handleInputChange}
                />
            </div>
            <div className="profile-pic flex align-center">
                <img src="/profile.png" alt="profile" className="profile-image" />
                <div className="profile-info">
                <ConnectButton/>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
