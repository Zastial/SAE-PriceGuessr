'use strict'
import { userDAO } from "../dao/userDAO.mjs"
import jwt from 'jsonwebtoken'
import { signToken } from "../authentification.mjs"
import { productController } from "./productController.mjs"

const ONE_DAY = 24*60*60

export const userController = {
    findDailyGuesses: async (userId) => {
        try {
            const dailyProducts = (await productController.findDailyProducts())
                                .map(obj=>{return obj.id})

            return await userDAO.findGuesses(userId, dailyProducts)
        } catch (e) {
            return Promise.reject(e)
        }
    },
    

    findAndValidateJwt: async (login) => {
        try {
            let token = await userDAO.findJwt(login)

            jwt.verify(token, process.env.JWT_SECRET_KEY, async function(err, decoded) {
                // renew token only if there is an error meaning invalid token
                if (!err) return

                token = signToken(login)

                // save new token
                const user = {login: login, jwt: token}
                await userDAO.updateJwt(user)
            })

            return token
            
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    findAll: async () => {
        try {
            return await userDAO.findAll()
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    findByLogin: async (login) => {
        try {
            return await userDAO.findByLogin(login)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    save: async (user) => {
        try {
            return await userDAO.save(user)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    delete: async (login) => {
        try {
            return await userDAO.delete(login)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    updatePassword: async (user) => {
        try {
            const newUser = await userDAO.updatePassword(user)
            if (!newUser) {
                return null
            }
            // update jwt to invalidate previous one
            const token = signToken(newUser.login)
            newUser.jwt = token
            await userDAO.updateJwt(newUser)
            return newUser
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}