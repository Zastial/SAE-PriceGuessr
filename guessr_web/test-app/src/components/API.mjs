import axios from 'axios';
import Login from './Login.mjs'

const log = Login
axios.defaults.headers.get['jwt'] = log.jwt;

export function getProducts() {
    axios.get(`http://127.0.0.1:3000/product`)
    .then(res => {
    const products = res.data;
    return products});
}

export function getProductById(id) {
    axios.get(`http://127.0.0.1:3000/product/${id}`)
    .then(res => {
    const product = res.data;
    return product});
}

export function guessThePrice(id, price) {
    axios.get(`http://127.0.0.1:3000/product/${id}/${price}`)
    .then(res => {
    const ans = res.data;
    return ans});
}

export function getDailyProducts() {
    console.log(log.jwt)
    axios.get(`http://127.0.0.1:3000/product/daily`)
    .then(res => {
    const products = res.data;
    return products});
}

export function getProductsByDate(date) {
    axios.get(`http://127.0.0.1:3000/product/daily/${date}`)
    .then(res => {
    const products = res.data;
    return products});
}

export function deleteUser(username) {
    axios.delete(`http://127.0.0.1:3000/user/${username}`)
    .then(res => {
    console.log(res.data);
    })
}

export function modifyUser(username, password) {
    axios.modify(`http://127.0.0.1:3000/user/${username}`, {
        login : username,
        password : password
    })
    .then(res => {
    console.log(res.data);
    })
}

export function login(username, password){
    axios.post(`http://127.0.0.1:3000/user/auth`, {
        login : username,
        password : password
    })
    .then(res => {
    console.log(res.data);
    })
}

export function register(username, password){
    axios.post(`http://127.0.0.1:3000/user/register`, {
        login : username,
        password : password
    })
    .then(res => {
    console.log(res.data);
    })
}