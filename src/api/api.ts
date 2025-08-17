import axios from 'axios'

const api = axios.create({
    baseURL: 'https://ecommerce.routemisr.com/api/v1',
    timeout: 10000,
    headers: { 'X-Custom-Header': 'foobar' },
});

export default api
