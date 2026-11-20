# Subharanjana A — Personal Portfolio Website

A clean, modern, and accessible personal portfolio website built with semantic HTML5, modern CSS3 (with light/dark theme support), and vanilla JavaScript. Designed specifically for campus placements and software engineering internship applications.

## 🚀 Live Demo & Assets Setup

### 1. Place Required Assets
Place your files in the `assets/` directory before deploying:
- `assets/photo.jpg` — Square portrait photo (will be displayed as a circle with an offset gold accent ring).
- `assets/Subharanjana_A_Resume.pdf` — Your resume in PDF format.
- `assets/videos/vehicle-reservation.mp4` — Screen recording walkthrough of the Vehicle Reservation System (muted).
- `assets/videos/code-reviewer.mp4` — Screen recording walkthrough of the AI Code Reviewer Assistant.

---

## 🌐 How to Deploy for Free on GitHub Pages

You can host this website completely free of cost on **GitHub Pages**:

### Step 1: Create a GitHub Repository
1. Log in to [GitHub](https://github.com/).
2. Click **New repository** (or go to `https://github.com/new`).
3. For a user site URL (`https://<username>.github.io`), name the repository:
   ```
   <username>.github.io
   ```
   *(For example: `Subharanjana-hub.github.io`)*.
4. Ensure the repository is set to **Public**.
5. Do not initialize with a README if you are pushing these local files.

### Step 2: Push Files to the Repository
Initialize git in this folder (if not already done) and push:
```bash
git init
git add .
git commit -m "Initial commit: Subharanjana A portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click on **Settings** (top navigation tab).
2. On the left sidebar, click on **Pages** (under the "Code and automation" section).
3. Under **Build and deployment** > **Source**:
   - Select **Deploy from a branch**.
   - Under **Branch**, choose `main` and folder `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, GitHub will publish your portfolio at:
   ```
   https://<username>.github.io/
   ```

---

## 🛠️ Tech Stack & Features
- **Pure Vanilla Stack**: Zero frameworks, zero build tools, zero dependencies. Runs instantly anywhere.
- **Typography**: Google Fonts (*Fraunces* for editorial headings, *Plus Jakarta Sans* for body).
- **Theme Support**: Light & dark modes with CSS custom properties, persistent via `localStorage`, and responsive to `prefers-color-scheme`.
- **Accessibility & SEO**: Semantic tags, ARIA attributes, skip link, keyboard navigation focus rings, Open Graph & Twitter meta tags for LinkedIn/WhatsApp previews.
- **Interactive Details**: Animated statistics counter (CGPA, problems solved, hackathons, internships), smooth scrolling with sticky header offset, and scroll-reveal animations respecting `prefers-reduced-motion`.
