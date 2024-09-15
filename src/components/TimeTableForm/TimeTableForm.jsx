import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const departments = ['Engineering', 'Marketing', 'HR'];
const degrees = ['B.Sc.', 'B.Com.', 'MBA'];
const semesters = ['1st Semester', '2nd Semester', '6th Semester'];
const subjects = ['Algorithms', 'Marketing Principles', 'Human Resource Management'];
const timeSlots = ['08:00 AM - 09:00 AM', '09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM', '04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM'];

const TimeTableForm = ({ edit = false, initialData = {}, onSubmit }) => {
  const [department, setDepartment] = useState('');
  const [degree, setDegree] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (edit && initialData) {
      setDepartment(initialData.department || '');
      setDegree(initialData.degree || '');
      setSemester(initialData.semester || '');
      setSubject(initialData.subject || '');
      setTime(initialData.time || '');
    } else {
      setDepartment('');
      setDegree('');
      setSemester('');
      setSubject('');
      setTime(initialData.time || '');
    }
  }, [edit, initialData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { department, degree, semester, subject, time };
    onSubmit(data);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        {edit ? 'Edit Class' : 'Add New Class'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                label="Department"
                required
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Degree</InputLabel>
              <Select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
                label="Degree"
                required
              >
                {degrees.map((deg) => (
                  <MenuItem key={deg} value={deg}>{deg}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Semester</InputLabel>
              <Select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                label="Semester"
                required
              >
                {semesters.map((sem) => (
                  <MenuItem key={sem} value={sem}>{sem}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Subject</InputLabel>
              <Select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                label="Subject"
                required
              >
                {subjects.map((sub) => (
                  <MenuItem key={sub} value={sub}>{sub}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Time Slot</InputLabel>
              <Select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                label="Time Slot"
                required
                disabled={edit} // Disable time slot selection in edit mode
              >
                {timeSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>{slot}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
