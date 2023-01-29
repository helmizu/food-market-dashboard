import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
// import MenuBookIcon from '@mui/icons-material/MenuBook';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const drawerWidth = 240;

const Drawer = () => {
  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          <Link to="/" >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/restaurant" >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <RestaurantIcon />
                </ListItemIcon>
                <ListItemText primary="Restaurant" />
              </ListItemButton>
            </ListItem>
          </Link>
          <Link to="/restaurant/menu" >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <FastfoodIcon />
                </ListItemIcon>
                <ListItemText primary="Food" />
              </ListItemButton>
            </ListItem>
          </Link>
        </List>
      </Box>
    </MuiDrawer>
  )
}

export default Drawer