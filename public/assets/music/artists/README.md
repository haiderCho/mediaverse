# Manual Artist Images

This directory contains manually uploaded artist photos that supplement or override Last.fm's artist images.

## How It Works

1. **Upload artist images** to this directory
2. **Update `artist-images.json`** in `public/data/` to map artist names to image files
3. **Manual images persist** across weekly Last.fm data updates

## Directory Structure

```
public/assets/music/artists/
├── aurthohin.jpg
├── ffdp.jpg
├── godsmack.jpg
└── disturbed.jpg
```

## Image Guidelines

- **Format**: JPG or PNG
- **Size**: 300x300px minimum (square aspect ratio recommended)
- **Naming**: Use lowercase with hyphens (e.g., `artist-name.jpg`)
- **Quality**: High-quality artist/band photos work best

## Adding a Manual Override

1. **Save the artist image** to `public/assets/music/artists/`
2. **Edit `public/data/artist-images.json`**:
   ```json
   {
     "Artist Name": "assets/music/artists/filename.jpg"
   }
   ```
3. **Run the fetch script**: `npm run fetch:lastfm`
4. **Manual images will be used** instead of Last.fm images

## Artist Name Matching

The artist name in `artist-images.json` must **exactly match** the artist name from Last.fm. Check your current data in `public/data/lastfm.json` to see the exact names.

## External URLs

You can also use external URLs:
```json
{
  "Artist Name": "https://example.com/artist-photo.jpg"
}
```

## Priority

Manual overrides **always take precedence** over Last.fm API data, even after weekly updates.
