import React from 'react';
import { NavLink,useHistory } from "react-router-dom";
import "./navbar.css";

import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function Navbar({props}) {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null); 

  
	const handleClose = () => {
	  setAnchorEl(null);
	  localStorage.clear();
	  history.push('/signin'); 
	};
	return (
		<>
            <ListItemButton>
				<ListItemIcon>
					<SettingsIcon />
				</ListItemIcon>
				<NavLink to="/profile">
					<ListItemText primary="Profile" />
				</NavLink>
			</ListItemButton>
            <ListItemButton>
				<ListItemIcon>
					<LogoutIcon />
				</ListItemIcon>
				<NavLink to="/signin" onClick={handleClose}>
					<ListItemText primary="Log Out" />
				</NavLink>
			</ListItemButton>
		</>
  );
}

export default Navbar;