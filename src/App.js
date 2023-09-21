import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import amplifyConfig from './aws-exports';
import HomeDashboard from './home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';


// import { useNavigate } from 'react-router-dom';  

Amplify.configure(amplifyConfig);

function App({ signOut, user }) {

  // const navigate = useNavigate();

  // const goToHomePage = () => {
  //   navigate('/');  
  // };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
        <AppBar position="static" sx={{ backgroundColor: 'green' }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
              // onClick={() => navigate(-1)}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home"
              sx={{ mr: 2 }}
              // onClick={goToHomePage}  
            >
              <HomeIcon />  
            </IconButton>

            <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
              E-lections AdminPage
            </Typography>
            
            <Typography variant="name" component="span" sx={{ marginRight: 2 }}>
              {user.attributes.family_name} 
            </Typography>
            <a style={{textDecoration: "none", color: "inherit", marginRight: 10 }} href={`/dashboard`}>Account</a>
            <Button textTransform='none' textDecoration="none" onClick={signOut} color="inherit">Sign Out</Button>
          </Toolbar>
        </AppBar>
        
      </Box>
      {(user.username) ? <HomeDashboard/> : <div></div>}
    </>
  );
}


export default withAuthenticator(App);