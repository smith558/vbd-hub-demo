import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import Container from "@mui/material/Container";
import {memo, useState} from "react";
import FileUpload from "@/components/FileUpload";
import Box from "@mui/material/Box";
import {styled} from "@mui/material";

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="240"
        height="200"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

export const demoColumns = [
  {field: 'name', headerName: 'Name', width: 180, editable: true},
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 80,
    align: 'left',
    headerAlign: 'left',
    editable: true,
  },
  {
    field: 'joinDate',
    headerName: 'Join date',
    type: 'date',
    width: 180,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Department',
    width: 220,
    editable: true,
    type: 'singleSelect',
    valueOptions: ['Market', 'Finance', 'Development'],
  }
];

// TODO validation
async function parseJsonResponseWithDates(response) {
  const data = await response.json();

  // Convert vectorDate strings to Date objects
  return data.map(item => {
    if (item.vectorDate) {
      item.vectorDate = new Date(item.vectorDate);
    }
    return item;
  });
}

export const demoRows = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

const EditToolbar = memo(function EditToolbar(props) {
  const {onNewRows, setRowModesModel, fieldToFocus, dataRows} = props;
  const handleAdd = () => {
    const id = randomId();
    onNewRows((oldRows) => [...oldRows, {id, isNew: true}]);
    setRowModesModel((oldModel) => ({
      ...oldModel, [id]: {mode: GridRowModes.Edit, fieldToFocus: fieldToFocus},
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await parseJsonResponseWithDates(response);
        console.log('Processed CSV data:', data);
        // Handle the processed data
        onNewRows([...data, ...dataRows]);  // TODO validation
      } else {
        console.error('Error processing CSV:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading or processing CSV:', error);
    }
  }

  return <>
    <GridToolbarContainer>
      <FileUpload accept={'.csv'} onChange={handleFileChange}/>
      <Button color="primary" startIcon={<AddIcon/>} onClick={handleAdd}>
        Add record
      </Button>
    </GridToolbarContainer>
  </>;
});

const AdvancedTable = memo(
  function AdvancedTable(
    {
      dataRows = demoRows,
      dataColumns = demoColumns,
      showActionsHeader = false,
      onNewRows,
      fieldToFocus,
      validateRow
    }) {
    const [rowModesModel, setRowModesModel] = useState({});


    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };

    const handleEditClick = (id) => () => {
      setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id) => () => {
      setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.View}});
      validateRow(dataRows.filter((r) => r.id === id));
    };

    const handleDeleteClick = (id) => () => {
      const newRows = dataRows.filter((row) => row.id !== id)
      onNewRows(newRows);
    };

    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true},
      });

      const editedRow = dataRows.find((row) => row.id === id);
      if (editedRow.isNew) {
        onNewRows(dataRows.filter((row) => row.id !== id));
      }
    };

    const processRowUpdate = (newRow) => {
      const updatedRow = {...newRow, isNew: false};
      const newRows = dataRows.map((row) => (row.id === newRow.id ? updatedRow : row));

      if (newRow.longitude === undefined) return;

      onNewRows(newRows);
      return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };

    const columns = [...dataColumns, {
      field: 'actions',
      type: 'actions',
      headerName: showActionsHeader ? 'Actions' : '',
      width: 100,
      cellClassName: 'actions',
      getActions: ({id}) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [<GridActionsCellItem
            key={'SaveButton'}
            icon={<SaveIcon/>}
            label="Save"
            sx={{
              color: 'primary.main',
            }}
            onClick={handleSaveClick(id)}
          />, <GridActionsCellItem
            key={'CancelButton'}
            icon={<CancelIcon/>}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />,];
        }

        return [<GridActionsCellItem
          key={'EditButton'}
          icon={<EditIcon/>}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />, <GridActionsCellItem
          key={'DeleteButton'}
          icon={<DeleteIcon/>}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />,];
      },
    },];

    return <>
      <Container sx={{marginBottom: '15px', width: '100%', height: 414.5}}>
        <DataGrid
          autoHeight={false} // turn on and remove `height: 414.5` in case of layout issues
          sx={{'--DataGrid-overlayHeight': '250px'}}
          rows={dataRows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={(e) => console.log('<AdvancadeTable>: ', e)}
          initialState={{
            pagination: {paginationModel: {pageSize: 5}},
          }}
          pageSizeOptions={[5, 10, 25]}
          slots={{
            toolbar: EditToolbar, noRowsOverlay: CustomNoRowsOverlay
          }}
          slotProps={{
            toolbar: {onNewRows, setRowModesModel, fieldToFocus, dataRows},
          }}
        />
      </Container>
    </>;
  });
export default AdvancedTable