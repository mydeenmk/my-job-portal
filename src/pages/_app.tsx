// _app.tsx
import React from 'react';
import { AppProps } from 'next/app';
// import { UserProvider } from '../../src/pages/job/userContext';
import '../styles/globals.css'
const MyApp = ({ Component, pageProps }: AppProps) => (
  
    <Component {...pageProps} />

);

export default MyApp;
