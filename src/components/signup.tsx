import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Button, TextField, Container, Typography, Snackbar,Link } from '@mui/material';
import Alert from '@mui/material/Alert';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import '../styles/globals.css';
import nookies from 'nookies';
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter(); // Hook for navigation

  const handleSignUp = async () => {
    setError(null);
    setSuccess(null);

    if (!email || !password || !name || !phone) {
      setError('All fields are required.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        phone,
        role: 'user', // default role
      });
      
      setSuccess('Signed up successfully!');
      setTimeout(() => {
        router.push('/signin'); // Navigate to sign-in page
      }, 1000); // Add a short delay to show success message
    } catch (error) {
      console.error(error);
      setError('Error signing up. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="signup-container" style={{marginTop:'130px'}}>
      <Typography variant="h4" gutterBottom align="center" className="signup-title">
        <WorkOutlineIcon style={{ marginLeft: '120px' }} />
        Digi Jobs
      </Typography>
      <Typography variant="h5" gutterBottom align="center">
        Sign Up
      </Typography>
      <TextField
        label="Name"
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Phone"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSignUp}
        style={{ marginTop: '16px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Sign Up
      </Button>

      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Already have an account?{' '}
        <Link href="/signin" color="secondary">
          Sign In
        </Link>
      </Typography>

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <Snackbar 
        open={!!success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess(null)}
      >
        <Alert onClose={() => setSuccess(null)} severity="success">
          {success}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
