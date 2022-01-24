import React from 'react';
import AuthProvider from '@app/providers/AuthProvider';
import Router from '@app/navigation/Router';
import ServerInstanceProvider from './providers/ServerInstanceProvider';

function App() {
  return (
    <ServerInstanceProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ServerInstanceProvider>
  );
}

export default App;
