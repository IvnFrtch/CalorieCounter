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
    <AppBar
      position="static"
      sx={{
        background: 'linear-gradient(to right, #FF6347, #90EE90)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* CalorieCounter Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            fontFamily: "'Comic Sans MS', cursive",
          }}
        >
          CalorieCounter
        </Typography>

        {/* Account Dropdown */}
        <Button
          onClick={handleMenuClick}
          sx={{
            color: 'white',
            fontWeight: 'bold',
            backgroundColor: '#FF6347',
            '&:hover': { backgroundColor: '#FF4500' },
            borderRadius: '20px',
            px: 2,
            py: 1,
            textTransform: 'none',
          }}
          endIcon={<ArrowDropDownIcon />}
        >
          Menu
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              backgroundColor: '#FFFAF0',
              borderRadius: '10px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            },
          }}
        >
          <MenuItem
            onClick={handleMenuClose}
            component={Link}
            to="/"
            sx={{
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#FF6347',
                color: 'white',
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

