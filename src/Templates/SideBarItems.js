import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink,useHistory } from "react-router-dom";
import { render } from '@testing-library/react';



export const SideBarItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
      <NavLink to="/home">
            <DashboardIcon />
      </NavLink>
      </ListItemIcon>
      <NavLink to="/home">
        <ListItemText primary="Dashboard" />
      </NavLink>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <NavLink to="/order">
        <ShoppingCartIcon />
      </NavLink>
      </ListItemIcon>
        <NavLink to="/order">
            <ListItemText primary="Orders" />
        </NavLink>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
      <NavLink to="/customer">
        <PeopleIcon />
      </NavLink>
      </ListItemIcon>
        <NavLink to="/customer">
            <ListItemText primary="Customers" />
        </NavLink>
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <NavLink to="/product">
            <BarChartIcon />
        </NavLink>
      </ListItemIcon>
      <NavLink to="/product">
        <ListItemText primary="Products" />
      </NavLink>
    </ListItemButton>
  </React.Fragment>
);
