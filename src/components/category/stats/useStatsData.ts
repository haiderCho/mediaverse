import { useState, useEffect } from 'react';
import { PageId } from '../../../types';
import { MalData, MalStat, DataSource } from './types';

export const useStatsData = (pageId: PageId) => {
    const [aniListData, setAniListData] = useState<MalData | null>(null);
    const [malData, setMalData] = useState<MalData | null>(null);
    const [loading, setLoading] = useState(true);
    const [dataSource, setDataSource] = useState<DataSource>('ANILIST');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const baseUrl = import.meta.env.BASE_URL;
                const prefix = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';
                
                const [aniListRes, malRes] = await Promise.all([
                    fetch(`${prefix}data/anilist-stats.json`),
                    fetch(`${prefix}data/mal-stats.json`)
                ]);

                if (aniListRes.ok) setAniListData(await aniListRes.json());
                if (malRes.ok) setMalData(await malRes.json());
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const getStatsForPage = () => {
        const data = dataSource === 'ANILIST' ? aniListData : malData;
        if (!data) return null;
        
        // Map PageId to JSON keys
        const map: Record<string, string> = {
          [PageId.ANIME_SERIES]: 'anime_series',
          [PageId.ANIME_MOVIES]: 'anime_movies',
          [PageId.MANGA]: 'manga',
          [PageId.MANHWA]: 'manhwa',
          [PageId.MANHUA]: 'manhua'
        };
        
        const key = map[pageId];
        return key ? data.stats[key] : null;
    };

    const getCinematicStats = (): CinematicStat | null => {
        if (pageId === PageId.MOVIES) {
            return {
                totalTitles: 3931,
                averageRating: 8.42,
                totalRuntime: "11,240h",
                ratingsDistribution: [
                    { score: 1, count: 42 },
                    { score: 2, count: 58 },
                    { score: 3, count: 112 },
                    { score: 4, count: 245 },
                    { score: 5, count: 456 },
                    { score: 6, count: 712 },
                    { score: 7, count: 894 },
                    { score: 8, count: 912 }, // Peak at 8
                    { score: 9, count: 320 },
                    { score: 10, count: 180 }
                ],
                decades: [
                    { decade: "2020", count: 840 },
                    { decade: "2010", count: 1240 },
                    { decade: "2000", count: 950 },
                    { decade: "1990", count: 420 },
                    { decade: "1980", count: 210 },
                    { decade: "1970", count: 140 },
                    { decade: "1960", count: 80 },
                    { decade: "1950", count: 40 },
                    { decade: "1940", count: 11 }
                ],
                topGenres: [
                    { name: "Drama", count: 1420 },
                    { name: "Sci-Fi", count: 840 },
                    { name: "Thriller", count: 712 },
                    { name: "Horror", count: 450 },
                    { name: "Comedy", count: 312 }
                ],
                recentMilestones: [
                    { label: "RECENTLY WATCHED", value: "Dune: Part Two" },
                    { label: "HIGHEST RATED GENRE", value: "Sci-Fi" },
                    { label: "COLLECTION STATUS", value: "VERIFIED" }
                ]
            };
        }
        
        if (pageId === PageId.TV_SERIES) {
            return {
                totalTitles: 412,
                averageRating: 8.75,
                totalRuntime: "14,500h",
                ratingsDistribution: [
                    { score: 5, count: 24 },
                    { score: 6, count: 32 },
                    { score: 7, count: 84 },
                    { score: 8, count: 156 },
                    { score: 9, count: 212 }, // Peak at 9
                    { score: 10, count: 112 }
                ],
                decades: [
                    { decade: "2020", count: 180 },
                    { decade: "2010", count: 150 },
                    { decade: "2000", count: 60 },
                    { decade: "1990", count: 15 },
                    { decade: "1980", count: 5 },
                    { decade: "1970", count: 2 }
                ],
                topGenres: [
                    { name: "Drama", count: 210 },
                    { name: "Crime", count: 140 },
                    { name: "Sci-Fi", count: 112 },
                    { name: "Fantasy", count: 98 },
                    { name: "Action", count: 45 }
                ],
                recentMilestones: [
                    { label: "CURRENTLY WATCHING", value: "X-Men '97" },
                    { label: "EPISODES WATCHED", value: "11,420" },
                    { label: "COLLECTION STATUS", value: "CHRONICLED" }
                ]
            };
        }
        return null;
    };

    const isCinematic = pageId === PageId.MOVIES || pageId === PageId.TV_SERIES;
    const stats = isCinematic ? getCinematicStats() : getStatsForPage();
    const currentData = isCinematic 
        ? { username: 'NafizHC', avatar: 'https://i.pravatar.cc/150?u=nafizhc', fetchedAt: new Date().toISOString() } 
        : (dataSource === 'ANILIST' ? aniListData : malData);

    return {
        stats,
        dataSource,
        setDataSource,
        loading,
        currentData,
        isCinematic
    };
};
