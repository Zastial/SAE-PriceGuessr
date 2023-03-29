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

describe('Given ProductDAO with a set of testing products (see dao/data/test)', function() {
    const pDAO = productDAO;

    it('Getting all the products', async function() {
        const products = await pDAO.findAll();
        assert.isArray(products);
    });

    it('Getting a product by ID', async function() {
        const product = await pDAO.findById("1");
        assert.deepEqual(product,checkByID);
    });

    it('Getting a nonexistent product by ID', async function() {
        const product = await pDAO.findById("0");
        assert.equal(product, null);
    });

    it('Getting the products of the day', async function() {
        const products = await pDAO.findByDate();
        assert.isArray(products)
    });

    it('Getting the products for a certain date', async function() {
        const products = await pDAO.findByDate(new Date("2023-01-02"));
        assert.deepEqual(products, checkByDate);
    });

    it('Getting amount of guesses with an existing product and user', async function() {
        const guesses = await pDAO.numberOfGuesses("2", "Emerik");
        assert.equal(guesses, 0);
    });

    it('Getting amount of guesses with a nonexistent product', async function() {
        const guesses = await pDAO.numberOfGuesses("0", "Emerik");
        assert.equal(guesses, 0);
    });

    it('Getting amount of guesses with a nonexistent user', async function() {
        const guesses = await pDAO.numberOfGuesses("2", "ksdlf");
        assert.equal(guesses, 0);
    });

    it('Incrementing the guesses with an existing user and product', async function() {
        await pDAO.incGuess("2", "Emerik");
        const guesses = await pDAO.numberOfGuesses("2", "Emerik");
        assert.equal(guesses, 1);
    });

    it('Incrementing the guesses with a nonexistent product', async function() {
        assert.isRejected(pDAO.incGuess("0", "Emerik"));
        const guesses = await pDAO.numberOfGuesses("0", "Emerik");
        assert.equal(guesses, 0);
    });

    it('Incrementing the guesses with a nonexistent user', async function() {
        assert.isRejected(pDAO.incGuess("2", "ksdlf"));
        const guesses = await pDAO.numberOfGuesses("2", "ksdlf");
        assert.equal(guesses, 0);
    });
});

describe('Given UserDAO with a set of test users (see dao/data/test)', function() {
    const uDAO = userDAO;
    
    it('Getting all users', async function() {
        const users = await uDAO.findAll();
        assert.isArray(users);
    });

    it('Getting a user by login', async function() {
        const user = await uDAO.findByLogin("Emerik");
        assert(user.isPasswordValid("A1"));
    });

    it('Getting a nonexistent user by login', async function() {
        const user = await uDAO.findByLogin("hksdhf");
        assert.equal(user, null);
    });

    it('Creating a new user', async function() {
        const user = await uDAO.save(checkAddUser);
        assert(user.isPasswordValid(checkAddUser.password));
    });

    it('Changing the password of a user', async function() {
        const user = await uDAO.updatePassword(realUser);
        assert(user.isPasswordValid(realUser.password));
    });

    it('Changing the password of a nonexistent user', async function() {
        assert.isRejected(uDAO.updatePassword(fakeUser));
    });
    
    it('Deleting a user', async function() {
        const user = await uDAO.delete(realUser.login);
        assert(user.isPasswordValid(realUser.password));
    });

    it('Deleting a nonexistent user', async function() {
        assert.isRejected(uDAO.delete(fakeUser.login));
    });

    it('Getting the jwt of a user', async function() {
        const jwt = await uDAO.findJwt(existingUser.login);
        assert.equal(jwt, existingUser.jwt);
    });

    it('Getting the JWT of a nonexistent user', async function() {
        const jwt = await uDAO.findJwt(fakeUser.login);
        assert.equal(jwt, null);
    });

    it('Updating the JWT of a user', async function() {
        await uDAO.updateJwt(existingUserWithJwt);
        const jwt = await uDAO.findJwt(existingUser.login);
        assert.equal(jwt, existingUserWithJwt.jwt);
    });

    it('Updating the JWT of a nonexistent user', async function() {
        assert.isRejected(uDAO.updateJwt(fakeUser));
    });
});