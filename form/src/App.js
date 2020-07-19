import React, {useState} from 'react';

import './App.css';
import Form from './Form';

function App() {

const [users, setUsers] = useState([{
name: "",
email: "",
password: "",
program: "",
details: "",
terms: ""}])

const addUser = (newMember) => {
  setUsers([...users, newMember])
}

  return (
    <div className="App">
      <header className="App-header">
        <h1> Sign up to get started!</h1>
        <Form addUser={addUser}/> 
      </header>
      <div className="display-employees">
        {users.map((user, index) =>(
          <div key={index}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.password}</p>
            <p>{user.program}</p>
            <p>{user.details}</p>
            <p>{user.terms}</p>
          </div>
        ) )}
      </div>
    </div>
  );
}

export default App;

