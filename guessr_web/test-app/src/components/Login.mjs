import './style/login.css'
import showPwdImg from './img/showPwd.png';
import hidePwdImg from './img/hidePwd.png';

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
            isRevealPwd: false,
            passwordType: "password",
            baseURL:"http://127.0.0.1:3000/"

        }        

        this.seePaswd = this.seePaswd.bind(this);
        this.login = this.login.bind(this);

        if (sessionStorage.getItem("signedUp")) {
            this.notificationDOMRef = React.createRef()
            Store.addNotification({
                title: "Vous êtes inscrit !",
                message: "Vous pouvez désormais vous connecter pour accéder au site",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
            sessionStorage.clear()
        }
    }

    seePaswd() {
        this.setState({isRevealPwd: !this.state.isRevealPwd})
        this.setState({passwordType: this.state.isRevealPwd ? "password" : "text"})
    }

    login() {
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

            try {
                const response = axios.post('http://127.0.0.1:3000/user/auth', {
                  username: this.state.username,
                  password: this.state.password
                });
            
                if (response.status === 200) {
                  // Login successful, allow the connection
                  console.log("true");
                } else {
                  // Login unsuccessful, do not allow the connection
                  console.log("false");
                }
            } catch (error) {
                // Handle error
                console.error(error);
            }   

            sessionStorage.setItem("username", this.state.username);
            sessionStorage.setItem("password", this.state.password);

            window.location.reload()
        }
    }

    // createPost() {
    //     const baseURL = "http://127.0.0.1:3000/user/auth"
    //     axios
    //       .post(baseURL, {
    //         username: this.state.username,
    //         password: this.state.password
    //       })
    //       .then((response) => {
    //         setPost(response.data);
    //       });
    //   }

    render() {
        return (
        <div className="app-login">
            <h1>LOGIN</h1>
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
                        <Link to="/mdpforgot" variant = "body2">
                            Mot de passe oublié ? 
                        </Link>
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