import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const ANIME_BASE_URL = 'https://myanimelist.p.rapidapi.com';
const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY as string;

const animeApi: AxiosInstance = axios.create({
    baseURL: ANIME_BASE_URL,
    headers: {
        'X-RapidAPI-Key': RAPID_API_KEY,
        'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com',
    },
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
