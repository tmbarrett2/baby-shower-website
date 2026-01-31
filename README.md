# Baby Shower Website - Ocean/Nautical Storybook Theme

A beautiful, whimsical baby shower website featuring a vintage children's book illustration style with an ocean/nautical theme.

## Features

- Responsive design (mobile, tablet, desktop)
- Smooth scroll navigation
- Animated ocean scenes and floating elements
- RSVP form with Formspree integration
- Registry links section
- Story/theme section with storybook styling
- Google Maps integration for event location
- Accessibility features (keyboard navigation, screen reader friendly)
- Reduced motion support

## Quick Start

1. Clone or download this repository
2. Open `index.html` in your browser to preview
3. Customize the content (see Customization section below)
4. Deploy to GitHub Pages

## Customization Guide

### 1. Update Baby's Name & Event Details

In `index.html`, search and replace:

```html
<!-- Hero Section -->
<h1 class="hero-title">Baby <span class="baby-name">Smith</span></h1>
<p class="hero-date-detail">March 15th, 2026</p>

<!-- Event Details -->
<p class="detail-main">Saturday, March 15th, 2026</p>
<p class="detail-sub">2:00 PM - 5:00 PM</p>
<p class="detail-main">The Seaside Cottage</p>
<p class="detail-sub">123 Ocean View Drive<br>Coastal Town, CA 90210</p>

<!-- Footer -->
<span class="parents-names">The Smith Family</span>
<p class="footer-hashtag">#BabySmithMakesWaves</p>
```

### 2. Update Google Maps Embed

Replace the iframe `src` in the Details section with your actual Google Maps embed URL:

1. Go to [Google Maps](https://maps.google.com)
2. Search for your venue
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe in `index.html`

### 3. Set Up RSVP Form (Formspree)

1. Create a free account at [Formspree](https://formspree.io)
2. Create a new form
3. Copy your form endpoint ID
4. In `index.html`, replace `YOUR_FORM_ID` with your actual ID:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### 4. Update Registry Links

Replace the placeholder URLs with your actual registry links:

```html
<a href="https://www.amazon.com/your-registry-url" ...>
<a href="https://www.target.com/your-registry-url" ...>
```

### 5. Customize Colors (Optional)

Edit the CSS custom properties in `styles.css`:

```css
:root {
    --color-deep-teal: #2d6a6a;
    --color-soft-teal: #6ba3a3;
    --color-sage-green: #8fbc8f;
    /* ... more colors */
}
```

### 6. Update Story Text (Optional)

Personalize the story section in `index.html` to tell your own tale.

## Deployment to GitHub Pages

### Option 1: Using GitHub Web Interface

1. Create a new repository on GitHub
2. Upload all files (`index.html`, `styles.css`, `script.js`, `README.md`)
3. Go to **Settings** → **Pages**
4. Under "Source", select **main** branch
5. Click **Save**
6. Your site will be available at `https://yourusername.github.io/repository-name`

### Option 2: Using Git Command Line

```bash
# Navigate to your project folder
cd baby_shower_website

# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit - baby shower website"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main

# Then enable GitHub Pages in repository settings
```

### Option 3: Using GitHub CLI

```bash
# Create repository and push
gh repo create baby-shower --public --source=. --push

# Enable GitHub Pages
gh api repos/{owner}/{repo}/pages -X POST -f source='{"branch":"main","path":"/"}'
```

## Custom Domain (Optional)

1. In your repository, go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Add a `CNAME` file to your repository with your domain name
4. Configure DNS with your domain provider

## File Structure

```
baby_shower_website/
├── index.html      # Main HTML file
├── styles.css      # All styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## Accessibility

- Semantic HTML structure
- ARIA labels where appropriate
- Keyboard navigation support
- Focus indicators
- Reduced motion support for users who prefer it
- Color contrast compliance

## Performance Tips

- Images are emoji-based (no external image loading)
- CSS animations use `transform` and `opacity` for GPU acceleration
- Fonts are loaded from Google Fonts CDN
- Minimal JavaScript footprint

## Troubleshooting

### Form not submitting?
- Verify Formspree form ID is correct
- Check browser console for errors
- Ensure you're not blocking third-party requests

### Map not showing?
- Verify Google Maps embed URL is correct
- Some ad blockers may interfere with Google Maps

### Animations stuttering on mobile?
- Reduce number of animated elements
- Check for reduced motion preference

## Credits

- Fonts: [Google Fonts](https://fonts.google.com) (Cormorant Garamond, Quicksand)
- Form handling: [Formspree](https://formspree.io)
- Icons: Unicode Emoji

## License

This project is free to use for personal purposes. Feel free to customize it for your baby shower!

---

Made with love for expecting families everywhere.
