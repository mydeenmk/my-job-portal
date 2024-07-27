// hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the import path as needed
import { doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const useUserProfile = () => {
  const [profileImage, setProfileImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const fetchUserProfile = async () => {
        try {
          const userDoc = doc(db, 'users', userId);
          const docSnap = await getDoc(userDoc);

          if (docSnap.exists()) {
            setProfileImage(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [userId]);

  return {profileImage, loading };
};

export default useUserProfile;
