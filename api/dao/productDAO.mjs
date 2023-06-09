'use strict'
import { PrismaClient } from "@prisma/client"
import Product from "../model/Product.mjs"
let prisma = new PrismaClient()

export const productDAO = {

    incGuess: async (productId, login) => {
        try {
            await prisma.guess.upsert({
                where: {
                    userLogin_productId: {
                        userLogin: login,
                        productId: productId
                    }
                },
                update: {
                    guess: {
                        increment: 1
                    }
                },
                create: {
                    userLogin: login,
                    productId: productId,
                    guess: 1
                }
            })
        } catch (e) {
            return Promise.reject(e)
        }
    },

    numberOfGuesses: async (productId, login) => {
        try {
            const obj = await prisma.guess.findUnique({
                where: {
                    userLogin_productId: {
                        userLogin: login,
                        productId: productId
                    }
                }
            })
            if (!obj) {
                return 0
            }
            return obj.guess
        } catch (e) {
            return Promise.reject(e)
        }
    },

    findByDate: async (date) => {
        try {
            if (date == null) {
                date = new Date()
                date.setHours(0,0,0,0)
            }
            let nextDay = new Date(date)
            nextDay.setDate(nextDay.getDate()+1)
            nextDay = new Date(nextDay.toDateString()) // remove time from string
            const objs = await prisma.product.findMany({
                where: {
                    date: {
                        gte: date,
                        lte: nextDay
                    }
                }
            })
            return objs.map(obj => new Product(obj))
            
        } catch (e) {
            return Promise.reject(e)
        }
    },

    findAll: async () => {
        try {
            return (await prisma.product.findMany({}))
                .map(obj => new Product(obj))
        } catch (e) {
            return Promise.reject(e)
        }
    },

    findById: async (id) => {
        try {
            const res = (await prisma.product.findUnique({
                where: {
                    id: id
                }
            }))
            if (res == null)
                return null
            return new Product(res)
        } catch (e) {
            return Promise.reject(e)
        }
    }
}