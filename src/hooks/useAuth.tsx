// hooks/useAuth.tsx
import { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return { user };
};

export { useAuth };
