// components/JobAds.tsx
import { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const JobAds: FC = () => {
  const jobAds = [
    { title: 'Software Engineer', company: 'Tech Corp', description: 'Full-time, Remote' },
    { title: 'Product Manager', company: 'Biz Solutions', description: 'Full-time, On-site' },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginLeft:'40px', width:'400px' }}>
      {jobAds.map((job, index) => (
        <Card key={index} style={{ width: '350px' }}>
          <CardContent>
            <Typography variant="h5">{job.title}</Typography>
            <Typography variant="subtitle1">{job.company}</Typography>
            <Typography variant="body2">{job.description}</Typography>
          </CardContent>
        </Card>
      ))}
     
    </div>
  );
};

export default JobAds;
