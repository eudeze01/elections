import React, { useState } from 'react';
import { Container, Paper, Tab, Tabs, Button } from '@mui/material';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import amplifyConfig from './aws-exports';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AdminPage from './adminPage';
import ResultForm from './resultForm';
import TableComponent from './table'; // Assuming it's the default export

Amplify.configure(amplifyConfig);

const AuthTabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Router>
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
        <Link to="/admin">
          <Button>
            Admin Page
          </Button>
        </Link>
        <Link to="/forms">
          <Button>
            Forms
          </Button>
        </Link>
        <Link to="/table">
          <Button>
            Table
          </Button>
        </Link>

        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/forms" component={ResultForm} />
          <Route path="/table" component={TableComponent} />
        </Switch>
      </Container>
    </Router>
  );
};

export default withAuthenticator(AuthTabs, { includeGreetings: true });
