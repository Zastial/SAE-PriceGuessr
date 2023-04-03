import React from 'react'
import '../style/compte.css'
import Button from '../Button.mjs'
import DAOProduct from '../API.mjs'

class Modal extends React.Component {
    
  modal() {
      this.props.onDisplayModal();
  }

  render() {
      let classi = 'modal'

      if(this.props.modal) {
          classi += ' displayBlock'
      }

      return(
          <div className = {classi}>
              <div className="modal-content">
                  <span className="close" onClick={this.modal.bind(this)}>X</span>
                  <p>Êtes-vous sûr de vouloir modifier votre mot de passe ?</p>
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
      modal : false
    }
  }

  displayModal() {
    this.setState({
        modal: !this.state.modal
    })
    console.log(this.state.modal)
  }

  changePassword() {

    this.setState({
      modal: !this.state.modal
    })
    console.log(this.state.modal)

    // if(this.state.password !== '') {
    //   DAOProduct.modifyUser(sessionStorage.getItem("jwt"), this.state.password)
    // }
  }


  render() {
    return (
      <div className="compte">
        <Modal modal={this.state.modal} onDisplayModal={this.displayModal.bind(this)}/>
        <h1>Mon Compte</h1>
        <div className="compte-info">
          <input type="text" id="username" name="username" defaultValue={sessionStorage.getItem("login")}/>
          <input type="password" id="password" name="password" placeholder="***********" onChange={e => this.setState({password: e.target.value})}/>
        </div>
        <div className="button">
          <Button name="Modifier mes informations" doUpdate={this.changePassword.bind(this)}/>
        </div>
      </div>

    )
  }
}

export default Compte