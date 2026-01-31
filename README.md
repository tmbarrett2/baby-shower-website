# Baby Barrett - Baby Shower Website

An ocean-themed baby shower website inspired by Emily Winfield Martin's illustration style. Features deep sea greens, rich muted tones, and whimsical hand-drawn SVG illustrations.

## Features

- Illustrated SVG octopus and whale graphics (no emoji)
- Deep, rich color palette inspired by vintage nautical illustrations
- Responsive design
- RSVP form (Formspree integration)
- Registry links
- Smooth scroll navigation

## Quick Start

1. Open `index.html` in a browser to preview
2. Customize content (see below)
3. Deploy to GitHub Pages

## Customization

### Update Event Details

In `index.html`, search for "To be announced" and replace with actual details when ready:

```html
<!-- Date -->
<p class="hero-date-detail">Date to be announced</p>
<p class="detail-main">Date & Time</p>
<p class="detail-sub">To be announced</p>

<!-- Location -->
<p class="detail-main">Location</p>
<p class="detail-sub">To be announced</p>
```

### Enable Google Maps

1. Uncomment the map container (remove `style="display: none;"`)
2. Add your Google Maps embed URL to the iframe `src`

### Set Up RSVP Form

1. Create a form at [Formspree](https://formspree.io)
2. Replace `YOUR_FORM_ID` in the form action:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Update Registry Links

Replace placeholder URLs with your actual registry links.

## Deployment

### GitHub Pages

1. Push files to GitHub repository
2. Go to Settings > Pages
3. Select main branch as source
4. Site will be live at `https://username.github.io/repo-name/`

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Deep | `#1a2e2e` | Background |
| Deep Teal | `#234545` | Sections |
| Teal | `#3d6b6b` | Accents |
| Cream | `#f5f2eb` | Light sections, text |
| Gold | `#c9a962` | Highlights, links |

## File Structure

```
baby_shower_website/
├── index.html    # Main page
├── styles.css    # Styling
├── script.js     # Interactivity
└── README.md     # This file
```

---

Made with love for Baby Barrett
