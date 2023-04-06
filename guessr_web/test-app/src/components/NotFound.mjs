import './style/notfound.css'
import React from "react";
import { Link } from 'react-router-dom';


/**
 * La class NotFound est affichée lorsqu'un utilisateur essaie d'accéder à une URL qui n'existe pas
 */
class NotFound extends React.Component {

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