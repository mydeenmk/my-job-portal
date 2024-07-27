// EditProfile.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db, storage } from '../../firebaseConfig';
import { doc, getDoc, setDoc,updateDoc  } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Container, TextField, Button, Typography, IconButton, Avatar } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { BottomNavigation, BottomNavigationAction, } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import ExploreIcon from '@material-ui/icons/Explore';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import SearchIcon from '@material-ui/icons/Search'
const EditProfile: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    lastOrganization: '',
    workExperience: '',
    collegePassedOut: '',
    profileImage: ''
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserData(userSnap.data());
        setPreviewImage(userSnap.data().profileImage || '');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
  
      try {  
          if (!user || !user.uid) {
        throw new Error('User UID is not available');
      }
        // Upload file to Firebase Storage
        const storageRef = ref(storage, `users/${user?.uid}/profileImage`);
        await uploadBytes(storageRef, file);
  
        // Get file URL
        const url = await getDownloadURL(storageRef);
  
        // Update userData with the new profile image URL
        setUserData((prevData: any) => ({ ...prevData, profileImage: url }));
  
        // Update Firestore document
      
          const userDocRef = doc(db, 'users', user.uid);
          await updateDoc(userDocRef, { profileImage: url });
       
      } catch (error) {
        console.error('Error uploading image or updating Firestore:', error);
      }
    }
  };
  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = async () => {
    if (user) {
      try {
        let profileImageURL = userData.profileImage;
        if (imageFile) {
          const imageRef = ref(storage, `profile_images/${user.uid}/${imageFile.name}`);
          await uploadBytes(imageRef, imageFile);
          profileImageURL = await getDownloadURL(imageRef);
        }

        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { ...userData, profileImage: profileImageURL }, { merge: true });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          router.push('/userprofile');
        }, 2000);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>Loading...</Typography>
      </div>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom style={{textAlign:'center', marginTop:'10px', marginBottom:'10px'}}>Edit Profile</Typography>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
      <Avatar
  alt={userData.fullName || 'User'}
  src={userData.profileImage || '/job.jpg'} // Default image if no profile image
  style={{ width: 100, height: 100 }}
/>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="icon-button-file"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <PhotoCameraIcon />
          </IconButton>
        </label>
      </div>

      <TextField
        label="Full Name"
        name="fullName"
        fullWidth
        value={userData.fullName}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        fullWidth
        value={userData.email}
        onChange={handleInputChange}
        margin="normal"
        disabled
      />
      <TextField
        label="Phone"
        name="phone"
        fullWidth
        value={userData.phone}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Date of Birth"
        name="dateOfBirth"
        fullWidth
        value={userData.dateOfBirth}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Last Organization"
        name="lastOrganization"
        fullWidth
        value={userData.lastOrganization}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Work Experience"
        name="workExperience"
        fullWidth
        value={userData.workExperience}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="College Passed Out"
        name="collegePassedOut"
        fullWidth
        value={userData.collegePassedOut}
        onChange={handleInputChange}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSave}
        style={{ marginTop: '16px' }}
      >
        Save
      </Button>
      {success && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}>
          <CheckCircleOutlineIcon style={{ fontSize: '80px', color: 'green',marginTop:'15px' }} />
          <Typography variant="h6">Done</Typography>
        </div>
      )}
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
        style={{ width: '100%', position: 'fixed', bottom: 0, left: 0 }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} value="home" />
        <BottomNavigationAction label="Explore" icon={<ExploreIcon />} value="explore" />
        <BottomNavigationAction label="News" icon={<AnnouncementIcon />} value="news" />
        <BottomNavigationAction label="Search" icon={<SearchIcon />} value="profile" />
      </BottomNavigation>
    </Container>
  );
};

export default EditProfile;
