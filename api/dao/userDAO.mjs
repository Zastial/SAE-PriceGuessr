'use strict'
import { PrismaClient } from '@prisma/client'
import Guess from '../model/Guess.mjs'
import User, { hashPassword } from '../model/User.mjs'
let prisma = new PrismaClient()

export const userDAO = {
    findGuesses: async (userId, productIds) => {
        try {
            return (await prisma.guess.findMany({
                where: {
                    productId: {
                        in: productIds
                    },
                    userLogin: userId
                }
            })).map(obj=>{return new Guess(obj)})
        } catch (e) {
            return Promise.reject(e)
        } 
    },
    findJwt: async (login) => {
        try {
            const user = await userDAO.findByLogin(login)
            if (user == null) {
                return null
            }
            return user.jwt
        } catch (e) {
            return Promise.reject(e)
        }
    },

    updateJwt: async (user) => {
        try {
            const obj = await prisma.user.update({
                where: {
                    login: user.login
                },
                data: {
                    jwt: user.jwt
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
    },

    updatePassword: async (user) => {
        try {
            const newPassword = await hashPassword(user.password)
            
            const obj = await prisma.user.update({
                where: {
                    login: user.login
                },
                data: {
                    password: newPassword
                }
            })
            return new User(obj)
        } catch (e) {
            return Promise.reject(e)
        }
    },

    delete: async (login) => {
        try {
            const obj = await prisma.user.delete({where: {login: login}})
            return new User(obj)
        } catch (e) {
            return Promise.reject(e)
        }
    },

    save: async (user) => {
        try {
            // clone to hash password before saving it
            const obj = {...user}
            obj.password = await hashPassword(obj.password)
            
            await prisma.user.create({data: obj})
            const userAdded = await userDAO.findByLogin(user.login)
            return userAdded
        } catch (e) {
            // Promise reject not working because of : Error: Cannot throw non-error object
            // Promise.reject(e)
            // console.log(e)
            return null
        }
    },

    findAll: async () => {
        try {
            return (await prisma.user.findMany({}))
                .map(obj => new User(obj))
        } catch (e) {
            return Promise.reject(e)
        }
    },

    findByLogin: async (login) => {
        try {
            const res = (await prisma.user.findUnique({
                where: {
                    login: login
                }
            }))
            if (res == null)
                return null
            return new User(res)
        } catch (e) {
            return Promise.reject(e)
        }
    },


}