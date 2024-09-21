import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, Container, Typography, IconButton, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { getDegrees } from '../../api/fetchcmds';

const DepartmentForm = ({ edit = false, initialData = { department: '', totalfaculty: '', degreeOffered: [] } }) => {
  const [department, setDepartment] = useState('');
  const [totalfaculty, setTotalFaculty] = useState('');
  const [degreeOffered, setDegreeOffered] = useState([]);
  const [availableDegrees, setAvailableDegrees] = useState([]);
  const [newDegree, setNewDegree] = useState('');

  useEffect(() => {
    const fetchDegrees = async () => {
      try {
        const degrees = await getDegrees();
        setAvailableDegrees(degrees.degrees);
      } catch (error) {
        console.error("Failed to fetch degrees", error);
      }
    };
    fetchDegrees();
  }, []);

  useEffect(() => {
    if (edit) {
      setDepartment(initialData.department);
      setTotalFaculty(initialData.totalfaculty);
      setDegreeOffered(initialData.degreeOffered || []);
    }
  }, [edit, initialData]);

  const handleAddDegree = () => {
    if (newDegree) {
      setDegreeOffered([...degreeOffered, { degree: newDegree }]);
      setNewDegree(''); 
    }
  };

  const handleRemoveDegree = (index) => {
    setDegreeOffered(degreeOffered.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const departmentData = {
      department,
      totalfaculty,
      degreeOffered,
    };

    if (edit) {
      console.log("Changes Saved - Department: ", departmentData);
    } else {
      console.log("New Entry - Department: ", departmentData);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom textAlign='center'>
        {edit ? 'Edit Department' : 'Add New Department'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Department Name"
              variant="outlined"
              fullWidth
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Total Faculty"
              variant="outlined"
              fullWidth
              value={totalfaculty}
              onChange={(e) => setTotalFaculty(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Degrees Offered
            </Typography>
            {degreeOffered.map((degree, index) => (
              <Grid container spacing={1} key={index} alignItems="center">
                <Grid item xs={10}>
                  <Typography variant="body1">{degree.degree}</Typography>
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleRemoveDegree(index)} color="error">
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            
            <Grid container spacing={1} alignItems="center" sx={{ marginTop: 2 }}>
              <Grid item xs={10}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>New Degree</InputLabel>
                  <Select
                    label="New Degree"
                    value={newDegree}
                    onChange={(e) => setNewDegree(e.target.value)}
                  >
                    {availableDegrees.map((deg) => (
                      <MenuItem key={deg._id} value={deg.degree}>
                        {deg.degree}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddDegree}
                  sx={{ width: '100%' }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
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
