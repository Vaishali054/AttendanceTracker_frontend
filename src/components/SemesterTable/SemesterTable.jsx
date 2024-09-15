import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, Box, Paper } from '@mui/material';
import SemesterForm from '../SemesterForm/SemesterForm';

const SemesterTable = () => {
  const [rows, setRows] = useState([
    { id: 1, degree: 'B.Sc. Computer Science', semester: '6th Semester', department: 'Computer Science', numStudents: 30 },
    { id: 2, degree: 'M.Sc. Computer Science', semester: '2nd Semester', department: 'Computer Science', numStudents: 25 },
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
    { field: 'degree', headerName: 'Degree', width: 200 },
    { field: 'semester', headerName: 'Semester', width: 150 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'numStudents', headerName: 'No. of Students', width: 200 },
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
          width: '100%',
          marginLeft: '80px'
        }}
      >
        <Paper sx={{ height: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </Paper>
      </Box>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogContent>
          {selectedRow && (
            <SemesterForm
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
};

export default SemesterTable;
