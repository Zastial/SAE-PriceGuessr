import Product from '../model/Product.mjs';
import User, { hashPassword } from '../model/User.mjs';
import { productDAO } from '../dao/productDAO.mjs';
import { userDAO } from '../dao/userDAO.mjs';
import { populateProducts } from "../dao/data/test/populateTestProducts.mjs";
import { populateUsers } from "../dao/data/test/populateTestUsers.mjs";
import { assert } from 'chai';
//import chai from 'chai';
//import chaiHttp from 'chai-http'
//chai.use(chaiHttp)
await populateProducts()
await populateUsers()

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

describe('ProductDAO test', function() {
    const pDAO = productDAO;

    it('Try to get all the products', async function() {
        const products = await pDAO.findAll();
        assert.isArray(products);
    });

    it('Check a specific product by ID', async function() {
        const product = await pDAO.findById("1");
        assert.deepEqual(product,checkByID);
    });

    it('Check that trying to get a product that doesnt exist return null', async function() {
        const product = await pDAO.findById("0");
        assert.equal(product, null);
    });

    it('Try to get producs of the day', async function() {
        const products = await pDAO.findByDate();
        assert.isArray(products)
    });

    it('Check all products from a certain date', async function() {
        const products = await pDAO.findByDate(new Date("2023-01-02"));
        assert.deepEqual(products, checkByDate);
    });

    it('Check the number of guesses for an existing product', async function() {
        const guesses = await pDAO.numberOfGuesses("2", "Emerik");
        assert.equal(guesses, 0);
    });

    it('Try to get the guesses of a product that doesnt exist', async function() {
        const guesses = await pDAO.numberOfGuesses("0", "Emerik");
        assert.equal(guesses, 0);
    });

    it('Try to get the number of guesses with a nonexistent user', async function() {
        const guesses = await pDAO.numberOfGuesses("2", "ksdlf");
        assert.equal(guesses, 0);
    });

    it('Check if guesses are correctly incremented for an existing product', async function() {
        await pDAO.incGuess("2", "Emerik");
        const guesses = await pDAO.numberOfGuesses("2", "Emerik");
        assert.equal(guesses, 1);
    });

    it('Try to increment the guesses of a product that doesnt exist', async function() {
        try {
            await pDAO.incGuess("0", "Emerik");
        } catch (e) {
            const guesses = await pDAO.numberOfGuesses("0", "Emerik");
            assert.equal(guesses, 0);
        }
    });

    it('Try to increment the guesses of a product with a nonexistent user', async function() {
        try {
            await pDAO.incGuess("2", "ksdlf");
        } catch (e) {}
    });
});

describe('UserDAO test', function() {
    const uDAO = userDAO;
    
    it('Try to get all users', async function() {
        const users = await uDAO.findAll();
        assert.isArray(users);
    });

    it('Check a user by login', async function() {
        const user = await uDAO.findByLogin("Emerik");
        assert(user.isPasswordValid("A1"));
    });

    it('Check that getting a nonexistant user by login returns null', async function() {
        const user = await uDAO.findByLogin("hksdhf");
        assert.equal(user, null);
    });
});