import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

// Define the columns for the data grid
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'vectorName',
    headerName: 'Vector Name',
    width: 150,
    editable: true,
  },
  {
    field: 'vectorDescription',
    headerName: 'Vector Description',
    width: 250, // Increased width for descriptions
    editable: true,
  },
  {
    field: 'mapLocation',
    headerName: 'Map Location',
    width: 150,
    editable: true,
  }
];

// Define the rows with the new data structure for vector sightings
const rows = [
  { id: 1, vectorName: 'Aedes aegypti', vectorDescription: 'Mosquito that can spread dengue, chikungunya, Zika fever, and yellow fever viruses.', mapLocation: 'Tropical' },
  { id: 2, vectorName: 'Anopheles', vectorDescription: 'Genus of mosquitoes transmitting malaria.', mapLocation: 'Sub-Saharan Africa' },
  { id: 3, vectorName: 'Ixodes scapularis', vectorDescription: 'Deer tick, spreads Lyme disease.', mapLocation: 'North America' },
  { id: 4, vectorName: 'Rattus rattus', vectorDescription: 'Black rat, known for spreading the bubonic plague.', mapLocation: 'Worldwide' },
  { id: 5, vectorName: 'Aedes albopictus', vectorDescription: 'Asian tiger mosquito, known for spreading dengue fever, chikungunya, and Zika virus.', mapLocation: 'Tropical and Subtropical' }
];

export default function VectorSightingGrid() {
  return (<Box sx={{height: 400, width: '100%'}}>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>);
}