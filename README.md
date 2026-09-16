# Digital Clock - Multiple Time Zones

A beautiful, interactive web application that displays digital clocks for multiple time zones around the world. Perfect for tracking time across different locations in real-time.

## Features

✨ **Core Features:**
- 🌍 Display clocks for multiple time zones simultaneously
- ⏰ Real-time clock updates (every second)
- 🎨 Beautiful, modern UI with glassmorphism design
- 🌓 Dark/Light theme toggle
- ➕ Add custom time zones dynamically
- ❌ Remove time zones from display
- 📱 Fully responsive (desktop, tablet, mobile)
- 🎯 Search and quick-add popular cities
- 💾 Persistent storage (saves selected time zones to localStorage)
- ⌚ 12/24 hour format toggle
- 🌐 Support for 400+ time zones worldwide

## Live Demo

Visit: [Digital Clock Time Zones](https://celikonuralpbora-max.github.io/digital-clock-timezones)

## Project Structure

```
digital-clock-timezones/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Styles and themes
├── js/
│   ├── app.js              # Main application logic
│   ├── clock.js            # Clock functionality
│   └── timezones.js        # Time zone data and utilities
├── assets/
│   └── flags/              # Country flag emojis
├── README.md               # This file
└── .gitignore              # Git ignore rules
```

## Installation

### Option 1: Use Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/celikonuralpbora-max/digital-clock-timezones.git
   cd digital-clock-timezones
   ```

2. **Open in browser**
   - Double-click `index.html`, or
   - Use a local server:
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

### Option 2: Deploy to GitHub Pages

1. Go to repository Settings → Pages
2. Set "Source" to `main` branch
3. Your site will be live at: `https://celikonuralpbora-max.github.io/digital-clock-timezones`

## Usage

### Adding Time Zones

1. Click the **"+ Add Time Zone"** button
2. Search for a city or time zone
3. Select from the dropdown
4. The clock will appear and update in real-time

### Removing Time Zones

- Click the **"×"** button on any clock card to remove it

### Theme Toggle

- Click the **theme icon** (☀️/🌙) in the top-right to switch themes
- Your preference is saved automatically

### Format Toggle

- Click the **clock icon** to toggle between 12-hour and 24-hour format
- Setting is saved to localStorage

### Search & Quick Add

- Type in the search box to filter cities
- Press Enter or click to add instantly
- Suggested popular cities appear by default

## Supported Time Zones

The app supports all 400+ IANA time zones, including:

- **Major Cities:** New York, London, Tokyo, Sydney, Dubai, Singapore, etc.
- **All Continents:** Americas, Europe, Asia, Africa, Oceania
- **Custom Offsets:** UTC-12 through UTC+14
- **Daylight Saving Time:** Automatically handled

## Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** CSS Grid, Flexbox, Glassmorphism
- **Storage:** localStorage API
- **Time Zones:** JavaScript `Intl` API
- **No Dependencies:** Pure vanilla JavaScript - no frameworks or libraries needed

## Browser Support

✅ Chrome 63+  
✅ Firefox 60+  
✅ Safari 12+  
✅ Edge 79+  
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Change Default Time Zones

Edit `js/app.js`:
```javascript
const DEFAULT_TIMEZONES = [
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'Australia/Sydney'
];
```

### Customize Colors

Edit `css/styles.css` - Look for CSS variables:
```css
:root {
  --primary-color: #00d4ff;
  --secondary-color: #ff006e;
  /* ... more variables */
}
```

### Change Update Interval

Edit `js/clock.js`:
```javascript
const UPDATE_INTERVAL = 1000; // milliseconds
```

## Features in Detail

### Real-time Updates
- Clocks update every second automatically
- Smooth, lag-free performance
- Minimal CPU usage

### Data Persistence
- Selected time zones saved to browser
- Theme preference remembered
- Time format choice persisted
- No server required

### Responsive Design
- **Desktop:** Grid layout with multiple columns
- **Tablet:** Adaptive 2-column layout
- **Mobile:** Single column, optimized spacing
- Touch-friendly buttons and controls

### Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast theme option
- Focus indicators on interactive elements

## API Reference

### Clock Object

```javascript
const clock = new Clock('America/New_York');
clock.getTime();           // Returns current time in timezone
clock.format12Hour();      // Returns 12-hour format string
clock.format24Hour();      // Returns 24-hour format string
clock.getTimezoneInfo();   // Returns timezone details
```

### TimeZoneManager

```javascript
TimeZoneManager.search('New'); // Search timezones
TimeZoneManager.getAll();      // Get all timezones
TimeZoneManager.isValid(tz);   // Validate timezone
```

## Troubleshooting

### Clocks Not Updating
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Try clearing cache (Ctrl+Shift+Delete)
- Refresh the page

### Time Zone Not Found
- Use IANA timezone names (e.g., "America/New_York" not "EST")
- Check spelling carefully
- Refer to [IANA Time Zone Database](https://www.iana.org/time-zones)

### Storage Not Working
- Check if localStorage is enabled
- Ensure browser allows localStorage for this domain
- Try clearing browser storage and reload

### Display Issues
- Ensure CSS files are loading (check DevTools)
- Try different browser
- Clear browser cache
- Check screen resolution (minimum 320px width recommended)

## Performance

- ⚡ **Lightweight:** ~50KB total (HTML + CSS + JS)
- 📊 **Fast:** Updates 50+ clocks smoothly
- 🔋 **Efficient:** Minimal CPU/battery usage
- 🚀 **Quick Load:** Instant page load

## Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Ideas for Contributions:
- Additional clock designs/skins
- Weather integration
- Alarm functionality
- Meeting scheduler
- Time difference calculator
- Export/import settings
- Multilingual support

## License

MIT License - See LICENSE file for details

## Author

Created by [celikonuralpbora-max](https://github.com/celikonuralpbora-max)

## Support

Have issues or suggestions?
- 📝 [Create an Issue](https://github.com/celikonuralpbora-max/digital-clock-timezones/issues)
- 💬 [Start a Discussion](https://github.com/celikonuralpbora-max/digital-clock-timezones/discussions)
- ⭐ Star the repository if you find it useful!

## Changelog

### v1.0.0 (Current)
- ✨ Initial release
- 🌍 Multi-timezone support
- 🎨 Dark/Light theme
- 📱 Responsive design
- 💾 Local storage persistence
- ⌚ 12/24 hour format toggle
- 🔍 Search and filter
- ✅ Add/remove time zones dynamically

---

**Made with ❤️ for global teams and travelers**
