import { start } from '../server.mjs'
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import User, { hashPassword } from '../model/User.mjs';
import { userController } from '../controller/userController.mjs';

chai.use(chaiHttp);

let user = new User({
    "login": "Martin",
    "password": await hashPassword("Schreiber")
});

let token = null

const server = await start();

describe('Test product requests', function() {
    const requester = chai.request('http://127.0.0.1:3000').keepOpen();

    it('Create a user', async function() {
        const res = await requester.post('/user/register').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hi"
        });
        assert.equal(res.status, 201);
    });

    it('Get token', async function() {
        const res = await requester.post('/user/auth').set('content-type', 'application/json').send({
            login: "lolo",
            password: "hi"
        });
        assert.equal(res.status, 200);
        token = res.body
    });
    /*
    it('Try to get products without auth', async function() {
        const res = await requester.get('/product');
        assert.equal(res.status, 401);
    });
    */
    it('Try to get all products', async function() {
        /*
        console.log(token);
        const res = await requester.get('/product').auth(token, { type: 'auto'});
        assert.equal(res.status, 200);
        */
        const res = await server.inject({
            method: 'get',
            url: '/product'
        });
    });

    requester.close();
});
