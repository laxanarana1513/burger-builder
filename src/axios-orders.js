import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-a0078-default-rtdb.firebaseio.com/'
}) 

export default instance