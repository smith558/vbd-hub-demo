import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {memo, useState} from "react";

const FAQ = memo(function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return <>
    <Container id="faq" sx={{
      pt: {xs: 4, sm: 12},
      pb: {xs: 8, sm: 16},
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: {xs: 3, sm: 6},
    }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{width: {sm: '100%', md: '60%'}, textAlign: {sm: 'left', md: 'center'}}}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{width: '100%'}}>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1d-content" id="panel1d-header">
            <Typography component="h3" variant="subtitle2">
              How do I get support if I have a question or issue?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom sx={{maxWidth: {sm: '100%', md: '70%'}}}>
              You can reach our support team by emailing <Link
              href='mailto:stanislav@vectorhub.bio'>stanislav@vectorhub.bio</Link> or getting help at our <Link
              href='https://discourse.org'>VBD Hub Community</Link>. We&apos;re happy to assist you promptly.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel2d-content" id="panel2d-header">
            <Typography component="h3" variant="subtitle2">
              Why should I care about vector borne diseases?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom sx={{maxWidth: {sm: '100%', md: '70%'}}}>
              <strong>Vector borne diseases</strong> (<strong>VBDs</strong>) are a significant global health concern, transmitted by vectors like
              mosquitoes, ticks, and fleas. You should care because these diseases are expanding due to global travel
              and climate change, affecting millions worldwide. Understanding and taking preventative measures against
              VBDs can protect you, your family, and your community from illness, reduce healthcare costs, and improve
              quality of life. Awareness and action are key to controlling these diseases and ensuring global health
              security.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel3d-content" id="panel3d-header">
            <Typography component="h3" variant="subtitle2">
              What is an accepted file format for uploading data to the map?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom sx={{maxWidth: {sm: '100%', md: '70%'}}}>
              The <strong>&quot;Upload file&quot;</strong> functionality of the table
              supports <strong>CSV</strong> files.
              The file upload dialog should only allow uploading files with this extension. Upon uploading a file, the
              file is sent
              to a server where it is processed and the data is added to the map. The server tries to parse as much of
              the CSV as possible and skip broken lines. The feature is currently limited to process <strong>at most 50 rows</strong> in
              any given file.
              <br/>
              <br/>
              The CSV file should have the following row format: [vectorName],[vectorDate],latitude,longitude,[notes].
              The date should be in the <Link href="https://www.w3.org/TR/NOTE-datetime">ISO 8601 format</Link>. The
              latitude and longitude are the only <strong>required</strong> columns. The
              header row is <strong>required</strong> too. Please make sure the CSV is correctly formatted.
              <br/>
              <br/>
              <span style={{fontFamily: 'Courier New'}}>
                vectorName,vectorDate,latitude,longitude,notes<br/>
                Aedes aegypti,Sun Feb 25 2020 20:58:13,-37,-75,Yellow fever vector<br/>
                Mepraia spinolai,Sun Feb 25 2024 20:58:13,-25,10,Chagas disease vector<br/>
                Ixodes scapularis,Sun Feb 10 2024 10:58:13,-37,-05,
              </span>
              <br/>
              <br/>
              An <Link href='/example.csv'>example file</Link> is available for download here.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle2">
              What is this all about?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom sx={{maxWidth: {sm: '100%', md: '70%'}}}>
              This website is all about empowering you to fight disease vectors. Upload your sightings of these
              organisms, visualize their spread on our interactive map, and gain crucial insights to guide prevention
              strategies. Join a community effort to track these vectors and protect public health.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  </>;
});

export default FAQ;