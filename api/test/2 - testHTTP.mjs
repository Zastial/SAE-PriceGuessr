'use strict'
import { start } from '../server.mjs'
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const server = await start();
// HTTP tests cases are the only ones that cannot work in isolation, because of how authentication works.
// The token has to be generated and checked by JWT which is outside of the tests' control.
// As such, the tokens obtained are used in the following requests. 401 errors mean something went wrong in that process.
describe('Given a test scenario on the server with all routes in sequence', () => {
    const requester = chai.request('http://127.0.0.1:3000').keepOpen();
    let token = null;

    it('Requesting the creation of a user', async () => {
        const res = await requester.post('/user/register').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hi"
        });
        assert.equal(res.status, 201,'The status should be 201 (Success)');
    });

    it('Requesting the token of the user', async () => {
        const res = await requester.post('/user/auth').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hi"
        });
        assert.equal(res.status, 200,'The status should be 200 (Success)');
        token = res.body.token
    }); // This test has to pass for the rest of the tests to work
    
    it('Requesting on products without auth', async () => {
        const res = await requester.get('/product');
        assert.equal(res.status, 401,'The status should be 401 (Unauthorized)');
    });
    
    it('Requesting all products', async () => {
        const res = await requester.get('/product').set('Authorization', token);
        assert.equal(res.status, 200,'The status should be 200 (Success)');
    });

    it('Requesting a product by id', async () => {
        const res = await requester.get('/product/1').set('Authorization', token);
        assert.equal(res.status, 200,'The status should be 200 (Success)');
    });

    
    it('Requesting the products of the day', async () => {
        const res = await requester.get('/product/daily').set('Authorization', token);
        assert.equal(res.status, 200,'The status should be 200 (Success)');
    });

    
    it('Requesting the products for a specific date', async () => {
        const res = await requester.get('/product/daily/2023-01-02').set('Authorization', token);
        assert.equal(res.status, 200,'The status should be 200 (Success)');
    });

    it('Requesting a guess for the price of a product', async () => {
        const res = await requester.get('/product/1/100').set('Authorization', token);
        assert.equal(res.status, 200,'The status should be 200 (Success)');
    });

    it('Requesting the availability of a product', async () => {
        // example ID taken from the IKEA source since the test database doesn't contain actual IDs
        const res = await requester.get('/product/availability/50514846').set('Authorization', token);
        assert.equal(res.status, 200, 'The status should be 200 (Success)')
    });

    it('Requesting a password change for a user and checking it', async () => {
        const res1 = await requester.put('/user').set('Authorization', token).send({password: 'hihi'});
        assert.equal(res1.status, 200, 'The status should be 200 (Success)')
        const res2 = await requester.post('/user/auth').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hihi"
        });
        assert.equal(res2.status, 200,'The status should be 200 (Success)');
        token = res2.body.token
    });

    it('Requesting the deletion of a user', async () => {
        const res = await requester.delete('/user').set('Authorization', token);
        assert.equal(res.status, 200, 'The status should be 200 (Success)'); 
    });

    requester.close();
});
