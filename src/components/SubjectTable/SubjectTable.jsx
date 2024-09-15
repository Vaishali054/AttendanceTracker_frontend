import React,{useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper, Button, Dialog, DialogActions, DialogContent  } from '@mui/material';
import SubjectForm from '../SubjectForm/SubjectForm';

export default function Subjecttable() {
  const [rows, setRows] = useState([
    { id: 1, name: "Introduction to Programming", department: "Computer Science", teacher: "Dr. Alice Brown", degree: "Bachelor's", credits: 4,semester: 5 },
    { id: 2, name: "Data Structures", department: "Computer Science", teacher: "Dr. John Smith", degree: "Bachelor's", credits: 3 ,semester: 5},
    { id: 3, name: "Organic Chemistry", department: "Chemistry", teacher: "Dr. Sarah Davis", degree: "Bachelor's", credits: 4,semester: 5 },
    { id: 4, name: "Calculus I", department: "Mathematics", teacher: "Dr. Michael Johnson", degree: "Associate's", credits: 5 ,semester: 5},
    { id: 5, name: "Introduction to Sociology", department: "Sociology", teacher: "Dr. Emily Wilson", degree: "Bachelor's", credits: 3 ,semester: 5},
    { id: 6, name: "Modern History", department: "History", teacher: "Dr. Daniel Lee", degree: "Master's", credits: 3 ,semester: 5},
    { id: 7, name: "Psychology 101", department: "Psychology", teacher: "Dr. Laura Martinez", degree: "Bachelor's", credits: 4 ,semester: 5},
    { id: 8, name: "Physics for Engineers", department: "Physics", teacher: "Dr. James Taylor", degree: "Bachelor's", credits: 5,semester: 5 },
    { id: 9, name: "Financial Accounting", department: "Business", teacher: "Dr. Karen Roberts", degree: "Bachelor's", credits: 3 ,semester: 5},
    { id: 10, name: "Introduction to Philosophy", department: "Philosophy", teacher: "Dr. Richard Lewis", degree: "Bachelor's", credits: 3,semester: 5 }
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
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'teacher', headerName: 'Teacher', width: 200 },
    { field: 'degree', headerName: 'Degree', width: 150 },
    { field: 'credits', headerName: 'Credits', width: 150 },
    { field: 'semester', headerName: 'Semester', width: 150 },
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
        marginTop: '50px',
        width: '100%',
        marginLeft:'100px',
        justifyContent:'center'
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
            <SubjectForm
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
