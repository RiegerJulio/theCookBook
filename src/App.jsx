import './App.css';

import React from 'react';

import Provider from './Context/Provider';
import Routes from './routes/Routes';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
