import './style/login.css'
import showPwdImg from './img/showPwd.png';
import hidePwdImg from './img/hidePwd.png';
import registerIMG from './img/RegisterB.png';

import { Link } from "react-router-dom";
import React from "react";
import { Store } from 'react-notifications-component';

import axios from "axios";

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            isRevealPwd: false,
            passwordType: "password",
        }
        this.seePaswd = this.seePaswd.bind(this);
        this.login = this.login.bind(this);
    }

    /** 
     * La fonction seePaswd utilise l'état local (state) pour permettre de basculer entre l'affichage en clair ou masqué
     * du mot de passe dans un champ de formulaire. 
    */
    seePaswd() {
        this.setState({isRevealPwd: !this.state.isRevealPwd})
        this.setState({passwordType: this.state.isRevealPwd ? "password" : "text"})
    }

    /**
     * La fonction login() est une méthode asynchrone qui vérifie si les champs d'entrée du formulaire de connexion ont été remplis correctement.
     * Si les champs sont correctement remplis, elle envoie une demande de connexion à l'API et redirige l'utilisateur vers la page d'accueil.
     * Si une erreur se produit, elle affiche une notification à l'utilisateur.
     *
     * Si tous les champs sont remplis correctement, la fonction envoie une requête POST à l'URL http://127.0.0.1:3000/user/register en utilisant Axios,
     * une bibliothèque JavaScript pour les requêtes HTTP.
     *
     * Si l'envoi de la demande est réussi, la page est redirigée vers la page d'accueil.
     * Si une erreur de réponse est renvoyée par le serveur, la méthode Store.addNotification() est appelée pour afficher une notification à l'utilisateur.
     */
    async login() {
        if (!this.state.username.replace(/\s+/, '').length) {
            document.getElementById('username').style.borderBlockColor = "red";
            document.getElementById('username').setCustomValidity("Veuillez entrer un nom d'utilisateur.");
            document.getElementById('username').reportValidity();
        } else {
            document.getElementById('username').style.borderBlockColor = "";
        }
        if (!this.state.password.replace(/\s+/, '').length) {
            document.getElementById('password').style.borderBlockColor = "red";
            document.getElementById('password').setCustomValidity("Veuillez entrer un mot de passe.");
            document.getElementById('password').reportValidity();
        } else {
            document.getElementById('password').style.borderBlockColor = "";
        }
        if (!this.state.confirmPassword.replace(/\s+/, '').length) {
            document.getElementById('confirmPassword').style.borderBlockColor = "red";
            document.getElementById('confirmPassword').setCustomValidity("Veuillez confirmer votre mot de passe.");
            document.getElementById('confirmPassword').reportValidity();
        } else {
            document.getElementById('confirmPassword').style.borderBlockColor = "";
        }

        if (this.state.password.replace(/\s+/, '').length && this.state.username.replace(/\s+/, '').length && this.state.confirmPassword.replace(/\s+/, '').length) {
            if (this.state.password !== this.state.confirmPassword) {
                document.getElementById('password').style.borderBlockColor = "red";
                document.getElementById('confirmPassword').style.borderBlockColor = "red";
                document.getElementById('confirmPassword').setCustomValidity("Les mots de passe ne correspondent pas.");
                document.getElementById('confirmPassword').reportValidity();
                return
            }
            
            let ok = true
            await axios.post('http://127.0.0.1:3000/user/register', {
                login: this.state.username,
                password: this.state.password
            }).catch(function (error) {
                if (error.response) {
                    ok = false
                }
            } );

            if (ok) {
                window.location.replace("/")
            } else {
                Store.addNotification({
                    title: "Erreur : Un utilisateur avec le même nom existe déjà !",
                    message: "Merci de réessayer",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                });
            }
        }
    }

    render() {
        return (
        <div className="app-login">
            <div className="img">
                <img src={registerIMG} alt="signup"/>
            </div>            <form className="app-form-login">
                <div className="content">

                    <div className="content-logins">
                        <label>Username</label>
                        <input type="text" id="username" name="username" onChange={e => this.setState({username: e.target.value})}/>

                        <label>Password</label>
                        <div className="passwd">
                            <input type={this.state.passwordType} name="password" id="password" onChange={e => this.setState({password: e.target.value})}/>
                            <span>
                                <img title={this.state.isRevealPwd ? "Hide password" : "Show password"}
                                onClick={this.seePaswd}
                                src={this.state.isRevealPwd ? hidePwdImg : showPwdImg}
                                alt="imgShowHide"/>
                            </span>
                        </div>

                        <label>Confirm Password</label>
                        <div className="passwd">
                            <input type={this.state.passwordType} name="confirmPassword" id="confirmPassword" onChange={e => this.setState({confirmPassword: e.target.value})}/>
                            <span>
                                <img title={this.state.isRevealPwd ? "Hide password" : "Show password"}
                                onClick={this.seePaswd}
                                src={this.state.isRevealPwd ? hidePwdImg : showPwdImg}
                                alt="imgShowHide"/>
                            </span>
                        </div>
                    </div>
                
                    <div className="accounts">
                        <div className="butSignUp" onClick={this.login}>S'inscrire</div>
                        {/**
                         *   Le composant Link permet à l'utilisateur de naviguer entre différentes pages en cliquant sur les liens.
                         *  Le composant Link crée des liens qui s'actualisent automatiquement lorsque l'utilisateur clique dessus,
                         * sans que la page entière ne soit rechargée. Cela permet une expérience utilisateur plus fluide et rapide. 
                        */}
                        <Link to="/" variant = "body2"> 
                            Déjà un compte ? Connectez-vous 
                        </Link>                        
                    </div>
                </div>
            </form>

        </div>
        );
    }
}

export default SignUp;