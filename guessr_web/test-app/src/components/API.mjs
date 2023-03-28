import axios from 'axios';

export async function getProducts(token) {
    return await axios.get(`http://127.0.0.1:3000/product`,
    {
        headers: {
            'Authorization': `${token}` 
        }
    })
    .then(res => {
    const products = res.data;
    return products})
}

export async function getProductById(token, id) {
    return await axios.get(`http://127.0.0.1:3000/product/${id}`,
    {
        headers: {
            'Authorization': `${token}` 
        }
    })
    .then(res => {
    const products = res.data;
    return products})
}

export async function guessThePrice(token, id, price) {
    return await axios.get(`http://127.0.0.1:3000/product/${id}/${price}`,
    {
        headers: {
            'Authorization': `${token}` 
        }
    })
    .then(res => {
    const products = res.data;
    return products})
}

export async function getDailyProducts(token) {
    return await axios.get(`http://127.0.0.1:3000/product/daily`,
    {
        headers: {
            'Authorization': `${token}` 
        }
    })
    .then(res => {
    const products = res.data;
    return products})
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