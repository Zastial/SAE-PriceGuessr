'use strict'

export default class Availability {
    buCode
    stock
    name
    longitude
    latitude
    constructor(obj) {
        this.buCode = obj.buCode || ""
        this.stock = obj.stock || ""
        this.name = obj.name || ""
        this.longitude = obj.longitude || ""
        this.latitude = obj.latitude || ""
    }
}