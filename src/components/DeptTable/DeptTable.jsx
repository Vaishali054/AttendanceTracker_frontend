import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import DepartmentForm from '../DepartmentForm/DeaprtmentForm';

export default function Depttable() {
  const [rows, setRows] = useState([
    { id: 1, name: "Computer Science", noOfFaculty: 25, degreesOffered: ["B.Sc", "M.Sc", "Ph.D"] },
    { id: 2, name: "Mechanical Engineering", noOfFaculty: 30, degreesOffered: ["B.Tech", "M.Tech"] },
    { id: 3, name: "Physics", noOfFaculty: 15, degreesOffered: ["B.Sc", "M.Sc"] },
    { id: 4, name: "Mathematics", noOfFaculty: 20, degreesOffered: ["B.Sc", "M.Sc", "Ph.D"] },
    { id: 5, name: "Chemistry", noOfFaculty: 18, degreesOffered: ["B.Sc", "M.Sc", "Ph.D"] }
  ]);

  const [selectedRow, setSelectedRow] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const handleEditClick = (row) => {
    console.log(row);
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
    { field: 'noOfFaculty', headerName: 'No. of Faculty', width: 200 },
    { 
      field: 'degreesOffered', 
      headerName: 'Degrees Offered', 
      width: 300,
      renderCell: (params) => (
        <div>
          {params.value.join(', ')}
        </div>
      )
    },
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
        <Paper sx={{ height: '100%'}}>
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
            <DepartmentForm
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
