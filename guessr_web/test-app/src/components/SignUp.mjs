import './style/login.css'
import showPwdImg from './img/showPwd.png';
import hidePwdImg from './img/hidePwd.png';

import {Link, redirect} from "react-router-dom";
import React from "react";

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

    seePaswd() {
        this.setState({isRevealPwd: !this.state.isRevealPwd})
        this.setState({passwordType: this.state.isRevealPwd ? "password" : "text"})
    }

    login() {
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
            //logins BDD

            sessionStorage.setItem("signedUp", true)
            redirect("/")
        }
    }

    render() {

        return (
        <div className="app-login">
            <h1>SIGN UP</h1>
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
                        <a href="localhost">Forgot Password</a>
                        <Link to="/" onClick={this.login} variant = "body2">
                            Se connecter
                        </Link>
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