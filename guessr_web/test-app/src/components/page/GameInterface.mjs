import '../style/game.css'
import React from "react";
import Button from '../Button.mjs'
  
class GameInterface extends React.Component {

    constructor(props) {
        super(props)
        this.doUpdate = this.doUpdate.bind(this)
    }

    doUpdate() {
        return 
    }

    render() {
        return (
            <div className="gameInterface">
                <div className="game-info">
                    <p> Quel est le prix de cet objet ? </p>
                    <p> Nom de l'objet </p>
                </div>
                <div className="game-guess">
                    <img className="product-picture" src="./ikea.png" alt="description produit ikea"/>
                    <p> 1 chance sur 5 </p>
                    <div className="the-guess">
                        <input/>
                        <p>€</p>
                    </div>
                </div>
                <Button name="Valider" doUpdate={this.doUpdate}/>
            </div>
        );
    }
}

export default GameInterface;