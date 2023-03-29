import { start } from '../server.mjs'
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const server = await start();

describe('Given a test implementation of the server', () => {
    const requester = chai.request('http://127.0.0.1:3000').keepOpen();
    let token = null;

    it('Requesting the creation of a user', async () => {
        const res = await requester.post('/user/register').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hi"
        });
        assert.equal(res.status, 201);
    });

    it('Requesting the token of the user', async () => {
        const res = await requester.post('/user/auth').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hi"
        });
        assert.equal(res.status, 200);
        token = res.body.token
    });
    
    it('Requesting on products without auth', async () => {
        const res = await requester.get('/product');
        assert.equal(res.status, 401);
    });
    
    it('Requesting all products', async () => {
        const res = await requester.get('/product').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    it('Requesting a product by id', async () => {
        const res = await requester.get('/product/1').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    
    it('Requesting the products of the day', async () => {
        const res = await requester.get('/product/daily').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    
    it('Requesting the products for a specific date', async () => {
        const res = await requester.get('/product/daily/2023-01-02').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    it('Requesting a guess for the price of a product', async () => {
        const res = await requester.get('/product/1/100').set('Authorization', token);
        assert.equal(res.status, 200);
    });
    
    requester.close();
});
