import { PrismaClient } from '@prisma/client'
import data from './ikea_cache.json' assert { type: "json" };
const prisma = new PrismaClient();


export const populate = () => {
    for (var i = 0; i < 10; i++) {
        let product = data[Math.floor(Math.random() * ikeaResult.length)]

        const ret = await prisma.product.create({
            data: {
                id: product['id'],
                title: product['title'],
                price: product['price'],
                imgSrc: product['imgSrc'],
                desc: product['desc']
            }
        });
        if (!ret) {
            i--
        }
    } 
}