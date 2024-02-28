import {MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet';
// leaflet.js imports must be in this order!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {memo} from "react";

const defaultZoom = 2;
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;
const fixCORS = 'https://corsproxy.io/?';

const darkStyles = {
  '.leaflet-layer': {
    filter: 'brightness(95%) contrast(92%)',
  },
  '.leaflet-control-zoom-in': {
    filter: 'brightness(95%) contrast(91%)',
  },
  '.leaflet-control-zoom-out': {
    filter: 'brightness(95%) contrast(91%)',
  },
  '.leaflet-control-attribution': {
    filter: 'brightness(95%) contrast(91%)',
  },
  '.leaflet-control-layers': {
    filter: 'brightness(100%) contrast(100%)',
  },
  '.leaflet-container': {
    filter: 'invert(100%) hue-rotate(180deg)',
  }
};

const Map = memo(
  function Map({markers, wheelZoom = false, defaultPosition = [25.50, -7.79], isDarkMode = false}) {
    return <>
      <Box sx={isDarkMode ? darkStyles : {}}>
        <Container>
          <MapContainer center={defaultPosition} zoom={defaultZoom} scrollWheelZoom={wheelZoom}
                        style={{height: '400px', border: '2px solid lightblue', borderRadius: '4px'}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright target="_blank"">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <LayersControl position="topright">
              <LayersControl.Overlay checked name="Markers">
                <LayerGroup>
                  {markers.map((marker, index) => <Marker key={index} position={marker.position}>
                    <Popup>
                      <b>{marker.name}</b>
                      <br/>
                      {marker.description}
                    </Popup>
                  </Marker>)}
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Weather - Temperature">
                <TileLayer
                  attribution='<a href="https://openweathermap.org/" target="_blank">OpenWeather</a>'
                  url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}/>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Weather - Precipitation">
                <TileLayer
                  attribution='<a href="https://openweathermap.org/" target="_blank">OpenWeather</a>'
                  url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`}/>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Weather - Wind speed">
                <TileLayer
                  attribution='<a href="https://openweathermap.org/" target="_blank">OpenWeather</a>'
                  url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${apiKey}`}/>
              </LayersControl.Overlay>
              <LayersControl.Overlay name="Weather - Pressure">
                <TileLayer
                  attribution='<a href="https://openweathermap.org/" target="_blank">OpenWeather</a>'
                  url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${apiKey}`}/>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </Container>
      </Box>
    </>;
  });

export default Map;
