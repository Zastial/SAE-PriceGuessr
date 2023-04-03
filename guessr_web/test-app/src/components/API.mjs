import axios from 'axios';

export const DAOProduct = {

    async getProducts(token) {
        return await axios.get(`http://127.0.0.1:3000/product`,
        {
            headers: {
                'Authorization': `${token}` 
            }
        })
        .then(res => {
        const products = res.data;
        return products})
    },

    async getProductById(token, id) {
        return await axios.get(`http://127.0.0.1:3000/product/${id}`,
        {
            headers: {
                'Authorization': `${token}` 
            }
        })
        .then(res => {
        const products = res.data;
        return products})
    },

    async guessThePrice(token, id, price) {
        return await axios.get(`http://127.0.0.1:3000/product/${id}/${price}`,
        {
            headers: {
                'Authorization': `${token}` 
            }
        })
        .then(res => {
        const products = res.data;
        return products})
    },

    async getProductAvailability(token, id) {
        return await axios.get(`http://127.0.0.1:3000/product/availability/${id}`,
        {
            headers: {
                'Authorization': `${token}`
            }
        })
        .then(res => {
        const products = res.data;
        return products})
    },

    async getDailyProducts(token) {
        return await axios.get(`http://127.0.0.1:3000/product/daily`,
        {
            headers: {
                'Authorization': `${token}` 
            }
        })
        .then(res => {
        const products = res.data;
        return products})
    },

    async getProductsByDate(token, date) {
        return await axios.get(`http://127.0.0.1:3000/product/daily/${date}`,
        {
            headers: {
                'Authorization': `${token}` 
            }
        })
        .then(res => {
        const products = res.data;
        return products})
    },

    async deleteUser(token) {
        await axios.delete(`http://127.0.0.1:3000/user`,
        {
            headers: {
                'Authorization': `${token}` 
            }
        })
        .then(res => {
        console.log(res.data);
        })
    },

     modifyUser(token, password) {
        axios.put(`http://127.0.0.1:3000/user`, {
            password : password
        },
        {
            headers: {
                'Authorization': `${token}` 
            }
        })
        .then(res => {
        console.log(res.data);
        })
    },

    login(username, password){
        axios.post(`http://127.0.0.1:3000/user/auth`, {
            login : username,
            password : password
        })
        .then(res => {
        console.log(res.data);
        })
    },

     register(username, password){
        axios.post(`http://127.0.0.1:3000/user/register`, {
            login : username,
            password : password
        })
        .then(res => {
        console.log(res.data);
        })
    }
}

export default DAOProduct