import React from 'react'
import './pagination.css'

const Pagination = ({ totalPosts, currentPage, postperPage, setCurrentPage, setPostperPage }) => {
    
    const totalPages = Math.ceil(totalPosts / postperPage);

    return (
        <div className='pagination'>
            <button onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}>
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <p>{currentPage}</p>
            <button onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage >= totalPages}>
                <i className="fa-solid fa-arrow-right"></i>
            </button>
        </div>
    );
};

export default Pagination;