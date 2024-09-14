import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';

const columns = [
    { field: 'name', headerName: 'Degree Name', width: 200 },
    { field: 'semester_count', headerName: 'No. of sems', width: 200 },
  ];

  const rows = [
    { id: 1, name: "Computer Science", semester_count: 8 },
    { id: 2, name: "Mechanical Engineering", semester_count: 8 },
    { id: 3, name: "Physics", semester_count: 6 },
    { id: 4, name: "Mathematics", semester_count: 6 },
    { id: 5, name: "Chemistry", semester_count: 6 },
  ];
  

export default function Degreetable() {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px',
        width: '100%'
      }}
    >
      <Paper sx={{ height: '100%', width: '30%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Paper>
    </Box>
  );
}
