# Technical Documentation — Assignment 2

This document explains **what changed** from Assignment‑1, **how** the new interactive features are built, and **why** the choices align with the rubric. It also covers performance, accessibility, and testing.

---

## 1) How It’s Built

### 1.1 Stack & Approach
- **HTML** for semantic structure of sections 
- **CSS** (Flexbox + Grid + CSS variables) for layout, spacing, and theming 
- **JavaScript** for small interactions - the **theme toggle** with `localStorage`
- **No build tooling** (no bundlers, frameworks, or package installs)

### 1.2 Styling & Theming
- CSS Variables define color tokens for backgrounds, surfaces, text, and accents 
  In dark mode, variables are overridden under a `.dark` scope to ensure consistent contrast for sections like Skills and Footer
- Layout utilities use Flex/Grid for:
    - Project grid (predictable wrapping with `gap`)
    - Skills list (centered, wrapping chips)

---

## 2) Why It’s Built That Way

- Semantic HTML + small named CSS classes make the code self-explanatory
- CSS variables centralize colors/spacing, so future restyling or brand theming is quick

---

## 3) Code Structure

### Current Layout (as submitted)

```

assignment-1/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

**File roles**
- **README.md** — Project overview and local setup instructions
- **index.html** — All page sections and their semantic structure. includes links to `styles.css` and `script.js`
- **css/styles.css** — Theme variables, base styles (colors & spacing), section layouts, and grids/flex rules
- **js/script.js** — Minimal interaction logic 
- **assets/** — Static files (images/media)
- **docs/** — Written documentation: AI usage report and technical document

---

## 4) Extending the Project

- **Add pages**: Convert sections (Projects, About) to dedicated pages if content grows; keep the same CSS
- **Form handling**: Add a simple backend for processing submissions (Done in this phase)

---

## 5) Design Principles Recap

- **Clarity over cleverness**: Simple layouts and class names
- **Single-responsibility styles**: Sections own their layout; components own their look
- **Tokenized theming**: Variables for colors/spacing; easy to retheme
- **Progressive enhancement**: The site reads well without JS; JS adds polish

