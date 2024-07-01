import React, { useState } from 'react'
import './jobpost.css'

function jobpost({job, setfilters}) 
{

  const addFilter = (event) => {
    const value = event.target.textContent;
    setfilters(prevFilters => [...new Set([...prevFilters, value])]);
  }

  return (
    <div className='jobpost'>
        <div className='rightSide'>
        <img id="companyLogo" src={`src/assets/`+job.logo} height="75px" width='75px'/>

        <div className='jobDetails'>
            <div className='Company'>
                <p id="CompanyName">{job.company}</p>
                { job.new ? (<p id="NewTag">NEW!</p>) : '' }
                { job.featured ? (<p id="FeaturedTag">FEATURED</p>) : '' }
            </div>

            <p id="jobTitle">{job.position}</p>

            <div className='subDetails'>
                <p>{job.postedAt}</p>
                <p>{job.contract}</p>
                <p>{job.location}</p>
            </div>
        </div>

        </div>

        <div className='jobTags'>
        {job.languages.map( language =>(<p onClick={addFilter} value={language}>{language}</p>))}
        {job.tools.map( tool =>(<p onClick={addFilter} value={tool}>{tool}</p>))}
        </div>
    </div>
  )
}

export default jobpost
