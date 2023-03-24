  import './App.css';
import React from 'react';

import {
  Routes,
  Route } from "react-router-dom";


import Login from './components/Login';
import SignUp from './components/SignUp';
import Game from './components/Game';
// import NavBar from './components/NavBar';


function sessionAvailable() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  return username != null && password != null
}

function App() {

  if (sessionAvailable()) {
    return
  }  
  
  return (
    <Routes>
      <Route exact path = "/" element={<Login/>} />
      <Route path = "/signup" element={<SignUp/>} />
    </Routes>
  )
}

export default App;
