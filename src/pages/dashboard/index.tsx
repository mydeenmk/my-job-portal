import React, { useState, useEffect } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Layout from '../../components/Layout';
import { BottomNavigation, BottomNavigationAction, Card, TextField,CircularProgress,Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import { useRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search'
const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  
  const router = useRouter();
  const fetchJobs = async (searchTerm = '', filterTerm = '') => {
    try {
      let q;
      
      if (searchTerm && filterTerm) {
        // Search by job title and filter by company name prefix
        q = query(
          collection(db, 'jobPosts'),
          where('title', '>=', searchTerm),
          where('title', '<=', searchTerm + '\uf8ff'),
          where('company', '>=', filterTerm),
          where('company', '<=', filterTerm + '\uf8ff')
        );
      } else if (searchTerm) {
        // Search by job title only
        q = query(
          collection(db, 'jobPosts'),
          where('title', '>=', searchTerm),
          where('title', '<=', searchTerm + '\uf8ff')
        );
      } else if (filterTerm) {
        // Filter by company name prefix only
        q = query(
          collection(db, 'jobPosts'),
          where('company', '>=', filterTerm),
          where('company', '<=', filterTerm + '\uf8ff')
        );
      } else {
        // Fetch all jobs
        q = collection(db, 'jobPosts');
      }
  
      const querySnapshot = await getDocs(q);
      const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobsData);      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 900); // Delay for 3 seconds
    }
  };

  useEffect(() => {
    fetchJobs(); // Fetch jobs initially
  }, []);

  useEffect(() => {
    fetchJobs(search, filter); // Fetch jobs when search or filter changes
  }, [search, filter]);

  const handleJobClick = (jobId: string) => {
    if (jobId) {
      router.push(`/job/${jobId}`);
    } else {
      console.error('Job ID is undefined');
    }
  };
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>Loading...</Typography>
      </div>
    );
  }

  return (
    <Layout>
      <div >
      <div style={{
        width: '100%',
        height: '200px',
        backgroundImage: 'url(\job.jpg)',// Replace with your animated image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        marginLeft:0,
        marginTop:'80px'
        
      }}> 
      </div>
      <h6 style={{textAlign:'center',fontSize:'20px', fontFamily:'initial', marginTop:10}}> Find Your Dream Job!</h6>
      <div style={{ margin: '20px', padding: '10px' }}>
        <TextField
        
          label="Search jobs..."
          // variant="outlined"
          // fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ margin: '0', width: 'calc(100% - 0px)', // Adjust the width as needed
            maxWidth: '700px' , marginBottom:'10px' }}
        />
        <TextField
          label="Filter by company..."
          // variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ margin: '10px 0' }}
          
        />
      </div>
      </div>
      <div style={{ height: 'calc(100vh - 400px)', overflowY: 'auto' }}>
        {jobs.length > 0 ? (
          jobs.map((job, index) => (
            <Card key={index}  onClick={() => {
              console.log('Job ID:', job.id); // Log the job ID for debugging
              handleJobClick(job.id);
            }}  style={{
              margin: '10px',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              background: 'linear-gradient(to right, rgba(173, 216, 230, 0.6), rgba(240, 248, 255, 0.8))',
              backdropFilter: 'blur(10px)',
              width: 'calc(100% - 40px)', // Adjust the width as needed
              maxWidth: '600px', // Set a maximum width
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              marginBottom: '10px', // Reduce space between cards
              marginLeft:'25px'
            }}>
              <h2 style={{ margin: '5px 0', fontSize: '20px', fontWeight:'bold', fontFamily:'cursive' }}>Job: {job.title}</h2>
              <h4 style={{ margin: '5px 0', fontSize: '15px',fontWeight:'lighter' }}>Company: {job.company}</h4>
              <h5 style={{ margin: '5px 0', fontSize: '13px' }}>Location: {job.location}</h5>
              <h6 style={{ margin: '5px 0', fontSize: '11px' }}> Salary: {job.salary}</h6>
              {/* <button style={{ marginTop: '5px' }}>Apply</button> */}
            </Card>
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
      <BottomNavigation
        value=""
        onChange={(_event, newValue) => {
          if (newValue === 'home') {
            router.push('/dashboard');
          } else if (newValue === 'userprofile') {
            router.push('/userprofile');
          }
        }}
        showLabels
        style={{ width: '100%', position: 'fixed', bottom: 0, left: 0,  }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
        <BottomNavigationAction label="Explore" icon={<ExploreIcon />} value="explore" />
        <BottomNavigationAction label="News" icon={<AnnouncementIcon />} value="news" />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} value="profile" />
         </BottomNavigation>
    </Layout>
  );
};

export default HomePage;
