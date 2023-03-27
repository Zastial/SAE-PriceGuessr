import './style/game.css'
import React from "react";
import NavBar from './NavBar.mjs'
  
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
                <NavBar />
                {/* <GameScreen/> */}
            </div>
        );
    }
}

export default Game;