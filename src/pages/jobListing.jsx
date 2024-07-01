import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import JobPost from '../components/jobPosts/jobpost'
import ReactPaginate from 'react-paginate';
import Pagination from '../components/jobPosts/pagination'
import '../components/jobPosts/pagination.css'
import './stylesheets/jobListing.css'
import data from '../assets/data.json';


function jobListing() 
{
    const navigate = useNavigate();

    const setpathHome = () => {
        navigate("/");
    }

    const [filters, setFilters] = useState([]);
  const [currentpage, setCurrentPage] = useState(0);
  const [postperpage, setPostperPage] = useState(2);

  const filterJobs = (job) => {
    const tags = [...job.languages, ...job.tools];
    return filters && filters.length > 0 ? filters.every(filter => tags.includes(filter)) : true;
  };

  const removeFilter = (event) => {
    const value = event.target.parentElement.textContent.trim();
    setFilters(prevFilters => prevFilters.filter(filter => filter !== value));
  };

  const clearFilters = () => {
    setFilters([]);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
};

  const filteredData = data.filter(filterJobs);
  const startIndex = currentpage * postperpage;
  const endIndex = startIndex + postperpage;
  const currentPagePosts = filteredData.slice(startIndex, endIndex);
  
  return (
    <>
    <button className="goHome" onClick={setpathHome}>Home</button>
    <div className='Score'>
      {filters.length > 0 && (
        <div className='activefilters'>
          <div className='Tags'>
          {filters.map(filteredTag => (
            <div key={filteredTag} className='filterTag'>
              <p>{filteredTag}</p>
              <i className="fa-solid fa-xmark" onClick={removeFilter} key={filteredTag}></i>
            </div>
          ))}
          </div>
          <button onClick={clearFilters} className="clearButton">Clear</button>
        </div>
      )}

      {currentPagePosts.map(job => (
        <JobPost key={job.id} job={job} setfilters={setFilters} />
      ))}

    <ReactPaginate
        className="react-paginate"
        pageCount={Math.ceil(filteredData.length / postperpage)}
        onPageChange={handlePageChange}
        forcePage={currentpage}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        previousLabel={(<i className="fa-solid fa-arrow-left"></i>)}
        nextLabel={(<i className="fa-solid fa-arrow-right"></i>)}
        breakLabel={"..."}
        activeClassName={"active-page"}
    />
    {
    //      <Pagination totalPosts={data.filter(filterJobs).length} currentPage={currentpage} postperPage={postperpage} setCurrentPage={setCurrentPage} setPostperPage={setPostperPage} />
    }
    </div>
    </>
  )
}

export default jobListing