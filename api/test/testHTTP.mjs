import { start } from '../server.mjs'
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const server = await start();

describe('Given a test implementation of the server', function() {
    const requester = chai.request('http://127.0.0.1:3000').keepOpen();
    let token = null

    it('Requesting the creating of a user', async function() {
        const res = await requester.post('/user/register').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hi"
        });
        assert.equal(res.status, 201);
    });

    it('Requesting the token of the user', async function() {
        const res = await requester.post('/user/auth').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hi"
        });
        assert.equal(res.status, 200);
        token = res.body.token
    });
    
    it('Requesting all products without auth', async function() {
        const res = await requester.get('/product');
        assert.equal(res.status, 401);
    });
    
    it('Requesting all products with auth', async function() {
        const res = await requester.get('/product').set('Authorization', token);
        assert.equal(res.status, 200);
    });

    requester.close();
});
