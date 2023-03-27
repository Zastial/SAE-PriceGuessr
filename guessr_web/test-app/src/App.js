  import './App.css';
import React from 'react';

import {
  Routes,
  Route, } from "react-router-dom";


import Login from './components/Login';
import SignUp from './components/SignUp';
import Game from './components/Game';
import GameInterface from './components/page/GameInterface';
import Historique from './components/page/Historique';
import Compte from './components/page/Compte';
import NotFound from './components/NotFound';


function sessionAvailable() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  return username != null && password != null
}

function App() {

  return (
    <Routes>
      <Route path="/" element={ sessionAvailable() ? <Game/> : <Login/>}>
        <Route path="/" element={<GameInterface/>}/>
        <Route path="/historique" element={<Historique/>}/>
        <Route path="/compte" element={<Compte/>}/> 
      </Route>
      <Route path = "/signup" element={sessionAvailable() ? <Game/> : <SignUp/>} />
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App;
