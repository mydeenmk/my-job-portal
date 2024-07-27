// lib/firestore.ts
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const addJobPost = async (job: any) => {
  try {
    await addDoc(collection(db, 'jobs'), job);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

const getJobPosts = async () => {
  const q = query(collection(db, 'jobs'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};

const searchJobPosts = async (searchTerm: string) => {
  const q = query(collection(db, 'jobs'), where('title', '>=', searchTerm));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};

export { addJobPost, getJobPosts, searchJobPosts };
