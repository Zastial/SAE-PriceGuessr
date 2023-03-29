import Product from '../model/Product.mjs';
import User, { hashPassword } from '../model/User.mjs';
import { productDAO } from '../dao/productDAO.mjs';
import { userDAO } from '../dao/userDAO.mjs';
import { populateProducts } from "../dao/data/test/populateTestProducts.mjs";
import { populateUsers } from "../dao/data/test/populateTestUsers.mjs";
import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

await populateProducts();
await populateUsers();

const checkByID = new Product({
    "id": "1",
    "date": new Date("2023-01-01"),
    "title": "IKEA1",
    "price": 100.0,
    "imgSrc": "image.jpg",
    "desc": "An item from IKEA"
});

const checkByDate = [
    new Product({
        "id": "3",
        "date": new Date("2023-01-02"),
        "title": "IKEA3",
        "price": 100.0,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    }),
    new Product({
        "id": "4",
        "date": new Date("2023-01-02"),
        "title": "IKEA4",
        "price": 100.0,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    })
];

const existingUser = new User({
    "login": "Emerik",
    "password": await hashPassword("A1")
});

const existingUserWithJwt = new User({
    "login": "Emerik",
    "password": await hashPassword("A1"),
    "jwt": "HahaJonathan"
});

const checkAddUser = new User({
    "login": "Mathis",
    "password": await hashPassword("C4")
});

const realUser = new User({
    "login": "Mathis",
    "password": await hashPassword("D4")
});

const fakeUser = new User({
    "login": "Jean-Michel",
    "password": await hashPassword("E5")
});

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

    it('Try to get products of the day', async function() {
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
        assert.isRejected(pDAO.incGuess("0", "Emerik"));
        const guesses = await pDAO.numberOfGuesses("0", "Emerik");
        assert.equal(guesses, 0);
    });

    it('Try to increment the guesses of a product with a nonexistent user', async function() {
        assert.isRejected(pDAO.incGuess("2", "ksdlf"));
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

    it('Check that user creation works as expected', async function() {
        const user = await uDAO.save(checkAddUser);
        assert(user.isPasswordValid(checkAddUser.password));
    });

    it('Check that password change works as expected', async function() {
        const user = await uDAO.updatePassword(realUser);
        assert(user.isPasswordValid(realUser.password));
    });

    it('Try to change the password of a nonexistent user', async function() {
        assert.isRejected(uDAO.updatePassword(fakeUser));
    });
    
    it('Check if user deletion works properly', async function() {
        const user = await uDAO.delete(realUser.login);
        assert(user.isPasswordValid(realUser.password));
    });

    it('Try deleting a user that doesnt exist', async function() {
        assert.isRejected(uDAO.delete(fakeUser.login));
    });

    it('Check getting the jwt of a user', async function() {
        const jwt = await uDAO.findJwt(existingUser.login);
        assert.equal(jwt, existingUser.jwt);
    });

    it('Check that getting the jwt of a nonexistent user returns null', async function() {
        const jwt = await uDAO.findJwt(fakeUser.login);
        assert.equal(jwt, null);
    });

    it('Check that updating the jwt works properly', async function() {
        await uDAO.updateJwt(existingUserWithJwt);
        const jwt = await uDAO.findJwt(existingUser.login);
        assert.equal(jwt, existingUserWithJwt.jwt);
    });

    it('Try updating the jwt of a nonexistent user', async function() {
        assert.isRejected(uDAO.updateJwt(fakeUser));
    });
});