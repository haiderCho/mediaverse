import { PageId } from '../../types';

export const GENRE_MAP: Record<PageId, string[]> = {
  ['home']: [],
  ['profile']: [],
  ['anime_series']: ["Shonen","Seinen","Action","Isekai","Fantasy & SciFi","Slice of Life & Comedy","Sports","Supernatural"],
  ['anime_movies']: ["Shonen","Seinen","Action","Fantasy","Slice of Life"],
  ['manga']: ["Psychological"],
  ['manhwa']: ["Action","Romance","Fantasy","Martial Arts"],
  ['manhua']: ["Cultivation","Wuxia","Comedy"],
  ['comic']: ["Superhero","Indie","Horror","Sci-Fi"],
  ['books']: ["Fiction","Non-Fiction","History","Philosophy"],
  ['light_novel']: ["Fantasy","RomCom","Sci-Fi"],
  ['games']: ["RPG","FPS","Strategy","Indie"],
  ['movies']: ["Action","Thriller","Drama","Sci-Fi"],
  ['tv_series']: ["Crime","Fantasy","Sitcom","Documentary"],
  ['drama']: ["K-Drama","J-Drama","Historical"],
  ['music']: [],
  ['trackers']: []
};
