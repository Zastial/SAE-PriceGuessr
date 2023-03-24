'use strict'

import jwt from 'jsonwebtoken'
const ONE_DAY = 24*60*60

export const signToken = (login) => {
    const expiration = Math.floor(new Date().getTime()/1000) + ONE_DAY
    const token = jwt.sign({login: login, exp: expiration}, process.env.JWT_SECRET_KEY)
    return token
}