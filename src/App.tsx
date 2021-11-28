import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from '@app/navigation/AppNavigator';
import QueryProvider from '@app/providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryProvider>
  );
}

export default App;
