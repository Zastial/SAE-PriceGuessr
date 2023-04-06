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
    this.onDisplayModal = this.onDisplayModal.bind(this)
    this.date = new Date()
    this.date = this.date.getDay()+2
    this.productDate = new Date(this.props.produitModal.date)
    this.productDate = this.productDate.getDay()+2
  }

  /**
   * Cette fonction est un cycle de vie du composant React qui est appelée après le rendu initial.
   * 
   * Le composant utilise la méthode getProductAvailability de DAOProduct pour récupérer les informations de disponibilité du produit avec l'ID fourni.
   * Si la requête réussit, la réponse est stockée dans la variable pA.
   * Si la requête échoue en raison d'une erreur, la fonction de rappel catch est appelée,
   * qui ajoute simplement l'index de chaque élément de la liste des produits passés en paramètre au tableau pA.
   */
  async componentDidMount() {
    let pA = []
    try {
      pA = await DAOProduct.getProductAvailability(sessionStorage.getItem("jwt"), this.props.produitModal.id)
    } catch(error) {
      pA = [
        {
          "buCode": "error",
          "stock": 0,
          "name": "error",
          "longitude": 47.2232382,
          "latitude": -1.5444345
        }
      ] 
    }
    this.setState({
      product : this.props.produitModal,
      productAvailability : pA
    })
  }

  /**
   * La fonction onDisplayModal récupère l'élément HTML correspondant à la liste des produits en stockant la valeur dans scrollContainer.
   * Ensuite, elle applique un style CSS à cet élément pour désactiver la barre de défilement horizontale.
   * Enfin, elle appelle la fonction displayModal() qui a été passée en tant que prop à ce composant, permettant ainsi d'afficher le modal.
   */
  onDisplayModal() {
    const scrollContainer = document.querySelector(".allproducts");
    scrollContainer.setAttribute("style", "overflow-x: hidden");

    this.props.displayModal()
  }

  /**
   * Cette fonction prend un tableau en entrée et crée une liste d'éléments HTML qui affichent les noms et les stocks des différents magasins.
   * 
   * Pour chaque élément de la liste, elle crée un lien vers la page Google Maps où la latitude et la longitude du magasin sont spécifiées.
   */
  eachMag(tab) {
    const tabMagName = []
    for (const mag in tab) {
      tabMagName.push(
        <li key={mag}>
          <a href={`https://www.google.com/maps/search/?api=1&query=${tab[mag].latitude}%2C${tab[mag].longitude}`} target="blank">
            {tab[mag].name}
          </a>
          <p> {(tab[mag].stock === 0) ? "Aucun produit disponible dans ce magasin" : `${tab[mag].stock} pièces disponibles`}</p>
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
                <p>{(this.date === this.productDate) ? "???" : this.state.product.price} €</p>
                <div className="image">
                  <img src={this.state.product.imgSrc} alt={this.state.product.title}/>
                </div>
              </div>
              <div className="magList">
                <h2>Disponibilités :</h2>
                <div id="villes" className="villes">
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
    this.date = new Date()
    this.date = this.date.getDay()+2
    this.productDate = new Date(this.props.prod.date)
    this.productDate = this.productDate.getDay()+2
    this.onDisplayModal = this.onDisplayModal.bind(this)
    this.blockScroll = this.blockScroll.bind(this)
  }

  /**
   * Cette fonction modifie simplement l'état du composant pour afficher ou cacher une fenêtre modale en inversant la valeur de la propriété "modal".
   */
  onDisplayModal() {
    this.setState({modal: !this.state.modal})
  }

  /**
   * Cette fonction est utilisée pour empêcher le défilement de la page d'arrière-plan lorsqu'un modèle est affiché à l'écran.
   */
  blockScroll() {
    const scrollContainer = document.querySelector(".allproducts");
    scrollContainer.setAttribute("style", "overflow-x: clip");
    this.onDisplayModal()
  }

  render() {

    return (
      <div className="fullModalContent">
        <Modal produitModal={this.props.prod} produitAvailability={this.props.prodsAvailable} modal={this.state.modal} displayModal={this.onDisplayModal} />
        <li className="prod">
          <div className="linkToProduct" onClick={this.blockScroll}>
              <img src={this.props.prod.imgSrc} alt={this.props.prod.title}/>
              <div className="product-info">
                  <h3>{this.props.prod.title}</h3>
                  <h3>{(this.date === this.productDate) ? "???" : this.props.prod.price} €</h3>
              </div>
          </div>
        </li>
      </div>
    )
  }
}

class ProductList extends React.Component {

  /**
   * Cette fonction crée une liste de colonnes de produits affichés sur une page.
   * Elle prend les produits et leur disponibilité en tant que props,
   * puis crée un tableau "products" qui contient un élément de produit pour chaque produit dans la liste des props.
   * Enfin, elle inverse l'ordre de la liste des produits et crée un tableau "productsColumn" pour stocker les colonnes de produits.
   */
  displayForproducts() {
    let products = []
    for (let i = 0; i < this.props.products.length; i++) {
      products.push(<Product key={i} prod={this.props.products[i]} prodsAvailable={this.props.prodsAvailable}/>)
    }
    products = products.reverse()
    const productsColumn = []
    for (let i = 0; i < products.length; i+4) {
      let productsTwo = []
      productsTwo.push(products.splice(0,4))
      productsColumn.push(<ProductColumn key={i+products.length} prod={productsTwo}/>)
      productsTwo = []
    }
    return productsColumn
  }

  render() {
    return (
      <div className="content-columns">
          {this.displayForproducts()}
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
  
  /**
   * Cette fonction est exécutée automatiquement lorsque le composant est monté.
   * Elle définit l'état initial du composant avec les produits de l'historique de l'utilisateur récupérés depuis l'API via une méthode asynchrone de DAOProduct.
   * Ensuite, pour chaque produit récupéré, elle utilise une méthode de DAOProduct pour obtenir ses informations.
   * Ces informations sont stockées dans un tableau et ajoutées à l'état du composant.
   * Si une erreur se produit lors de la récupération des informations de disponibilité pour un produit, la boucle est interrompue.
   */
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

    /**
     * Cette partie ajoute un écouteur d'événements pour détecter les événements de molette de souris sur l'élément "allproducts".
     * Elle ajuste la position de défilement horizontal de l'élément "scrollContainer" en conséquence pour simuler le défilement.
     */
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

  /**
   * Cette fonction retourne la date actuelle sous la forme d'une chaîne de caractères dans le format "yyyy-mm-dd".
   */
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