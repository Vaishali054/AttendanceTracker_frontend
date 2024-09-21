import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import DepartmentForm from '../DepartmentForm/DeaprtmentForm';
import { getDepartments } from '../../api/fetchcmds';

export default function Depttable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        const rowsWithCustomId = data.map((department) => ({
          id: department._id,
          department: department.department, 
          degreeOffered: department.degreeOffered, 
          totalfaculty: department.totalfaculty,
        }));
        setRows(rowsWithCustomId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, []);

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
    { field: 'department', headerName: 'Name', width: 200 },
    { field: 'totalfaculty', headerName: 'No. of Faculty', width: 200 },
    {
      field: 'degreeOffered',
      headerName: 'Degrees Offered',
      width: 300,
      renderCell: (params) => (
        <div>
          {params.value.map((degree) => degree.degree).join(', ')}
        </div>
      ),
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
          width: '100%',
        }}
      >
        <Paper sx={{ height: '100%' }}>
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
