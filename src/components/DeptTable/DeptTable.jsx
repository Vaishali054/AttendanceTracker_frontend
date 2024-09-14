import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';

const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'faculty_count', headerName: 'No. of faculty', width: 200 },
    { 
      field: 'degrees', 
      headerName: 'Degrees offered', 
      width: 300,
      renderCell: (params) => (
        <div>
          {params.value.join(', ')}
        </div>
      )
    },
  ];

  const rows = [
    { id: 1, name: "Computer Science", faculty_count: 25, degrees: ["B.Sc", "M.Sc", "Ph.D"] },
    { id: 2, name: "Mechanical Engineering", faculty_count: 30, degrees: ["B.Tech", "M.Tech"] },
    { id: 3, name: "Physics", faculty_count: 15, degrees: ["B.Sc", "M.Sc"] },
    { id: 4, name: "Mathematics", faculty_count: 20, degrees: ["B.Sc", "M.Sc", "Ph.D"] },
    { id: 5, name: "Chemistry", faculty_count: 18, degrees: ["B.Sc", "M.Sc", "Ph.D"] }
  ];

export default function Depttable() {
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
      <Paper sx={{ height: '100%', width: '57%' }}>
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
