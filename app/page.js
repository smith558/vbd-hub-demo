'use client'

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import getTheme from '../getTheme';
import {useState} from "react";

export default function Home() {
  const [mode, setMode] = useState('light');
  const theme = createTheme(getTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode}/>
      <Hero/>
      <Box sx={{bgcolor: 'background.default'}}>
        <Features/>
        <Divider/>
        <FAQ/>
        <Divider/>
        <Footer/>
      </Box>
    </ThemeProvider>
  </>;
}