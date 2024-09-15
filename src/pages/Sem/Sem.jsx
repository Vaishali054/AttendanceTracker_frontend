import React from 'react';
import DrawerVariant from '../../components/Drawer/Drawer'; 
import { Box, Typography } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Main , DrawerHeader} from '../../constants/constant';
import SemesterTable from '../../components/SemesterTable/SemesterTable';

export default function Sem() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
        <DrawerVariant 
            open={open} 
            handleDrawerClose={handleDrawerClose} 
            handleDrawerOpen={handleDrawerOpen} 
        />
    <Main open={open}>
      <DrawerHeader />
      <Typography variant="h6" textAlign="center" component="div">Semester DataBase</Typography>
      <SemesterTable/>
    </Main>
  </Box>
  );
}
