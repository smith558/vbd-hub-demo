import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import Container from "@mui/material/Container";

export default function VectorGrid({columns, rows}) {
  return <>
    <Box sx={{width: '100%', height: 400}}>
      <Container>
        <DataGrid rows={rows} columns={columns} initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }} pageSize={5} rowsPerPageOptions={[5]} checkboxSelection disableRowSelectionOnClick
        />
      </Container>
    </Box>
  </>;
}