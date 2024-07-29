import React from 'react'
import Banner from '@/components/banner';
import Header from '@/components/Header';
import ProfileCard from '@/components/ProfileCard';
import Footer from '@/components/Footer';
import JobSearchCard from '@/components/searchcard';
import JobCard from '@/components/JobCard';
const jobportal = () => {
  return (
    <div>
      <Header/>
      <Banner/>
      <JobCard/>
     <JobSearchCard/> 
    
    <Footer/>

    </div>
  )
}

export default jobportal