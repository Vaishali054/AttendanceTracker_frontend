import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';

const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'dept', headerName: 'Department', width: 200 },
  { field: 'teacher', headerName: 'Teacher', width: 200 },
  { field: 'degree', headerName: 'Degree', width: 150 },
  { field: 'credits', headerName: 'Credits', width: 150 }
];

const rows = [
    { id: 1, name: "Introduction to Programming", dept: "Computer Science", teacher: "Dr. Alice Brown", degree: "Bachelor's", credits: 4 },
    { id: 2, name: "Data Structures", dept: "Computer Science", teacher: "Dr. John Smith", degree: "Bachelor's", credits: 3 },
    { id: 3, name: "Organic Chemistry", dept: "Chemistry", teacher: "Dr. Sarah Davis", degree: "Bachelor's", credits: 4 },
    { id: 4, name: "Calculus I", dept: "Mathematics", teacher: "Dr. Michael Johnson", degree: "Associate's", credits: 5 },
    { id: 5, name: "Introduction to Sociology", dept: "Sociology", teacher: "Dr. Emily Wilson", degree: "Bachelor's", credits: 3 },
    { id: 6, name: "Modern History", dept: "History", teacher: "Dr. Daniel Lee", degree: "Master's", credits: 3 },
    { id: 7, name: "Psychology 101", dept: "Psychology", teacher: "Dr. Laura Martinez", degree: "Bachelor's", credits: 4 },
    { id: 8, name: "Physics for Engineers", dept: "Physics", teacher: "Dr. James Taylor", degree: "Bachelor's", credits: 5 },
    { id: 9, name: "Financial Accounting", dept: "Business", teacher: "Dr. Karen Roberts", degree: "Bachelor's", credits: 3 },
    { id: 10, name: "Introduction to Philosophy", dept: "Philosophy", teacher: "Dr. Richard Lewis", degree: "Bachelor's", credits: 3 }
  ];
  

export default function Subjecttable() {
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
      <Paper sx={{ height: '100%', width: '62%' }}>
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
