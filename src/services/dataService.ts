import { MediaEntry, PageId } from '../types';

const BASE_URL = import.meta.env.BASE_URL || '/';

class DataService {
  private cache: Record<string, Record<string, MediaEntry[]>> = {};

  async fetchData(pageId: PageId): Promise<Record<string, MediaEntry[]>> {
    if (this.cache[pageId]) {
      return this.cache[pageId];
    }

    try {
      // Clean pageId to ensure it matches filename (though strictly they should match)
      const fileName = `${pageId}.json`;
      const response = await fetch(`${BASE_URL}data/${fileName}`);
      
      if (!response.ok) {
        if (response.status === 404) {
             // It's expected that some pages don't have data yet
            return {};
        }
        console.warn(`Failed to fetch data for ${pageId}: ${response.statusText}`);
        return {};
      }
      
      const data = await response.json();
      this.cache[pageId] = data;
      return data;
    } catch (error) {
      console.error(`Error loading data for ${pageId}:`, error);
      return {};
    }
  }

  async getGenreData(pageId: PageId, genre: string): Promise<MediaEntry[]> {
    const allData = await this.fetchData(pageId);
    return allData[genre] || [];
  }
}

export const dataService = new DataService();
