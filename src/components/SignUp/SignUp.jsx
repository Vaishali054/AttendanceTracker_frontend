import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AppTheme from '../theme/AppTheme.tsx';
import ColorModeSelect from '../theme/ColorModeSelect.tsx';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import { Card, SignUpContainer } from "../../constants/constant.jsx";
import { getDepartments } from '../../api/fetchcmds.jsx';
import { sendOTP, verifyOTP } from '../../api/verify.jsx';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { registerUser } from '../../api/authAPI.jsx';
import { useNavigate } from 'react-router-dom';

export default function SignUp(props) {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [dept, setDept] = React.useState('');
  const [departments, setDepartments] = React.useState([]);
  const [degrees, setDegrees] = React.useState([]);
  const [degree, setDegree] = React.useState('');
  const [totalSemesters, setTotalSemesters] = React.useState(0);
  const [semester, setSemester] = React.useState('');
  const [open, setOpen] = React.useState(false); 
  const [otp, setOtp] = React.useState(''); 
  const [token, setToken] = React.useState('');
  const navigate=useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDepartments();
  }, []);

  const handleDeptChange = (e) => {
    const selectedDept = e.target.value;
    setDept(selectedDept);
    const selectedDepartment = departments.find(department => department._id === selectedDept);
    if (selectedDepartment) {
      setDegrees(selectedDepartment.degreeOffered);
      setDegree('');
      setTotalSemesters(0);
    }
  };

  const handleDegreeChange = (e) => {
    const selectedDegreeId = e.target.value;
    setDegree(selectedDegreeId);
    const selectedDegree = degrees.find(deg => deg._id === selectedDegreeId);
    if (selectedDegree) {
      setTotalSemesters(selectedDegree.totalSemester); 
      setSemester(''); 
    }
  };

  const handleEmailVerification = async () => {
    const emailValue = document.getElementById('email').value;
    if (!/\S+@\S+\.\S+/.test(emailValue)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address before verifying.');
      return;
    }
    try {
      const data = await sendOTP(emailValue);
      console.log(data);
      alert(data.message);
      setOpen(true);
      setToken(data.token);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleOtpVerification = async () => {
    try {
      const data = await verifyOTP(token, otp); 
      alert(data.message);
      setOpen(false); 
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    if (validateInputs()) {
      const formData = new FormData(event.currentTarget);
      const formValues = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        department: dept,
        degree: degree,
        semester: semester,
      };

      const data=await registerUser(formValues);
      console.log(data)
      alert(data.message);

      if(data.success){
        navigate('/')
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '0.5rem', right: '0.5rem' }} />
        <Stack
          sx={{
            justifyContent: 'center',
            height: '100vh',
            p: 0,
          }}
        >
          <Card variant="outlined">
            <Typography
              component="h1"
              variant="h5"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 1vw, 0.15rem)' }}
            >
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <FormControl>
                <FormLabel htmlFor="name">Full name</FormLabel>
                <TextField
                  autoComplete="name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  placeholder="Jon Snow"
                  error={nameError}
                  helperText={nameErrorMessage}
                  color={nameError ? 'error' : 'primary'}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="your@email.com"
                  name="email"
                  autoComplete="email"
                  variant="outlined"
                  error={emailError}
                  helperText={emailErrorMessage}
                  color={emailError ? 'error' : 'primary'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button variant="contained" onClick={handleEmailVerification}>
                          Verify
                        </Button>
                      </InputAdornment>
                    )
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="dept">Departments</FormLabel>
                <Select
                  id="dept"
                  value={dept}
                  onChange={handleDeptChange}
                  {...props}
                >
                  {Array.isArray(departments) && departments.length > 0 && departments.map((department) => (
                    <MenuItem key={department._id} value={department._id}>
                      {department.department}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="degree">Degree</FormLabel>
                <Select
                  id="degree"
                  value={degree}
                  onChange={handleDegreeChange}
                  disabled={!dept}
                  {...props}
                >
                  {degrees.length > 0 && degrees.map((deg) => (
                    <MenuItem key={deg._id} value={deg._id}>
                      {deg.degree}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="semester">Semester</FormLabel>
                <Select
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  disabled={!totalSemesters}
                  {...props}
                >
                  {[...Array(totalSemesters)].map((_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="outlined"
                  error={passwordError}
                  helperText={passwordErrorMessage}
                  color={passwordError ? 'error' : 'primary'}
                />
              </FormControl>

              <Button type="submit" fullWidth variant="contained">
                Sign up
              </Button>
            </Box>
          </Card>
        </Stack>
      </SignUpContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Enter OTP</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="otp"
            label="OTP"
            type="text"
            fullWidth
            variant="outlined"
            value={otp}
            onChange={(e) => setOtp(e.target.value)} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOtpVerification} color="primary">
            Verify OTP
          </Button>
        </DialogActions>
      </Dialog>
    </AppTheme>
  );
}
