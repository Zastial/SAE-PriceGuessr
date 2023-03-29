import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

// This method initializes the test database with a test user and some test products
export const testPopulate = async (productData, userData) => {
    for (var i = 0; i < userData.length; i++) {
        const element = userData[i]
        const user = await prisma.user.create({
            data: {
                login: element.login,
                password: element.password
            }
        })
        if (!user) {
            console.log(`user ${user} couldn't be added to the database`)
        }
    }

    for (var i = 0; i < productData.length; i++) {
        const element = productData[i]
        const prod = await prisma.product.create({
            data: {
                id: element.id,
                date: element.date,
                title: element.title,
                price: element.price,
                imgSrc: element.imgSrc,
                desc: element.desc
            }
        })
        if (!prod) {
            console.log(`product ${prod} couldn't be added to the database`)
        }
    }
}