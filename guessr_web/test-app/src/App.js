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

/**
 * La fonction sessionAvailable vérifie si un jeton d'authentification (JWT) est stocké dans la session de stockage du navigateur.
 * Elle renvoie true si le jeton est présent, sinon elle renvoie false.
 * Le JWT est un jeton d'authentification qui peut être utilisé pour sécuriser les interactions entre un client et un serveur web.
 * Il est ici utilisé pour authentifier un utilisateur.
 */

function sessionAvailable() {
  return sessionStorage.getItem("jwt") !== null;
}

/**
 * La fonction error vérifie si une erreur est stockée dans la session de stockage du navigateur.
 * Elle renvoie true si une erreur est présente, sinon elle renvoie false.
 * Cette fonction est utilisée pour afficher un message d'erreur à l'utilisateur en cas d'erreur dans l'application.
 */
function error() {
  return sessionStorage.getItem("error") !== null;
}

/**
 * La fonction App() est la composante principale de l'application web.
 * Elle renvoie un élément JSX qui contient les différentes routes de l'application, gérées par le router de React Routes.
 
 * La route principale "/" affiche le composant <Login/> par défaut.
 * Également, si la fonction error() renvoie true, elle affiche le composant <Login/> avec une erreur.
 * Cependant, si la fonction sessionAvailable() renvoie true, elle affiche le composant <Game/> à la place.

 * La route "/historique" affiche le composant <Historique/> lorsqu'elle est appelée.
 * La route "/compte" affiche le composant <Compte/> lorsqu'elle est appelée.
 * La route "/signup" affiche le composant <SignUp/> lorsqu'elle est appelée.

 * La route "*" affiche le composant <NotFound/> si l'URL n'est pas trouvée dans les autres routes.
 */
function App() {

  return (
    <Routes>
      <Route path="/" element={ error() ? <Login/> : (sessionAvailable() ? <Game/> : <Login/>)}>
        <Route path="/" element={<GameInterface/>}/>
        <Route path="/historique" element={<Historique/>}/>
        <Route path="/compte" element={<Compte/>}/> 
      </Route>
      <Route path = "/signup" element={<SignUp/>} />
      <Route path='*' element={<NotFound />}/>
    </Routes>
  )
}

export default App;
