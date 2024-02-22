import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
// leaflet.js imports must be in this order!
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import Box from "@mui/material/Box";

const defaultPosition = [51.505, -0.09];
const defaultZoom = 13;

const Map = ({markers, wheelZoom = false}) => {
  return <>
    <Box sx={{border: '2px solid lightblue', borderRadius: '4px'}}>
      <MapContainer center={defaultPosition} zoom={defaultZoom} scrollWheelZoom={wheelZoom} style={{height: '400px'}}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => <Marker key={index} position={marker.position}>
          <Popup>
            <b>{marker.name}</b>
            <br/>
            {marker.description}
          </Popup>
        </Marker>)}
      </MapContainer>
    </Box>
  </>;
};

export default Map;
