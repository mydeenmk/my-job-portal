import { FC } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import '../styles/globals.css';

const Header: FC = () => {
  return (
    <div>
         <div style={{
        width: '90%',
        height: '200px',
        backgroundImage: 'url(https://tse2.mm.bing.net/th?id=OIP.ol0WGvMZqVDU_8FGZWdZVgHaDx&pid=Api&P=0&h=180)',// Replace with your animated image URL
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        marginLeft:23,
        marginTop:'60px'
        
      }}> 
      </div>
    <AppBar 
      position="fixed" 
      style={{ 
        borderBottomRightRadius: '10px', 
        borderBottomLeftRadius: '10px',  
        background: 'transparent',
        boxShadow: 'none' // Optional: Remove shadow if needed
      }} 
      className='header'
    >
      <Toolbar style={{ display: 'flex', alignItems: 'center' }}>
        {/* Menu Icon - Left */}
        <IconButton edge="start" color="inherit" aria-label="menu" style={{ marginRight: '100px'  }}>
          <MenuIcon />
        </IconButton>

        {/* Title - Center */}
        <Typography 
          variant="h6" 
          style={{ 
           marginRight: '90px',
            flexGrow: 1 // This makes the Typography component grow to fill the space between Menu and right icons
          }} 
          className='arsenal-sc-bold-italic'
        >
          Digi Jobs
        </Typography>

        {/* Notification and Search Icons - Right */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    </div>
  );
};

export default Header;
