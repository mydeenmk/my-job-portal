import { FC } from 'react';
import { Card, CardContent, Typography, Button, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import WorkIcon from '@mui/icons-material/Work';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import '../styles/globals.css';

const JobCard: FC = () => {
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/signin'); // Adjust the route based on your actual sign-in page path
  };

  const handleRegister = () => {
    router.push('/signup'); // Adjust the route based on your actual sign-up page path
  };

  return (
    <Card className='card'>
      <CardContent className='cardContent'>
        <Typography variant="h5" component="div" className='title'>
          <WorkIcon /> Explore Jobs
        </Typography>
        <div className='buttonContainer'>
          <Button 
            variant="outlined" 
            color="warning" 
            startIcon={<LoginIcon />}
            className='button'
            onClick={handleSignIn}
           
          >
            SignIn
          </Button>
         \
          <Button 
            variant="outlined" 
            color="warning" 
            startIcon={<PersonAddIcon />}
            className='button'
            onClick={handleRegister}
           
          >
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
