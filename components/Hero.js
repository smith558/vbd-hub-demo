import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Map from "@/components/Map";

export default function Hero() {
  const markersData = [{
    position: [51.505, -0.09], name: 'Marker 1', description: 'This is the first marker'
  }, {position: [51.48, -0.1], name: 'Marker 2', description: 'Another interesting place'}];

  return <>
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage: theme.palette.mode === 'light' ? 'linear-gradient(180deg, #CEE5FD, #FFF)' : 'linear-gradient(#02294F, #090E10)',
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', pt: {xs: 14, sm: 20}, pb: {xs: 8, sm: 12}
        }}>
        <Stack spacing={2} useFlexGap sx={{width: {xs: '100%', sm: '70%'}}}>
          <Typography component="h1" variant="h1" sx={{
            display: 'flex', flexDirection: {xs: 'column', md: 'row'}, alignSelf: 'center', textAlign: 'center'
          }}
          >
            The&nbsp;
            <Typography component="span" variant="h1"
                        sx={{color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light'}}>
              VBD
            </Typography>
            &nbsp;Hub
          </Typography>
          <Typography variant="body1" textAlign="center" color="text.secondary">
            Explore our cutting-edge dashboard, delivering high-quality solutions tailored to your needs. <br/>
            Elevate your experience with top-tier features and services.
          </Typography>
          <Map markers={markersData}/>
          <Typography variant="caption" textAlign="center" sx={{opacity: 0.8}}>
            By &quot;adding coordinates&quot; you agree to our&nbsp;<Link href="#" color="primary">Terms &
            Conditions</Link>.
          </Typography>
        </Stack>
      </Container>
    </Box>
  </>;
}
