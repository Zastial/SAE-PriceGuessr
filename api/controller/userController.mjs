'use strict'
import { userDAO } from "../dao/userDAO.mjs"

export const userController = {
    findAll: async () => {
        try {
            return await userDAO.findAll()
        } catch (e) {
            console.log("heeee")
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

    update: async (user) => {
        try {
            return await userDAO.update(user)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}