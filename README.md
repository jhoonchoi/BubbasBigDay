# Bubba's Big Day - RPG Treasure Hunt

A custom-built web application for a special proposal treasure hunt in Boston. Designed as a classic 2D top-down RPG-style adventure game that guides your partner through a series of locations, with an expanding map that reveals more of the "world" as they progress through the quest.

## Features

- Interactive top-down RPG map that expands as your partner progresses
- Classic RPG-style UI with green & brown color scheme
- Location-based progression with passcode validation
- Custom challenges at each location
- Riddles with letter banks to discover the next destination
- Visually tracks the journey from Baby's Apartment to the final Hotel location

## The Journey Route

The treasure hunt guides the player through these specific Boston locations:
1. **Baby's Apartment** - 9 Morgan Drive, Natick
2. **Café Fixe** - 1642 Beacon St, Brookline
3. **Bar Vlaha** - 1653 Beacon St, Brookline
4. **The Nail Studio** - 215 Newbury St, Boston
5. **The Hotel** - 154 Berkeley St, Boston

## Development

This project is built with:
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Lucide React](https://lucide.dev/guide/packages/lucide-react) - Beautifully crafted icons for React projects

### Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/BubbasBigDay.git
cd BubbasBigDay
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to view the app:
```
http://localhost:5173/
```

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

### Setup

1. Make sure your GitHub repository is named `BubbasBigDay` and is public.

2. The `vite.config.js` file is already configured with the correct base path:
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/BubbasBigDay/' // Base path for GitHub Pages
})
```

3. The `package.json` has the necessary scripts for deployment:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Deploy

To deploy the application to GitHub Pages:

```bash
npm run deploy
```

The app will be available at:
```
https://your-username.github.io/BubbasBigDay/
```

## Customization

To customize the treasure hunt content:

1. Edit the `gameData` object in `src/App.jsx`
2. Modify the locations, challenges, riddles, and messages as needed
3. Update passcodes to something meaningful for your relationship
4. Change the map locations in the `updateMap` function if necessary

## Testing Before the Big Day

Before the actual treasure hunt:

1. Test on an iPhone with Safari (same device your partner will use)
2. Visit each physical location to ensure everything works as expected
3. Check that all clues and directions make sense
4. Verify the map reveals properly as you progress through locations

## Making it Extra Special

Some ideas to enhance the experience:

1. Create physical clue cards at each location with the passcodes
2. Add small RPG-themed items to find at each stop (like collectibles)
3. Take photos at these locations beforehand to incorporate into the game
4. Have friends stationed at difficult locations to offer subtle hints if needed
5. Prepare a backup (physical map or printed QR codes) in case of technical issues

## License

This project is licensed for personal use only.

## Acknowledgements

Created with ❤️ for the most important quest of all!