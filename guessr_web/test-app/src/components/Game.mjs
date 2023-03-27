import './style/game.css'
import React from "react";
import NavBar from './NavBar.mjs'
import { Outlet, redirect } from 'react-router-dom';
  
class Game extends React.Component {

    componentDidMount() {
        if (sessionStorage.getItem("username") == null || sessionStorage.getItem("password") == null) {
            redirect("/login")
        }
        redirect("/game")
    }

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