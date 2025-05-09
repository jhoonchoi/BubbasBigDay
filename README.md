# Bubba's Big Day - RPG Treasure Hunt

This is a custom-built web application for a special proposal treasure hunt in Boston. I've designed it as a classic 2D top-down RPG-style adventure game that guides your girlfriend through a series of locations, with an expanding map that reveals more of the "world" as she progresses through the quest.

## Key Features

1. **Interactive RPG Map**: A top-down 2D map that expands as your girlfriend progresses through the locations
2. **Green & Brown Color Scheme**: Classic earthy tones reminiscent of traditional RPG games
3. **Location-Based Progression**:
   - Passcode validation at each location
   - Location-specific challenges to complete
   - Riddles with letter banks that reveal the next destination

4. **Visual Progression**: The map visually tracks the journey from Baby's Apartment to the final Hotel location

## The Journey Route

The treasure hunt guides the player through these specific Boston locations:
1. **Baby's Apartment** - 9 Morgan Drive, Natick
2. **Café Fixe** - 1642 Beacon St, Brookline
3. **Bar Vlaha** - 1653 Beacon St, Brookline
4. **The Nail Studio** - 215 Newbury St, Boston
5. **The Hotel** - 154 Berkeley St, Boston

## Deployment Options

Here are several easy ways to deploy this application:

### Option 1: GitHub Pages (Recommended)

1. Create a new repository on GitHub named "BubbasBigDay"
2. Upload the React application files
3. Install GitHub Pages: `npm install --save-dev gh-pages`
4. Add to package.json:
   ```json
   "homepage": "https://jhoonchoi.github.io/BubbasBigDay",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
5. Run `npm run deploy`
6. Your site will be published at `https://jhoonchoi.github.io/BubbasBigDay/`

### Option 2: Netlify Drop (No Account Required)

1. Run `npm run build` locally to create a production build
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag and drop the generated `build` folder onto the page
4. Your site will be instantly deployed with a temporary URL
5. Create an account to set a custom domain if desired

### Option 3: Vercel (Great for React Apps)

1. Push your code to a GitHub repository named "BubbasBigDay"
2. Go to [Vercel](https://vercel.com) and create an account/sign in
3. Click "Import Project" and select your repository
4. Vercel will automatically detect React and configure the build
5. Click "Deploy" and your site will be live in minutes

## Customizing the Content

To customize the treasure hunt content:

1. Open the React component file
2. Find the `gameData` object at the top
3. Modify the locations, challenges, riddles, and messages to fit your specific plans
4. Update passcodes to something meaningful to both of you
5. Adjust map positions in the `updateMap` function if needed

## Testing Before the Big Day

Make sure to test the application thoroughly:

1. Test on the same device she'll be using (iPhone with Safari)
2. Visit each physical location and verify that passcodes and challenges work
3. Check that all content is appropriate and clues are clear
4. Ensure the map reveals properly with each location transition

## Making it Extra Special

Some additional ideas to enhance the experience:

1. **Real Maps as Backup**: Have printed maps with hints as a backup
2. **Themed Items**: Leave small RPG-themed items at each location (heart container, key, token)
3. **Custom Artwork**: Add pixel art pictures of significant places in your relationship
4. **Audio Elements**: Add retro RPG sound effects for completing challenges (if appropriate for public settings)
5. **Location Photos**: Take screenshots of the actual locations and incorporate them into the game

## Need Help?

If you need any help with modifications or have questions about deployment, feel free to reach out for assistance.