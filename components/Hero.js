import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {memo} from "react";

const Hero = memo(function Hero() {
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
            Join the <Typography sx={{color: (theme) => theme.palette.mode === 'light' ? 'primary.main' : 'primary.light'}} component="span">collaborative fight against and research of disease vectors</Typography>. Our mapping platform empowers you to share
            sightings, analyze patterns, and drive impactful prevention strategies. Start by adding a vector sighting with its <em>latitude</em> and <em>longitude</em> coordinates.
          </Typography>
        </Stack>
      </Container>
    </Box>
  </>;
});

export default Hero;