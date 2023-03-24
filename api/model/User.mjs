'use strict'
import bcrypt from 'bcryptjs'
import * as dotenv from 'dotenv'

const PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT, 10)

export default class User {
    login
    password
    jwt
    constructor(obj) {
        this.login = obj.login || ""
        this.password = obj.password || ""
        this.jwt = obj.jwt || ""
    }

    isPasswordValid(pass) {
        const verify = pass || ""
        return bcrypt.compareSync(verify, this.password)
    }
}

export const hashPassword = async (pass) => {
    const hash = bcrypt.hashSync(pass, PASSWORD_SALT)
    return hash
}