# Last.fm Integration Setup Guide

Last.fm integration to display top 250 scrobbled tracks and top 50 artists with automatic weekly updates.

## Prerequisites

- Last.fm account with scrobbling history
- Node.js installed (v16 or higher)
- GitHub repository set up for GitHub Pages deployment

## Step 1: Get Your Last.fm API Key

1. Go to [Last.fm API Account Creation](https://www.last.fm/api/account/create)
2. Fill in the application form:
   - **Application name**: Your app name (e.g., "MediaVerse Portfolio")
   - **Application description**: Brief description
   - **Application homepage**: Your GitHub Pages URL or repository URL
   - **Callback URL**: Leave empty or use your GitHub Pages URL
3. Click **Submit**
4. Copy your **API Key** (you'll need this in the next step)

## Step 2: Local Development Setup

### Configure Environment Variables

1. Create a `.env` file in your project root:
   ```bash
   # Windows PowerShell
   New-Item -Path ".env" -ItemType File
   
   # Or manually create the file
   ```

2. Add your Last.fm credentials to `.env`:
   ```
   LASTFM_API_KEY=your_api_key_here
   LASTFM_USERNAME=your_lastfm_username
   ```

3. The `.env` file is already in `.gitignore` to keep your API key secure

### Fetch Last.fm Data

Run the fetch script to get your scrobble data:

```bash
npm run fetch:lastfm
```

This will:
- Fetch your top 250 tracks with album metadata
- Fetch your top 50 artists with photos
- Apply manual artist image overrides from `artist-images.json`
- Save everything to `public/data/lastfm.json`
- Takes about 5 minutes due to API rate limiting

### Run Development Server

```bash
npm run dev
```

Navigate to the Music page and click the "Last.fm Stats" tab to see your data!

## Step 3: Add Custom Artist Photos (Optional)

You can supplement or override Last.fm's artist images with your own photos:

1. **Upload artist photos** to `public/assets/music/artists/`
   - Use JPG or PNG format
   - Recommended size: 300x300px (square)
   - Name files using lowercase with underscores (e.g., `artist_name.jpeg`)

2. **Edit `artist-images.json`** in `public/data/`:
   ```json
   {
     "Artist Name": "assets/music/artists/filename.jpeg",
     "Another Artist": "https://example.com/photo.jpg"
   }
   ```
   - Artist names must **exactly match** Last.fm data
   - Use relative paths or external URLs
   - These mappings persist across weekly updates

3. **Re-run fetch script** to apply changes:
   ```bash
   npm run fetch:lastfm
   ```

## Step 4: GitHub Pages Deployment

### Set Up GitHub Secret

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `LASTFM_API_KEY`
   - **Value**: Your Last.fm API key
5. Click **Add secret**

### Deploy to GitHub Pages

```bash
npm run deploy
```

This will:
- Run `prebuild` script to fetch fresh Last.fm data
- Build the production bundle
- Deploy to GitHub Pages

## Step 5: Automatic Weekly Updates

The GitHub Actions workflow (`.github/workflows/update-lastfm.yml`) automatically:

- Runs every **Sunday at 00:00 UTC**
- Fetches fresh Last.fm data
- Commits changes if data has updated
- Triggers GitHub Pages rebuild

You can also manually trigger the workflow:
1. Go to **Actions** tab in your repository
2. Select **Update Last.fm Data** workflow
3. Click **Run workflow**

## Troubleshooting

### "LASTFM_API_KEY not set" Error

- **Local**: Ensure `.env` file exists with correct API key
- **GitHub Actions**: Verify `LASTFM_API_KEY` secret is set in repository settings

### No Last.fm Data Showing

1. Check if `public/data/lastfm.json` exists
2. Run `npm run fetch:lastfm` manually
3. Check browser console for errors
4. Verify your Last.fm username has scrobbles

### Artist Images Not Loading

- Some artists don't have images in Last.fm's database
- Add manual overrides using `artist-images.json`
- Check artist names match exactly (case-sensitive)
- Ensure image paths are correct

### Weekly Updates Not Working

1. Check **Actions** tab for workflow errors
2. Verify `LASTFM_API_KEY` secret is set
3. Ensure GitHub Pages is enabled
4. Check workflow permissions in repository settings

### Rate Limiting

The fetch script includes 100ms delays between requests to respect Last.fm's API limits. If you encounter rate limiting:
- Wait a few minutes before retrying
- Don't run the script multiple times in quick succession

## Data Structure

### lastfm.json Format

```json
{
  "tracks": [
    {
      "name": "Song Title",
      "artist": "Artist Name",
      "album": "Album Name",
      "playcount": 500,
      "imageUrl": "https://..."
    }
  ],
  "artists": [
    {
      "name": "Artist Name",
      "playcount": 5000,
      "imageUrl": "assets/music/artists/artist.jpeg"
    }
  ],
  "fetchedAt": "2025-12-14T14:00:00.000Z",
  "username": "your_username"
}
```

## Manual Artist Image Overrides

### How It Works

1. **One-time setup**: Create `artist-images.json` with your mappings
2. **Automatic**: Fetch script loads overrides every time it runs
3. **Persistent**: Your custom images survive weekly updates
4. **Priority**: Manual images always override Last.fm data

### Example Workflow

```bash
# 1. Add new artist photo
# Copy image to public/assets/music/artists/new_artist.jpeg

# 2. Edit artist-images.json
# Add: "New Artist": "assets/music/artists/new_artist.jpeg"

# 3. Re-fetch data
npm run fetch:lastfm

# 4. Deploy (if ready)
npm run deploy
```

## FAQ

**Q: How often does the data update?**  
A: Automatically every Sunday at midnight UTC, or manually anytime you run the fetch script.

**Q: Will my API key be exposed?**  
A: No, it's stored in `.env` (gitignored) locally and as a GitHub Secret in CI/CD.

**Q: Can I change the update schedule?**  
A: Yes, edit `.github/workflows/update-lastfm.yml` and modify the cron expression.

**Q: What if I don't want weekly updates?**  
A: Disable the workflow in GitHub Actions, fetch data manually when desired.

**Q: Can I fetch more than 250 tracks?**  
A: Yes, edit `scripts/fetchLastFm.js` and change the `limit` parameter, but it will take longer.

## Summary

1. ✅ Get Last.fm API key
2. ✅ Create `.env` with credentials
3. ✅ Run `npm run fetch:lastfm`
4. ✅ Add custom artist photos (optional)
5. ✅ Set GitHub Secret
6. ✅ Deploy with `npm run deploy`
7. ✅ Automatic weekly updates via GitHub Actions

Your Last.fm stats will now display on the Music page with automatic weekly updates!
