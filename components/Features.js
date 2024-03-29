import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import PlaceIcon from '@mui/icons-material/Place';
import {memo, useState} from "react";

const items = [{
  icon: <PlaceIcon/>,
  title: 'Sighting markers',
  description: 'The web application allows you to upload sightings of vectors of diseases and visualize their spread on an interactive map.',
  imageLight: 'url("/map-light.avif")',
  imageDark: 'url("/map-dark.avif")',
}, {
  icon: <CloudIcon/>,
  title: 'Real time weather layers',
  description: 'Try various real time weather layers to draw relationships. We have temperature, precipitation, and more.',
  imageLight: 'url("/weather-light.avif")',
  imageDark: 'url("/weather-dark.avif")',
}, {
  icon: <StorageIcon/>,
  title: 'Browser persistence',
  description: 'Need to take a break? No worries, your data is saved in the browser and will be there when you come back.',
  imageLight: 'url("/table-light.avif")',
  imageDark: 'url("/table-dark.avif")',
}, {
  icon: <UploadFileIcon/>,
  title: 'Bulk upload',
  description: 'Use the bulk upload feature to upload a CSV file with sightings of vectors of diseases and save yourself some valuable time.',
  imageLight: 'url("/csv-light.avif")',
  imageDark: 'url("/csv-dark.avif")',
},];

const Features = memo(function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return <Container id="features" sx={{py: {xs: 8, sm: 16}}}>
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <div>
          <Typography component="h2" variant="h4" color="text.primary">Features</Typography>
          <Typography variant="body1" color="text.secondary" sx={{mb: {xs: 2, sm: 4}}}>
            Upload your sightings of vectors of diseases, visualize their spread on our interactive map,
            and gain crucial insights to guide prevention strategies. Join a community effort to track these vectors and
            protect public health.
          </Typography>
        </div>
        <Grid container item gap={1} sx={{display: {xs: 'auto', sm: 'none'}}}>
          {items.map(({title}, index) =>
            <Chip key={index} label={title} onClick={() => handleItemClick(index)} sx={{borderColor: (theme) => {
                if (theme.palette.mode === 'light') {
                  return selectedItemIndex === index ? 'primary.light' : '';
                }
                return selectedItemIndex === index ? 'primary.light' : '';
              }, background: (theme) => {
                if (theme.palette.mode === 'light') {
                  return selectedItemIndex === index ? 'none' : '';
                }
                return selectedItemIndex === index ? 'none' : '';
              }, backgroundColor: selectedItemIndex === index ? 'primary.main' : '', '& .MuiChip-label': {
                color: selectedItemIndex === index ? '#fff' : '',
              },
            }}
            />)}
        </Grid>
        <Box component={Card} variant="outlined" sx={{display: {xs: 'auto', sm: 'none'}, mt: 4}}>
          <Box
            sx={{
              backgroundImage: (theme) => theme.palette.mode === 'light' ? items[selectedItemIndex].imageLight : items[selectedItemIndex].imageDark,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: 280,
              mb: 2
            }}
          />
          <Box sx={{px: 2, pb: 2}}>
            <Typography color="text.primary" variant="body2" fontWeight="bold">
              {selectedFeature.title}
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{my: 0.5}}>
              {selectedFeature.description}
            </Typography>
          </Box>
        </Box>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          useFlexGap
          sx={{width: '100%', display: {xs: 'none', sm: 'flex'}}}
        >
          {items.map(({icon, title, description}, index) =>
            <Card
              key={index}
              component={Button}
              onClick={() => handleItemClick(index)}
              sx={{
                p: 3,
                height: 'fit-content',
                width: '100%',
                background: 'none',
                backgroundColor: selectedItemIndex === index ? 'action.selected' : undefined,
                borderColor: (theme) => {
                  if (theme.palette.mode === 'light') {
                    return selectedItemIndex === index ? 'primary.light' : 'grey.200';
                  }
                  return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                },
              }}
            >
              <Box sx={{
                width: '100%',
                display: 'flex',
                textAlign: 'left',
                flexDirection: {xs: 'column', md: 'row'},
                alignItems: {md: 'center'},
                gap: 2.5,
              }}
              >
                <Box sx={{color: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index ? 'primary.main' : 'grey.300';
                    }
                    return selectedItemIndex === index ? 'primary.main' : 'grey.700';
                  },
                }}
                >
                  {icon}
                </Box>
                <div>
                  <Typography color="text.primary" variant="body2" fontWeight="bold">
                    {title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" sx={{my: 0.5}}>
                    {description}
                  </Typography>
                </div>
              </Box>
            </Card>)}
        </Stack>
      </Grid>
      <Grid item xs={12} md={6} sx={{display: {xs: 'none', sm: 'flex'}, width: '100%'}}>
        <Card variant="outlined" sx={{
          height: '100%', width: '100%', display: {xs: 'none', sm: 'flex'}, pointerEvents: 'none'
        }}>
          <Box sx={{
            m: 'auto',
            height: '100%',
            width: '100%',
            backgroundSize: 'cover',
            backgroundImage: (theme) => theme.palette.mode === 'light' ? items[selectedItemIndex].imageLight : items[selectedItemIndex].imageDark,
          }}
          />
        </Card>
      </Grid>
    </Grid>
  </Container>;
});

export default Features;
