import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography } from '@mui/material';

const DegreeForm = ({ edit = false, initialData = { degree: '', totalSemester: '' } }) => {
  const [degree, setDegree] = useState('');
  const [totalSemester, setTotalSemester] = useState('');

  useEffect(() => {
    if (edit) {
      setDegree(initialData.degree);
      setTotalSemester(initialData.totalSemester);
    }
  }, [edit, initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      console.log("Changes Saved - Degree: ", degree);
      console.log("Changes Saved - Semester Offered: ", totalSemester);
    } else {
      console.log("New Entry - Degree: ", degree);
      console.log("New Entry - Semester Offered: ", totalSemester);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom textAlign='center'>
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

          <Grid item xs={12} sm={6}>
            <TextField
              label="Sem Offered"
              variant="outlined"
              fullWidth
              value={totalSemester}
              onChange={(e) => setTotalSemester(e.target.value)}
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

export default DegreeForm;
