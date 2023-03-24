import cp from 'child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const populate = () => {
    const script_path = "ikea.py"
    let products
    const python = cp.spawn('python3', [script_path])

    python.stdout.on('data', (data) => {
        products = JSON.parse(data.toString())
    })

    python.on('close', (code) => {
        console.log(`scripted ended with code : ${code}`)

        products.forEach(async element => {
            const elt = await prisma.product.create({
                data: {
                    id: element.id,
                    title: element.title,
                    price: element.price,
                    imgSrc: element.imgSrc
                }
            })
            if (!elt) {
                console.log(`product ${elt} couldn't be added to the database`)
            }
        });
    })
}