import './style/game.css'
import React from "react";
  
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
                <h1>GAME</h1>
                {/* <NavBar /> */}
                {/* <GameScreen/> */}
            </div>
        );
    }
}

export default Game;