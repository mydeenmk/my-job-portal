import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; 
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Button, TextField, Container, Typography, Snackbar, Link, Dialog, DialogActions, DialogContent, DialogTitle ,InputAdornment, IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import cookie from 'js-cookie';  // Import js-cookie for handling cookies
import '../styles/globals.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false); // State for dialog
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    // Check if the token exists in cookies
    const token = cookie.get('authToken');
    if (token) {
      router.push('/dashboard'); // Redirect to dashboard if token is present
    }
  }, [router]);

  const handleSignIn = async () => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken(); // Get the token
      cookie.set('authToken', token, { expires: 1 }); // Set the token in a cookie
      router.push('/dashboard'); 
    } catch (error) {
      console.error(error);
      setError('Error signing in. Please try again.');
    }
  };

  const handlePasswordReset = async () => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent. Check your inbox!');
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
      setError('Error sending password reset email. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm" className="signin-container" style={{ marginTop: '130px' }}>
      <Typography variant="h4" gutterBottom align="center" className="signin-title">
        <WorkOutlineIcon style={{ marginLeft: '0px' }} />
        Digi Jobs
      </Typography>
      <Typography variant="h5" gutterBottom align="center">
        Sign In
      </Typography>
      <TextField
        label="Email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(prev => !prev)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSignIn}
        style={{ marginTop: '16px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      >
        Sign In
      </Button>

      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Don't have an account?{' '}
        <Link href="/signup" color="secondary">
          Sign Up
        </Link>
      </Typography>

      <Typography variant="body2" align="center" style={{ marginTop: '16px', cursor: 'pointer' }} onClick={() => setOpenDialog(true)}>
        Forgot Password?
      </Typography>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Enter your email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePasswordReset} color="primary">
            Reset Password
          </Button>
        </DialogActions>
      </Dialog>

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

export default SignIn;
