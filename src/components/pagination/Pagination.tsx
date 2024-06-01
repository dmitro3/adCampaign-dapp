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
        if (totalPages <= 3 || currentPage <= 3) {
            for (let i = 1; i <= Math.min(totalPages, 3); i++) {
                pages.push(i);
            }
        } else {
        
            for (let i = currentPage - 1; i <= Math.min(currentPage + 1, totalPages); i++) {
                pages.push(i);
            }
        }
        if (totalPages > 3 && currentPage <= totalPages - 2) {
            pages.push('...', totalPages);
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
                    onClick={() => onPageChange(page as number)}
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
