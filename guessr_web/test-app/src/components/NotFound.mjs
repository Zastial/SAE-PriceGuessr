import './style/notfound.css'
import React from "react";
import { Link } from 'react-router-dom';
  
class NotFound extends React.Component {

    constructor(props) {
        super(props);
        this.doUpdate = this.doUpdate.bind(this);
    }

    doUpdate() {
        <redirect to="/login"/>
    }

    render() {
        return (
            <div className="notfound">
                <h1>Cette page n'existe pas</h1>
                <div className="game-link">
                <Link class="link" to="/">Accueil</Link>
                </div>
            </div>
        );
    }
}

export default NotFound;