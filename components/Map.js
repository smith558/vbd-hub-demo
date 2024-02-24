import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
// leaflet.js imports must be in this order!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const defaultZoom = 2;

const Map = ({markers, wheelZoom = false, defaultPosition = [25.50, -7.79]}) => {
  return <>
    <Box>
      <Container>
        <MapContainer center={defaultPosition} zoom={defaultZoom} scrollWheelZoom={wheelZoom}
                      style={{height: '400px', border: '2px solid lightblue', borderRadius: '4px'}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {markers.map((marker, index) => <Marker key={index} position={marker.position}>
            <Popup>
              <b>{marker.name}</b>
              <br/>
              {marker.description}
            </Popup>
          </Marker>)}
        </MapContainer>
      </Container>
    </Box>
  </>;
};

export default Map;
