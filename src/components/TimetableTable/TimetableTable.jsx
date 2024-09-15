import React, { useState } from 'react';
import { Box, Paper, Button, Dialog, DialogActions, DialogContent, TextField, MenuItem, Grid, Typography, IconButton } from '@mui/material';
import TimeTableForm from '../TimeTableForm/TimeTableForm';
import DeleteIcon from '@mui/icons-material/Delete';

const timetableData = [
  { id: 1, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Monday', time: '10:00 AM - 11:00 AM', subject: 'Algorithms' },
  { id: 2, department: 'Marketing', degree: 'B.Com.', semester: '2nd Semester', day: 'Tuesday', time: '11:00 AM - 12:00 PM', subject: 'Marketing Principles' },
  { id: 3, department: 'HR', degree: 'MBA', semester: '1st Semester', day: 'Wednesday', time: '01:00 PM - 02:00 PM', subject: 'Human Resource Management' },
  { id: 1, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Monday', time: '08:00 AM - 09:00 AM', subject: 'Data Structures' },
  { id: 2, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Monday', time: '09:00 AM - 10:00 AM', subject: 'Algorithms' },
  { id: 3, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Tuesday', time: '10:00 AM - 11:00 AM', subject: 'Operating Systems' },
  { id: 4, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Tuesday', time: '11:00 AM - 12:00 PM', subject: 'Database Systems' },
  { id: 5, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Wednesday', time: '01:00 PM - 02:00 PM', subject: 'Computer Networks' },
  { id: 6, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Wednesday', time: '02:00 PM - 03:00 PM', subject: 'Software Engineering' },
  { id: 7, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Thursday', time: '03:00 PM - 04:00 PM', subject: 'Web Development' },
  { id: 8, department: 'Engineering', degree: 'B.Sc.', semester: '6th Semester', day: 'Friday', time: '09:00 AM - 10:00 AM', subject: 'Machine Learning' }
];

export default function TimetableTable() {
  const [rows, setRows] = useState(timetableData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [degreeFilter, setDegreeFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');

  const handleOpenDialog = (mode, row = null, timeSlot = null) => {
    setDialogMode(mode);
    setSelectedRow(row);
    setSelectedTimeSlot(timeSlot);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
    setSelectedTimeSlot(null);
  };

  const handleFormSubmit = (updatedData) => {
    if (dialogMode === 'add') {
      setRows([...rows, { ...updatedData, id: rows.length + 1 }]);
    } else if (dialogMode === 'edit') {
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedData.id ? updatedData : row))
      );
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (name === 'department') setDepartmentFilter(value);
    if (name === 'degree') setDegreeFilter(value);
    if (name === 'semester') setSemesterFilter(value);
  };

  const filteredRows = rows.filter(row =>
    (departmentFilter ? row.department === departmentFilter : true) &&
    (degreeFilter ? row.degree === degreeFilter : true) &&
    (semesterFilter ? row.semester === semesterFilter : true)
  );

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['08:00 AM - 09:00 AM', '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM'];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
          marginLeft: '150px'
        }}
      >
        <Box sx={{ marginBottom: 2 , justifyContent:'center', display:'flex'}}>
          <TextField
            select
            label="Department"
            name="department"
            value={departmentFilter}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ marginRight: 2 , width: '12rem',}}
          >
            <MenuItem value="">All Departments</MenuItem>
            <MenuItem value="Engineering">Engineering</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
          </TextField>
          <TextField
            select
            label="Degree"
            name="degree"
            value={degreeFilter}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ marginRight: 2, width: '12rem' }}
            >
            <MenuItem value="">All Degrees</MenuItem>
            <MenuItem value="B.Sc.">B.Sc.</MenuItem>
            <MenuItem value="B.Com.">B.Com.</MenuItem>
            <MenuItem value="MBA">MBA</MenuItem>
          </TextField>
          <TextField
            select
            label="Semester"
            name="semester"
            value={semesterFilter}
            onChange={handleFilterChange}
            variant="outlined"
            sx={{ marginRight: 2, width: '12rem' }}
          >
            <MenuItem value="">All Semesters</MenuItem>
            <MenuItem value="6th Semester">6th Semester</MenuItem>
            <MenuItem value="2nd Semester">2nd Semester</MenuItem>
            <MenuItem value="1st Semester">1st Semester</MenuItem>
          </TextField>
        </Box>
        <Paper>
          <Grid container spacing={1} sx={{ padding: 2 , width: '90rem', marginLeft: '50px'}}>
            {daysOfWeek.map(day => (
              <Grid item xs={2} key={day}>
                <Typography variant="h6" align="center">{day}</Typography>
                {timeSlots.map(timeSlot => (
                  <Box
                    key={timeSlot}
                    sx={{
                      border: '1px solid #ccc',
                      padding: 1,
                      minHeight: 105,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onClick={() => {
                      const existingClass = filteredRows.find(row => row.day === day && row.time === timeSlot);
                      if (!existingClass) {
                        handleOpenDialog('add', null, { day, time: timeSlot });
                      }
                    }}
                  >
                    <Typography variant="body2" align="center">{timeSlot}</Typography>
                    {filteredRows.filter(row => row.day === day && row.time === timeSlot).map(row => (
                      <Box
                        key={row.id}
                        sx={{
                          border: '1px solid #000',
                          backgroundColor: '#f0f0f0',
                          borderRadius: 1,
                          marginTop: 1,
                          padding: 1,
                          cursor: 'pointer',
                          overflow: 'hidden', 
                          textOverflow: 'ellipsis', 
                          whiteSpace: 'nowrap', 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                        onClick={() => handleOpenDialog('edit', row)}
                      >
                        <Typography variant="body2" noWrap>{row.subject}</Typography>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(row.id);
                          }}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <TimeTableForm
            edit={dialogMode === 'edit'}
            initialData={{ ...selectedRow, ...selectedTimeSlot }}
            onSubmit={(data) => handleFormSubmit({ ...data, ...selectedTimeSlot })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
