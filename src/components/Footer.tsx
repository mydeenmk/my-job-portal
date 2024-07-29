import { FC } from 'react';
import { BottomNavigation, BottomNavigationAction, Card, TextField,CircularProgress,Typography } from '@material-ui/core';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import '../styles/globals.css';
import ExploreIcon from '@material-ui/icons/Explore';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import router, { useRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search'

const Footer: FC = () => {
  return (
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
  );
};

export default Footer;
