import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const SemesterForm = ({ edit = false, initialData = { degree: '', semester: '', department: '', totalStudents: '' } }) => {
  const [degree, setDegree] = useState('');
  const [semester, setSemester] = useState('');
  const [department, setDepartment] = useState('');
  const [totalStudents, setTotalStudents] = useState('');

  useEffect(() => {
    if (edit) {
      setDegree(initialData.degree);
      setSemester(initialData.semester);
      setDepartment(initialData.department);
      setTotalStudents(initialData.totalStudents);
    }
  }, [edit, initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      console.log("Changes Saved - Degree: ", degree);
      console.log("Changes Saved - Semester: ", semester);
      console.log("Changes Saved - Department: ", department);
      console.log("Changes Saved - Number of Students: ", totalStudents);
    } else {
      console.log("New Entry - Degree: ", degree);
      console.log("New Entry - Semester: ", semester);
      console.log("New Entry - Department: ", department);
      console.log("New Entry - Number of Students: ", totalStudents);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom textAlign='center'>
        {edit ? 'Edit Semester' : 'Add New Semester'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Degree"
              variant="outlined"
              fullWidth
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Semester"
              variant="outlined"
              fullWidth
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Department"
              variant="outlined"
              fullWidth
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Number of Students"
              variant="outlined"
              fullWidth
              type="number"
              value={totalStudents}
              onChange={(e) => setTotalStudents(e.target.value)}
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

export default SemesterForm;
