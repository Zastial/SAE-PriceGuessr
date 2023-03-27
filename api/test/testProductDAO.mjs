import Product from '../model/Product.mjs';
import { productDAO } from '../dao/productDAO.mjs';
import { assert } from 'chai';
import { populate } from "../dao/data/testPopulate.mjs";

describe('ProductDAO test', function() {
    populate()

    const checkByID = new Product({
        "id": "1",
        "date": new Date("2023-01-01"),
        "title": "IKEA1",
        "price": 100.0,
        "imgSrc": ""
    });
    
    const checkByDate = [
        new Product({
            "id": "3",
            "date": new Date("2023-01-02"),
            "title": "IKEA3",
            "price": 100.0,
            "imgSrc": ""
        }),
        new Product({
            "id": "4",
            "date": new Date("2023-01-02"),
            "title": "IKEA4",
            "price": 100.0,
            "imgSrc": ""
        })
    ];

    const pDAO = productDAO;

    it('Try to get all the products', async function() {
        const products = await pDAO.findAll();
        assert.isArray(products);
    });

    it('Check a specific product by ID', async function() {
        const product = await pDAO.findById("1");
        assert.equal(product, checkByID);
    });

    it('Check that trying to get a product that doesnt exist return null', async function() {
        const product = await pDAO.findById("0");
        assert.equal(product, null);
    });

    it('Check all products from a certain date', async function() { // findDailyProducts uses the same method
        const products = await pDAO.findByDate(new Date("2023-01-02"));
        assert.equal(products, checkByDate);
    });

    it('Check the number of guesses for an existing product', async function() {
        const guesses = await pDAO.numberOfGuesses("2");
        assert.equal(guesses, 0);
    });

    it('Try to get the guesses of a product that doesnt exist', async function() {
        const guesses = await pDAO.numberOfGuesses("0");
        assert.equal(guesses, 0);
    });

    it('Try to increment the guesses for an existing product', async function() {
        await pDAO.incGuess("2");
        const guesses = await pDAO.numberOfGuesses("2");
        assert.equal(guesses, 1);
    });

    it('Try to increment the guesses of a product that doesnt exist', async function() {
        await pDAO.incGuess("0");
        const guesses = await pDAO.numberOfGuesses("0");
        assert.equal(guesses, 0);
    });
})