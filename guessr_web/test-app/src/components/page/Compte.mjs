import React from 'react'
import '../style/game.css'
import Button from '../Button.mjs'

class Compte extends React.Component {
  render() {
    return (
      <div className="compte">
        <h1>Mon Compte</h1>
        <div className="compte-info">
          <input type="text" id="username" name="username" defaultValue={sessionStorage.getItem("login")}/>
          <input type="text" id="password" name="password" defaultValue="***********"/>
        </div>
        <Button name="Modifier mes informations" doUpdate={""}/>
      </div>

    )
  }
}

export default Compte