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

    const currentData = dataSource === 'ANILIST' ? aniListData : malData;
    const stats = getStatsForPage();

    return {
        stats,
        dataSource,
        setDataSource,
        loading,
        currentData
    };
};
