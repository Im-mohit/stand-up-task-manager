// Header.js
import React from 'react';
import {useState, useEffect} from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signInWithRedirect, fetchUserAttributes, signOut } from "aws-amplify/auth"


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
      try {
        const userData = await fetchUserAttributes();
        setUser(userData);
        console.log(userData);
      } catch (error) {
        setUser(null);
      }
    };

    async function handleSignOut () {
      try {
        await signOut();
        setUser(null);
        setAnchorEl(null);
      } catch (error) {
        console.log('Error signing out: ', error);
      }
    };



  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHomeClick = () => {
    window.location.href = 'https://leanlyf.com'; // Replace 'https://example.com' with your desired external URL
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const renderAuthButton = () => {
        if (user) {
          return (
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar src="/path/to/avatar.jpg" alt={user.given_name} />
            </IconButton>
          );
        } else {
          return (
          <Button color="inherit" onClick={() => signInWithRedirect({ provider: "Google" })}>Sign In</Button>
          );
        }
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
        {renderAuthButton()}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
