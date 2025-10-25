// === Theme toggle only ===

// elements we touch
const btn= document.getElementById("themeToggle"); // the toggle button
const icon   = document.querySelector(".toggle-icon"); // the emoji inside the button

// pick a starting theme: saved choice wins, else follow OS preference
const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // OS setting
const startDark = saved ? saved === "dark" : prefersDark; // decide initial mode

// apply initial theme + icon
document.body.classList.toggle("dark", startDark); // add/remove .dark on <body>
if (icon) icon.textContent = startDark ? '☀️' : '🌑';    // sun for dark mode, moon for light

// click to toggle theme and remember it
btn?.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark'); // flip state
    document.body.classList.toggle('dark', isDark);             // apply class
    localStorage.setItem('theme', isDark ? 'dark' : 'light');         // save choice
    if (icon) icon.textContent = isDark ? '☀️' : '🌑';                // update icon
});

// === NEW: Dynamic Greeting Based on Time of Day ===
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = "Good morning!";
    } else if (hour < 18) {
        greeting = "Good afternoon!";
    } else {
        greeting = "Good evening!";
    }

    greetingElement.textContent = greeting;
}

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

    // Add filter buttons after section description
    const desc = document.querySelector('.section-desc');
    if (desc && filterContainer) {
        desc.insertAdjacentHTML('afterend', filterHTML);
    }

    // Add data attributes to projects for filtering
    if (projects.length >= 2) {
        projects[0].setAttribute('data-category', 'design'); // Graphic Design project
        projects[1].setAttribute('data-category', 'development'); // JavaFX project
        projects[2].setAttribute('data-category', 'development'); // Treasure Quest Program
        projects[3].setAttribute('data-category', 'design'); // Design a 16-Bit CPU
    }

    // Add event listeners to filter buttons
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.grid.projects .card');
    const emptyState = document.getElementById('projectsEmptyState');
    let visibleCount = 0;

    projects.forEach(project => {
        if (filter === 'all') {
            project.style.display = 'grid';
            visibleCount++;
        } else {
            const category = project.getAttribute('data-category');
            if (category === filter) {
                project.style.display = 'grid';
                visibleCount++;
            } else {
                project.style.display = 'none';
            }
        }
    });

    // Show/hide empty state
    if (emptyState) {
        if (visibleCount === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }
}


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

    // Save form data on input (with debouncing)
    let saveTimeout;
    form.addEventListener('input', function(e) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(saveFormData, 500);
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        if (validateForm()) {
            showLoadingState(true);

            // Simulate API call with timeout
            setTimeout(() => {
                // Show success message with animation
                const status = document.getElementById('formStatus');
                if (status) {
                    status.textContent = 'Message sent successfully! ✅';
                    status.className = 'status success';
                    status.style.display = 'block';

                    // Animate the success message
                    setTimeout(() => {
                        status.style.opacity = '1';
                        status.style.transform = 'translateY(0)';
                    }, 10);
                }

                showLoadingState(false);

                // Clear form and local storage
                form.reset();
                localStorage.removeItem('contactFormData');
                if (charCount) charCount.textContent = '0';

                // Hide success message after 5 seconds
                setTimeout(() => {
                    if (status) {
                        status.style.opacity = '0';
                        status.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            status.style.display = 'none';
                        }, 300);
                    }
                }, 5000);
            }, 1500); // Simulate network delay
        }
    });

    // Real-time validation on blur
    form.addEventListener('blur', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            validateField(e.target);
        }
    }, true);
}


function validateForm() {
    let isValid = true;
    const fields = ['name', 'email', 'message'];

    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element && !validateField(element)) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    let isValid = true;
    let errorMessage = '';

    switch(field.id) {
        case 'name':
            if (!field.value.trim()) {
                errorMessage = 'Name is required';
                isValid = false;
            } else if (field.value.length < 2) {
                errorMessage = 'Name must be at least 2 characters long';
                isValid = false;
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(field.value)) {
                errorMessage = 'Please enter a valid email address (e.g., you@example.com)';
                isValid = false;
            }
            break;
        case 'message':
            if (!field.value.trim()) {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (field.value.length < 10) {
                errorMessage = 'Message must be at least 10 characters long';
                isValid = false;
            } else if (field.value.length > 500) {
                errorMessage = 'Message must be less than 500 characters';
                isValid = false;
            }
            break;
    }

    // Update error display
    if (errorElement) {
        errorElement.textContent = errorMessage;
        if (errorMessage) {
            errorElement.style.display = 'block';
            field.classList.add('error-shake');
            setTimeout(() => {
                field.classList.remove('error-shake');
            }, 500);
        } else {
            errorElement.style.display = 'none';
        }
    }

    // Update field styling
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
    }

    return isValid;
}

function showLoadingState(show) {
    const submitBtn = document.querySelector('#contactForm .btn.primary');
    const originalText = submitBtn.textContent;

    if (show) {
        submitBtn.innerHTML = '<div class="spinner"></div>Sending...';
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-disabled', 'true');
    } else {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-disabled');
    }
}

function saveFormData() {
    const formData = {
        name: document.getElementById('name')?.value || '',
        email: document.getElementById('email')?.value || '',
        message: document.getElementById('message')?.value || ''
    };
    localStorage.setItem('contactFormData', JSON.stringify(formData));
}

function loadFormData() {
    const saved = localStorage.getItem('contactFormData');
    if (saved) {
        const formData = JSON.parse(saved);
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        const charCount = document.getElementById('charCount');

        if (name) name.value = formData.name;
        if (email) email.value = formData.email;
        if (message) {
            message.value = formData.message;
            if (charCount) charCount.textContent = formData.message.length;
        }
    }
}

// === NEW: Scroll Animations ===
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .card, .pill').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// === NEW: Smooth Section Navigation ===
function initializeSmoothNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

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

// === NEW: Error handling for missing assets ===
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        e.target.style.opacity = '0.5';
        e.target.alt = 'Image not available';
    }
});