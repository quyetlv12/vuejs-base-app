import axios from 'axios';

const httpClient = axios.create({
    baseURL: 'https://apidemo.toolsdigitel.io.vn/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add request interceptor to include token in headers
httpClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle unauthorized and forbidden responses
httpClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Clear token and redirect to login
            localStorage.removeItem('token');
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default httpClient;
