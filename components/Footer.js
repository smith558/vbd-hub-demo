import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const logoStyle = {
  width: '140px', height: 'auto',
};

function Copyright() {
  return <>
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'Copyright © '}
      <Link href="https://stanislav.gq/">Stanley&nbsp;</Link>
      {new Date().getFullYear()}
    </Typography>
  </>;
}

export default function Footer() {
  return <>
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: {xs: 4, sm: 8},
        py: {xs: 8, sm: 10},
        textAlign: {sm: 'center', md: 'left'},
      }}
    >
      <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
        <div>
          <Link color="text.secondary" href="#">Privacy Policy</Link>
          <Typography display="inline" sx={{mx: 0.5, opacity: 0.5}}>&nbsp;•&nbsp;</Typography>
          <Link color="text.secondary" href='#'>Terms of Service</Link>
          <Copyright/>
        </div>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={1}
          useFlexGap
          sx={{color: 'text.secondary'}}
        >
          <IconButton
            color="inherit"
            href="https://github.com/smith558"
            aria-label="GitHub"
            sx={{alignSelf: 'center'}}
          >
            <FacebookIcon/>
          </IconButton>
          <IconButton
            color="inherit"
            href="https://www.linkedin.com/in/stanislav-modrak/"
            aria-label="LinkedIn"
            sx={{alignSelf: 'center'}}
          >
            <LinkedInIcon/>
          </IconButton>
        </Stack>
      </Box>
    </Container>
  </>;
}
