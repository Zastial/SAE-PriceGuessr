'use strict'

import { productDAO } from "../dao/productDAO.mjs"

export const productController = {
    guessPrice: async (productId, login, priceGuess) => {
        try {
            const product = productDAO.findById(productId)
            if (!product) {
                return Promise.reject({message: "product not found"})
            }
            
            const maxGuessReached = false
            let correct = null
            let correctPriceLess = null
            const guesses = productDAO.numberOfGuesses(productId, login)
            const guessRemaining = process.env.MAX_GUESS - guesses

            if (guessRemaining < 0) {
                guessRemaining = 0
            }
            if (guesses >= process.env.MAX_GUESS) {
                maxGuessReached = true
            } else {
                productDAO.incGuess(productId, login)
                if (priceGuess == product.price) {
                    correct = true
                } else {
                    correctPriceLess = produce.price < priceGuess
                }
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