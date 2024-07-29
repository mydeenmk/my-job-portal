// // pages/index.tsx
// import React, { useState, useEffect } from 'react';
// import { db } from '../../firebaseConfig';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import Layout from '../components/Layout';

// const HomePage: React.FC = () => {
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [search, setSearch] = useState('');
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     const fetchJobs = async () => {
//       const q = query(collection(db, 'jobs'), where('title', '>=', search), where('company', '>=', filter));
//       const querySnapshot = await getDocs(q);
//       setJobs(querySnapshot.docs.map(doc => doc.data()));
//     };

//     fetchJobs();
//   }, [search, filter]);

//   return (
//     <Layout>
//       <input
//         type="text"
//         placeholder="Search jobs"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         style={{ margin: '20px', padding: '10px', width: '80%' }}
//       />
//       <input
//         type="text"
//         placeholder="Filter by company"
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         style={{ margin: '20px', padding: '10px', width: '80%' }}
//       />
//       <div>
//         {jobs.map((job, index) => (
//           <div key={index} style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>
//             <h2>{job.title}</h2>
//             <p>{job.company}</p>
//             <button>Apply</button>
//           </div>
//         ))}
//       </div>
//     </Layout>
//   );
// };

// export default  HomePage;
// pages/index.tsx
import React from 'react';
import '../styles/globals.css';
import SignInPage from './signin';
import jobportal from './jobportal';
import Jobportal from './jobportal';
const Home: React.FC = () => {
  
  return (
    <>
     
        <>
          <Jobportal/>
         
        </>
       
     {/* <HomePage/> */}
    </>
  );
};

export default Home;

