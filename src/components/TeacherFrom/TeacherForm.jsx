import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const TeacherForm = ({ edit = false, initialData = { name: '', department: '', designation: '', yearOfJoining: '' } }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [yearOfJoining, setYearOfJoining] = useState('');

  useEffect(() => {
    if (edit) {
      setName(initialData.name);
      setDepartment(initialData.department);
      setDesignation(initialData.designation);
      setYearOfJoining(initialData.yearOfJoining);
    }
  }, [edit, initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      console.log("Changes Saved - Name: ", name);
      console.log("Changes Saved - Department: ", department);
      console.log("Changes Saved - Designation: ", designation);
      console.log("Changes Saved - Year of Joining: ", yearOfJoining);
    } else {
      console.log("New Entry - Name: ", name);
      console.log("New Entry - Department: ", department);
      console.log("New Entry - Designation: ", designation);
      console.log("New Entry - Year of Joining: ", yearOfJoining);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom textAlign='center'>
        {edit ? 'Edit Teacher' : 'Add New Teacher'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              label="Department"
              variant="outlined"
              fullWidth
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Designation"
              variant="outlined"
              fullWidth
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Year of Joining"
              variant="outlined"
              fullWidth
              type="number"
              value={yearOfJoining}
              onChange={(e) => setYearOfJoining(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {edit ? 'Save Changes' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default TeacherForm;
