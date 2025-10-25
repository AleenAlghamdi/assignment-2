# Assignment 2 - Personal Portfolio

A responsive, **HTML/CSS/JavaScript** portfolio with dynamic content, data handling, smooth animations, and clear user feedback. This builds on Assignment‑1 and follows the requirements of Assignment‑2.


## Project Description
This portfolio showcases my work and technical skills through an engaging, user-friendly interface:
- **Dynamic Content**: Personalized greeting, project filtering, interactive elements
- **Animations & Transitions**: Smooth scroll effects, hover animations, loading states
- **Data Handling**: Local storage for theme preferences and form data, form validation
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Error Handling**: User feedback systems and graceful error recovery

**Tech stack:** HTML, CSS, and a tiny JS file for theme toggling

**Structure (key files):**
```
README.md
index.html
css/
  styles.css
js/
  script.js
assets/
  images and media
docs/
  ai-usage-report.md      
  technical-documentation.md 
```

## Setup — Run Locally

### Open the file directly
1. Download or clone the repository
2. Double‑click `index.html` to open it in your browser 
   *(Works because all assets are relative paths. No build step required)*

## How to Use / Modify
- Edit content and sections in `index.html`
- Adjust colors, spacing, and layout in `css/styles.css` (CSS variables are defined for both light and dark modes)
- The theme toggle logic lives in `js/script.js` (adds/removes `.dark` on `<body>` and persists to `localStorage`)

## Short Summary of AI Use
I used AI **to adjust layout and improve the documentation**:
- Helped refine **responsive grid behavior** (projects wrapping, skill chips centering) and **dark‑mode surface colors** for better contrast and consistency
- Assisted with **section organization** (this file), while I verified and edited the output to fit my style and the course rubric

> I iterated on AI suggestions, tested visually (desktop & mobile), and kept only changes that improved readability, accessibility, and maintainability


