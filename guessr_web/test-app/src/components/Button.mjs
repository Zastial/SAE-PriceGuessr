import './style/game.css'
import React from "react";

class Button extends React.Component {

    render() {
        return (
            <button onClick={this.props.doUpdate}> {this.props.name} </button>
        );
    }
}

export default Button;