import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const TimeTableForm = ({ edit = false, initialData = { degree: '', semOffered: '' } }) => {
  const [degree, setDegree] = useState('');
  const [semOffered, setSemOffered] = useState('');

  useEffect(() => {
    if (edit) {
      setDegree(initialData.degree);
      setSemOffered(initialData.semOffered);
    }
  }, [edit, initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      console.log("Changes Saved - Degree: ", degree);
      console.log("Changes Saved - Semester Offered: ", semOffered);
    } else {
      console.log("New Entry - Degree: ", degree);
      console.log("New Entry - Semester Offered: ", semOffered);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {edit ? 'Edit Degree' : 'Add New Degree'}
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

          {/* Semester Offered Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sem Offered"
              variant="outlined"
              fullWidth
              value={semOffered}
              onChange={(e) => setSemOffered(e.target.value)}
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

export default TimeTableForm;
