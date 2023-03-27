'use strict'

import { productDAO } from "../dao/productDAO.mjs"

export const productController = {
    guessPrice: async (productId, login, priceGuess) => {
        try {
            const product = productDAO.findById(productId)
            if (!product) {
                return Promise.reject({message: "product not found"})
            }
            
            let maxGuessReached = false
            let correct = null
            let correctPriceLess = null
            const guesses = await productDAO.numberOfGuesses(productId, login) 
            let guessRemaining = process.env.MAX_GUESS - guesses - 1

            if (guessRemaining < 0) {
                guessRemaining = 0
            }
            if (guessRemaining == 0) {
                maxGuessReached = true
            } else {
                await productDAO.incGuess(productId, login)
                if (priceGuess == product.price) {
                    correct = true
                } else {
                    correct = false
                    correctPriceLess = product.price < priceGuess
                }
                if (guessRemaining - 1 < 0) {
                    maxGuessReached = true
                }
            }
            
            return {
                maxGuessReached: maxGuessReached, 
                guessRemaining: guessRemaining,
                correct: correct,
                correctPriceLess: correctPriceLess
            }
            
        } catch (e) {
            console.log(e)
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