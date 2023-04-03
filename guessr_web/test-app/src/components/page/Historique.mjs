import React from 'react'
import '../style/historique.css'
import { DAOProduct } from '../API.mjs';

class Modal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      product : [],
      productAvailability : []
    }
    this.onDisplayModal = this.onDisplayModal.bind(this)
  }

  async componentDidMount() {
    if (this.props.id !== 0) {
      const product = await DAOProduct.getProducts(sessionStorage.getItem("jwt"), this.props.id)
      const productAvailability = await DAOProduct.getProductAvailability(sessionStorage.getItem("jwt"), this.props.id)
  
      this.setState({
        product:product,
        productAvailability: productAvailability
      })
    }
  }

  onDisplayModal() {
    this.props.onDisplayModal()
  }

  render() {
    let classi = 'modal'

    if(this.props.modal) { 
        classi += ' displayBlock'
    }    

    console.log(this.state.product)

    return(
        <div className = {classi}>
            <div className="modal-content">
                <span aria-hidden="true" className="close" onClick={this.onDisplayModal}>&times;</span>
                <p>{this.state.product.title}</p>
                <p>{this.state.productAvailability.stock}</p>
                <div className="image">
                  <img src={this.state.product.src} alt={this.state.product.title}/>
                </div>
            </div>
        </div>
    )
  }
}

class ProductColumn extends React.Component {
    
  render() {
    return(
      <ul>
        {this.props.prod}
      </ul>
    )
  }
}

class Product extends React.Component {

  constructor(props) {
    super(props)
    this.onDisplayModal = this.onDisplayModal.bind(this)
  }

  onDisplayModal() {
    this.props.onDisplayModal(this.props.prod.id)
  }

  render() {
      return (
          <li key={this.props.prod.id} className="prod">
              <div className="linkToProduct" onClick={this.onDisplayModal}>
                  <img src={this.props.prod.imgSrc} alt={this.props.prod.title}/>
                  <div className="product-info">
                      <h3>{this.props.prod.title}</h3>
                      <h3>{this.props.prod.price} €</h3>
                  </div>
              </div>
          </li>
      )
  }
}

class ProductList extends React.Component {

  constructor(props) {
    super(props)
    this.onDisplayModal = this.onDisplayModal.bind(this)
  }

  onDisplayModal(id) {
    this.props.onDisplayModal(id)
  }

  render() {
    let products = []
    for (let i = 0; i < this.props.products.length; i++) {
      products.push(<Product onDisplayModal={this.onDisplayModal} prod={this.props.products[i]}/>)
    }

    const productsColumn = []
    for (let i = 0; i < products.length; i+4) {
      let productsTwo = []
      productsTwo.push(products.splice(0,4))
      productsColumn.push(<ProductColumn prod={productsTwo}/>)
      productsTwo = []
    }

    return (
      <div className="content-columns">
          {productsColumn}
      </div>
    )
  }
}

class Historique extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      produitsHistorique : [],
      modal : false,
      modalID : 0
    }
    this.onDisplayModal = this.onDisplayModal.bind(this)
  }
  
  async componentDidMount() {
    this.setState({
      produitsHistorique : await DAOProduct.getProducts(sessionStorage.getItem("jwt"))
    })

    const scrollContainer = document.querySelector(".historique");

    scrollContainer.addEventListener("wheel", (evt) => {
        evt.preventDefault();
        scrollContainer.scrollLeft += (evt.deltaY-60);
    });
  }

  onDisplayModal(id=0) {
    this.setState({
      modal: !this.state.modal, 
      modalID:id})
  }

  getCurrentDate(){
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();
    
    return `${year}-0${month}-${date}`
  }

  render() {
    return (
      <div className="historique">
        <h1>Historique</h1>
        <Modal id={this.state.modalID} modal={this.state.modal} onDisplayModal={this.onDisplayModal} />
        <div className="allproducts">
          <ProductList modal={this.onDisplayModal} products={this.state.produitsHistorique}/>
        </div>
      </div>
    )
  }
}

export default Historique