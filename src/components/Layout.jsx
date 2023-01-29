import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { Navigate, Outlet } from 'react-router-dom';
import Drawer from './Drawer';
import Header from './Header';
import { UserContext } from '../utils/context';

export default function Layout() {
  const { user } = React.useContext(UserContext);

  if (!user) {
    return <Navigate to='/login' replace />
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header auth />
      <Drawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
