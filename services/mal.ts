import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const malApi: AxiosInstance = axios.create({
    baseURL: '/api/anime/mal',
});

// Request interceptor
malApi.interceptors.request.use(
    (config) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
malApi.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        console.error('MAL API Error:', error);
        return Promise.reject(error);
    }
);

export default malApi;
