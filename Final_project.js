// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check saved preference
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    html.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
});

// Hide loader
window.addEventListener('load', () => {
    const loader = document.getElementById('loaderOverlay');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
});

// Smooth animations on scroll
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

// Observe all cards
document.querySelectorAll('.skill-card, .feedback--card, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
// Feedback System
const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

// Load feedback from localStorage
function loadFeedback() {
    const savedFeedback = localStorage.getItem('siteFeedback');
    const feedback = savedFeedback ? JSON.parse(savedFeedback) : [];

    if (feedback.length === 0) {
        feedbackList.innerHTML = '<div class="feedback-empty"><p>No feedback yet. Be the first to share your thoughts!</p></div>';
        return;
    }

    feedbackList.innerHTML = '';
    feedback.reverse().forEach((item, index) => {
        const feedbackCard = document.createElement('div');
        feedbackCard.className = 'feedback-card';
        feedbackCard.style.opacity = '0';
        feedbackCard.style.transform = 'translateY(20px)';
        feedbackCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        const date = new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        feedbackCard.innerHTML = `
            <div class="feedback-header">
                <div class="feedback-author">${item.name}</div>
                <div class="feedback-date">${date}</div>
            </div>
            <p class="feedback-text">${item.message}</p>
        `;

        feedbackList.appendChild(feedbackCard);

        // Trigger animation
        setTimeout(() => {
            feedbackCard.style.opacity = '1';
            feedbackCard.style.transform = 'translateY(0)';
        }, 10);
    });
}

// Save new feedback
feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const message = document.getElementById('feedbackMessage').value.trim();

    if (!name || !message) {
        alert('Please fill in your name and feedback message.');
        return;
    }

    const newFeedback = {
        name: name,
        email: email,
        message: message,
        date: new Date().toISOString()
    };

    const savedFeedback = localStorage.getItem('siteFeedback');
    const feedback = savedFeedback ? JSON.parse(savedFeedback) : [];
    feedback.push(newFeedback);

    localStorage.setItem('siteFeedback', JSON.stringify(feedback));

    // Clear form
    feedbackForm.reset();

    // Reload
    loadFeedback();

    // Show success message
    alert('Thank you for your feedback! 🎉');
});

// Initial load
loadFeedback();
const lenis = new Lenis({
  duration: 0.5,         // Animation duration
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
  direction: 'vertical', // Scroll direction
  gestureDirection: 'vertical',
  smooth: true,
  smoothTouch: false,    // Disable smooth scrolling on touch devices
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);