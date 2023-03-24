import './style/navbar.css'
import React from "react";
import Button from './Button.mjs'

import {
    BrowserRouter as Router,
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
                <Router>
                    <div>
                        <h2>PriceGuessr</h2>
                        <nav>
                            <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">Historique</Link>
                            </li>
                            <li>
                                <Link to="/users">Compte</Link>
                            </li>
                            </ul>
                        </nav>
                        {/* <Button text="Deconnexion"/> */}
                    </div>
                    <Routes>
                        <Route path="/">
                            {/* <Home /> */}
                        </Route>
                        <Route path="/about">
                            {/* <About /> */}
                        </Route>
                        <Route path="/users">
                            {/* <Users /> */}
                        </Route>
                    </Routes>
                    <Button
                    name={"Déconnexion"}
                    doUpdate={this.doUpdate}
                    />
                </Router>
            </div>
        );
    }
}

export default Navbar;