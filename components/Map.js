import {MapContainer, TileLayer, Marker, Popup, LayersControl, LayerGroup} from 'react-leaflet';
// leaflet.js imports must be in this order!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const defaultZoom = 2;
const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;
const fixCORS = 'https://corsproxy.io/?';

const Map = ({markers, wheelZoom = false, defaultPosition = [25.50, -7.79]}) => {
  return <>
    <Box>
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
            <LayersControl.Overlay checked name="Weather - Wind speed">
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
};

export default Map;
