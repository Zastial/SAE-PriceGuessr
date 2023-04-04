import React from 'react'
import '../style/historique.css'
import { DAOProduct } from '../API.mjs';

class Modal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      product : [],
      productAvailability : [0]
    }
    this.test = []
    this.onDisplayModal = this.onDisplayModal.bind(this)
    this.blockScroll = this.blockScroll.bind(this)
  }

  async componentDidMount() {
    let pA = []
    try {
      pA = await DAOProduct.getProductAvailability(sessionStorage.getItem("jwt"), this.props.produitModal.id)
    } catch(error) {
      for (const i in this.props.produitModal.length) {
        pA.push(i)
      }
    }
    this.setState({
      product : this.props.produitModal,
      productAvailability : pA
    })
    this.test = pA
  }

  blockScroll() {
    console.log("here")
    const scrollContainer2 = document.querySelector(".allproducts .villes");
    scrollContainer2.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      if(evt.deltaY >= 0) {
        scrollContainer2.scrollTop += (evt.deltaY-80);
      } else {
        scrollContainer2.scrollTop += (evt.deltaY+80);
      }
    });
  }

  onDisplayModal() {
    const scrollContainer = document.querySelector(".allproducts");
    scrollContainer.setAttribute("style", "overflow-x: hidden");
    this.props.displayModal()
  }

  eachMag(tab) {
    const tabMagName = []
    for (const mag in tab) {
      tabMagName.push(
        <li>
          <a href={`https://www.google.com/maps/search/?api=1&query=${tab[mag].latitude}%2C${tab[mag].longitude}`} target="blank">
            {tab[mag].name}
          </a>
        </li>)
    }
    return (
      <ul className="product-mag-info">
        {tabMagName}
      </ul>
    )
  }

  render() {
    let classi = 'modal'

    if(this.props.modal) { 
        classi += ' displayBlock'
    }

    return(
        <div className = {classi}>
            <div className="modal-content">
              <div className="productInfo">
                <p>{this.state.product.title}</p>
                <p>{this.state.product.price} €</p>
                <div className="image">
                  <img src={this.state.product.imgSrc} alt={this.state.product.title}/>
                </div>
              </div>
              <div className="magList" onScroll={this.blockScroll}>
                <h2>Disponibilités :</h2>
                <div className="villes" onScroll={this.blockScroll}>
                  {this.eachMag(this.state.productAvailability)}
                </div>
              </div>
              <span aria-hidden="true" className="close" onClick={this.onDisplayModal}>&times;</span>
            </div>
        </div>
    )
  }
}

class ProductColumn extends React.Component {
  render() {
    return(
      <ul className="product-column">
        {this.props.prod}
      </ul>
    )
  }
}

class Product extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      modal:false,
      prodAvailable : []
    }
    this.onDisplayModal = this.onDisplayModal.bind(this)
    this.onProductClick = this.onProductClick.bind(this)
  }

  onDisplayModal() {
    this.setState({modal: !this.state.modal})
  }

  async onProductClick() {

    const scrollContainer = document.querySelector(".allproducts");
    scrollContainer.setAttribute("style", "overflow-x: clip");

    this.setState({modal: !this.state.modal})
    for(const obj in this.props.prodsAvailable) {
      if (this.props.prodsAvailable[obj].length !== 0) {
        this.setState({
          prodAvailable : this.props.prodsAvailable[obj]
        })
      }
    }
  }

  render() {
    return (
      <div className="fullModalContent">
        <Modal produitModal={this.props.prod} produitAvailability={this.props.prodsAvailable} modal={this.state.modal} displayModal={this.onDisplayModal} />
        <li key={this.props.prod.id} className="prod">
          <div className="linkToProduct" onClick={ this.onProductClick}>
              <img src={this.props.prod.imgSrc} alt={this.props.prod.title}/>
              <div className="product-info">
                  <h3>{this.props.prod.title}</h3>
                  <h3>{this.props.prod.price} €</h3>
              </div>
          </div>
        </li>
      </div>
    )
  }
}

class ProductList extends React.Component {

  render() {
    let products = []
    for (let i = 0; i < this.props.products.length; i++) {
      products.push(<Product prod={this.props.products[i]} prodsAvailable={this.props.prodsAvailable}/>)
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
      prodsAvailable : []
    }
  }
  
  async componentDidMount() {
    this.setState({
      produitsHistorique : await DAOProduct.getProducts(sessionStorage.getItem("jwt")),
    })
    for(const obj in this.state.produitsHistorique) {
      try {
        const prodAvailable = await DAOProduct.getProductAvailability(sessionStorage.getItem("jwt"), this.state.produitsHistorique[obj].id)
        this.setState({ prodsAvailable: [...this.state.prodsAvailable, prodAvailable] })
      } catch(error) {
        break
      }
    }

    const scrollContainer = document.querySelector(".allproducts");
    scrollContainer.addEventListener("wheel", (evt) => {
      evt.preventDefault();
      if(evt.deltaY >= 0) {
        scrollContainer.scrollLeft += (evt.deltaY-60);
      } else {
        scrollContainer.scrollLeft += (evt.deltaY+60);
      }
    });

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
        <div className="allproducts">
          <ProductList products={this.state.produitsHistorique} prodsAvailable={this.state.prodsAvailable}/>
        </div>
      </div>
    )
  }
}

export default Historique