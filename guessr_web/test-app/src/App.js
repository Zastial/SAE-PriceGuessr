import './App.css';
import React from 'react';

import Login from './components/Login';
import Game from './components/Game';


function isThereASession() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");

  console.log(username, password)  

  return username != null && password != null
}

function App() {
  if(isThereASession()) {
    return (
      <div className="App">
        <Game/>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Login/>
      </div>
    );
  }

}

export default App;
