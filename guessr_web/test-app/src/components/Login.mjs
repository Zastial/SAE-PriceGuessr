import './style/login.css'
import showPwdImg from './img/showPwd.png';
import hidePwdImg from './img/hidePwd.png';


import React from "react";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isRevealPwd: false,
            passwordType: "password"
        }
        this.seePaswd = this.seePaswd.bind(this);
    }

    seePaswd() {
        this.setState({isRevealPwd: !this.state.isRevealPwd})
        this.setState({passwordType: this.state.isRevealPwd ? "password" : "text"})
    }

    render() {
        return (
        <div className="app-login">
            <h1>LOGIN</h1>
            <form className="app-form-login">
                <div className="content">
                    <label>Username</label>
                    <input type="text" name="username" />

                    <label>Password</label>
                    <div className="passwd">
                        <input type={this.state.passwordType} name="password" id="password"/>
                        <img title={this.state.isRevealPwd ? "Hide password" : "Show password"}
                        onClick={this.seePaswd}
                        src={this.state.isRevealPwd ? hidePwdImg : showPwdImg}
                        alt="imgShowHide"/>
                    </div>

                    <div className="accounts">
                        <a href="localhost">Forgot Password</a>
                        <input type="submit" value="Login in"/>
                    </div>
                    <a href="localhost">SIGN UP</a>
                </div>
            </form>

        </div>
        );
    }
}

export default Login;