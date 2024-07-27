// components/Layout.tsx
import React, { ReactNode } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, Avatar, Tooltip ,Badge} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useAuth, } from '../hooks/useAuth';
import { useState,useEffect } from 'react';
import { useMediaQuery, makeStyles } from '@material-ui/core';
import { useRouter } from 'next/router';
import Link from "next/link"
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../firebaseConfig'; // Ensure you have this import
import { collection, onSnapshot, } from 'firebase/firestore';


interface LayoutProps {
  children: ReactNode;
}

const useStyles = makeStyles(() => ({

  drawerPaper: {
    width: 210,
    background: 'linear-gradient(to right, #b3e5fc, #b2bbbe);',
    color: 'inherite',
    alignItems: 'center',
    marginTop: 64,
    borderTopRightRadius: '10px'
  },
  menuItemText: {
    fontSize: '19px', // Set your desired font size here
    marginTop: 20
  },
  avatar: {
    width: '40px',
    height: '40px',
  },
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [notificationCount, setNotificationCount] = useState(0);
  const classes = useStyles();
  const router = useRouter();
  const [initial, setInitial] = useState<string>('');
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set the user's display name initial
        const email = user.email|| '';
        const firstLetter = email.charAt(0).toUpperCase();
        setInitial(firstLetter);
      } else {
        // Handle case when user is not logged in (e.g., redirect)
        router.push('/login');
      }
    });
  
    return () => unsubscribe();
  }, [router]);
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'jobposts'), (snapshot) => {
      setNotificationCount(snapshot.size);
    });

    return () => unsub();
  }, []);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Assuming you store your token with key 'userToken'
    router.push('/signin');
  };
  const handleNotificationClick = () => {
    router.push('/notifications'); // Navigate to notifications page
  };
  
  return (
    <>
      <AppBar position="fixed" style={{borderBottomRightRadius:'10px',borderBottomLeftRadius:'10px'}} >
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }} className='arsenal-sc-bold-italic'>
            Digi jobs
          </Typography>
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={notificationCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Link href="/userprofile" passHref>
      <IconButton color="inherit">
        <Avatar style={{color:'white'}}>{initial}</Avatar>
      </IconButton>
    </Link>

        </Toolbar>
      </AppBar>
      <Drawer open={drawerOpen} onClose={toggleDrawer} classes={{ paper: classes.drawerPaper }}  >
        {/* <Typography variant="h4">
            Digi jobs
          </Typography> */}
        <List>
          <ListItem button>
            <ListItemText primary="Home" classes={{ primary: classes.menuItemText }} />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Profile" classes={{ primary: classes.menuItemText }} />
          </ListItem>

          <ListItem button>
            <ListItemText primary="Settings" classes={{ primary: classes.menuItemText }} />
          </ListItem>
          <ListItem button>
            <ListItemText onClick={handleLogout} primary="Log out" classes={{ primary: classes.menuItemText }} />
          </ListItem>
        </List>
      </Drawer>
      <main style={{ padding: isMobile ? '10px' : '20px' }}>{children}</main>
    </>
  );
};

export default Layout;
