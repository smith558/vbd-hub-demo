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

function EditToolbar(props) {
  const {setRows, setRowModesModel, fieldToFocus} = props;
  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, {id, isNew: true}]);
    setRowModesModel((oldModel) => ({
      ...oldModel, [id]: {mode: GridRowModes.Edit, fieldToFocus: fieldToFocus},
    }));
  };

  return <>
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon/>} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  </>;
}

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
    const [rows, setRows] = useState(dataRows);


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
      validateRow(rows.filter((r) => r.id === id));
    };

    const handleDeleteClick = (id) => () => {
      const newRows = rows.filter((row) => row.id !== id)
      setRows(newRows);
      onNewRows(newRows);
    };

    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel, [id]: {mode: GridRowModes.View, ignoreModifications: true},
      });

      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };

    const processRowUpdate = (newRow) => {
      const updatedRow = {...newRow, isNew: false};
      const newRows = rows.map((row) => (row.id === newRow.id ? updatedRow : row));

      if (newRow.longitude === undefined) return;

      setRows(newRows);
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
      <Box sx={{width: '100%'}}>
        <Container>
          <DataGrid
            rows={rows}
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
            // autoPageSize={false}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: {setRows, setRowModesModel, fieldToFocus},
            }}
          />
        </Container>
      </Box>
    </>;
  });
export default AdvancedTable