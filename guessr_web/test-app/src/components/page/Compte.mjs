import React from 'react'
import '../style/compte.css'
import Button from '../Button.mjs'
import DAOProduct from '../API.mjs'
import { Store } from 'react-notifications-component';

class Modal extends React.Component {

  render() {
      let classi = 'modal'

      if(this.props.modal) { 
          classi += ' displayBlock'
      }

      return(
          <div className = {classi}>
              <div className="modal-content">
                  <span aria-hidden="true" className="close" onClick={this.props.onDisplayModal.bind(this)}>&times;</span>
                  <p>{this.props.textModal}</p>
                  <div className="confirmation">
                    <Button id="confirmer" name="Confirmer" doUpdate={this.props.ok.bind(this)}/>
                    <Button id="annuler" name="Annuler" doUpdate={this.props.onDisplayModal.bind(this)}/>
                  </div>
              </div>
          </div>
      )
  }
}

class Compte extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      password : '',
      modal : false,
      textModal:"",
      ok : false
    }
  }

  displayModal() {
    this.setState({
        modal: !this.state.modal
    })
  }

  okModify() {
    console.log(this.state.password)
    DAOProduct.modifyUser(sessionStorage.getItem("jwt"), this.state.password)
    this.setState({
      modal: !this.state.modal
    })
    Store.removeAllNotifications()
    Store.addNotification({
      title: "Mot de passe modifié",
      message: "Votre mot de passe a bien été modifié !",
      type: "success",
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 6000,
        onScreen: true
      }
    })   
  }

  changePassword() {
    if(this.state.password !== '') {
      this.setState({
        textModal: "Êtes-vous sûr de vouloir modifier votre mot de passe ?",
        modal: !this.state.modal
      })
    } else {
      Store.removeAllNotifications()
      Store.addNotification({
          title: "Le mot de passe ne doit pas être vide",
          message: "Merci de rentrer un mot de passe non vide!",
          type: "warning",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 6000,
            onScreen: true
          }})
    }
  }

  deleteAccount() {
    this.setState({
      textModal: "Êtes-vous sûr de vouloir supprimer votre compte ?",
      modal: !this.state.modal,
      ok : true
    })
  }

  async okDelete() {
    await DAOProduct.deleteUser(sessionStorage.getItem("jwt"))
    sessionStorage.clear()
    window.location.reload()
  }


  render() {
    return (
      <div className="compte">
        <Modal modal={this.state.modal} textModal={this.state.textModal} onDisplayModal={this.displayModal.bind(this)} ok={(this.state.ok) ? this.okDelete.bind(this) : this.okModify.bind(this)}/>
        <h1>Mon Compte</h1>
        <div className="compte-info">
          <input type="text" id="username" name="username" defaultValue={sessionStorage.getItem("login")}/>
          <input type="password" id="password" name="password" placeholder="***********" onChange={e => this.setState({password: e.target.value})}/>
        </div>
        <div className="button">
          <Button name="Modifier mes informations" doUpdate={this.changePassword.bind(this)}/>
        </div>
        <div className="delete">
          <Button name="Supprimer compte" doUpdate={this.deleteAccount.bind(this)}/>
        </div>
      </div>

    )
  }
}

export default Compte