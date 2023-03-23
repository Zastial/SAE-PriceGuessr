'use strict'

import { productDAO } from "../dao/productDAO.mjs"

export const productController = {
    guessPrice: async (id, priceGuess) => {
        try {
            const product = productDAO.findById(id)
            if (!product) {
                return Promise.reject({message: "product not found"})
            }
            
            const guessRemaining = 0
            const maxGuessReached = false
            let correct = false
            let correctPriceLess = null

            if (priceGuess == product.price) {
                correct = true
            } else {
                correctPriceLess = produce.price < priceGuess
            }
            return {
                maxGuessReached: maxGuessReached, 
                guessRemaining: guessRemaining,
                correct: correct,
                correctPriceLess: correctPriceLess
            }
            
        } catch (e) {
            return Promise.reject({message: "error"})
        }
    },
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