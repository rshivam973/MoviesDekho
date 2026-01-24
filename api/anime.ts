import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const animeApi: AxiosInstance = axios.create({
    baseURL: '/api/anime/rapid/',
});

// Request interceptor
animeApi.interceptors.request.use(
    (config) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
animeApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        console.error('Anime API Error:', error);
        return Promise.reject(error);
    }
);

export default animeApi;
