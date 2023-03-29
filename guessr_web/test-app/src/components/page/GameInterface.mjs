import '../style/game.css'
import React, {useState} from "react";
import Button from '../Button.mjs'
import {getProducts, getProductById, getDailyProducts, guessThePrice, getProductsByDate, register, login, deleteUser, modifyUser} from '../API.mjs';
import { Store } from 'react-notifications-component';


class GameInterface extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            indexProduit:0,
            count:0,
            produits:[],
            produitCourant:[],
            isPVisible:false
        }
        this.produits = []
        this.guessChance={}
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

        const produits = this.produits
        for (const i in this.produits){
            this.guessChance[produits[i].id] = 5
        }
    }

    before() {
        if(this.state.indexProduit === 0) {
            return
        }
        this.setState({
            indexProduit : this.state.indexProduit - 1,
            produitCourant:this.produits[this.state.indexProduit-1],
            isPVisible: false
        })
        if (this.guessChance[this.produits[this.state.indexProduit-1].id] < 5) {
            this.setState({
                isPVisible: true
            })
        }
    }

    after() {
        if(this.state.indexProduit === 9) {
            return
        }
        this.setState({
            indexProduit: this.state.indexProduit + 1,
            produitCourant: this.produits[this.state.indexProduit+1],
            isPVisible: false
        })

        if (this.guessChance[this.produits[this.state.indexProduit+1].id] < 5) {
            this.setState({
                isPVisible: true
            })
        }
    }

    async doUpdate(price) {
        console.log(`prix :${this.state.produitCourant.price}`)
        console.log(`prix rentré :${price}`)
        const guess_price = await guessThePrice(sessionStorage.getItem("jwt"), this.state.produitCourant.id, price)
        console.log(guess_price)

        this.guessChance[this.state.produitCourant.id] = guess_price['guessRemaining']
        this.setState({
            isPVisible:true
        })

        if(guess_price['maxGuessReached']) {
            Store.addNotification({
                title: "Nombre de guess insuffisant",
                message: "Vous n'avez plus de guess disponible. Changez de produit ou revenez demain !",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 1000000000,
                  onScreen: true
                }
            });
            return
        }

        if(guess_price['correct']) {
            Store.addNotification({
                title: "Félicitations !! ",
                message: "Vous avez trouvé le juste prix ! Essayez un autre produit ou revenez demain !",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
                }
            });
            return
        }



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
                    <div className='guess-board'>
                        <p className={(this.state.isPVisible) ? "block" : "none" }> {this.guessChance[this.state.produitCourant.id]} chances restantes </p>
                    </div>
                    <div className="the-guess">
                        <input type="number" value={this.state.count} onChange={e => {this.setState({count : "" + Number(e.target.value)});}}/>
                        <p>€</p>
                    </div>
                </div>
                <Button name="Valider" doUpdate={e=> {this.doUpdate(this.state.count)}}/>
                <p>Produit n°{this.state.indexProduit + 1}/10</p>
            </div>
        );
    }
}

export default GameInterface;