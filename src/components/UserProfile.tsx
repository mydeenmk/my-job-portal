import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Layout from '../components/Layout';
import { Card, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText,CircularProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import WorkIcon from '@material-ui/icons/Work';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { BottomNavigation, BottomNavigationAction, TextField } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExploreIcon from '@material-ui/icons/Explore';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import SearchIcon from '@material-ui/icons/Search'
const UserProfile: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const getUserInitial = () => {
    console.log("User object:", user); // Debugging statement
    return user?.email?.charAt(0).toUpperCase() || '';
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId); 
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
      } else {
        console.log('No such document!');
      }
    }catch (error) {
        console.error('Error fetching job details:', error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000); // Delay for 3 seconds
      }
    };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      router.push('/login');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
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
      <Card style={{ margin: '20px', padding: '20px', borderRadius: '8px', textAlign: 'center',backgroundColor:'transparent',marginTop:'70px' }}>
        <Avatar src={userData.profileImage} alt={user.name} style={{ width: '100px', height: '100px', margin: '0 auto' }} />
        <Typography variant="h5" gutterBottom style={{marginTop:7, fontSize:16}}>
          {user?.email || 'User Email'}
        </Typography>
        <List>
        <ListItem button onClick={() => router.push('/editprofile')}>
  <ListItemIcon><EditIcon /></ListItemIcon>
  <ListItemText primary="Edit Profile" />
</ListItem>
          <ListItem button onClick={() => router.push('/job-apply-status')}>
            <ListItemIcon><WorkIcon /></ListItemIcon>
            <ListItemText primary="Job Apply Status" />
          </ListItem>
          <ListItem button onClick={() => router.push('/settings')}>
            <ListItemIcon><SettingsIcon /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Card>
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
        <BottomNavigationAction label="Search" icon={<SearchIcon />} value="profile" />      </BottomNavigation>
     </Layout>
  );
};

export default UserProfile;
