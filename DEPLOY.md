# 🚀 Deployment Guide — Shy's Portfolio
### How to deploy for free without images breaking

---

## 📁 Folder structure recap

```
portfolio/
├── index.html                ← Home (intro + hero)
├── pages/
│   ├── projects.html
│   ├── about.html
│   ├── certificates.html
│   └── contact.html
├── css/   main.css · home.css · pages.css
├── js/    global.js · home.js · projects.js · contact.js · social-icons.js
├── assets/
│   ├── hero-bg.mp4           ← (optional) download from Pixabay
│   ├── resume.pdf            ← your resume
│   ├── avatar.jpg            ← your photo for About page
│   ├── projects/             ← project cover images (800×500 JPG/WebP)
│   │   ├── dormdash.jpg
│   │   ├── charlotte-folk.jpg
│   │   ├── aesch.jpg
│   │   ├── nexashield.jpg
│   │   ├── dataweave.jpg
│   │   └── vaultlink.jpg
│   └── certs/                ← certificate images (800×500 JPG/WebP)
│       ├── cert-uni-1.jpg
│       └── ...
└── README.md
```

---

## ✅ Before you deploy — checklist

- [ ] Replace placeholder email `hello@shy.dev` with your real email in `contact.html`
- [ ] Replace `#` in social links with your real URLs (GitHub, LinkedIn, etc.) across all pages
- [ ] Add `assets/resume.pdf`
- [ ] Add `assets/avatar.jpg` (or leave the 👤 placeholder)
- [ ] Add project images to `assets/projects/` and uncomment `<img>` tags in `projects.html`
- [ ] Add cert images to `assets/certs/` and replace placeholders in `certificates.html`
- [ ] Replace school names in `certificates.html` and `about.html` with your real school
- [ ] (Optional) Wire up Formspree: add `data-action="https://formspree.io/f/YOUR_ID"` to the `<form>` in `contact.html`

---

## 🌐 Option 1 — Netlify (BEST for images, easiest overall)

**Why Netlify?** Images are served as-is from your upload. No path issues. Free CDN globally.

### Steps:
1. Go to **[app.netlify.com](https://app.netlify.com)** → sign up free
2. Click **"Add new site"** → **"Deploy manually"**
3. **Drag and drop** your entire `portfolio/` folder onto the upload area
4. ⏳ Wait ~30 seconds → your site is live at `https://random-name.netlify.app`
5. To update: drag and drop the folder again — it replaces the old deploy

### Custom domain (free):
- Settings → Domain management → Add custom domain
- Point your domain's DNS A record to Netlify's IP (they walk you through it)

### ⚠️ Image tip for Netlify:
- Keep ALL images inside the `portfolio/` folder you upload
- Never reference images with absolute paths like `/assets/...` — always use relative paths like `../assets/...`
- The portfolio already uses relative paths ✅

---

## 🔺 Option 2 — Vercel

**Why Vercel?** Instant previews, great performance, simple CLI.

### Method A — Drag & Drop (no account needed beyond signup):
1. Go to **[vercel.com](https://vercel.com)** → sign up with GitHub
2. Click **"Add New"** → **"Project"**
3. Scroll down → **"Import from folder"** or use the CLI below

### Method B — CLI (2 commands):
```bash
npm install -g vercel    # one-time install
cd portfolio/
vercel                   # follow prompts, site deploys instantly
```
Answer the prompts:
- Set up and deploy: **Y**
- Which scope: your username
- Link to existing project: **N**
- Project name: `shy-portfolio`
- Directory: **./  (current folder)**
- Override settings: **N**

### ⚠️ Image tip for Vercel:
- Same as Netlify — keep images inside the project folder
- Vercel serves static files automatically — no config needed

---

## 📄 Option 3 — GitHub Pages (completely free, great for portfolios)

**Why GitHub Pages?** Free forever, versioned, tied to your GitHub profile.

### Steps:
1. **Create a GitHub account** if you don't have one at [github.com](https://github.com)
2. **Create a new repository**:
   - Click **"New"** → Name it `portfolio` (or `your-username.github.io` for the root URL)
   - Set it to **Public**
   - Don't initialize with README

3. **Upload your files**:
   ```bash
   # Install Git if needed: https://git-scm.com
   cd portfolio/
   git init
   git add .
   git commit -m "Initial portfolio deployment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repo → **Settings** → **Pages**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
   - Click **Save**

5. ⏳ Wait 1–2 minutes → your site is live at:
   - `https://YOUR_USERNAME.github.io/portfolio/`
   - Or `https://YOUR_USERNAME.github.io/` (if repo is named `YOUR_USERNAME.github.io`)

### ⚠️ Image tip for GitHub Pages:
- **IMPORTANT**: If your repo is named `portfolio` (not `username.github.io`), your site URL will have a `/portfolio/` prefix.
- ALL paths in your HTML/CSS must be relative (they already are ✅)
- Do NOT use paths starting with `/assets/...` — use `../assets/...` or `assets/...`
- The existing code is already written with relative paths, so this should work fine

### To update after changes:
```bash
git add .
git commit -m "Update portfolio"
git push
```

---

## 🖼️ How to add local images without them breaking

### The golden rule: **keep images INSIDE the portfolio folder**

```
portfolio/           ← root
└── assets/
    ├── projects/
    │   └── dormdash.jpg    ← your project image
    └── certs/
        └── cert-1.jpg      ← your certificate image
```

### How to reference them in HTML:

From `index.html` (root level):
```html
<img src="assets/projects/dormdash.jpg" alt="DormDash">
```

From `pages/projects.html` (inside pages/ folder):
```html
<img src="../assets/projects/dormdash.jpg" alt="DormDash">
```

The `../` means "go up one folder". This works on ALL hosting platforms.

### Image format tips:
- Use **JPG** or **WebP** for photos/screenshots (smaller file size)
- Use **PNG** for logos or images with transparency
- Recommended max size: **800×500px** for project thumbnails, **800×500px** for certs
- Keep each image under **300KB** for fast loading — use [squoosh.app](https://squoosh.app) to compress

---

## 📧 Contact Form Setup (Formspree — free, 50 emails/month)

1. Go to **[formspree.io](https://formspree.io)** → create a free account
2. Click **"New Form"** → give it a name → submit
3. Copy the endpoint URL, looks like: `https://formspree.io/f/xabc1234`
4. Open `pages/contact.html`
5. Find this line:
   ```html
   <form id="contact-form" novalidate data-action="">
   ```
6. Change it to:
   ```html
   <form id="contact-form" novalidate data-action="https://formspree.io/f/xabc1234">
   ```
7. Also update the email in the `<a href="mailto:...">` to your real email
8. Remove or delete the `<div class="contact-setup-note">` block
9. Deploy → done! Messages now land in your inbox 📬

---

## 🔗 Adding real social links

Find and replace `href="#"` in the footer and contact page with your actual URLs:

| Platform | Example URL |
|---|---|
| GitHub | `https://github.com/yourusername` |
| LinkedIn | `https://linkedin.com/in/yourname` |
| Twitter/X | `https://x.com/yourhandle` |
| Dribbble | `https://dribbble.com/yourname` |

---

## 🎬 Hero video (optional)

1. Download a free 4K tech/code/data video from [Pixabay](https://pixabay.com/videos/search/technology/)
2. Save it as `assets/hero-bg.mp4`
3. Open `index.html`, find the video tag and uncomment this line:
   ```html
   <!-- <source src="assets/hero-bg.mp4" type="video/mp4"> -->
   ```
   Change it to:
   ```html
   <source src="assets/hero-bg.mp4" type="video/mp4">
   ```
4. Keep video under **10MB** by trimming or compressing with [HandBrake](https://handbrake.fr) (free)

---

## 🆓 Free hosting comparison

| Platform | Free tier | Custom domain | Image support | Best for |
|---|---|---|---|---|
| **Netlify** | ✅ 100GB/mo | ✅ Free SSL | ✅ Perfect | Beginners |
| **Vercel** | ✅ Generous | ✅ Free SSL | ✅ Perfect | CLI users |
| **GitHub Pages** | ✅ Unlimited | ✅ Free SSL | ✅ Good | GitHub users |

**Recommendation: Netlify** — drag and drop, zero config, images just work.

---

## ❓ Common issues

**Images not showing after deploy?**
- Check the path uses `../assets/` not `/assets/` for pages inside `pages/`
- Make sure the image file name matches exactly (case-sensitive on Linux hosts)
- Use lowercase filenames to be safe: `dormdash.jpg` not `DormDash.JPG`

**Form not sending emails?**
- Make sure `data-action=""` has your Formspree URL filled in
- Check the browser console for errors
- Verify your Formspree account is confirmed (check email)

**Site looks broken on mobile?**
- The site is responsive — if it looks odd, hard-refresh with Ctrl+Shift+R
- Check that all CSS files are loading (Network tab in DevTools)
