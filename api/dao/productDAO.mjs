'use strict'
import { PrismaClient } from "@prisma/client"
import Product from "../model/Product.mjs"
let prisma = new PrismaClient()

export const productDAO = {

    findByDate: async (date) => {
        try {
            let nextDay = new Date()
            nextDay.setDate(date.getDate()+1)
            nextDay = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate())

            const objs = await prisma.product.findMany({
                where: {
                    date: {
                        gte: date,
                        lte: nextDay
                    }
                }
            })
            return objs.map(obj=>new Product(obj))
            
        } catch (e) {
            return Promise.reject(e)
        }
    },

    findDailyProducts: async () => {
        try {
            let today = new Date()
            today.setHours(0,0,0,0)
            return await productDAO.findByDate(today)
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