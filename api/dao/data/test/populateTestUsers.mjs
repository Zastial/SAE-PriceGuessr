import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../../../model/User.mjs';

const prisma = new PrismaClient();

let users = [
    {
        "login": "Emerik",
        "password": await hashPassword("A1")
    },
    {
        "login": "Louis",
        "password": await hashPassword("B2")
    },
    {
        "login": "Alex",
        "password": await hashPassword("C3")
    }
];

export const populateUsers = async () => {

    for (var i = 0; i < users.length; i++) {
        const element = users[i]
        const elt = await prisma.user.create({
            data: {
                login: element.login,
                password: element.password
            }
        })
        if (!elt) {
            console.log(`user ${elt} couldn't be added to the database`)
        }
    }
}