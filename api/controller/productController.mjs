'use strict'

import { productDAO } from "../dao/productDAO.mjs"

export const productController = {
    findAll: async () => {
        try {
            return await productDAO.findAll()
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },
    findByDate: async (date) => {
        try {
            return await productDAO.findByDate(date)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },
    findDailyProducts: async () => {
        try {
            return await productDAO.findDailyProducts()
        } catch (e) {
            console.log(e)
            return Promise.reject({message: "error"})
        }
    },
    findById: async (id) => {
        try {
            return await productDAO.findById(id)
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    }
}