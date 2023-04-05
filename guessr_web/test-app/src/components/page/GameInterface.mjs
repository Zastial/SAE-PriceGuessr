import '../style/game.css'
import React from "react";
import Button from '../Button.mjs'
import {DAOProduct} from '../API.mjs';
import { Store } from 'react-notifications-component';
import JSON from 'json5'

import thumbup from "../img/thumbup.png";
import thumbdown from "../img/thumbdown.png";
import check from "../img/check.png";
import notCheck from "../img/notcheck.png";
import nothing from "../img/nothing.png"

class GameInterface extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            indexProduit:0,
            count:0,
            produits:[],
            produitCourant:[],
            isPVisible:false,
            isLower : false,
        }
        this.produits = []
        this.guessChance={}
        this.guessPriceCorrect=[thumbup, thumbdown, check, notCheck, nothing]
        this.indexIMG = 4
        this.doUpdate = this.doUpdate.bind(this)
        this.before = this.before.bind(this)
        this.after = this.after.bind(this)
    }

    async componentDidMount() {
        this.produits = await DAOProduct.getDailyProducts(sessionStorage.getItem("jwt"))
        
        this.setState({
            produits:[this.produits],
            produitCourant:this.produits[this.state.indexProduit]
        })

        if(sessionStorage.getItem("guessChance") === null ||sessionStorage.getItem("guessChance").length === 0) {
            const produits = this.produits
            for (const i in this.produits){
                this.guessChance[produits[i].id] = 5
            }
            sessionStorage.setItem("guessChance", JSON.stringify(this.guessChance))
        } else {
            this.guessChance = JSON.parse(sessionStorage.getItem("guessChance"))
            this.setState({
                isPVisible:true 
            })
        }      
    }

    before() {
        if(this.state.indexProduit === 0) {
            this.setState({
                indexProduit : 9,
                produitCourant: this.produits[9],
                isPVisible: false,
                count : 0
            })

            if (this.guessChance[this.produits[9].id] < 5) {
                this.setState({
                    isPVisible: true
                })
            }
        } else {
            this.setState({
                indexProduit : this.state.indexProduit - 1,
                produitCourant:this.produits[this.state.indexProduit-1],
                isPVisible: false,
                count : 0
            })

            if (this.guessChance[this.produits[this.state.indexProduit-1].id] < 5) {
                this.setState({
                    isPVisible: true
                })
            }
        }

        this.indexIMG = 4
        document.getElementById("inputGuessPrice").disabled = false;
        document.getElementById("buttonGuessPrice").disabled = false;
        document.getElementById("buttonGuessPrice").style.backgroundColor = "black";
    }

    after() {
        if(this.state.indexProduit === 9) {
            this.setState({
                indexProduit : 0,
                produitCourant:this.produits[0],
                isPVisible: false,
                count : 0
            })

            if (this.guessChance[this.produits[0].id] < 5) {
                this.setState({
                    isPVisible: true
                })
            }
        } else {
            this.setState({
                indexProduit: this.state.indexProduit + 1,
                produitCourant: this.produits[this.state.indexProduit+1],
                isPVisible: false,
                count : 0
            })

            if (this.guessChance[this.produits[this.state.indexProduit+1].id] < 5) {
                this.setState({
                    isPVisible: true
                })
            }
        }
        this.indexIMG = 4
        document.getElementById("inputGuessPrice").disabled = false;
        document.getElementById("buttonGuessPrice").disabled = false;
        document.getElementById("buttonGuessPrice").style.backgroundColor = "black";
    }

    async doUpdate(price) {
        const guess_price = await DAOProduct.guessThePrice(sessionStorage.getItem("jwt"), this.state.produitCourant.id, price)

        this.guessChance[this.state.produitCourant.id] = guess_price['guessRemaining']
        sessionStorage.setItem("guessChance", JSON.stringify(this.guessChance))

        const isLower = (guess_price['correctPriceIsLess']) ? true : false  
        this.setState({
            isPVisible:true,
            isLower : isLower
        })

        this.indexIMG = (guess_price['correctPriceisLess']) ? 0 : 1


        if(guess_price['guessRemaining'] === 0) {
            Store.removeAllNotifications()
            Store.addNotification({
                title: "Nombre de guess insuffisant",
                message: `Vous n'avez plus de guess disponible. \n Le prix de ce produit était ${this.state.produitCourant.price} !`,
                type: "warning",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
                }
            });
            this.indexIMG = 3;
            this.setState({
                count: this.state.produitCourant.price
            })
            document.getElementById("inputGuessPrice").disabled = true;
            document.getElementById("buttonGuessPrice").disabled = true;
            document.getElementById("buttonGuessPrice").style.backgroundColor = "grey";
            return
        }

        if(guess_price['correct']) {
            Store.removeAllNotifications()
            Store.addNotification({
                title: "Félicitations !! ",
                message: "Vous avez trouvé le juste prix ! Essayez un autre produit ou revenez demain !",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
                }
            });
            this.indexIMG = 2;

            const value = sessionStorage.getItem["correctGuess"]
            value[this.produitCourant.id] = true
            sessionStorage.setItem["correctGuess"] = value
            document.getElementById("inputGuessPrice").disabled = true;
            document.getElementById("buttonGuessPrice").disabled = true;
            document.getElementById("buttonGuessPrice").style.backgroundColor = "grey";
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
                        <img className="product-picture" src={this.state.produitCourant.imgSrc} alt="description produit ikea"/>
                        <Button name=">" doUpdate={this.after} /> 
                    </div>
                    <div className='guess-board'>
                        <p style={(this.state.isPVisible) ? {"visibility" : "visible"} : {"visibility" : "hidden"}}> {this.guessChance[this.state.produitCourant.id]} chances restantes </p>
                    </div>
                    <div className="the-guess">
                        <input id="inputGuessPrice" type="number" min="0" value={this.state.count} onChange={e => {this.setState({count : "" + Number(e.target.value)});}}/>
                        <p>€</p>
                        <img className="rightPrice" src={this.guessPriceCorrect[this.indexIMG]} alt="itIsTheRightPrice"/>
                    </div>
                </div>
                <Button id="buttonGuessPrice" name="Valider" doUpdate={e=> {this.doUpdate(this.state.count)}}/>
                <p>Produit n°{this.state.indexProduit + 1}/10</p>
                <p style={(this.state.isPVisible) ? {"visibility" : "visible"} : {"visibility" : "hidden"}}>{(this.state.isLower) ? "Le prix est inférieur" : "Le prix est supérieur"}</p>
            </div>
        );
    }
}

export default GameInterface;