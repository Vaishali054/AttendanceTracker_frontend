import React, { useState,useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, Box, Paper} from '@mui/material';
import DegreeForm from '../DegreeForm/DegreeForm';
import {getDegrees} from '../../api/fetchcmds';

const DegreeTable = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const data = await getDegrees();
        const rowsWithCustomId = data.degrees.map((degree) => ({
          id: degree._id,
          degree: degree.degree, 
          totalSemester: degree.totalSemester,
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
    { field: 'degree', headerName: 'Degree Name', width: 200 },
    { field: 'totalSemester', headerName: 'No. of sems', width: 200 },
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
      <Paper sx={{ height: '100%', width: '57%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
      </Paper>
    </Box>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogContent>
          {selectedRow && (
            <DegreeForm
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

export default DegreeTable;
