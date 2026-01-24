import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const MAL_BASE_URL = process.env.REACT_APP_MYANIMELIST_BASE_URL || 'https://api.myanimelist.net/v2';
const MAL_CLIENT_ID = process.env.REACT_APP_MYANIMELIST_CLIENT_ID as string;

const malApi: AxiosInstance = axios.create({
    baseURL: MAL_BASE_URL,
    headers: {
        'X-MAL-CLIENT-ID': MAL_CLIENT_ID,
    },
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
