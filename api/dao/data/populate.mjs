import cp from 'child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();


export const populate = () => {
    const script_path = "ikea.py";
    const python = cp.spawn('python3', [script_path]);
    let ikeaResult;

    python.stdout.on('data', (data) => {
        ikeaResult = JSON.parse(data.toString())
    });

    python.on('close', (code) => {
        console.log(`scripted ended with code : ${code}`)
    });

    for (var i = 0; i < 10; i++) {
        let product = ikeaResult[Math.floor(Math.random() * ikeaResult.length)]['product']
    
        await prisma.product.create({
            data: {
                id: product['id'],
                title: product['name'],
                price: product['salesprice']['numeral'],
                imgSrc: product['mainImageUrl'],
                desc: product['mainImageAlt']
            }
        });
    } 
}