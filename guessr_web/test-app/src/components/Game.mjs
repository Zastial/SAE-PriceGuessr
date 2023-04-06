import './style/game.css'
import React from "react";
import NavBar from './NavBar.mjs'
import { Outlet } from 'react-router-dom';
  
class Game extends React.Component {

    render() {
        return (
            <div className="game">
                <NavBar/>
                <Outlet/>
            </div>
        );
    }
}

export default Game;