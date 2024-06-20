// Header.js
import React from 'react';
import {useState} from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHomeClick = () => {
    window.location.href = 'https://leanlyf.com'; // Replace 'https://example.com' with your desired external URL
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" onClick={handleHomeClick}>
          <HomeIcon />
        </IconButton>
        <Typography variant="h4" style={{ flexGrow: 1 }}>
            Standup Mate
        </Typography>
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <Avatar src="/path/to/avatar.jpg" alt="M" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My account</MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
