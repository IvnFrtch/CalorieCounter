import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import { Link } from 'react-router-dom'; // If using react-router for navigation
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  // Handle opening and closing the dropdown menu
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* CalorieCounter Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          CalorieCounter
        </Typography>

        {/* Navigation Links */}
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>

        {/* Account Dropdown */}
        <Button
          color="inherit"
          onClick={handleMenuClick}
          endIcon={<ArrowDropDownIcon />}
        >
          Account
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
            Profile
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/settings">
            Settings
          </MenuItem>
          <MenuItem onClick={handleMenuClose} component={Link} to="/">
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
