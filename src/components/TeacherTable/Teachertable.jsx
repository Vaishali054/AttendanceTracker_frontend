import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'dept', headerName: 'Department', width: 200 },
  { field: 'designation', headerName: 'Designation', width: 200 },
  { field: 'yearOfJoining', headerName: 'Year of Joining', width: 150 }
];

const rows = [
  { id: 1, name: "John Doe", dept: "Engineering", designation: "Software Engineer", yearOfJoining: 2020 },
  { id: 2, name: "Jane Smith", dept: "Marketing", designation: "Marketing Manager", yearOfJoining: 2018 },
  { id: 3, name: "Alice Johnson", dept: "HR", designation: "HR Specialist", yearOfJoining: 2019 }
];

export default function Teachertable() {
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
  );
}
