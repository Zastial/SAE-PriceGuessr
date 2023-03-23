'use strict'

export default class Product {
    id
    date
    title
    price
    imgSrc
    constructor(obj) {
        this.id = obj.id || ""
        this.date = obj.date || ""
        this.title = obj.title || ""
        this.price = obj.price || ""
        this.imgSrc = obj.imgSrc || ""
    }
}