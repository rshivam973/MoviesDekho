import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import malApi from '../api/mal';
import animeApi from '../api/anime';

// New Anime Ranking Endpoint: /anime/ranking?ranking_type={type}&limit={limit}&offset={offset}
// Based on user screenshots.

export const useAnimeRanking = (rankingType: string = 'all', limit: number = 20) => {
    return useQuery({
        queryKey: ['anime', 'ranking', rankingType, limit],
        queryFn: async () => {
            const response = await malApi.get('anime/ranking', {
                params: {
                    ranking_type: rankingType,
                    limit: limit,
                    fields: 'id,title,main_picture,mean,status,genres,num_episodes,start_date'
                }
            });
            // The API response structure from screenshots shows "data" array
            return response.data.data.map((item: any) => ({
                id: item.node.id,
                title: item.node.title,
                picture_url: item.node.main_picture?.large || item.node.main_picture?.medium,
                score: item.node.mean,
                aired_on: item.node.start_date,
            }));
        }
    });
};

export const useInfiniteAnimeRanking = (rankingType: string = 'all') => {
    return useInfiniteQuery({
        queryKey: ['anime', 'ranking', 'infinite', rankingType],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await malApi.get('anime/ranking', {
                params: {
                    ranking_type: rankingType,
                    limit: 20,
                    offset: pageParam,
                    fields: 'id,title,main_picture,mean,status,genres,num_episodes,start_date'
                }
            });
            return response.data;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.data.length < 20) return undefined;
            return allPages.length * 20;
        },
        initialPageParam: 0,
    });
};

export const useAnimeDetails = (id: number) => {
    return useQuery({
        queryKey: ['anime', 'details', id],
        queryFn: async () => {
            const response = await malApi.get(`anime/${id}`, {
                params: {
                    fields: 'id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics'
                }
            });
            return response.data;
        },
        enabled: !!id
    });
};
export const useRapidAnimeRanking = (rankingType: string = 'all') => {
    return useQuery({
        queryKey: ['anime', 'rapid-ranking', rankingType],
        queryFn: async () => {
            const response = await animeApi.get(`anime/top/${rankingType}`);
            return response.data;
        }
    });
};
