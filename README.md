# Auto-Scrolling Cards React App

A React application featuring a header and two containers with auto-scrolling cards at different speeds.



- **Header**: Clean, animated header with gradient background
- **Two Scrolling Containers**: 
  - Fast scrolling container (red theme)
  - Slow scrolling container (green theme)
- **Auto-scrolling**: Cards automatically scroll at different speeds

## Prerequisites
- **npm** (comes with Node.js) or **yarn**

### Installing Node.js

1. **macOS**: 
   ```bash
   # Using Homebrew
   brew install node
   
   # Or download from https://nodejs.org/
   ```

2. **Windows**: Download from https://nodejs.org/

3. **Linux**: 
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install nodejs npm
   
   # CentOS/RHEL
   sudo yum install nodejs npm
   ```

## Installation

1. Navigate to the project directory:
   ```bash
   cd pyka-website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
   Or if you prefer yarn:
   ```bash
   yarn install
   ```

## Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
   
   Or with yarn:
   ```

3. The app should automatically open in your default browser

├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Header.js       # Header component
│   │   ├── Header.css      # Header styles
│   │   ├── ScrollingContainer.js  # Auto-scrolling container
│   │   └── ScrollingContainer.css # Container styles
│   ├── App.js              # Main app component
│   ├── App.css             # Main app styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── package.json            # Project dependencies
└── README.md              # This file
```

## How It Works

### Auto-Scrolling Mechanism
- Each container uses `setInterval` to automatically scroll content
- The fast container scrolls every 20ms (speed: 2)
- The slow container scrolls every 50ms (speed: 5)
- Scrolling pauses on mouse hover and resumes on mouse leave

### Card Data
- Cards are duplicated to create seamless infinite scrolling
- When reaching the bottom, scrolling resets to the top
- Each container has 8 unique cards with different content

### Responsive Design
- Flexible layout that adapts to different screen sizes
- Mobile-first approach with media queries
- Containers stack vertically on small screens

## Customization

### Changing Scroll Speed
Edit the `speed` prop in `App.js`:
```javascript
<ScrollingContainer
  title="Fast Scrolling Container"
  cards={fastCards}
  speed={2}  // Lower = faster scrolling
  className="fast-container"
/>
```

### Adding More Cards
Add objects to the `fastCards` or `slowCards` arrays in `App.js`:
```javascript
const fastCards = [
  { id: 9, title: 'New Card', content: 'New card content here.' },
  // ... existing cards
];
```

### Styling
- Modify CSS files in `src/` and `src/components/` directories
- Each component has its own CSS file for modular styling
- Global styles are in `src/index.css` and `src/App.css`

## Browser Compatibility

This app works in all modern browsers including:
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Build for Production

To create a production build:

```bash
npm run build
```

This creates an optimized build in the `build` folder ready for deployment.

## Troubleshooting

### Common Issues

1. **Node.js not found**: Install Node.js from https://nodejs.org/
2. **Port 3000 already in use**: The app will automatically use the next available port
3. **Dependencies not installing**: Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

### Development Tips

- Use browser developer tools to inspect animations
- Modify scroll speeds in real-time by editing the component props
- Check console for any JavaScript errors

## License

This project is open source and available under the [MIT License](LICENSE).