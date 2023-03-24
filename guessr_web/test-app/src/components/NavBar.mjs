import './style/navbar.css'
import React from "react";
import Button from './Button.mjs'
import Home from './page/Home.jsx'
import Historique from './page/Historique.jsx'
import Compte from './page/Compte.jsx'

import {
    Routes,
    Route,
    Link
  } from "react-router-dom";

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.doUpdate = this.doUpdate.bind(this)
    }   

    doUpdate() {}


    render() {
        return (
            <div className="navbar">
                <div>
                    <h2>PriceGuessr</h2>
                    <nav>
                        <ul>
                        <li>
                            <Link to="/home">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">Historique</Link>
                        </li>
                        <li>
                            <Link to="/users">Compte</Link>
                        </li>
                        </ul>
                    </nav>
                </div>
                <Routes>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/historique" element={<Historique/>} />
                    <Route path="/compte" element={<Compte/>} />
                </Routes>
                <Button
                name={"Déconnexion"}
                doUpdate={this.doUpdate}
                />
            </div>
        );
    }
}

export default Navbar;