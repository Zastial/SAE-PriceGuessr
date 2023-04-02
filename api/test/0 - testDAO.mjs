'use strict'
import Product from '../model/Product.mjs';
import Availability from '../model/Availability.mjs';
import User, { hashPassword } from '../model/User.mjs';
import { productDAO } from '../dao/productDAO.mjs';
import { availabilityDAO } from '../dao/availabilityDAO.mjs'
import { userDAO } from '../dao/userDAO.mjs';
import { testPopulate } from "../dao/data/test/testPopulate.mjs";
import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

let testDataU = [ // Users in the database
    {
        "login": "Emerik",
        "password": await hashPassword("speen"),
    },
    {
        "login": "Martin",
        "password": await hashPassword("anti-slash n"),
    }
]

let testDataP = [ // Products in the database
    {
        "id": "1",
        "date": new Date("2023-01-01"),
        "title": "IKEA1",
        "price": 100,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    },
    {
        "id": "2",
        "date": new Date("2023-01-01"),
        "title": "IKEA2",
        "price": 100,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    },
    {
        "id": "3",
        "date": new Date("2023-01-02"),
        "title": "IKEA3",
        "price": 100,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    },
    {
        "id": "4",
        "date": new Date("2023-01-02"),
        "title": "IKEA4",
        "price": 100,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    },
    {
        "id": "5",
        "date": new Date("2023-01-03"),
        "title": "IKEA5",
        "price": 100,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    },
    {
        "id": "6",
        "date": new Date("2023-01-04"),
        "title": "IKEA6",
        "price": 100,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    }
];

await testPopulate(testDataP, testDataU); // Initialize the test database with the above data

let testProduct = new Product({ // Product for most tests
    "id": "1",
    "date": new Date("2023-01-01"),
    "title": "IKEA1",
    "price": 100,
    "imgSrc": "image.jpg",
    "desc": "An item from IKEA"
});

let testProductsArray = [ // Products from 2023-01-02
    new Product({
        "id": "3",
        "date": new Date("2023-01-02"),
        "title": "IKEA3",
        "price": 100,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    }),
    new Product({
        "id": "4",
        "date": new Date("2023-01-02"),
        "title": "IKEA4",
        "price": 100,
        "imgSrc": "image.jpg",
        "desc": "An item from IKEA"
    }),
]

let testUser = new User({ // User for most tests
    "login": "Emerik",
    "password": await hashPassword("speen"),
})

let testUserNew = new User({ // User for testing creation
    "login": "Alex",
    "password": await hashPassword("breadth_first_tree_search")
});

let testUserDelete = new User({ // User for testing deletion
    "login": "Martin",
    "password": await hashPassword("anti-slash n"),
})

let testUserFake = new User({ // User that isn't in the database
    "login":"Impostor",
    "password": "Fake"
});

describe('Given ProductDAO with a set of testing products', () => {
    const pDAO = productDAO;

    it('Getting all the products', async () => {
        const products = await pDAO.findAll();
        assert.isArray(products, 'Then an array should be returned');
    });

    it('Getting a product by ID', async () => {
        const product = await pDAO.findById("1");
        assert.deepEqual(product, testProduct, 'Then the product should be returned');
    });

    it('Getting a nonexistent product by ID', async () => {
        const product = await pDAO.findById("0");
        assert.equal(product, null, 'Then null should be returned');
    });

    it('Getting the products of the day', async () => {
        const products = await pDAO.findByDate();
        assert.isArray(products, 'Then an array should be returned')
    });

    it('Getting the products for a certain date', async () => {
        const products = await pDAO.findByDate(new Date("2023-01-02"));
        assert.deepEqual(products, testProductsArray, 'Then an array of the products should be returned');
    });

    it('Getting number of guesses with an existing product and user', async () => {
        const guesses = await pDAO.numberOfGuesses("1", "Emerik");
        assert.equal(guesses, 0, 'Then the number of guesses should be returned');
    });

    it('Getting number of guesses with a nonexistent product', async () => {
        const guesses = await pDAO.numberOfGuesses("0", "Emerik");
        assert.equal(guesses, 0, 'Then 0 should be returned');
    });

    it('Getting number of guesses with a nonexistent user', async () => {
        const guesses = await pDAO.numberOfGuesses("1", "asdf");
        assert.equal(guesses, 0, 'Then 0 should be returned');
    });

    it('Incrementing the guesses with an existing user and product', async () => {
        await pDAO.incGuess("1", "Emerik");
        const guesses = await pDAO.numberOfGuesses("1", "Emerik");
        assert.equal(guesses, 1, 'Then the number of guesses should have increased by 1');
    });

    it('Incrementing the guesses with a nonexistent product', async () => {
        assert.isRejected(pDAO.incGuess("0", "Emerik"));
    });

    it('Incrementing the guesses with a nonexistent user', async () => {
        assert.isRejected(pDAO.incGuess("1", "ksdlf"));
    });
});

describe('Given Availability with a set of testing products', async () => {
    const aDAO = availabilityDAO;
    
    it('Finding availability by ID', async () => {
        const availObj = await aDAO.findById("50514846"); // example ID taken from the IKEA source since the test database doesn't contain actual IDs
        assert.isArray(availObj, 'Then an availability array should be returned');
        assert.hasAllKeys(availObj[0], ['buCode', 'stock', 'name', 'longitude', 'latitude'], 'Then the objects should have the right fields to provide availability');
    });

    it('Finding availability with an invalid ID', async () => {
        const availObj = await aDAO.findById("01234567");
        assert.equal(availObj, null, 'Then null should be returned')
    });
});

describe('Given UserDAO with a test user', () => {
    const uDAO = userDAO;
    
    it('Getting all users', async () => {
        const users = await uDAO.findAll();
        assert.isArray(users);
    });

    it('Getting a user by login', async () => {
        const user = await uDAO.findByLogin(testUser.login);
        assert.equal(user.login, testUser.login,'Then the matching user should be returned');
    });

    it('Getting a nonexistent user by login', async () => {
        const user = await uDAO.findByLogin(testUserFake.login);
        assert.equal(user, null,'Then null should be returned');
    });

    it('Creating a new user', async () => {
        const user = await uDAO.save(testUserNew);
        assert.equal(user.login, testUserNew.login, 'Then created user should be returned');
    });

    it('Changing the password of a user', async () => {
        testUser.password = await hashPassword("speen2")
        const user = await uDAO.updatePassword(testUser);
        assert.equal(user.login,testUser.login,'Then the affected user should be returned');
    });

    it('Changing the password of a nonexistent user', async () => {
        assert.isRejected(uDAO.updatePassword(testUserFake));
    });
    
    it('Getting the JWT of a user', async () => {
        const jwt = await uDAO.findJwt(testUser.login);
        console.log(jwt);
        assert.isString(jwt, 'Then a valid JWT should be returned');
    });

    it('Getting the JWT of a nonexistent user', async () => {
        const jwt = await uDAO.findJwt(testUserFake.login);
        assert.equal(jwt, null, 'Then null should be returned');
    });

    it('Updating the JWT of a user', async () => {
        testUser.jwt = "jwt2"
        await uDAO.updateJwt(testUser);
        const jwt = await uDAO.findJwt(testUser.login);
        assert.equal(jwt, testUser.jwt, 'Then the new jwt should be returned');
    });

    it('Updating the JWT of a nonexistent user', async () => {
        assert.isRejected(uDAO.updateJwt(testUserFake));
    });

    it('Deleting a user', async () => {
        const user = await uDAO.delete(testUserDelete.login);
        assert.equal(user.login,testUserDelete.login,'Then the deleted user should be returned');
    });

    it('Deleting a nonexistent user', async () => {
        assert.isRejected(uDAO.delete(testUserFake.login));
    });
});
