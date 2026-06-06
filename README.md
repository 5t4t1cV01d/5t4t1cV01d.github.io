# 5t4t1cV01d — Cybersecurity Portfolio

Personal cyberpunk/hacker-themed portfolio, featuring dynamic writeups, projects, and certification tracking.

## 🚀 Deploy to GitHub Pages (5 minutes)

### 1. Create the Repository

```bash
# On GitHub: create a public repository named "5t4t1cV01d.github.io"
# Option A: Your main profile site (Highly Recommended)
# Repo name: 5t4t1cV01d.github.io → URL: https://5t4t1cV01d.github.io

# Option B: Subdirectory site
# Repo name: portfolio → URL: https://5t4t1cV01d.github.io/portfolio
```

### 2. Push the Files

```bash
git init
git add .
git commit -m "feat: initial portfolio deploy"
git branch -M main
git remote add origin git@github.com:5t4t1cV01d/5t4t1cV01d.github.io.git
git push -u origin main
```

### 3. Activate GitHub Pages

*If you chose **Option A**, your site will build and deploy automatically after the push.* If you chose **Option B**:
- Go to your repository **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: **main** / `/ (root)`
- Click **Save** and wait ~2 minutes.
- Your site will be live at `https://5t4t1cV01d.github.io/portfolio`

---

## 📁 Project Structure

```
portfolio/
├── index.html                  # Main homepage
├── pages/
│   ├── writeups.html           # Writeups vault with filter controls
│   ├── about.html              # Biography, CV, certifications & timeline
│   ├── projects.html           # Projects, labs (HTB/THM/DockerLabs) & target goals
│   └── writeup.html            # Dynamic single-writeup reader
├── components/
│   ├── navbar.html             # Navigation bar template
│   └── footer.html             # Footer template with contact deep-links
├── assets/
│   ├── css/style.css           # Styling system & cyberpunk matrix tokens
│   ├── icon/                   # SVG brand logos (HTB, THM, Docker & favicon)
│   ├── img/                    # Avatar images and Cisco badges
│   └── js/
│       ├── writeups-data.js    # ← EDIT HERE to register completed labs
│       ├── main.js             # Filter interactions and copy-to-clipboard toast
│       ├── components.js       # Dynamic component loaders and overlay effects
│       └── writeup-renderer.js # Markdown writeup parser & custom HTML renderer
└── _writeups/                  # Raw markdown files for writeups (write here!)
    ├── htb-cicada.md
    ├── htb-lame.md
    └── htb-bounty.md
```

---

## ➕ Adding a New Writeup

### Step 1: Register the Lab in `assets/js/writeups-data.js`

```javascript
const WRITEUPS = [
  // ... existing writeups ...
  {
    id: "htb-myMachine",
    title: "MyMachine",
    platform: "HTB",        // HTB | THM | DockerLabs
    difficulty: "easy",     // easy | medium | hard
    os: "linux",            // linux | windows
    date: "2026-06-06",
    tags: ["Web", "SQLi", "PrivEsc"],
    desc: "Brief summary of the attack vector and key findings."
  }
];
```

### Step 2: Create the Markdown File at `_writeups/htb-myMachine.md`

Add a YAML front matter block at the beginning of the file. Example:

```markdown
---
title: "MyMachine"
platform: HTB
difficulty: easy
so: Linux
fecha: 2026-06-06
tags: [Web, SQLi, PrivEsc]
desc: "Brief summary."
---

# MyMachine — HackTheBox

## Reconnaissance
... writeup content in standard markdown ...
```

### Step 3: Push Your Changes

```bash
git add .
git commit -m "writeup: add MyMachine (HTB/Easy/Linux)"
git push
```

---

## 🎨 Customization

| File | What to change |
|---|---|
| `assets/css/style.css` | Color themes (CSS variables inside `:root`) |
| `assets/js/writeups-data.js` | Machine stats, platforms, dates, and info |
| `pages/about.html` | Biography text, skill listings, certifications, and timeline |
| `pages/projects.html` | Platform scores, Cisco badges, target certification cards |

### Customizing Colors

In `style.css`, lines 5-25:

```css
:root {
  --green: #00ff41;     /* Primary neon green highlight */
  --green-dim: #00cc33; /* Soft green */
  /* Changing the green variable updates the entire theme */
}
```

---

## 🖥️ Local Development — View and Edit in Real Time

Since the project uses pure vanilla HTML/CSS/JS, there is no compile or build step required. Choose **one** of the three options below depending on your environment.

---

### Option A — Python 3 & Git Bash (Recommended for Windows and Linux)

For **Windows** users, it is recommended to install [Git Bash](https://gitforwindows.org/) and [Python 3](https://www.python.org/downloads/). In Linux/Kali Linux, these tools are available by default.

1. Open your **Git Bash** terminal in the root of the project directory.
2. Spin up the local web server:
   ```bash
   python -m http.server 8080
   ```
   *(Note: Depending on your Python installation alias, the command might be `python` or `python3`).*
3. Open your browser and navigate to: **http://localhost:8080**
4. To stop the server, press `Ctrl + C` in your terminal.

> **Work workflow:** Keep the server running in the background, edit files in your preferred editor (e.g. VS Code), and refresh your browser (`F5` or `Ctrl+R`) to view updates in real time.

---

### Option B — Node.js with Live Reload (Fastest & most convenient)

If you have Node.js installed, you can use `browser-sync` to reload the browser automatically every time you save a file.

```bash
# Install browser-sync globally (only once)
npm install -g browser-sync

# Launch the server
browser-sync start --server --files "**/*.html, assets/css/*.css, assets/js/*.js"
```

The browser will open automatically at: **http://localhost:3000**

> ✨ Every time you save an `.html`, `.css`, or `.js` file, the browser refreshes instantly.

**Don't have Node.js?** Install it on Kali using:

```bash
sudo apt update && sudo apt install nodejs npm -y
node --version   # verify installation
```

---

### Option C — VS Code with Live Server Extension

1. Open VS Code in the project directory.
2. Install the **Live Server** extension (search for `ritwickdey.liveserver` in the extensions tab).
3. Click **"Go Live"** in the bottom right status bar.
4. Your browser will open at: **http://localhost:5500**

---

### Recommended Setup (Split Terminal)

Ideal split terminal layout while editing writeups or adjusting styles:

```
┌─────────────────────────┬──────────────────────────────┐
│  Terminal 1             │  Terminal 2                  │
│  (running server)       │  (your editor / git commands)│
│                         │                              │
│  $ python -m http.      │  $ nano pages/about.html     │
│    server 8080          │  $ git add . && git commit   │
│                         │  $ git push                  │
└─────────────────────────┴──────────────────────────────┘
          ↕ Browser opened at http://localhost:8080
```

Using `tmux` (available by default on Kali Linux):

```bash
# Start tmux
tmux

# Left panel: start server
python -m http.server 8080

# Split screen vertically (Ctrl+B, then %)
# Right panel: edit files
nano assets/js/writeups-data.js
```

---

### ⚡ Quick Cheatsheet

| Command | Description |
|---|---|
| `python -m http.server 8080` | Starts a lightweight local web server on port 8080 |
| `python -m http.server 8080 &` | Runs the Python server in the background (Linux/Unix) |
| `kill %1` | Terminates the background server process (Linux/Unix) |
| `browser-sync start --server --files "**/*"` | Runs a server with live-reload enabled |
| `Ctrl+C` | Stops any active terminal server |

---

## 📝 Key Notes

- The project uses pure, vanilla front-end code — no complex frameworks, no build tooling required.
- Markdown files in the `_writeups/` folder are kept for note-taking and source backup purposes.
- Writeups served to the browser in production are formatted as HTML pages located inside the `pages/` directory.
- No Jekyll or static site generators are needed for GitHub Pages deployment.

---

*5t4t1cV01d · Mérida, Yucatán · 2026*
