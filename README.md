# 🚀 Shy's Portfolio — Setup Guide

A premium, self-contained portfolio website. No build step required for the core HTML/CSS/JS version. Just open in a browser or deploy to any static host.

---

## 📁 File Structure

```
portfolio/
├── index.html              ← Home page (with laptop intro)
├── pages/
│   ├── projects.html       ← Projects with filter grid
│   ├── about.html          ← About, skills, timeline
│   ├── certificates.html   ← Schools + certificate cards
│   └── contact.html        ← Contact form + socials
├── css/
│   ├── main.css            ← Design system, nav, footer, globals
│   ├── home.css            ← Intro, hero, crafts, process, CTA
│   └── pages.css           ← Projects, About, Certs, Contact
├── js/
│   ├── global.js           ← Cursor, starfield, reveals, transitions
│   ├── home.js             ← Intro animation, constellation, carousel
│   ├── projects.js         ← Filter logic
│   └── contact.js          ← Form submission (Formspree)
└── assets/                 ← Put your images/videos/resume here
    ├── hero-bg.mp4         ← (Optional) Free tech video from Pixabay
    ├── resume.pdf          ← Your downloadable resume
    ├── avatar.jpg          ← Your photo for About page
    └── certs/              ← Certificate images (16:10 ratio works best)
        ├── cert1.jpg
        ├── cert2.jpg
        └── ...
```

---

## ✅ Quick Start

1. **Open locally** — just drag `index.html` into any browser, or use VS Code Live Server.
2. **Deploy** — upload the whole folder to Netlify, Vercel (drag-and-drop), or GitHub Pages.

---

## 🎨 Customisation Checklist

### Personal info
- [ ] Replace `shy`, `shy.dev`, `Shy` with your real name throughout all HTML files
- [ ] Update email in `contact.html`
- [ ] Update social media links in all `footer-socials` + `contact.html`
- [ ] Update the timeline in `about.html` with your real dates/schools
- [ ] Update school names in `certificates.html`

### Assets
- [ ] Add `assets/resume.pdf`
- [ ] Add `assets/avatar.jpg` — replace the 👤 emoji in `about.html`
- [ ] Add `assets/hero-bg.mp4` — free tech video from [Pixabay](https://pixabay.com/videos/). Uncomment the `<source>` tag in `index.html`.
- [ ] Add certificate images to `assets/certs/` and wire them in `certificates.html`
- [ ] Add project cover images and swap out the emoji placeholders in `projects.html`

### Contact form (live email)
1. Sign up at [formspree.io](https://formspree.io) (free tier: 50 emails/month)
2. Create a new form → get your endpoint URL
3. In `contact.html`, add `data-action="https://formspree.io/f/YOUR_ID"` to the `<form>` tag

### Hero video
1. Download a free 4K tech/code video from [Pixabay](https://pixabay.com/videos/search/technology/)
2. Save as `assets/hero-bg.mp4`
3. Uncomment the `<source>` tag inside `#hero-video` in `index.html`

---

## 🎛️ Design Token Quick Reference

Edit CSS variables in `css/main.css` `:root {}` block:

| Token | Default | What it controls |
|---|---|---|
| `--bg` | Deep navy | Page background |
| `--primary` | Electric blue | Primary accents, glow |
| `--accent` | Ember blue | Buttons, highlights |
| `--font-head` | Space Grotesk | All headings |
| `--font-body` | DM Sans | Body text, UI |

---

## 🔌 Optional Upgrades

| Feature | Tool |
|---|---|
| Contact form emails | Formspree / EmailJS / Resend |
| Live GitHub repo stars | GitHub REST API (no auth needed) |
| Analytics | Plausible / Fathom (privacy-first) |
| CMS for projects/certs | Contentlayer / Sanity |

---

## 🚀 Deploy

### Netlify (recommended)
1. Drag & drop the `portfolio/` folder at [app.netlify.com](https://app.netlify.com)
2. Done. Custom domain: Settings → Domain management.

### Vercel
1. `npm i -g vercel` then `vercel` in the portfolio folder

### GitHub Pages
1. Push to a repo → Settings → Pages → Deploy from `main` branch `/root`

---

Built with HTML, CSS & vanilla JS. No frameworks, no build step, no lock-in. ✨
