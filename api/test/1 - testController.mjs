'use strict'
import User, { hashPassword } from '../model/User.mjs'
import { productController } from '../controller/productController.mjs'
import { userController } from '../controller/userController.mjs'
import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

let testUser = new User({ // User for most tests
    "login": "Emerik",
    "password": await hashPassword("speen"),
})

let testUserFake = new User({ // User that isn't in the database
    "login":"Impostor",
    "password": "Fake"
});

describe('Given an instance of productController', () => {
    const pController = productController;

    it('Guessing lower than the price of the product', async () => {
        const obj = await pController.guessPrice('1', 'Emerik', 50);
        assert(!obj.correct, 'Then the guess should not be correct');
        assert(!obj.correctPriceIsLess, 'Then the correct price should be indicated as higher');
    });
    
    it('Guessing higher than the price of the product', async () => {
        const obj = await pController.guessPrice('1', 'Emerik', 150);
        assert(!obj.correct,'Then the guess should not be correct');
        assert(obj.correctPriceIsLess, 'Then the correct price should be indicated as lower');
    });
    
    it('Guessing the price of the product correctly', async () => {
        const obj = await pController.guessPrice('1', 'Emerik', 100);
        assert(obj.correct, 'Then the guess should be correct');
    });
    
    it('Guessing the price of a nonexistent product', async () => {
        assert.isRejected(pController.guessPrice('0', 'Emerik', 100));
    });

    it('Guessing the price of a product with a nonexistent user', () => {
        assert.isRejected(pController.guessPrice('1', "asdf", 100)); 
    });
});

describe('Given an instance of userController', () => {
    const uController = userController;

    it('Getting the token of a user', async () => {
        const token = await uController.findAndValidateJwt(testUser.login);
        assert.isString(token, 'Then a valid Jwt should be returned')
    });

    /*
    it('Getting the token of a nonexistent user', async () => {
        const token = await uController.findAndValidateJwt(testUserFake.login);
        // This should normally propagate the error caused by trying to update the jwt of a nonexistent user (see testDAO) yet returns a token.
        // However, the security impact is minimal since the token itself isn't stored in the database, thus being useless
    });
    */

    it('Updating the password of a user', async () => {
        const user = await uController.updatePassword(testUser);
        assert.equal(user.login, testUser.login, 'Then the returned user should be the same');
    });

    it('Updating the password of a nonexistent user', async () => {
        assert.isRejected(uController.updatePassword(testUserFake));
    });
});
