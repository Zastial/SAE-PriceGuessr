'use strict'

export default class Product {
    id
    title
    price
    imgSrc
    constructor(obj) {
        this.id = obj.id || ""
        this.title = obj.title || ""
        this.price = obj.price || ""
        this.imgSrc = obj.imgSrc || ""
    }
}