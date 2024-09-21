import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import School from '@mui/icons-material/School';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import DegreeForm from '../DegreeForm/DegreeForm';
import SubjectForm from '../SubjectForm/SubjectForm';
import TimeTableForm from '../TimeTableForm/TimeTableForm'
import TeacherForm from '../TeacherFrom/TeacherForm';
import DepartmentForm from '../DepartmentForm/DeaprtmentForm';
import { drawerWidth, DrawerHeader, AppBar } from '../../constants/constant';
import {Dialog, DialogActions, DialogContent} from '@mui/material';

const navItems = [
  { text: 'Teacher', path: '/admindashboard/teacher' },
  { text: 'Subject', path: '/admindashboard/subject' },
  { text: 'Department', path: '/admindashboard/department' },
  { text: 'Timetable', path: '/admindashboard/timetable' },
  { text: 'Degree', path: '/admindashboard/degree' },
  { text: 'Semester', path: '/admindashboard/semester' },
];

export default function DrawerVariant(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [formType, setFormType] = React.useState(null);
  const location = useLocation();

  const getAddButtonLabel = () => {
    switch (location.pathname) {
      case '/admindashboard/teacher':
        return 'Add New Teacher';
      case '/admindashboard/subject':
        return 'Add New Subject';
      case '/admindashboard/department':
        return 'Add New Department';
      case '/admindashboard/timetable':
        return 'Add New class in Timetable';
      case '/admindashboard/degree':
        return 'Add New Degree';
      default:
        return null;
    }
  };

  const handleAddClick = () => {
    switch (location.pathname) {
      case '/admindashboard/teacher':
        setFormType('teacher');
        break;
      case '/admindashboard/subject':
        setFormType('subject');
        break;
      case '/admindashboard/department':
        setFormType('department');
        break;
      case '/admindashboard/timetable':
        setFormType('timetable');
        break;
      case '/admindashboard/degree':
        setFormType('degree');
        break;
      default:
        break;
    }
  };

  const renderForm = () => {
    switch (formType) {
      case 'teacher':
        return <TeacherForm/>;
      case 'subject':
        return <SubjectForm />;
      case 'department':
        return <DepartmentForm/>;
      case 'timetable':
        return <TimeTableForm />;
      case 'degree':
        return <DegreeForm />;
      default:
        return null;
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        open={open}
        sx={{
          display: 'flex', 
          justifyContent: 'space-between', 
          backgroundColor: '#1976d2'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ flexGrow: 1, color: '#fff' }}
          >
            Admin Dashboard
          </Typography>
          {getAddButtonLabel() && (
            <Button
              variant="contained"
              color="primary"
              sx={{ marginLeft: 'auto', backgroundColor: '#fff', color: '#1976d2' }}
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              {getAddButtonLabel()}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <List>
          {navItems.map((item) => (
            <ListItem key={item.text}>
              <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton>
                  <ListItemIcon>
                    <School style={{ color: '#1976d2' }} />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog
        open={!!formType}
        onClose={() => setFormType(null)}
      >
        <DialogContent>
          {renderForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormType(null)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
