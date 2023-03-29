import { productController } from '../controller/productController.mjs'
import { userController } from '../controller/userController.mjs'
import chai, { assert } from 'chai';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);

describe('Given an instance of productController', () => {
    const pController = productController

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