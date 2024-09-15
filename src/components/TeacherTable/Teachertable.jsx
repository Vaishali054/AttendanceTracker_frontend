import React,{useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper,Button, Dialog, DialogActions, DialogContent} from '@mui/material';
import TeacherForm from '../TeacherFrom/TeacherForm';

export default function Teachertable() {
  const [rows, setRows] = useState([
    { id: 1, name: "John Doe", department: "Engineering", designation: "Software Engineer", yearOfJoining: 2020 },
    { id: 2, name: "Jane Smith", department: "Marketing", designation: "Marketing Manager", yearOfJoining: 2018 },
    { id: 3, name: "Alice Johnson", department: "HR", designation: "HR Specialist", yearOfJoining: 2019 }
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleEditClick = (row) => {
    setSelectedRow(row); 
    setOpenEditDialog(true); 
  };

  const handleFormSubmit = (updatedData) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row.id === updatedData.id ? updatedData : row))
    );
    setOpenEditDialog(false); 
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'designation', headerName: 'Designation', width: 200 },
    { field: 'yearOfJoining', headerName: 'Year of Joining', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEditClick(params.row)}
        >
          Edit
        </Button>
      ),
    },
  ];
  return (
    <>
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
        width: '100%'
      }}
      >
      <Paper sx={{ height: 400, width: '70%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          />
      </Paper>
    </Box>
    <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogContent>
          {selectedRow && (
            <TeacherForm
              edit={true}
              initialData={selectedRow}
              onSubmit={handleFormSubmit}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
