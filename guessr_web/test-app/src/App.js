  import './App.css';
import React from 'react';

import {
  Routes,
  Route } from "react-router-dom";


import Login from './components/Login';
import SignUp from './components/SignUp';
import Game from './components/Game';
import NotFound from './components/NotFound';
// import NavBar from './components/NavBar';


function sessionAvailable() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  return username != null && password != null
}

function App() {

  return (
    <Routes>
      <Route path = "/" element={ sessionAvailable() ? <Game/> : <Login/>} />
      <Route path = "/signup" element={sessionAvailable() ? <Game/> : <SignUp/>} />
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App;
