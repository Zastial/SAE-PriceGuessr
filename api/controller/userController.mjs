'use strict'
import { userBDDao } from "../dao/userDAO.mjs"

export const userController = {
    findAll: async () => {
        try {
            return await userBDDao.findAll()
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    findById: async (login) => {
        try {
            return await userBDDao.findByLogin(login)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    save: async (user) => {
        try {
            return await userBDDao.save(user)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    modify: async (login, password) => {
        try {
            return await userBDDao.modifyUser(login, password)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },

    delete: async (login) => {
        try {
            return await userBDDao.deleteByLogin(login)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}