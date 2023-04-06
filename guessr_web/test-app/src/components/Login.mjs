import './style/login.css'
import showPwdImg from './img/showPwd.png';
import hidePwdImg from './img/hidePwd.png';
import loginIMG from './img/LoginB.png';

import {Link} from "react-router-dom";
import React from "react";
import { Store } from 'react-notifications-component';

import axios from "axios";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            jwt : "",
            isRevealPwd: false,
            passwordType: "password",
            baseURL:"http://127.0.0.1:3000/"

        }        

        this.seePaswd = this.seePaswd.bind(this);
        this.login = this.login.bind(this);
    }

    /**
     * La fonction componentDidMount est une méthode du cycle de vie de React qui est appelée automatiquement après le montage d'un composant dans le DOM.
     * Dans ce cas, la fonction vérifie si une erreur est stockée dans la session et affiche une notification d'erreur en conséquence
     * à l'aide de la bibliothèque react-notifications-component. Si une erreur est présente, elle est ensuite effacée de la session.
     */
    componentDidMount() {
        if (sessionStorage.getItem("error") !== null) {
            Store.addNotification({
                title: "Erreur",
                message: `${sessionStorage.getItem("error")}`,
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            })
            sessionStorage.clear()
        }
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
     * La méthode "login" est asynchrone et s'occupe de vérifier les informations de connexion saisies par l'utilisateur.
     * Si les champs sont correctements remplis, la méthode envoie une requête POST à l'API pour tenter de s'authentifier avec les informations saisies.
     * 
     * Si l'authentification réussit, le jeton d'authentification et le nom d'utilisateur sont stockés dans sessionStorage.
     * La page est ensuite rechargée et l'état de la variable jwt est mis à jour.
     * 
     * Si l'authentification échoue, une notification d'erreur est affichée à l'utilisateur pour l'informer que les informations de connexion sont incorrectes.
     */
    async login() {
        if (!this.state.username.replace(/\s+/, '').length) {
            document.getElementById('username').style.borderBlockColor = "red";
        } else {
            document.getElementById('username').style.borderBlockColor = "";
        }
        if (!this.state.password.replace(/\s+/, '').length) {
            document.getElementById('password').style.borderBlockColor = "red";
        } else {
            document.getElementById('password').style.borderBlockColor = "";
        }

        if (this.state.password.replace(/\s+/, '').length && this.state.username.replace(/\s+/, '').length) {

            let ok = true
            const response = await axios.post('http://127.0.0.1:3000/user/auth', {
                login: this.state.username,
                password: this.state.password
            }).catch(function (error) {
                if (error.response.status === 400) {
                    ok = false
                }   
            } );

            if (ok) {
                sessionStorage.setItem("jwt", response.data['token']);
                sessionStorage.setItem("login", this.state.username);

                this.setState({jwt:response.data['token']})   

                window.location.reload()
            } else {
                Store.addNotification({
                    title: "Erreur : mauvais identifiants !",
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
                <img src={loginIMG} alt="signup"/>
            </div>
            <form className="app-form-login">
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
                    </div>
                
                    <div className="accounts">
                        <Link to="/" onClick={this.login} className="connect-button" variant = "body2">
                            Se connecter
                        </Link>
                        <Link to="/signup" variant = "body2">
                            Pas de compte ? Inscrivez-vous 
                        </Link>
                    </div>
                </div>
            </form>

        </div>
        );
    }
}

export default Login;