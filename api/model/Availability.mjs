'use strict'

export default class Availability {
    buCode
    stock
    name
    longitude
    latitude
    constructor(obj) {
        this.buCode = obj.buCode || ""
        this.stock = obj.stock || 0
        this.name = obj.name || ""
        this.longitude = obj.longitude || 0
        this.latitude = obj.latitude || 0
    }
}