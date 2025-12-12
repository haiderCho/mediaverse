# Mediaverse

## ✨ Features

- **Hexagonal Navigation**: Unique, space-themed landing page with interactive hexagonal grid layout
- **Multiple Media Categories**: Organize comics, manga, manhwa, manhua, anime, movies, TV series, books, games, music, and more
- **Custom Theming**: Each category has its own distinct visual theme with custom fonts and color schemes
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Modern Tech Stack**: Built with React 19, TypeScript, Vite, and Tailwind CSS

## 🚀 Technology Stack

- **Frontend Framework**: React 19.2
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 6.2
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Various thematic fonts)

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/mediaverse.git
   cd mediaverse
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production bundle with TypeScript compilation
- `npm run preview` - Preview the production build locally
- `npm run type-check` - Run TypeScript type checking without emitting files
- `npm run lint` - Lint the codebase with ESLint
- `npm run format` - Format code with Prettier

## 📁 Project Structure

```
mediaverse/
├── components/          # Reusable React components
│   ├── Hexagon.tsx     # Hexagonal navigation button
│   ├── MediaCard.tsx   # Media entry card component
│   └── SpaceBackground.tsx  # Animated space background
├── views/              # Page-level components
│   ├── LandingPage.tsx # Main landing page with hex grid
│   └── CategoryPage.tsx # Generic category page layout
├── pages/              # Legacy HTML files (reference only)
├── constants.ts        # Configuration, themes, and mock data
├── types.ts           # TypeScript type definitions
├── App.tsx            # Main application component with routing
├── index.tsx          # Application entry point
├── index.html         # HTML template
├── vite.config.ts     # Vite configuration
└── tsconfig.json      # TypeScript configuration
```

## 🎨 Categories

The portfolio supports the following media categories, each with unique theming:

- **Comics** - Superhero, Indie, Horror, Sci-Fi
- **Manga** - Shonen, Seinen, Shojo, Isekai
- **Manhwa** - Action, Romance, Fantasy, Martial Arts
- **Manhua** - Cultivation, Wuxia, Comedy
- **Anime Series** - Action, Slice of Life, Mecha, Psychological
- **Anime Movies** - Ghibli, Shinkai, Original, Franchise
- **Movies** - Action, Thriller, Drama, Sci-Fi
- **TV Series** - Crime, Fantasy, Sitcom, Documentary
- **Books** - Fiction, Non-Fiction, History, Philosophy
- **Light Novels** - Fantasy, RomCom, Sci-Fi
- **Games** - RPG, FPS, Strategy, Indie
- **Music** - Rock, Electronic, Pop, Jazz
- **Drama** - K-Drama, J-Drama, Historical

## 🔧 Development Guidelines

- **Code Style**: The project uses ESLint and Prettier for consistent code formatting
- **Type Safety**: All components are fully typed with TypeScript
- **Component Structure**: Follow the existing pattern of separating views, components, and utilities
- **Naming Conventions**: Use PascalCase for components, camelCase for functions and variables
- **Commits**: Write clear, descriptive commit messages

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Design inspired by modern space-themed UIs
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Placeholder images from [Picsum](https://picsum.photos/)