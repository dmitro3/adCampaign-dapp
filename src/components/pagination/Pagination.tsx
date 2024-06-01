import React from 'react';
import './Pagination.css';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        if (totalPages <= 3) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pages.push(1, 2, 3);
            } else if (currentPage >= totalPages - 1) {
                pages.push(totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(currentPage - 1, currentPage, currentPage + 1);
            }
        }
        return pages;
    };

    return (
        <div className='pagination text-black flex justify-center align-center'>
            <button
                className='arrow-button'
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
            >
                <img src="/leftarrow.png" alt="Previous" />
            </button>
            {renderPageNumbers().map(page => (
                <button
                    key={page}
                    className={`text-black bg-white page-button ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            <button
                className='arrow-button'
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                <img src="/rightarrow.png" alt="Next" />
            </button>
        </div>
    );
};

export default Pagination;
