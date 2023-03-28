import '../style/game.css'
import React from "react";
import Button from '../Button.mjs'
import {getProducts, getProductById, getDailyProducts, guessThePrice, getProductsByDate, register, login, deleteUser, modifyUser} from '../API.mjs';
  
class GameInterface extends React.Component {

    constructor(props) {
        super(props)
        this.doUpdate = this.doUpdate.bind(this)
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        this.setState({products : getProducts()})
        console.log(this.state.products)
    }

    doUpdate() {
        return 
    }

    render() {
        return (
            <div className="gameInterface">
                <div className="game-info">
                    <p> Quel est le prix de cet objet ? </p>
                    <p> {this.state.products} </p>
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