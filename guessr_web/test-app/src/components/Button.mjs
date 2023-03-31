import './style/button.css'
import React from "react";

class Button extends React.Component {

    constructor(props) {
        super(props);
        this.id = (this.props.id != null) ? this.props.id : " ";
    }


    render() {
        return (
            <button id={this.id} onClick={this.props.doUpdate}> {this.props.name} </button>
        );
    }
}

export default Button;