import React from 'react';
import { Container, Paper, Tab, Tabs } from '@mui/material';
import { withAuthenticator } from '@aws-amplify/ui-react';

const AuthTabs = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Tabs centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        {/* Amplify's withAuthenticator HOC handles the authentication flow */}
        <div>
          {/* This component will be automatically replaced with Amplify's UI */}
          <withAuthenticator />
        </div>
      </Paper>
    </Container>
  );
};

export default withAuthenticator(AuthTabs);