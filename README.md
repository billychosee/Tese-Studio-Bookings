# Tese Studio — Studio Hire in Harare

A modern, responsive landing page for **Tese Studio** — a private podcast & live-recording studio in Groombridge, Harare, Zimbabwe. Built with vanilla HTML, CSS, and JavaScript (ES modules), featuring an interactive booking form, accordion-style gallery, fullscreen image viewer, and smooth animations.

## Features

- **Hero Section** — Split layout with overlapping quick-contact pill (location, email, phone, CTA)
- **Studio Setups Gallery** — Accordion-style horizontal gallery powered by GSAP with hover/keyboard navigation
- **Sticky Booking Panel** — Form with setup selector (synced to gallery), validation, and date/time pickers
- **Explore Grid** — Expandable card grid with fullscreen lightbox viewer
- **Success Modal** — Confirmation summary after form submission
- **Footer** — Contact info, opening hours, social links
- **Animations** — GSAP SplitText on scroll, click-spark canvas effect, animated WhatsApp FAB
- **Accessibility** — Semantic HTML, ARIA labels, focus-visible styles, keyboard navigation, reduced-motion support

## Tech Stack

- **HTML/CSS/JS** — Single-file `index.html` (no build step required)
- **GSAP** (via ESM) — ScrollTrigger, SplitText, accordion animations
- **React 18** (via ESM) — StarBorder WhatsApp FAB, AccordionGallery component
- **Font Awesome 6** — Icons
- **Google Fonts** — Poppins

## Project Structure

```
tese-studio-booking/
├── index.html              # Main landing page (self-contained)
├── public/
│   ├── images/             # Logo & hero images
│   │   ├── Tese-Dark-logo.png
│   │   ├── Tese-Light-Logo.png
│   │   └── Tese-Icon.png
│   ├── icons/              # Favicons & touch icons
│   │   ├── _icon1.png
│   │   ├── _favicon.ico
│   │   ├── _apple-icon.png
│   │   └── icon0.svg
│   └── manifest/           # PWA manifest icons
│       ├── web-app-manifest-192x192.png
│       └── web-app-manifest-512x512.png
```

## Studio Setups (Data-Driven)

All studio setups are defined in a single `studioSetups` array in `index.html`. Adding a new object automatically creates:
- Accordion gallery panel
- Explore grid card
- Booking form dropdown option
- Lightbox content

```js
const studioSetups = [
  { id: 'white-cyclorama', name: 'White cyclorama', ... },
  { id: 'moody-portrait', name: 'Moody portrait corner', ... },
  { id: 'creative-loft', name: 'Creative loft', ... },
  { id: 'black-box', name: 'Black box', ... }
];
```

## Getting Started

### Option 1: Open Directly
Open `index.html` in any modern browser — no server required.

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node
npx serve .

# Using PHP
php -S localhost:8000
```
Then visit `http://localhost:8000`.

## Customization

| What | Where |
|------|-------|
| Studio info, setups, images | `studioSetups` array in `index.html` |
| Colors, spacing, radii | CSS custom properties in `:root` (lines 24–40) |
| Fonts | `<link>` tags in `<head>` (Poppins + Font Awesome) |
| Contact details | Header, hero bar, footer, booking form |
| WhatsApp number | `StarBorder` component (line 678) |

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+
- Requires ES modules, CSS custom properties, `IntersectionObserver`, `ResizeObserver`

## Performance Notes

- Images loaded from Unsplash (with `picsum.photos` fallback on error)
- Lazy loading on explore grid images
- `will-change` hints on animated elements
- `prefers-reduced-motion` respected globally

## License

Private project for Tese Studio. All rights reserved.