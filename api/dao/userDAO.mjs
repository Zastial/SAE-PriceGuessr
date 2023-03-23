'use strict'
import { PrismaClient } from '@prisma/client'
let prisma = new PrismaClient()
import User from '../model/User.mjs'

export const userDAO = {

    findAll: async () => {
        try {
            return (await prisma.user.findMany({}))
                .map(obj => new User(obj))
        } catch (e) {
            return Promise.reject(e)
        }
    },

    findByLogin: async (login) => {
        try {
            const res = (await prisma.user.findUnique({
                where: {
                    login: login
                }
            }))
            if (res == null)
                return null
            return new User(res)
        } catch (e) {
            return Promise.reject(e)
        }
    },


}