import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const SubjectForm = ({ edit = false, initialData = { name: '', department: '', teacher: '', degree: '', credits: '', semester: '' } }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [teacher, setTeacher] = useState('');
  const [degree, setDegree] = useState('');
  const [credits, setCredits] = useState('');
  const [semester, setSemester] = useState('');

  useEffect(() => {
    if (edit) {
      setName(initialData.name);
      setDepartment(initialData.department);
      setTeacher(initialData.teacher);
      setDegree(initialData.degree);
      setCredits(initialData.credits);
      setSemester(initialData.semester);
    }
  }, [edit, initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      console.log("Changes Saved - Name: ", name);
      console.log("Changes Saved - Department: ", department);
      console.log("Changes Saved - Teacher: ", teacher);
      console.log("Changes Saved - Degree: ", degree);
      console.log("Changes Saved - Credits: ", credits);
      console.log("Changes Saved - Semester: ", semester);
    } else {
      console.log("New Entry - Name: ", name);
      console.log("New Entry - Department: ", department);
      console.log("New Entry - Teacher: ", teacher);
      console.log("New Entry - Degree: ", degree);
      console.log("New Entry - Credits: ", credits);
      console.log("New Entry - Semester: ", semester);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom >
        {edit ? 'Edit Subject' : 'Add New Subject'}
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
              label="Teacher"
              variant="outlined"
              fullWidth
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
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
              label="Credits"
              variant="outlined"
              fullWidth
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Semester"
              variant="outlined"
              fullWidth
              type="number"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
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

export default SubjectForm;
