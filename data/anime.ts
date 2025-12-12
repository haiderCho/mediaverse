import { MediaEntry, PageId } from '../types';

/**
 * Anime data organized by genre
 * All cover URLs from reliable CDN sources
 */
export const animeData: Record<string, MediaEntry[]> = {
  Shonen: [
    { id: 'anime-shonen-1', title: 'One Piece', genre: 'Shonen', myRating: 10, review: 'An epic adventure spanning decades, One Piece masterfully weaves together friendship, freedom, and the pursuit of dreams in a vast world full of wonder and danger.', coverUrl: 'https://cdn.myanimelist.net/images/anime/6/73245l.jpg' },
    { id: 'anime-shonen-2', title: 'Dragon Ball', genre: 'Shonen', myRating: 9, review: 'The legendary series that defined a generation. Dragon Ball combines intense battles with heartfelt moments and unforgettable characters.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1887/92364l.jpg' },
    { id: 'anime-shonen-3', title: 'Hunter × Hunter', genre: 'Shonen', myRating: 10, review: 'A masterclass in storytelling with complex power systems, deep character development, and psychological depth rarely seen in shonen anime.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1337/99013l.jpg' },
    { id: 'anime-shonen-4', title: 'Naruto', genre: 'Shonen', myRating: 9, review: 'From outcast to hero, Naruto\'s journey explores themes of perseverance, friendship, and redemption with ninja action and emotional storytelling.', coverUrl: 'https://cdn.myanimelist.net/images/anime/13/17405l.jpg' },
    { id: 'anime-shonen-5', title: 'Bleach', genre: 'Shonen', myRating: 8, review: 'Stylish supernatural battles and memorable characters make Bleach a staple of the shonen genre with its unique take on the afterlife.', coverUrl: 'https://cdn.myanimelist.net/images/anime/3/40451l.jpg' },
    { id: 'anime-shonen-6', title: 'Toriko', genre: 'Shonen', myRating: 8, review: 'A delicious blend of gourmet adventure and over-the-top action, Toriko brings fresh energy to the shonen formula with its food-focused battles.', coverUrl: 'https://cdn.myanimelist.net/images/anime/3/30165l.jpg' },
    { id: 'anime-shonen-7', title: 'Katekyo Hitman Reborn!', genre: 'Shonen', myRating: 9, review: 'From comedy to epic mafia battles, Reborn! delivers character growth and thrilling action with unique flame-based powers.', coverUrl: 'https://cdn.myanimelist.net/images/anime/4/16672l.jpg' },
    { id: 'anime-shonen-8', title: 'Black Clover', genre: 'Shonen', myRating: 8, review: 'A tale of determination overcoming limitations, Black Clover combines magical battles with the classic underdog story.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1546/139592l.jpg' },
    { id: 'anime-shonen-9', title: 'Yu Yu Hakusho', genre: 'Shonen', myRating: 9, review: 'A supernatural classic that balances humor, action, and emotional depth with one of anime\'s best tournament arcs.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1440/113536l.jpg' },
    { id: 'anime-shonen-10', title: 'Fairy Tail', genre: 'Shonen', myRating: 8, review: 'Magic, friendship, and adventure combine in this heartwarming series about a guild that feels like family.', coverUrl: 'https://cdn.myanimelist.net/images/anime/5/18179l.jpg' },
  ],
  Seinen: [
    { id: 'anime-seinen-1', title: 'Hellsing Ultimate', genre: 'Seinen', myRating: 9, review: 'Dark, violent, and stylish. Hellsing Ultimate is a vampire masterpiece with incredible action and a charismatic protagonist.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1343/135407l.jpg' },
    { id: 'anime-seinen-2', title: 'Ajin', genre: 'Seinen', myRating: 8, review: 'A thought-provoking exploration of immortality and humanity with innovative action sequences and moral complexity.', coverUrl: 'https://cdn.myanimelist.net/images/anime/10/77227l.jpg' },
    { id: 'anime-seinen-3', title: 'Kiseijuu: Sei no Kakuritsu', genre: 'Seinen', myRating: 9, review: 'Parasyte brilliantly examines what it means to be human through body horror and philosophical questions.', coverUrl: 'https://cdn.myanimelist.net/images/anime/3/59016l.jpg' },
    { id: 'anime-seinen-4', title: 'Vinland Saga', genre: 'Seinen', myRating: 10, review: 'An epic tale of revenge, redemption, and the true meaning of being a warrior set in the Viking age.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1500/103005l.jpg' },
    { id: 'anime-seinen-5', title: 'Kingdom', genre: 'Seinen', myRating: 9, review: 'Massive scale warfare and political intrigue in ancient China. Kingdom is an underrated gem of historical epic storytelling.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1662/97836l.jpg' },
    { id: 'anime-seinen-6', title: 'Monster', genre: 'Seinen', myRating: 10, review: 'A psychological thriller masterpiece. Monster is a slow-burn exploration of morality, justice, and the nature of evil.', coverUrl: 'https://cdn.myanimelist.net/images/anime/10/18793l.jpg' },
    { id: 'anime-seinen-7', title: 'Zankyou no Terror', genre: 'Seinen', myRating: 9, review: 'A cerebral thriller about terrorism, trauma, and seeking acknowledgment in a society that erased your existence.', coverUrl: 'https://cdn.myanimelist.net/images/anime/8/59319l.jpg' },
    { id: 'anime-seinen-8', title: 'Dororo', genre: 'Seinen', myRating: 9, review: 'A dark fairytale about reclaiming one\'s humanity piece by piece. Beautiful animation meets tragic storytelling.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1087/93888l.jpg' },
    { id: 'anime-seinen-9', title: 'Gangsta', genre: 'Seinen', myRating: 8, review: 'Gritty crime drama with memorable characters and stylish action set in a city of outlaws.', coverUrl: 'https://cdn.myanimelist.net/images/anime/7/71285l.jpg' },
    { id: 'anime-seinen-10', title: 'Rainbow: Nisha Rokubou no Shichinin', genre: 'Seinen', myRating: 9, review: 'A brutal but beautiful story of friendship and survival in post-war Japan. Emotional and unflinching.', coverUrl: 'https://cdn.myanimelist.net/images/anime/3/25150l.jpg' },
  ],
  Action: [
    { id: 'anime-action-1', title: 'One Punch Man', genre: 'Action', myRating: 9, review: 'A brilliant parody and love letter to superhero stories with spectacular animation and satirical humor.', coverUrl: 'https://cdn.myanimelist.net/images/anime/12/76049l.jpg' },
    { id: 'anime-action-2', title: 'My Hero Academia', genre: 'Action', myRating: 9, review: 'Modern superhero storytelling at its finest. MHA captures the excitement of classic shonen with fresh ideas.', coverUrl: 'https://cdn.myanimelist.net/images/anime/10/78745l.jpg' },
    { id: 'anime-action-3', title: 'Fullmetal Alchemist: Brotherhood', genre: 'Action', myRating: 10, review: 'Perfect storytelling. FMAB masterfully balances action, emotion, and philosophy in an epic tale of equivalent exchange.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1223/96541l.jpg' },
    { id: 'anime-action-4', title: 'Enen no Shouboutai', genre: 'Action', myRating: 8, review: 'Fire Force brings stunning animation and unique firefighter-based superpowers to the action genre.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1784/101379l.jpg' },
    { id: 'anime-action-5', title: 'Fate/Series', genre: 'Action', myRating: 9, review: 'Epic battles between legendary heroes with deep lore and spectacular animation throughout the franchise.', coverUrl: 'https://cdn.myanimelist.net/images/anime/10/49181l.jpg' },
    { id: 'anime-action-6', title: 'Noragami', genre: 'Action', myRating: 8, review: 'A perfect blend of action, comedy, and mythology with endearing characters and emotional depth.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1886/142750l.jpg' },
    { id: 'anime-action-7', title: 'The God of High School', genre: 'Action', myRating: 8, review: 'Over-the-top martial arts action with incredible fight choreography and escalating scale.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1722/107269l.jpg' },
    { id: 'anime-action-8', title: 'Ousama Ranking', genre: 'Action', myRating: 9, review: 'Don\'t let the art style fool you - this is a deeply emotional tale of a deaf prince proving his worth.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1347/117616l.jpg' },
    { id: 'anime-action-9', title: 'Record of Ragnarok', genre: 'Action', myRating: 8, review: 'Gods vs Humanity in epic one-on-one battles for the fate of mankind. Pure spectacle and hype.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1638/117244l.jpg' },
  ],
  Isekai: [
    { id: 'anime-isekai-1', title: 'Overlord', genre: 'Isekai', myRating: 9, review: 'Playing the villain in another world. Overlord offers a unique perspective on the isekai genre with strategic world domination.', coverUrl: 'https://cdn.myanimelist.net/images/anime/7/88019l.jpg' },
    { id: 'anime-isekai-2', title: 'Drifters', genre: 'Isekai', myRating: 9, review: 'Historical figures fight in a fantasy world. Dark, violent, and utterly unique in execution.', coverUrl: 'https://cdn.myanimelist.net/images/anime/9/81228l.jpg' },
    { id: 'anime-isekai-3', title: 'Log Horizon', genre: 'Isekai', myRating: 9, review: 'The thinking person\'s isekai. Log Horizon focuses on world-building, economics, and politics in an MMO world.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1959/133845l.jpg' },
    { id: 'anime-isekai-4', title: 'Hai to Gensou no Grimgar', genre: 'Isekai', myRating: 8, review: 'A grounded, realistic take on isekai where survival is hard and every battle matters.', coverUrl: 'https://cdn.myanimelist.net/images/anime/5/77614l.jpg' },
    { id: 'anime-isekai-5', title: 'Mondaiji-tachi ga Isekai kara Kuru Sou Desu yo', genre: 'Isekai', myRating: 8, review: 'Overpowered protagonists solving problems through gift games in a vibrant fantasy world.', coverUrl: 'https://cdn.myanimelist.net/images/anime/12/46147l.jpg' },
    { id: 'anime-isekai-6', title: 'No Game, No Life', genre: 'Isekai', myRating: 9, review: 'A world where everything is decided by games. Stylish, colorful, and filled with clever strategies.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1074/111944l.jpg' },
    { id: 'anime-isekai-7', title: 'Tsuki ga Michibiku Isekai Douchuu', genre: 'Isekai', myRating: 8, review: 'Abandoned by the goddess, our MC builds their own path with comedy and satisfying power progression.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1959/113463l.jpg' },
    { id: 'anime-isekai-8', title: 'Tate no Yuusha no Noriagari', genre: 'Isekai', myRating: 8, review: 'Rising from betrayal and false accusations, Shield Hero is a tale of redemption and found family.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1490/101365l.jpg' },
    { id: 'anime-isekai-9', title: 'Tensei shitara Slime Datta Ken', genre: 'Isekai', myRating: 9, review: 'Wholesome nation-building as a slime. Rimuru\'s journey is heartwarming and occasionally badass.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1694/90408l.jpg' },
    { id: 'anime-isekai-10', title: 'I\'m Standing on a Million Lives', genre: 'Isekai', myRating: 7, review: 'A more cynical take on being summoned to another world with clear quest objectives and moral dilemmas.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1070/108035l.jpg' },
  ],
  'Fantasy & SciFi': [
    { id: 'anime-fantasy-1', title: 'Berserk', genre: 'Fantasy & SciFi', myRating: 10, review: 'Dark fantasy at its finest. Berserk combines brutal action with deep character study and philosophical themes.', coverUrl: 'https://cdn.myanimelist.net/images/anime/11/75492l.jpg' },
    { id: 'anime-fantasy-2', title: 'Goblin Slayer', genre: 'Fantasy & SciFi', myRating: 8, review: 'A dark, methodical take on fantasy adventuring. Goblin Slayer is tactical, brutal, and unapologetically grim.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1043/93096l.jpg' },
    { id: 'anime-fantasy-3', title: 'Made in Abyss', genre: 'Fantasy & SciFi', myRating: 10, review: 'Deceptively cute art hiding a harrowing journey into the depths. Made in Abyss is beautiful and terrifying.', coverUrl: 'https://cdn.myanimelist.net/images/anime/6/86733l.jpg' },
    { id: 'anime-fantasy-4', title: 'DanMachi', genre: 'Fantasy & SciFi', myRating: 8, review: 'Dungeon crawler with heart. DanMachi combines RPG mechanics with compelling character relationships.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1687/90408l.jpg' },
    { id: 'anime-fantasy-5', title: 'Magi: The Kingdom of Magic', genre: 'Fantasy & SciFi', myRating: 9, review: 'Arabian Nights-inspired adventure with grand scale world-building and political intrigue.', coverUrl: 'https://cdn.myanimelist.net/images/anime/13/51965l.jpg' },
    { id: 'anime-fantasy-6', title: 'Gurren Lagann', genre: 'Fantasy & SciFi', myRating: 10, review: 'Believe in the you that believes in yourself! Gurren Lagann is pure hype, escalation, and indomitable spirit.', coverUrl: 'https://cdn.myanimelist.net/images/anime/2/11377l.jpg' },
    { id: 'anime-fantasy-7', title: 'Attack on Titan', genre: 'Fantasy & SciFi', myRating: 10, review: 'A masterpiece of mystery, action, and moral complexity. AoT redefines what shonen can achieve.', coverUrl: 'https://cdn.myanimelist.net/images/anime/10/47347l.jpg' },
    { id: 'anime-fantasy-8', title: 'Cowboy Bebop', genre: 'Fantasy & SciFi', myRating: 10, review: 'The gold standard of space westerns. Cowboy Bebop is stylish, melancholic, and timeless.', coverUrl: 'https://cdn.myanimelist.net/images/anime/4/19644l.jpg' },
    { id: 'anime-fantasy-9', title: 'Code Geass', genre: 'Fantasy & SciFi', myRating: 9, review: 'Strategic battles, political intrigue, and moral ambiguity. Code Geass is a gripping tale of rebellion.', coverUrl: 'https://cdn.myanimelist.net/images/anime/5/50331l.jpg' },
    { id: 'anime-fantasy-10', title: 'Heroic Age', genre: 'Fantasy & SciFi', myRating: 8, review: 'Epic space opera with ancient powers and interstellar conflict. Underrated gem of sci-fi anime.', coverUrl: 'https://cdn.myanimelist.net/images/anime/4/9547l.jpg' },
  ],
  'Slice of Life & Comedy': [
    { id: 'anime-sol-1', title: 'Barakamon', genre: 'Slice of Life & Comedy', myRating: 9, review: 'Heartwarming tale of self-discovery and artistic growth. Barakamon perfectly captures the healing power of community.', coverUrl: 'https://cdn.myanimelist.net/images/anime/5/59661l.jpg' },
    { id: 'anime-sol-2', title: 'NHK Ni Youkoso!', genre: 'Slice of Life & Comedy', myRating: 9, review: 'A darkly comedic exploration of social anxiety, NEETdom, and finding purpose. Uncomfortable but brilliant.', coverUrl: 'https://cdn.myanimelist.net/images/anime/13/75474l.jpg' },
    { id: 'anime-sol-3', title: 'Kotaro Lives Alone', genre: 'Slice of Life & Comedy', myRating: 9, review: 'Heartbreakingly sweet story of a child learning to live independently and the adults who care for him.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1915/120701l.jpg' },
    { id: 'anime-sol-4', title: 'GTO - Great Teacher Onizuka', genre: 'Slice of Life & Comedy', myRating: 9, review: 'A former delinquent becomes the greatest teacher. GTO is hilarious, heartfelt, and inspiring.', coverUrl: 'https://cdn.myanimelist.net/images/anime/13/11931l.jpg' },
    { id: 'anime-sol-5', title: 'Bakuman', genre: 'Slice of Life & Comedy', myRating: 9, review: 'The journey to become manga artists. Bakuman is passionate, realistic, and deeply engaging.', coverUrl: 'https://cdn.myanimelist.net/images/anime/5/27731l.jpg' },
    { id: 'anime-sol-6', title: 'Danshi Koukousei no Nichijou', genre: 'Slice of Life & Comedy', myRating: 9, review: 'Absurdist comedy about high school boys being idiots. Nichijou perfectly captures teenage humor.', coverUrl: 'https://cdn.myanimelist.net/images/anime/5/35779l.jpg' },
    { id: 'anime-sol-7', title: 'Nichijou', genre: 'Slice of Life & Comedy', myRating: 9, review: 'Surreal, energetic comedy that elevates everyday moments to absurd extremes. Visually stunning.', coverUrl: 'https://cdn.myanimelist.net/images/anime/3/75617l.jpg' },
    { id: 'anime-sol-8', title: 'Hinamatsuri', genre: 'Slice of Life & Comedy', myRating: 9, review: 'A yakuza raising a psychic girl. Hinamatsuri balances comedy and heartwarming moments perfectly.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1393/93433l.jpg' },
    { id: 'anime-sol-9', title: 'SpyXFamily', genre: 'Slice of Life & Comedy', myRating: 9, review: 'Found family of spies, assassins, and telepaths. Wholesome, funny, and occasionally action-packed.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1441/122795l.jpg' },
    { id: 'anime-sol-10', title: 'Komi-san wa, Komyushou desu', genre: 'Slice of Life & Comedy', myRating: 8, review: 'Helping a girl with communication disorder make 100 friends. Sweet, funny, and relatable.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1117/118339l.jpg' },
  ],
  Sports: [
    { id: 'anime-sports-1', title: 'Slam Dunk', genre: 'Sports', myRating: 10, review: 'The basketball anime that started it all. Slam Dunk is passionate, realistic, and incredibly inspiring.', coverUrl: 'https://cdn.myanimelist.net/images/anime/6/7655l.jpg' },
    { id: 'anime-sports-2', title: 'Kuroko no Basket', genre: 'Sports', myRating: 8, review: 'Basketball meets superpowers. Kuroko combines hype moments with strategic team plays.', coverUrl: 'https://cdn.myanimelist.net/images/anime/11/50453l.jpg' },
    { id: 'anime-sports-3', title: 'Haikyuu!!', genre: 'Sports', myRating: 10, review: 'The perfect sports anime. Haikyuu captures the thrill of volleyball with outstanding animation and heart.', coverUrl: 'https://cdn.myanimelist.net/images/anime/7/76014l.jpg' },
    { id: 'anime-sports-4', title: 'Eyeshield 21', genre: 'Sports', myRating: 8, review: 'American football anime with creative strategies and memorable characters. Exciting and fun.', coverUrl: 'https://cdn.myanimelist.net/images/anime/9/7655l.jpg' },
    { id: 'anime-sports-5', title: 'Blue Lock', genre: 'Sports', myRating: 8, review: 'Soccer training with a battle royale twist. Blue Lock is intense, competitive, and addictive.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1258/126929l.jpg' },
    { id: 'anime-sports-6', title: 'Hajime no Ippo', genre: 'Sports', myRating: 10, review: 'The ultimate boxing anime. Ippo is inspiring, technical, and emotionally resonant across 100+ episodes.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1856/134801l.jpg' },
    { id: 'anime-sports-7', title: 'Kengan Ashura', genre: 'Sports', myRating: 8, review: 'Underground fight tournaments with corporate stakes. Brutal, visceral martial arts action.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1154/95231l.jpg' },
    { id: 'anime-sports-8', title: 'Megalo Box', genre: 'Sports', myRating: 9, review: 'Cyberpunk boxing with a retro aesthetic. Megalo Box is stylish and emotionally powerful.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1454/90670l.jpg' },
    { id: 'anime-sports-9', title: 'Yowamushi Pedal', genre: 'Sports', myRating: 8, review: 'Competitive cycling anime that makes bike racing incredibly exciting and strategic.', coverUrl: 'https://cdn.myanimelist.net/images/anime/8/52095l.jpg' },
    { id: 'anime-sports-10', title: 'Initial D', genre: 'Sports', myRating: 9, review: 'Legendary street racing anime. Initial D combines technical racing knowledge with memorable characters.', coverUrl: 'https://cdn.myanimelist.net/images/anime/6/13020l.jpg' },
  ],
  Supernatural: [
    { id: 'anime-super-1', title: 'Mushishi', genre: 'Supernatural', myRating: 10, review: 'Contemplative, atmospheric exploration of nature spirits. Mushishi is meditative and beautifully crafted.', coverUrl: 'https://cdn.myanimelist.net/images/anime/2/75431l.jpg' },
    { id: 'anime-super-2', title: 'Natsume Yuujinchou', genre: 'Supernatural', myRating: 9, review: 'Heartwarming tales of yokai and human connections. Gentle, emotional, and wonderfully consistent.', coverUrl: 'https://cdn.myanimelist.net/images/anime/11/75470l.jpg' },
    { id: 'anime-super-3', title: 'Kyokou Suiri', genre: 'Supernatural', myRating: 8, review: 'Mystery-solving with yokai. Kyokou Suiri is clever, dialogue-heavy, and uniquely structured.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1918/102804l.jpg' },
    { id: 'anime-super-4', title: 'Demon Slayer', genre: 'Supernatural', myRating: 9, review: 'Gorgeous animation and emotional storytelling. Demon Slayer combines family tragedy with thrilling battles.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1286/99889l.jpg' },
    { id: 'anime-super-5', title: 'Jujutsu Kaisen', genre: 'Supernatural', myRating: 9, review: 'Modern cursed energy battles with exceptional choreography. JJK is dark, stylish, and addictive.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222l.jpg' },
    { id: 'anime-super-6', title: 'Kemono Jihen', genre: 'Supernatural', myRating: 7, review: 'Half-human monster hunters protecting humans. Fun supernatural action with interesting creature lore.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1289/110365l.jpg' },
    { id: 'anime-super-7', title: 'Nurarihyon no Mago', genre: 'Supernatural', myRating: 8, review: 'Yokai clan politics and battles. Nurarihyon blends Japanese folklore with coming-of-age story.', coverUrl: 'https://cdn.myanimelist.net/images/anime/5/25687l.jpg' },
    { id: 'anime-super-8', title: 'Chainsaw Man', genre: 'Supernatural', myRating: 9, review: 'Chaotic, bloody, and surprisingly emotional. Chainsaw Man is unhinged demon-hunting at its finest.', coverUrl: 'https://cdn.myanimelist.net/images/anime/1806/125990l.jpg' },
  ],
};

/**
 * Automatically extract available genres from the data
 */
export const animeGenres = Object.keys(animeData);

/**
 * Get anime data for a specific genre
 */
export function getAnimeData(genre: string): MediaEntry[] {
  return animeData[genre] || [];
}

/**
 * PageIds that use anime series data
 */
export const animePageIds = [PageId.ANIME_SERIES];
