import React from 'react'
import '../style/historique.css'
import { DAOProduct } from '../API.mjs';

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
  render() {
      return (
          <li key={this.props.prod.id} className="prod">
              <a className="linkToProduct" href={`/historique`}>
                  <img src={this.props.prod.imgSrc} alt={this.props.prod.title}/>
                  <div className="product-info">
                      <h3>{this.props.prod.title}</h3>
                      <h3>{this.props.prod.price} €</h3>
                  </div>
              </a>
          </li>
      )
  }
}

class ProductList extends React.Component {

  render() {
    let products = []
    for (let i = 0; i < this.props.products.length; i++) {
      products.push(<Product prod={this.props.products[i]}/>)
    }

    const productsColumn = []
    for (let i = 0; i < products.length; i++) {
      let productsTwo = []
      productsTwo.push(products.splice(0,4))
      productsColumn.push(<ProductColumn prod={productsTwo}/>)
      productsTwo = []
    }

    return (
      <div className="content-columns">
          {productsColumn}
          {productsColumn}
          {productsColumn}
      </div>
    )

  }
}

class Historique extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      produitsHistorique : []
    }
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
          <ProductList products={this.state.produitsHistorique}/>
        </div>
      </div>
    )
  }
}

export default Historique