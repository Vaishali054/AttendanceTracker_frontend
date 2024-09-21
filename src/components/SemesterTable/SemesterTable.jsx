import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, Box, Paper } from '@mui/material';
import SemesterForm from '../SemesterForm/SemesterForm';
import { getSemesters } from '../../api/fetchcmds';

const SemesterTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const data = await getSemesters();
        const rowsWithCustomId = data.semesters.map((semester) => ({
          id: semester._id,
          degree: semester.degree.degree, 
          semester: semester.semester,
          department: semester.department.department,
          totalStudents: semester.totalStudents
        }));
        setRows(rowsWithCustomId);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDegrees();
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
    { field: 'degree', headerName: 'Degree', width: 200 },
    { field: 'semester', headerName: 'Semester', width: 150 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'totalStudents', headerName: 'No. of Students', width: 200 },
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
