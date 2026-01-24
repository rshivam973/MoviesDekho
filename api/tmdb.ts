import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const tmdbApi: AxiosInstance = axios.create({
    baseURL: '/api/tmdb/',
});

// Request interceptor
tmdbApi.interceptors.request.use(
    (config) => {
        // You can add any request modifications here
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
tmdbApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        console.error('TMDB API Error:', error);
        if (error.response) {
            // Server responded with error status
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something else happened
            console.error('Request error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default tmdbApi;
