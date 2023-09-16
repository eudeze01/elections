import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Menu as MenuIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify, Auth } from 'aws-amplify';
import amplifyConfig from './aws-exports';
import ResultForm from './resultForm';



Amplify.configure(amplifyConfig);

function App({ signOut, user }) {
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: 'green' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              E-lections
            </Typography>
            <Button onClick={signOut} color="inherit">Sign Out</Button>
          </Toolbar>
        </AppBar>
      </Box>
    {(user.username)  ? <ResultForm/> : <div></div> }
    {/* <ResultForm/> */}
      {/* <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button> */}
    </>
  );
}

export default withAuthenticator(App);

