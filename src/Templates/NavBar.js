import React from 'react';
import {
	FaAngleRight,
	FaAngleLeft, 
	FaChartBar, 
	FaThLarge, 
	FaShoppingCart, 
	FaCog,
	FaSignOutAlt,
	FaBars
} from 'react-icons/fa';
import { NavLink,useHistory } from "react-router-dom";
import "./navbar.css";

import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const ICON_SIZE = 15;

function Navbar({visible, show}) {
	const history = useHistory();
	const [anchorEl, setAnchorEl] = React.useState(null); 
	const [mobileOpen, setMobileOpen] = React.useState(false);
  
	const handleClose = () => {
	  setAnchorEl(null);
	  localStorage.clear();
	  history.push('/signin'); 
	};
	return (
		<>
			{/* <div className="mobile-nav">
				<button
					className="mobile-nav-btn"
					onClick={() => show(!visible)}
				>
					<FaBars size={24}  />
				</button>
			</div>
			<nav className={!visible ? 'navbar' : ''}>
				<button
					type="button"
					className="nav-btn"
					onClick={() => show(!visible)}
				>
					{ !visible
						? <FaAngleRight size={30} /> : <FaAngleLeft size={30} />}
				</button>
				<div>
					<NavLink
						className="logo"
						to="/"
					>
	
					</NavLink>
					<div className="links nav-top">
						<NavLink to="/home" className="nav-link">
							<FaThLarge size={ICON_SIZE} />
							<span>Home</span>
						</NavLink>
						<NavLink to="/customer" className="nav-link">
							<FaChartBar size={ICON_SIZE} />
							<span>Customers </span>
						</NavLink>
						<NavLink to="/product" className="nav-link">
							<FaShoppingCart size={ICON_SIZE} />
							<span>Products</span> 
						</NavLink>
						<NavLink to="/order" className="nav-link">
							<FaShoppingCart size={ICON_SIZE} />
							<span>Orders</span> 
						</NavLink>
						
					</div>
				</div> 
						<br/>
				<div className="links nav-bottom" >
					<NavLink to="/profile" className="nav-link">
						<FaCog size={ICON_SIZE} />
						<span>Profile</span> 
					</NavLink>
					<NavLink to="/signin" className="nav-link" onClick={handleClose}>
						<FaSignOutAlt size={ICON_SIZE} />
						<span>Logout</span> 
					</NavLink>
				</div>
			</nav> */}
			<List component="nav">
              <NavLink to="/home" className="nav-link">
                <FaThLarge size={ICON_SIZE} />
                <span>Home</span>
              </NavLink>
              <NavLink to="/customer" className="nav-link">
                <FaChartBar size={ICON_SIZE} />
                <span>Customers </span>
              </NavLink>
              <NavLink to="/product" className="nav-link">
                <FaShoppingCart size={ICON_SIZE} />
                <span>Products</span> 
              </NavLink>
              <NavLink to="/order" className="nav-link">
                <FaShoppingCart size={ICON_SIZE} />
                <span>Orders</span> 
              </NavLink>
            <Divider sx={{ my: 1 }} />
                <NavLink to="/profile" className="nav-link">
                <FaCog size={ICON_SIZE} />
                <span>Profile</span> 
                </NavLink>
                <NavLink to="/signin" className="nav-link" onClick={handleClose}>
                  <FaSignOutAlt size={ICON_SIZE} />
                  <span>Logout</span> 
                </NavLink>
          </List>
		</>
  );
}

export default Navbar;