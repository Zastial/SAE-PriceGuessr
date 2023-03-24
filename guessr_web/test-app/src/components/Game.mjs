import './style/game.css'
import React from "react";
import NavBar from "./NavBar.mjs"
  
class Game extends React.Component {

    // constructor(props) {
    //     super(props);
    // }


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