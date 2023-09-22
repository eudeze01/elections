import React from 'react';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import amplifyConfig from './aws-exports';
import HomeScreen from './screens/HomeScreen';
import CustomAppBar from './customAppBar';

Amplify.configure(amplifyConfig);

function App({ signOut, user }) {
  return (
    <>
      <CustomAppBar/>
      <HomeScreen/> 
    </>
  );
}

export default withAuthenticator(App);
