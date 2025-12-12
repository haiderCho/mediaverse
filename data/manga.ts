import { MediaEntry, PageId } from '../types';

/**
 * Manga data organized by genre
 */
export const mangaData: Record<string, MediaEntry[]> = {
  Psychological: [
    { id: 'manga-psych-1', title: 'Berserk', genre: 'Psychological', myRating: 10, review: 'The dark fantasy masterpiece. Berserk explores trauma, revenge, and the human condition with breathtaking art and brutal storytelling.', coverUrl: 'https://cdn.myanimelist.net/images/manga/1/157897l.jpg' },
    { id: 'manga-psych-2', title: 'Toriko', genre: 'Psychological', myRating: 8, review: 'A gourmet adventure manga with creative creatures and exciting food-based battles across a vast world.', coverUrl: 'https://cdn.myanimelist.net/images/manga/3/73577l.jpg' },
    { id: 'manga-psych-3', title: 'Vagabond', genre: 'Psychological', myRating: 10, review: 'Stunningly beautiful artwork depicting Musashi\'s journey from wild warrior to enlightened swordsman. A meditation on strength and purpose.', coverUrl: 'https://cdn.myanimelist.net/images/manga/1/259070l.jpg' },
    { id: 'manga-psych-4', title: 'Homunculus', genre: 'Psychological', myRating: 9, review: 'A surreal psychological horror about perception, trauma, and the darkness lurking in human minds.', coverUrl: 'https://cdn.myanimelist.net/images/manga/2/54525l.jpg' },
    { id: 'manga-psych-5', title: 'Akumetsu', genre: 'Psychological', myRating: 8, review: 'A dark vigilante story tackling corruption in Japanese society with extreme methods and moral complexity.', coverUrl: 'https://cdn.myanimelist.net/images/manga/1/53255l.jpg' },
    { id: 'manga-psych-6', title: 'Oyasumi Punpun', genre: 'Psychological', myRating: 10, review: 'A devastating exploration of depression, growing up, and the crushing weight of existence. Not for the faint of heart.', coverUrl: 'https://cdn.myanimelist.net/images/manga/3/266834l.jpg' },
    { id: 'manga-psych-7', title: 'Holyland', genre: 'Psychological', myRating: 9, review: 'A bullied boy finds purpose through street fighting. Realistic martial arts and psychological growth combine perfectly.', coverUrl: 'https://cdn.myanimelist.net/images/manga/2/214607l.jpg' },
    { id: 'manga-psych-8', title: 'MONSTER', genre: 'Psychological', myRating: 10, review: 'Urasawa\'s thriller masterpiece. A surgeon\'s ethical choice leads to a cat-and-mouse game with a charismatic psychopath.', coverUrl: 'https://cdn.myanimelist.net/images/manga/3/258224l.jpg' },
    { id: 'manga-psych-9', title: 'Nijigahara Holograph', genre: 'Psychological', myRating: 9, review: 'A non-linear psychological mystery that demands multiple readings. Disturbing and beautifully crafted.', coverUrl: 'https://cdn.myanimelist.net/images/manga/1/157481l.jpg' },
    { id: 'manga-psych-10', title: 'Annarasumanara', genre: 'Psychological', myRating: 9, review: 'A magical manhwa about lost childhood dreams and finding wonder in a cynical world. Visually stunning.', coverUrl: 'https://cdn.myanimelist.net/images/manga/2/188925l.jpg' },
  ],
};

/**
 * Automatically extract available genres from the data
 */
export const mangaGenres = Object.keys(mangaData);

/**
 * Get manga data for a specific genre
 */
export function getMangaData(genre: string): MediaEntry[] {
  return mangaData[genre] || [];
}

/**
 * PageIds that use manga data
 */
export const mangaPageIds = [PageId.MANGA];
