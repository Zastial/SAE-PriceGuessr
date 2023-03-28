import axios from 'axios';

export async function getProducts(token) {
    console.log(token)
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