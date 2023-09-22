import React, { useState } from 'react';  
import { 
  Box, AppBar, Toolbar, IconButton, Typography, 
  Button, Menu, MenuItem, FormControl, InputAdornment, TextField
} from '@mui/material';
import { Amplify } from 'aws-amplify';
import { Auth } from 'aws-amplify';
import amplifyConfig from './aws-exports';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search'; 
import { useNavigate } from 'react-router-dom';


Amplify.configure(amplifyConfig);

function CustomAppBar({ signOut, user, onSearchIconClick }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const goBack = () => {
    navigate(-1); 
  }

  const handleSignOut = async () => {
    try {
        await Auth.signOut();
        window.location.reload(); 
    } catch (error) {
        console.error("Error signing out: ", error);
    }
  };
  
  const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const [showSearchOptions, setShowSearchOptions] = useState(false);
  const [isSearchFormVisible, setIsSearchFormVisible] = useState(false);

  const toggleSearchOptions = () => {
    setShowSearchOptions(!showSearchOptions);
    setIsSearchFormVisible(prevVisible => !prevVisible);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'green' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              onClick={goBack}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home"
              sx={{ mr: 2 }}
            >
              <HomeIcon />  
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            e-lections
          </Typography>
            
          <FormControl variant="outlined" sx={{ marginRight: '10px' }}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              style={{  width: '8em', borderRadius: '15px', backgroundColor: 'ghostwhite'}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={() => {
                        onSearchIconClick && onSearchIconClick();
                        toggleSearchOptions(); 
                      }}
                      aria-label="Toggle search options"
                    >
                        <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                  ),
                }}
              />
          </FormControl>

            <Button    
              variant='subtitle1' color="inherit" onClick={handleMenuOpen}>
              {user?.family_name}
            </Button>
            
          </Toolbar>
        </AppBar>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
          }}
          transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
          }}
        >
          <MenuItem onClick={handleMenuClose} component="a" href={`/dashboard`}>Account</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); handleSignOut(); }}>Sign Out</MenuItem>
        </Menu>

      </Box>
    </>
  );
}

export default (CustomAppBar);
