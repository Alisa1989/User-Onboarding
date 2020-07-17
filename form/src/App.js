import React from 'react';

import './App.css';
import Form from './Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1> Sign up to get started!</h1>
        <Form component={Form}/>

      </header>
    </div>
  );
}

export default App;
