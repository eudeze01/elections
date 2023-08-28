import React, { useState } from 'react';
import { Container, Paper, Tab, Tabs } from '@mui/material';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify, Auth } from 'aws-amplify';
import amplifyConfig from './aws-exports';


Amplify.configure(amplifyConfig);

const AuthTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} centered>
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        {tabIndex === 0 && <signIn />}
        {tabIndex === 1 && (
          <signUp
            formFields={[
              { type: "username" },
              { type: "password" },
              { type: "email" },
              { type: "phone_number", label: "Phone Number", required: true },
              { type: "given_name", label: "First Name", required: true },
              { type: "family_name", label: "Last Name", required: true }
            ]}
          />
        )}
      </Paper>
    </Container>
  );
};

export default withAuthenticator(AuthTabs, { includeGreetings: true });
