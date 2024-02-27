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
              You can reach our support team by emailing <Link href='mailto:stanislav@vbd.bio'>stanislav@vbd.bio</Link>
              &nbsp;or getting help at our <Link href='https://discourse.org'>VBD Hub Community</Link>.
              We&apos;re happy to assist you promptly.
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
              Vector borne diseases (VBDs) are a significant global health concern, transmitted by vectors like
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
              Our product distinguishes itself through its adaptability, durability,
              and innovative features. We prioritize user satisfaction and
              continually strive to exceed expectations in every aspect.
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
              Is there a warranty on the product, and what does it cover?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" gutterBottom sx={{maxWidth: {sm: '100%', md: '70%'}}}>
              Yes, our product comes with a [length of warranty] warranty. It covers
              defects in materials and workmanship. If you encounter any issues
              covered by the warranty, please contact our customer support for
              assistance.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  </>;
});

export default FAQ;