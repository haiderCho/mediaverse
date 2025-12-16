# Artist Image Overrides - Usage Guide

## Overview

Manual artist images **persist across weekly Last.fm updates**. The fetch script checks `artist-images.json` first before using Last.fm data.

## How to Add Artist Images

### Step 1: Upload Artist Photo
Save your artist image to: `public/assets/music/artists/`

**Recommended specs:**
- Format: JPG or PNG
- Size: 300x300px minimum (square)
- Quality: High-resolution band/artist photos

### Step 2: Update artist-images.json
Edit `public/data/artist-images.json`:

```json
{
  "Avenged Sevenfold": "assets/music/artists/avenged-sevenfold.jpg",
  "Metallica": "assets/music/artists/metallica.jpg"
}
```

**Important:** Artist names must match **exactly** as they appear in Last.fm (including capitalization).

### Step 3: Re-fetch Data
```bash
npm run fetch:lastfm
```

Manual images will be used instead of Last.fm placeholders.

## What Happens on Weekly Updates?

✅ **Manual images persist** - They're stored separately and loaded first
✅ **Scrobble counts update** - Fresh playcount data from Last.fm  
✅ **New artists get Last.fm images** - Until you add manual overrides for them
✅ **Your overrides never get lost** - The script always checks overrides first

## Using External URLs

You can also use direct image URLs:
```json
{
  "Artist Name": "https://example.com/artist-photo.jpg"
}
```

## Finding Artist Names

Check exact artist names in your current data:
```bash
Get-Content public\data\lastfm.json | Select-String '"name"' | Select-Object -First 60
```

Or open `public/data/lastfm.json` and look in the `"artists"` section.

## Examples

```json
{
  "Aurthohin": "assets/music/artists/aurthohin.jpg",
  "Five Finger Death Punch": "https://i.imgur.com/example.jpg",
  "Godsmack": "assets/music/artists/godsmack.png"
}
```

## Tips

- Use high-quality official band photos
- Keep file sizes reasonable (< 500KB per image)
- Square images display best
- Test locally before deploying
