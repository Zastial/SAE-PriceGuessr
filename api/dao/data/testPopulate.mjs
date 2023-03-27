import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

let products = [
    {
        "id": "1",
        "date": new Date("2023-01-01"),
        "title": "IKEA1",
        "price": 100.0,
        "imgSrc": ""
    },
    {
        "id": "2",
        "date": new Date("2023-01-01"),
        "title": "IKEA2",
        "price": 100.0,
        "imgSrc": ""
    },
    {
        "id": "3",
        "date": new Date("2023-01-02"),
        "title": "IKEA3",
        "price": 100.0,
        "imgSrc": ""
    },
    {
        "id": "4",
        "date": new Date("2023-01-02"),
        "title": "IKEA4",
        "price": 100.0,
        "imgSrc": ""
    },
    {
        "id": "5",
        "date": new Date("2023-01-03"),
        "title": "IKEA5",
        "price": 100.0,
        "imgSrc": ""
    },
    {
        "id": "6",
        "date": new Date("2023-01-04"),
        "title": "IKEA6",
        "price": 100.0,
        "imgSrc": ""
    }
];

export const populate = async () => {

    for (var i = 0; i < products.length; i++) {
        const element = products[i]
        const elt = await prisma.product.create({
            data: {
                id: element.id,
                date: element.date,
                title: element.title,
                price: element.price,
                imgSrc: element.imgSrc
            }
        })
        if (!elt) {
            console.log(`product ${elt} couldn't be added to the database`)
        }
    }
}