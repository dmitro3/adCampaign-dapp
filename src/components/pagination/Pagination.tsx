import './Pagination.css';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='pagination text-black flex justify-center'>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    className={`text-black bg-white page-button ${i + 1 === currentPage ? 'active' : ' text-white'}`}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
