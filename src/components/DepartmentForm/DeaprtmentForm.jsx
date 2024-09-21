import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const DepartmentForm = ({ edit = false, initialData = { name: '', noOfFaculty: '', degreesOffered: [] } }) => {
  const [name, setName] = useState('');
  const [noOfFaculty, setNoOfFaculty] = useState('');
  const [degreesOffered, setDegreesOffered] = useState([]);

  useEffect(() => {
    if (edit) {
      setName(initialData.name);
      setNoOfFaculty(initialData.noOfFaculty);
      setDegreesOffered(initialData.degreesOffered);
    }
  }, [edit, initialData]);

  const handleAddDegree = () => {
    setDegreesOffered([...degreesOffered, '']);
  };

  const handleDegreeChange = (index, value) => {
    const updatedDegrees = degreesOffered.map((degree, i) => (i === index ? value : degree));
    setDegreesOffered(updatedDegrees);
  };

  const handleRemoveDegree = (index) => {
    setDegreesOffered(degreesOffered.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      console.log("Changes Saved - Name: ", name);
      console.log("Changes Saved - No. of Faculty: ", noOfFaculty);
      console.log("Changes Saved - Degrees Offered: ", degreesOffered);
    } else {
      console.log("New Entry - Name: ", name);
      console.log("New Entry - No. of Faculty: ", noOfFaculty);
      console.log("New Entry - Degrees Offered: ", degreesOffered);
    }
  };

  return (
    <Container maxWidth="sm" height='100%'>
      <Typography variant="h4" gutterBottom textAlign='center'>
        {edit ? 'Edit Department' : 'Add New Department'}
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
            <Typography variant="h6" gutterBottom>
              Degrees Offered
            </Typography>
            {degreesOffered.map((degree, index) => (
              <Grid container spacing={1} key={index}>
                <Grid item xs={10}>
                  <TextField
                    label={`Degree ${index + 1}`}
                    variant="outlined"
                    fullWidth
                    value={degree}
                    onChange={(e) => handleDegreeChange(index, e.target.value)}
                    required
                    sx={{ marginTop: 2 }}
                  />
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleRemoveDegree(index)} color="error">
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddDegree}
              sx={{ marginTop: 2, width: '83%'}}
              
            >
              Add Degree
            </Button>
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

export default DepartmentForm;
