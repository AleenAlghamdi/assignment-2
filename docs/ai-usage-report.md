# AI Usage Report — Assignment 2

## Executive Summary
This report details the ethical and educational use of AI in developing the personal portfolio website. 
AI served as a collaborative tool to enhance learning, problem-solving, and development efficiency while maintaining 
full understanding and ownership of all code.

This log documents **exact AI interactions** that influenced the project, including **prompt**, **output (trimmed if long)**, **my edits**, and **what I learned**. I used AI as a learning and drafting partner; I reviewed and adapted every result.


---


## 1) Prompts

### 1) Project Filtering (+ Empty State)
**Prompt**  
> “Create simple category filters for project cards using data attributes. Provide an ‘All’ button and an empty state message.”

**Output (excerpt)**  
```js
// === NEW: Project Filtering System ===
function initializeProjectFilters() {
    const projects = document.querySelectorAll('.grid.projects .card');
    const filterContainer = document.querySelector('.section-head');

    // Create filter buttons
    const filterHTML = `
        <div class="project-filters">
            <button class="filter-btn active" data-filter="all">All Projects</button>
            <button class="filter-btn" data-filter="design">Design</button>
            <button class="filter-btn" data-filter="development">Development</button>
        </div>
    `;

    .
    .
    .
}
```

**My Edits**  
- Ensured active states for buttons and graceful display toggling. 
- Added data attributes to projects for filtering
- Added empty-state visibility logic.

**Lesson**  
Filters need clear visual/ARIA feedback and a reset path.


---


### 2) Contact Form: Validation + Persistence + Status
**Prompt**  
> “Implement inline validation (name/email/message), save form fields to `localStorage` with debouncing, show a loading spinner, and a success message (no page reload).”

**Output (excerpt)**  
```js
// === NEW: Contact Form Validation and Local Storage ===
function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const messageInput = document.getElementById('message');
    const charCount = document.getElementById('charCount');

    if (!form) return;

    // Load saved form data from local storage
    loadFormData();

    // Real-time character count
    if (messageInput && charCount) {
        messageInput.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;

            // Update color based on length
            if (count > 450) {
                charCount.style.color = '#b91c1c';
            } else if (count > 400) {
                charCount.style.color = '#ca8a04';
            } else {
                charCount.style.color = 'var(--muted)';
            }
        });
    }
    .
    .
    .
}

```

**My Edits**  
- Tuned messages, added basic character-count color thresholds, and ensured recovery after success.
- Simulatee API call with timeout
- Updated field styling & error display

**Lesson**  
Combine *inline messages* with a *status region* to reduce confusion.


---


### 3) Initialization & Year Update
**Prompt**  
> “Bundle all initializers under `DOMContentLoaded`. Also, set footer year automatically.”

**Output (excerpt)**  
```js
// === Initialize everything when DOM loads ===
document.addEventListener('DOMContentLoaded', function() {
    updateGreeting();
    initializeProjectFilters();
    initializeContactForm();
    initializeScrollAnimations();
    initializeSmoothNavigation();

    // Update footer year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
```

**My Edits**  
- None.

**Lesson**  
Centralized init keeps startup predictable.


---


### 4) Asset Error Handling (Images)
**Prompt**  
> “Listen for window `error` events; when an `<img>` fails, tone it down and replace the `alt`.”

**Output (excerpt)**  
```js
// === NEW: Error handling for missing assets ===
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        e.target.style.opacity = '0.5';
        e.target.alt = 'Image not available';
    }
});
```

**My Edits**  
- Kept minimal; logs to console for debugging only.

**Lesson**  
Failing assets should degrade gracefully.


---


### 5) Theming & Feedback CSS
**Prompt**  
> “Provide CSS variables for light/dark themes and basic UI surfaces. Add status banners, a spinner animation, and filter button states.”

**Output (excerpts)**  

```css
/*  Base theme variables (light mode)  */
:root {
    --bg: #f5f8fc;            /* page background */
    --surface: #ffffff;       /* card / panel background */
    --text: #1f2937;          /* main text  */
    --muted: #64748b;         /* secondary text */
    --border: #e5e7eb;        /* subtle borders */
    --brand-weak: #e6f1ff;    /* very light blue band */
    --brand: #365890;         /* main blue */
    --shadow: 0 10px 25px rgba(15, 23, 42, .08);  /* soft card shadow */
}

/* ... */
/*  Dark theme variables  */
body.dark {
    --bg: #0f172a;            /* dark background */
    --surface: #111827;       /* dark panels */
    --text: #e5e7eb;          /* light text */
    --muted: #94a3b8;         /* light muted text */
    --border: #1f2937;        /* dark border */
    --brand-weak: #0b2447;    /* deep blue band */
    --brand: #9a8adc;         /* light purple for dark bg */
    --shadow: 0 10px 25px rgba(0, 0, 0, .35); /* stronger shadow */
}
.
.
.
```

**My Edits**  
- Adjusted spacing on mobile, ensured contrast, and kept transitions to 200–300ms.

**Lesson**  
Design tokens (CSS variables) make theming and maintenance straightforward.


---


## 2) AI Assistance VS My Work
### AI-assisted
- Proposed CSS tweaks for responsive wrapping (Projects grid, Skills list) 
- Suggested a contrast theme by clarifying the usage of CSS variables for backgrounds and surfaces
- Helped outline the documentation structure and phrasing

### My Work
- I typed the HTML, CSS, and JS files, then made some adjustments and looked up explanations for a few concepts 
- I used a class-based approach for each element to allow more variety in design and make the UI more visually appealing
- I tested visual changes across viewport sizes and kept only changes that improved readability and layout stability
