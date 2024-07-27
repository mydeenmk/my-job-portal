// components/SignUp.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Button, TextField, Container, Typography} from '@material-ui/core';

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
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
      {/* {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>} */}
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
        style={{ marginTop: '16px' }}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default SignUp;
