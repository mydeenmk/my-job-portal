import { FC } from 'react';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import '../styles/globals.css';

const ProfileCard: FC = () => {
  return (
    <Card className='profileCard'>
      <CardContent>
        <div className='profileInfo'>
          <CircularProgress variant="determinate" value={45} className='progress' />
          <div>
            <Typography variant="h6">Your profile</Typography>
            <Typography variant="body2">Updated 6m ago</Typography>
            <Typography variant="body2" color="primary">8 pending actions</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
