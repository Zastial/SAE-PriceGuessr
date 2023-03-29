'use strict'

import { productDAO } from "../dao/productDAO.mjs"

export const productController = {
    guessPrice: async (productId, login, priceGuess) => {
        try {
            const product = await productDAO.findById(productId)
            if (!product) {
                return Promise.reject({message: "product not found"})
            }
            const guesses = await productDAO.numberOfGuesses(productId, login) 
            let guessRemaining = 0
            let correct = false
            let correctPriceIsLess = false
            if (!(guesses == process.env.MAX_GUESS)) {
                await productDAO.incGuess(productId, login)
                guessRemaining = process.env.MAX_GUESS - guesses - 1
                correct = (priceGuess == product.price)
                correctPriceIsLess = (product.price < priceGuess)
            }
            
            return {
                guessRemaining: guessRemaining,
                correct: correct,
                correctPriceIsLess: correctPriceIsLess
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
            return await productDAO.findByDate()
        } catch (e) {
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