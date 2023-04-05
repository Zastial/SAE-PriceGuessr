import React from "react";
import Button from './Button.mjs'

import {Link} from "react-router-dom";

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.doUpdate = this.doUpdate.bind(this)
    }   

    doUpdate() {
        sessionStorage.clear()
        window.location.reload()
        window.location="/"
    }


    render() {
        return (
            <div className="navbar">
                <div className="nav-content">
                    <h2 onClick={() => {window.location = '/'}}>PriceGuessr</h2>
                    <nav>
                        <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/historique">Historique</Link>
                        </li>
                        <li>
                            <Link to="/compte">Compte</Link>
                        </li>
                        </ul>
                    </nav>
                </div>
                <Button
                name={"Déconnexion"}
                doUpdate={this.doUpdate}
                />
            </div>
        );
    }
}

export default Navbar;