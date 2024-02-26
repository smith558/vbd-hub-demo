import Box from '@mui/material/Box';
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

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

export const demoColumns = [
  { field: 'name', headerName: 'Name', width: 180, editable: true },
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
    })
  {
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
      <Box sx={{width: '100%', height: 413, marginBottom: 5}}>
        <Container>
          <DataGrid
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
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: {onNewRows, setRowModesModel, fieldToFocus, dataRows},
            }}
          />
        </Container>
      </Box>
    </>;
  });
export default AdvancedTable