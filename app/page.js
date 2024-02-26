'use client'

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TopAppBar from '../components/TopAppBar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import getTheme from '../getTheme';
import {useEffect, useState} from "react";
import AdvancedTable from "@/components/AdvancedTable";
import {randomId} from "@mui/x-data-grid-generator";
import {Alert, Snackbar} from "@mui/material";
import dynamic from 'next/dynamic'
import {useLocalStorage} from "usehooks-ts";

function serializer(value) {
  if (value === undefined) {
    // Handle potential undefined values
    return null;
  }

  return JSON.stringify(value, (key, value) => {
    if (value instanceof Date) {
      return value.toISOString(); // Convert Dates to ISO strings
    }
    return value; // Leave other values as they are
  });
}

function deserializer(value) {
  if (value === null) {
    // Handle potential null values
    return undefined;
  }

  return JSON.parse(value, (key, value) => {
    if (typeof value === 'string' && isISODateString(value)) {
      return new Date(value); // Convert ISO strings back to Dates
    }
    return value; // Leave other values as they are
  });
}

// Helper function to check for ISO Date strings
function isISODateString(str) {
  // ISO Date validation here (TODO cloud be more robust)
  return /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(\.\d+)?([+-][0-2]\d:[0-5]\d|Z)$/.test(str);
}

// Client Components:
const Map = dynamic(() => import('../components/Map'), { ssr: false })

const initialRows = [
  {id: randomId(), vectorName: 'Aedes aegypti', vectorDate: new Date(), latitude: 11.12, longitude: 7.71, notes: 'Yellow fever vector'},
  {id: randomId(), vectorName: 'Mepraia spinolai', vectorDate: new Date(), latitude: -37.13, longitude: -72.30, notes: 'Chagas disease vector'},
]

export default function Home() {
  const [mode, setMode] = useState('light');
  const theme = createTheme(getTheme(mode));

  // Automatically detect system theme
  useEffect(() => {
    const detectThemePreference = () => {
      setMode(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    };

    detectThemePreference();

    // Set up a theme change listener to update the state when the user changes their system theme setting
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setMode(e.matches ? 'dark' : 'light');

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const [rows, setRows] = useLocalStorage('vbd-rows', initialRows, {
    initializeWithValue: true, serializer: serializer, deserializer: deserializer});
  const [snackbar, setSnackbar] = useState({show: false, message: ''});

  // latitude ranges from -90 to 90 degrees
  const checkLatitude = (params) => {
    const hasError = params.props.value < -90 || params.props.value > 90 || params.props.value === null;
    hasError && setSnackbar({show: true, message: 'Latitude must be between -90 and 90'});
    return { ...params.props, error: hasError };
  }

// longitude ranges from -180 to 180 degrees
  const checkLongitude = (params) => {
    const hasError = params.props.value < -180 || params.props.value > 180 || params.props.value === null;
    hasError && setSnackbar({show: true, message: 'Longitude must be between -180 and 180'});
    return { ...params.props, error: hasError };
  }

  const columns = [
    {field: 'vectorName', headerName: 'Vector name', width: 155, editable: true, cellClassName: 'scientific-name'},
    {field: 'vectorDate', headerName: 'Date', type: 'date', width: 110, editable: true},
    {field: 'latitude', headerName: 'Latitude', type: 'number', width: 100, editable: true, preProcessEditCellProps: checkLatitude},
    {field: 'longitude', headerName: 'Longitude', type: 'number', width: 100, editable: true, preProcessEditCellProps: checkLongitude},
    {field: 'notes', headerName: 'Notes', flex: 1, editable: true},
  ]

  // Transform rows into markersData
  const markersData = rows
    .filter(row => row.latitude != null && row.longitude != null) // Filter rows to include only those with both latitude and longitude
    .map(row => ({
      position: [row.latitude, row.longitude],
      name: `${row.vectorName}`,
      description: row.notes || `This is ${row.vectorName}`, // Providing a default description if notes are empty
    }));


  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNewRows = (newRows) => {
    console.log('new rows', newRows);
    setRows(newRows);
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({...snackbar, show: false});
  };

  // TODO remove
  const validateRow = ([row]) => {
    console.log('VALIDATING', row)
  }

  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <TopAppBar mode={mode} toggleColorMode={toggleColorMode}/>
      <Hero/>
      <AdvancedTable dataColumns={columns} dataRows={rows} onNewRows={handleNewRows} fieldToFocus={'vectorName'}
                     validateRow={validateRow}/>
      <Map markers={markersData} wheelZoom={true}/>
      <Features/>
      <Divider/>
      <FAQ/>
      <Divider/>
      <Footer/>
      <Snackbar open={snackbar.show} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="error" variant="filled" sx={{width: '100%'}}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  </>;
}