'use strict'

export default class Product {
    id
    date
    title
    price
    imgSrc
    desc
    constructor(obj) {
        this.id = obj.id || ""
        this.date = obj.date || ""
        this.title = obj.title || ""
        this.price = obj.price || ""
        this.imgSrc = obj.imgSrc || ""
        this.desc = obj.desc || ""
    }
}