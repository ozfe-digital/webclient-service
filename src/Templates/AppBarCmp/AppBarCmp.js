import React, { useEffect, useState } from "react";
import Navbar from "../NavBar";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'; 
import { Link } from "react-router-dom";  

import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({ 
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  }, 
  appBar: {
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100%)`,
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
      background: "#753ffd",
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  root: {
    display: 'flex',
  },
  // drawerPaper: { width: 'inherit' },
  // link: {
  //   textDecoration: 'none',
  //   color: theme.palette.text.primary
  // },
  // drawer: {
  //   [theme.breakpoints.up('sm')]: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //   },
  // },  
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
 
  title: {
    flexGrow: 1,
  },
}));


export default function AppBarCmp(props) { 
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null); 
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    localStorage.clear();
    history.push('/signin'); 
  };

  const dropClose = () =>{
    setAnchorEl(null);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const classes = useStyles(); 
  const [navVisible, showNavbar] = useState(false);


  return (
    
    <AppBar position="absolute" className={classes.appBar}>
      
      <Toolbar >
      
      {/* <Button onClick={ showNavbar }><Icon path={mdiMenu} size={1}/></Button> */}

        <Typography variant="h6" noWrap className={classes.title}>
          Order Management system
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleClick}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={dropClose}
        >
          <MenuItem >{""}</MenuItem>
          <Link to="/profile" className={classes.link}> 
            <MenuItem >My Profile</MenuItem>
          </Link>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>

      </Toolbar>

    </AppBar>
  );
}