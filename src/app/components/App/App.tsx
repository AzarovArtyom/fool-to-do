import React from 'react';

import './App.css';

import ToDo from '../ToDo';
import Header from '../Header';

function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <main className="App-content">
        <ToDo />
      </main>
    </div>
  );
}

export default App;
