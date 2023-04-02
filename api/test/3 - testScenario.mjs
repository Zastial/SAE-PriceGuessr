'use strict'
import { start } from '../server.mjs'
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
// These test cases cannot work in isolation; See testHTTP for more details.
describe('Given a realistic scenario on the server with a user creating an account and playing the guessing game with products', () => {
    const requester = chai.request('http://127.0.0.1:3000').keepOpen();
    let token = null;

    it('Requesting the creation of the user', async () => {
        const res = await requester.post('/user/register').set('content-type', 'application/json').send({
            login: "Mathis",
            password: "Michenaud"
        });
        assert.equal(res.status, 201);
    });

    it('Requesting the token of the user', async () => {
        const res = await requester.post('/user/auth').set('content-type', 'application/json').send({
            login: "Mathis",
            password: "Michenaud"
        });
        assert.equal(res.status, 200);
        token = res.body.token
    });
    
    it('Requesting the products from 2023-01-01', async () => {
        const res = await requester.get('/product/daily/2023-01-01').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    it('Requesting a guess for product 1', async () => {
        const res = await requester.get('/product/1/50').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    it('Requesting a guess for product 1', async () => {
        const res = await requester.get('/product/1/80').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    it('Requesting a guess for product 1', async () => {
        const res = await requester.get('/product/1/150').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    it('Requesting a guess for product 1', async () => {
        const res = await requester.get('/product/1/120').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    it('Requesting a guess for product 1', async () => {
        const res = await requester.get('/product/1/110').set('Authorization', token);
        assert.equal(res.status, 200);
    });
    
    it('Requesting a guess for product 2', async () => {
        const res = await requester.get('/product/1/90').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    it('Requesting a guess for product 2', async () => {
        const res = await requester.get('/product/1/100').set('Authorization', token);
        assert.equal(res.status, 200);
    });
    
    requester.close();
});