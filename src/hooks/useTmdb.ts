import { useQuery } from '@tanstack/react-query';
import tmdbApi from '../api/tmdb';

export const useTrending = (type: 'movie' | 'tv' | 'all', timeWindow: 'day' | 'week' = 'day') => {
    return useQuery({
        queryKey: ['trending', type, timeWindow],
        queryFn: async () => {
            const response = await tmdbApi.get(`/trending/${type}/${timeWindow}`);
            return response.data.results;
        }
    });
};

export const usePopular = (type: 'movie' | 'tv') => {
    return useQuery({
        queryKey: ['popular', type],
        queryFn: async () => {
            const response = await tmdbApi.get(`/${type}/popular`);
            return response.data.results;
        }
    });
};

export const useTopRated = (type: 'movie' | 'tv') => {
    return useQuery({
        queryKey: ['topRated', type],
        queryFn: async () => {
            const response = await tmdbApi.get(`/${type}/top_rated`);
            return response.data.results;
        }
    });
};

export const useUpcoming = () => {
    return useQuery({
        queryKey: ['upcoming', 'movie'],
        queryFn: async () => {
            const response = await tmdbApi.get('/movie/upcoming');
            return response.data.results;
        }
    });
};

export const useOnTheAir = () => {
    return useQuery({
        queryKey: ['onTheAir', 'tv'],
        queryFn: async () => {
            const response = await tmdbApi.get('/tv/on_the_air');
            return response.data.results;
        }
    });
};

export const useAiringToday = () => {
    return useQuery({
        queryKey: ['airingToday', 'tv'],
        queryFn: async () => {
            const response = await tmdbApi.get('/tv/airing_today');
            return response.data.results;
        }
    });
};

export const useMovieDetails = (id: string) => {
    return useQuery({
        queryKey: ['movieDetails', id],
        queryFn: async () => {
            const response = await tmdbApi.get(`/movie/${id}`, {
                params: {
                    append_to_response: 'credits,videos,similar,reviews'
                }
            });
            return response.data;
        },
        enabled: !!id
    });
};

export const usePopularPeople = () => {
    return useQuery({
        queryKey: ['popularPeople'],
        queryFn: async () => {
            const response = await tmdbApi.get('/person/popular');
            return response.data.results;
        }
    });
};
