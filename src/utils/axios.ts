import axios from 'axios';


const getTokenSomehow = async () => {
    return new Promise((res: Function) => {
        setTimeout(() => {
            res('token');
        }, 2000);
    });
};

// Create an Axios instance
const api = axios.create({
    baseURL: 'http://localhost:3001', // Change this to your API base URL
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
    async (config) => {
        // Example: Attach token if available
        const token = await getTokenSomehow();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors
        // Example: if (error.response?.status === 401) { ... }
        return Promise.reject(error);
    }
);

export default api;