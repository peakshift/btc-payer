import React from 'react';
import QueryProvider from './providers/QueryProvider';

function App() {
  return (
    <QueryProvider>
      <div>This is a POC</div>
    </QueryProvider>
  );
}

export default App;
