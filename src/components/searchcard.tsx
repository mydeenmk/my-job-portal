import { FC } from 'react';
import { Card, CardContent, Typography, TextField, Button, Icon } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import '../styles/globals.css';

const pulseAnimation = `
  @keyframes pulseAnimation {
    0% {
      transform: scale(1);
      color: orange;
    }
    50% {
      transform: scale(1.1);
      color: darkorange;
    }
    100% {
      transform: scale(1);
      color: orange;
    }
  }
`;

const JobSearchCard: FC = () => {
  const router = useRouter();

  return (
    <Card className='searchCard'>
      <CardContent className='searchCardContent'>
        <Typography variant="h5" component="div" className='title'>
          Find Your Dream Job Here!
        </Typography>
        <Icon
          className='searchIcon'
          color='warning'
          style={{ 
            fontSize: '40px', 
            animation: `pulseAnimation 1.5s infinite`,
            marginBottom: '20px'
          }}
        >
          <SearchIcon />
        </Icon>
        <div className='inputContainer'>
          <TextField
            label="Enter Skills, Designation, Companies"
            variant="outlined"
            fullWidth
            className='input'
          />
          <TextField
            label="Enter Location"
            variant="outlined"
            fullWidth
            className='input'
          />
        </div>
        <Button
          variant="contained"
          color="warning"
          className='searchButton'
        >
          Search Job
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobSearchCard;
