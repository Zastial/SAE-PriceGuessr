import './style/game.css'
import React from "react";
import NavBar from './NavBar.mjs'
import { Outlet } from 'react-router-dom';
  
class Game extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        if (sessionStorage.getItem("username") == null || sessionStorage.getItem("password") == null) {
            <redirect to="/login"/>
        }
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