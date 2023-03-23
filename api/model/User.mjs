'use strict'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

export default class User {
    login
    password
    constructor(obj) {
        this.login = obj.login || ""
        this.password = obj.password || ""
    }

    isPasswordValid(pass) {
        const result = bcrypt.compareSync(pass, hash)
        return result
    }
}

const hashPassword = (pass) => {
    const hash = bcrypt.hashSync(pass, process.env.PASSWORD_SALT);
    return hash
}