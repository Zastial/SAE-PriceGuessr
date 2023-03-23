'use strict'
export default class User {
    login
    password
    constructor(obj) {
        this.login = obj.login || ""
        this.password = obj.password || ""
    }
}