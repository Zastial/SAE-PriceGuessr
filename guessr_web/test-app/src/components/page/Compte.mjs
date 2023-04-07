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

  /**
   * Cette fonction permet de changer l'état (ouverture/fermeture) d'une modal dans le composant.
   */
  displayModal() {
    this.setState({
        modal: !this.state.modal
    })
  }

  /**
   * Cette fonction est une méthode asynchrone qui modifie le mot de passe de l'utilisateur.
   * Elle utilise l'API DAOProduct pour envoyer une requête à un serveur, avec le jeton de sécurité JWT stocké en session,
   * et le nouveau mot de passe saisi par l'utilisateur.
   * Ensuite, elle stocke le nouveau jeton de sécurité renvoyé par le serveur dans la session.
   * Elle affiche une notification de confirmation de modification de mot de passe et ferme la boîte de dialogue de modification de mot de passe.
   */
  async okModify() {
    await DAOProduct.modifyUser(sessionStorage.getItem("jwt"), this.state.password)

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

  /**
   * La méthode changePassword permet de changer le mot de passe de l'utilisateur.
   * Elle commence par vérifier si le champ de saisie du mot de passe n'est pas vide.
   * Si c'est le cas, elle affiche une notification pour demander à l'utilisateur de saisir un mot de passe non vide.
   * Sinon, elle affiche une fenêtre modale pour demander la confirmation de la modification du mot de passe.
   */
  changePassword() {
    if(this.state.password !== '') {
      this.setState({
        textModal: "Êtes-vous sûr de vouloir modifier votre mot de passe ?",
        modal: !this.state.modal,
        ok : false
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
        }
      })
    }
  }

  /**
   * Cette fonction modifie l'état du composant pour afficher une boîte de dialogue modale demandant à l'utilisateur s'il est sûr de vouloir supprimer son compte.
   */
  deleteAccount() {
    this.setState({
      textModal: "Êtes-vous sûr de vouloir supprimer votre compte ?",
      modal: !this.state.modal,
      ok : true
    })
  }

  /**
   * Cette fonction supprime l'utilisateur actuel en appelant la fonction deleteUser de l'objet DAOProduct avec le JWT stocké dans sessionStorage.
   */
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