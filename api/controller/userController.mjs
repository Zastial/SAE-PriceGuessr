'use strict'
import { userDAO } from "../dao/userDAO.mjs"

export const userController = {
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
}