import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db, auth } from '../../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc,setDoc } from 'firebase/firestore';
import Layout from '../../components/Layout';
import { Card, Typography, Button,CircularProgress } from '@material-ui/core';
import { BottomNavigation, BottomNavigationAction, TextField } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExploreIcon from '@material-ui/icons/Explore';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SearchIcon from '@material-ui/icons/Search'
const JobDetails: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const { id } = router.query;
  const [showSuccess, setShowSuccess] = useState(false);
  const [job, setJob] = useState<any>(null);
  const [value, setValue] = useState('recents');
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const fetchJobDetails = async (jobId: string) => {
    try {
      const jobRef = doc(db, 'jobPosts', jobId);
      const jobSnap = await getDoc(jobRef);

      if (jobSnap.exists()) {
        setJob(jobSnap.data());
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000); // Delay for 3 seconds
    }
  };
 
  const fetchUserProfile = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setProfile(userSnap.data());
      } else {
        console.log('No such user profile!');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const applyForJob = async () => {
    if (user && job && profile) {
      const applicationData = {
        userId: user.uid || '',
        userName: user.displayName || 'Unknown',
        userEmail: user.email || 'Unknown',
        userProfile: profile || {},
        jobId: id || '',
        jobTitle: job.title || 'Unknown',
        jobCompany: job.company || 'Unknown',
        jobLocation: job.location || 'Unknown',
        jobSalary: job.salary || 'Unknown',
        appliedAt: new Date(),
      };

      try {
        await setDoc(doc(db, 'jobApply', `${user.uid}_${id}`), applicationData);
        setShowSuccess(true); // Show success notification
        setTimeout(() => {
          setShowSuccess(false); // Hide success notification after 2 seconds
          router.push('/dashboard');
        }, 2000);
      } catch (error) {
        console.error('Error applying for the job:', error);
        alert('Failed to apply for the job.');
      }
    } else {
      alert('Please log in to apply for the job.');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserProfile(currentUser.uid);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    if (id) {
      fetchJobDetails(id as string);
    }

    return () => unsubscribe();
  }, [id]);

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
      <Card style={{
        margin: '20px',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        background: 'linear-gradient(to right, rgba(173, 216, 230, 0.6), rgba(240, 248, 255, 0.8))',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginTop:'65px'
      }}>
        <Typography variant="h4" gutterBottom>{job.title}</Typography>
        <Typography variant="h6" gutterBottom>Company: {job.company}</Typography>
        <Typography variant="body1" gutterBottom>Location: {job.location}</Typography>
        <Typography variant="body1" gutterBottom>Salary: {job.salary}</Typography>
        <Typography variant="body2" gutterBottom>Description: {job.description}</Typography>
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={applyForJob}>Apply</Button>
      </Card>
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'blur',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}>
          <CheckCircleOutlineIcon style={{ fontSize: '80px', color: 'green', marginTop: '15px' }} />
          <Typography variant="h6">Done</Typography>
        </div>
      )}
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
        style={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
        <BottomNavigationAction label="Explore" icon={<ExploreIcon />} value="explore" />
        <BottomNavigationAction label="News" icon={<AnnouncementIcon />} value="news" />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} value="Search" />     
      </BottomNavigation>
    </Layout>
  );
};

export default JobDetails;
