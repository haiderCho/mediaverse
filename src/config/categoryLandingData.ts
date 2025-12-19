import { PageId } from '../types';

export interface LandingData {
  title: string;
  preferences: string[];
  description: string;
  signatureDetail?: string;
}

export const CATEGORY_LANDING_DATA: Partial<Record<PageId, LandingData>> = {
  [PageId.MOVIES]: {
    title: "Cinematic Preferences",
    description: "My journey through the silver screen. I value atmospheric storytelling, sharp dialogue, and visual subversion.",
    preferences: [
      "Psychological Thrillers with unreliable narrators",
      "Neo-Noir aesthetics and high-contrast cinematography",
      "Original scores that drive the narrative tension",
      "Character-driven indies over blockbuster spectacles"
    ],
    signatureDetail: "Archive Status: CURATED // SYSTEM.SCAN: COMPLETE"
  },
  [PageId.MUSIC]: {
    title: "Sonic Architecture",
    description: "Exploring the intersections of rhythm and resonance. My library is a mix of digital precision and organic soul.",
    preferences: [
      "Shoegaze and walls of sound texture",
      "Deep House for late-night focus sessions",
      "Concept albums with cohesive narrative arcs",
      "Experimental jazz that pushes structural boundaries"
    ],
    signatureDetail: "Frequency: STABLE // SONIC_INDEX: OPTIMIZED"
  },
  [PageId.ANIME_SERIES]: {
    title: "Animated Visions",
    description: "From the philosophical to the high-energy. I look for unique art styles and themes that challenge the medium.",
    preferences: [
      "Seinen themes with complex moral ambiguity",
      "Fluid animation in high-stakes action sequences",
      "World-building that feels lived-in and deep",
      "Avant-garde directors like Satoshi Kon and Masaaki Yuasa"
    ],
    signatureDetail: "Sync Ratio: 99.8% // NEURAL_LINK: ACTIVE"
  },
  [PageId.ANIME_MOVIES]: {
    title: "Film Anime",
    description: "The theatrical side of Japanese animation. Where stunning visuals meet emotionally resonant storytelling.",
    preferences: [
      "Studio Ghibli's hand-drawn magic",
      "Makoto Shinkai's photorealistic backgrounds",
      "Standalone films with complete emotional arcs",
      "Sakuga animation showcasing raw technical skill"
    ],
    signatureDetail: "Frame Rate: 24fps // CINEMATIC_MODE: ON"
  },
  [PageId.MANGA]: {
    title: "Ink & Panel",
    description: "The art of Japanese sequential storytelling. Bold linework and masterful pacing.",
    preferences: [
      "Seinen with morally grey protagonists",
      "Intricate art styles with high detail density",
      "Unconventional panel layouts and visual flow",
      "Long-running epics with satisfying conclusions"
    ],
    signatureDetail: "Page Scan: COMPLETE // INK_INDEX: CALIBRATED"
  },
  [PageId.MANHWA]: {
    title: "Webtoon Scrolls",
    description: "Korean digital comics optimized for vertical scrolling. Vibrant colors and modern sensibilities.",
    preferences: [
      "Full-color art with cinematic framing",
      "Regression and overpowered MC tropes done right",
      "Smooth vertical scroll experience",
      "Weekly updates that keep the momentum"
    ],
    signatureDetail: "Scroll Depth: INFINITE // COLOR_MODE: FULL"
  },
  [PageId.MANHUA]: {
    title: "Cultivation Chronicles",
    description: "Chinese comics with rich martial arts and cultivation themes.",
    preferences: [
      "Cultivation systems with clear power progression",
      "Unique aesthetic blending traditional and modern",
      "Face-slapping moments done with style",
      "Lore-rich world-building"
    ],
    signatureDetail: "Qi Flow: STABLE // REALM_ASCENSION: PENDING"
  },
  [PageId.COMIC]: {
    title: "Western Panels",
    description: "American and European comics. Superhero sagas and indie masterpieces.",
    preferences: [
      "Vertigo and Image's genre-bending runs",
      "Indie comics with auteur voices",
      "Self-contained graphic novels over endless arcs",
      "Art styles that push the medium's boundaries"
    ],
    signatureDetail: "Issue Count: LOGGED // COLLECTION: GROWING"
  },
  [PageId.TV_SERIES]: {
    title: "Serial Narratives",
    description: "Long-form television storytelling. Character arcs that breathe over seasons.",
    preferences: [
      "Prestige dramas with complex ensemble casts",
      "Limited series with tight, focused narratives",
      "Dark comedies that balance tone expertly",
      "Slow-burn mysteries that reward patience"
    ],
    signatureDetail: "Episode Buffer: FULL // BINGE_MODE: ACTIVE"
  },
  [PageId.DRAMA]: {
    title: "K-Drama Chronicles",
    description: "Korean dramas with their unique blend of romance, comedy, and heart.",
    preferences: [
      "Romance with well-developed leads",
      "Thrillers with unexpected plot twists",
      "OSTs that become emotional anchors",
      "Slice-of-life that feels authentic"
    ],
    signatureDetail: "Heart Rate: ELEVATED // EPISODE_SYNC: COMPLETE"
  },
  [PageId.BOOKS]: {
    title: "Literary Archives",
    description: "Words that linger long after the final page. My choices lean towards the profound and the peculiar.",
    preferences: [
      "Magical realism that blends the mundane and the surreal",
      "Hard Sci-Fi with rigorous technical world-building",
      "Poetry that experiments with spatial layout and rhythm",
      "Gothic horror with thick, oppressive atmospheres"
    ],
    signatureDetail: "Data Integrity: 100% // ARCHIVE_READ: COMPLETE"
  },
  [PageId.LIGHT_NOVEL]: {
    title: "Light Novel Library",
    description: "Japanese prose with anime-style illustrations. Fast-paced stories and imaginative worlds.",
    preferences: [
      "Isekai premises that subvert expectations",
      "Page-turner pacing with hook-driven chapters",
      "Unique magic systems and power mechanics",
      "Character-driven stories over pure power fantasy"
    ],
    signatureDetail: "Volume Stack: GROWING // TEXT_PARSE: ACTIVE"
  },
  [PageId.GAMES]: {
    title: "Interactive Systems",
    description: "Engaging with mechanics as a form of expression. I admire games that marry gameplay with theme flawlessly.",
    preferences: [
      "Immersive sims that reward creative problem-solving",
      "Rogue-likes with 'just one more run' loops",
      "Soulslikes that demand mastery and patience",
      "Environmental storytelling in atmospheric worlds"
    ],
    signatureDetail: "Input Latency: 0ms // GAME_CORE: RUNNING"
  }
};
