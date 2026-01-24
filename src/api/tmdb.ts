import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;

const tmdbApi: AxiosInstance = axios.create({
    baseURL: TMDB_BASE_URL,
    headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'accept': 'application/json',
    },
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
