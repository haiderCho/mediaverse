import { PageId } from '../../types';

export const GENRE_MAP: Record<PageId, string[]> = {
  ['home']: [],
  ['profile']: [],
  ['anime_series']: ["Shonen","Seinen","Action","Isekai","Fantasy & SciFi","Slice of Life & Comedy","Sports","Supernatural"],
  ['anime_movies']: ["Shonen","Seinen","Action","Fantasy","Slice of Life"],
  ['manga']: ["Shonen", "Seinen", "Action", "Isekai", "Fantasy","Psychological","SciFi", "Slice of Life & Comedy", "Sports", "Supernatural"],
  ['manhwa']: ["Action","Romance","Fantasy","Martial Arts"],
  ['manhua']: ["Cultivation","Wuxia","Comedy"],
  ['comic']: ["Superhero","Indie","Horror","Sci-Fi"],
  ['books']: ["Fantasy","Sci-Fi","Psychological","Novel","Non-Fiction","Philosophy","Literature"],
  ['light_novel']: ["Fantasy","RomCom","Sci-Fi"],
  ['games']: ["RPG","FPS","Strategy","Indie"],
  ['movies']: ["Action", "Drama", "Comedy", "Thriller", "Horror", "Fantasy", "Science Fiction", "Crime", "Animation", "Superhero"],
  ['tv_series']: ["Crime", "Psychological", "Procedural", "Thriller", "Action", "Drama", "Comedy", "Fantasy", "Supernatural", "Documentary"],
  ['drama']: ["K-Drama","J-Drama","C-Drama","Historical"],
  ['music']: [],
  ['trackers']: []
};
