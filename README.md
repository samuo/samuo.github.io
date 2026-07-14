# samuo.github.io

My personal site — academic work + music. Plain HTML/CSS/JS, no build step, hosted on GitHub Pages.

**Live at:** https://samuo.github.io

---

## How to edit

Everything you need to change is marked with an `EDIT:` comment in `index.html`.
Open the file in any text editor and search for **`EDIT:`** to jump between every spot.
Below is the full checklist, section by section.

### 1. Page title & description (top of `index.html`, in `<head>`)
- [ ] `<title>` — your name + tagline (shows in the browser tab & Google results)
- [ ] `<meta name="description">` — one sentence about you (shows in search results)

### 2. Nav brand (the "YN" logo, top-left)
- [ ] `.nav__brand` — replace `YN` with your initials

### 3. Hero (the first full screen)
- [ ] Eyebrow line, your **name**, the tagline ("Scientist & Jazz Composer"), and the intro sentence
- [ ] The word inside `<em>your field here</em>`

### 4. About + headshot
- [ ] The two `about__lead` / `about__body` paragraphs (your bio)
- [ ] **Headshot:** put a portrait at `assets/headshot.jpg`, then replace the placeholder
      `<div class="headshot headshot--placeholder">YN</div>` with:
      ```html
      <div class="headshot"><img src="assets/headshot.jpg" alt="Your Name" /></div>
      ```

### 5. Research
- [ ] **Publications:** one `<li class="pub">` per paper — title, authors, venue/year, and links (PDF / DOI / Code). Copy a block to add more; delete extras.
- [ ] **Presentations:** one `<li class="talk">` per talk — where + title/year

### 6. Music
- [ ] **Performances:** replace `VIDEO_ID_1`, `VIDEO_ID_2` with your YouTube IDs.
      From `https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`** the ID is the bold part.
      Update each `<figcaption>`. Copy a `<figure class="video">` block to add more.
- [ ] **Compositions:** one `<li class="comp">` each. For audio, drop an mp3 in `assets/`
      and point `<source src="assets/track-1.mp3">` at it, or delete the `<audio>` and just
      link to SoundCloud/Spotify/Bandcamp.

### 7. Shop (Musicnotes)
- [ ] One `<article class="score">` per piece — title, description, price.
- [ ] Set each **"Buy on Musicnotes"** `href` to that piece's Musicnotes product page.
      Find it: sign in to Musicnotes → open the song from your catalog → copy the browser URL
      (looks like `https://www.musicnotes.com/sheetmusic/mtd.asp?ppn=...`).
- [ ] Replace the "Cover art or title" text (and optionally add a real cover image).

### 8. CV
- [ ] Education + honors lists
- [ ] Put your CV at `assets/cv.pdf` (the "Download full CV" button already points there)

### 9. Connect (socials)
- [ ] Set each social `href` to your profile URL (Google Scholar, GitHub, LinkedIn,
      YouTube, Bandcamp, Instagram). Update the handle text under each name.
- [ ] Delete any platform you don't use; copy an `<a class="social">` block to add one.

### 10. Footer
- [ ] Replace "Your Name" in the footer line

---

## Colors
Recolor the whole site by editing the variables at the top of `styles.css` (the `:root` block):
- `--sci` — the red "research" accent
- `--mus` — the orange "music" accent
- `--accent` — the coral where they blend
- `--bg`, `--text`, etc. — background & text

The animated hero uses the same three colors — if you change them, also update the
`SCI / MUS / ACC` values near the bottom of `script.js` to match.

---

## Preview locally
Open `index.html` in a browser. For the YouTube embeds to behave, run a tiny local server:
```bash
python3 -m http.server 8000
```
then visit http://localhost:8000

---

## Publishing changes
The site is already connected to GitHub. After editing, publish with:
```bash
git add -A
git commit -m "Update content"
git push
```
Your live site updates within a minute or so. That's the whole loop.

---

## Files
| File | What it is |
|------|------------|
| `index.html` | All content. Look for `EDIT:` comments. |
| `styles.css` | Styling + color variables (`:root`). |
| `script.js`  | Scroll reveals, active nav, animated hero. |
| `assets/`    | Your photo, CV pdf, audio tracks, cover art. |
