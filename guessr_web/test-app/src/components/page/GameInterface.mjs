import '../style/game.css'
import React, {useState} from "react";
import Button from '../Button.mjs'
import {getProducts, getProductById, getDailyProducts, guessThePrice, getProductsByDate, register, login, deleteUser, modifyUser} from '../API.mjs';

class GameInterface extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            indexProduit:0,
            count:0,
            produits:[],
            produitCourant:[]
        }
        this.produits = []
        this.doUpdate = this.doUpdate.bind(this)
        this.before = this.before.bind(this)
        this.after = this.after.bind(this)
    }

    async componentDidMount() {
        this.produits = await getDailyProducts(sessionStorage.getItem("jwt"))
        
        this.setState({
            produits:[this.produits],
            produitCourant:this.produits[this.state.indexProduit]
        })
    }

    before() {
        console.log(this.state.indexProduit)
        if(this.state.indexProduit === 0) {
            return
        }
        this.setState({
            indexProduit : this.state.indexProduit - 1,
            produitCourant:this.produits[this.state.indexProduit-1]
        })
        console.log(this.state.indexProduit)
    }

    after() {
        console.log(this.state.indexProduit)
        if(this.state.indexProduit === 9) {
            return
        }
        this.setState({
            indexProduit: this.state.indexProduit + 1,
            produitCourant: this.produits[this.state.indexProduit+1]
        })
        console.log(this.state.indexProduit)
    }


    doUpdate(price) {
        // const guess_price = guessThePrice(sessionStorage.getItem("jwt"), this.state.produitCourant.id, price)
        // console.log(guess_price)
        console.log(this.state.produitCourant.id)
    }

    render() {
        return (
            <div className="gameInterface">
                <div className="game-info">
                    <p> Quel est le prix de cet objet ? </p>
                    <p> {this.state.produitCourant.title} </p>
                </div>
                <div className="game-guess">
                    <div className="guess-info">
                        <Button name="<" doUpdate={this.before} />
                        <img className="product-picture" src={this.state.produitCourant.imgSrc}alt="description produit ikea"/>
                        <Button name=">" doUpdate={this.after} /> 
                    </div>
                    <p> 1 chance sur 5 </p>
                    <div className="the-guess">
                        <input type="number" value={this.state.count} onChange={e => {this.setState({count : "" + Number(e.target.value)});}}/>
                        <p>€</p>
                    </div>
                </div>
                <Button name="Valider" doUpdate={e=> {this.doUpdate(e.target.value)}}/>
                <p>Produit n°{this.state.indexProduit + 1}/10</p>
            </div>
        );
    }
}

export default GameInterface;