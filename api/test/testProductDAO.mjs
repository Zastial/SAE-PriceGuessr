import { productDAO } from '../dao/productDAO.mjs';
import { assert } from 'chai';
import { populate } from "../dao/data/testPopulate.mjs";

populate()

describe('ProductDAO test', function() {
    let pDAO = productDAO;

    it('Try to get all the products', async function() {
        const products = await pDAO.findAll()
        assert.isArray(products)
    });

    it('Try to get a product by ID', async function() {

    });

    it('Try to get products from a certain date', async function() {
        
    });
})