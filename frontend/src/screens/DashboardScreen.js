import React from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import amplifyConfig from '../aws-exports';
import ResultForm from '../resultForm';
const url = 'https://9656mgkl5a.execute-api.eu-west-2.amazonaws.com/dev/accounts/create';
const apiKey = '6YJ1IDez4I3hpEsdqCAWI8fzF6CbtCINx3fRTxEf'
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("x-api-key", apiKey);
let saved = false;

const getUser = async (email) => {
  const myHeaders = new Headers();
  const myRequest = new Request(`https://9656mgkl5a.execute-api.eu-west-2.amazonaws.com/dev/account/${email}`, {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });
  return await fetch(myRequest);
}

const submit = async (body = {}) => {
  const myHeaders = new Headers();

  const myRequest = new Request(url, {
    body: JSON.stringify(body),
    method: "POST",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  });
  await fetch(myRequest);
} 

Amplify.configure(amplifyConfig);

function AuthenticatedUser(props) {
    if (props.user) {
        const {sub, name, phone_number, family_name, email} = props.user.attributes;
        if (email) {
          getUser(email)
          .then(async res => {
            const {email: id} = await res.json();
            // Save user to db
            if (!id) submit({name, id: sub, phone_number, family_name, email});
          })
          .catch(error => console.log(`Get user error response: ${error}`))
        }
    }

    return (
        <ResultForm/>
    )
}

function DashboardScreen({ signOut, user }) {
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
            <a style={{textDecoration: "none", color: "white", marginRight: "20px"}} href={`/admin/${user.username}`}>Admin</a>
            <Button onClick={signOut} color="inherit">Sign out</Button>
          </Toolbar>
        </AppBar>
    </Box>
    {(user.username)  ? <AuthenticatedUser user={user}/> : <div></div> }
    </>
  );
}

export default withAuthenticator(DashboardScreen);

