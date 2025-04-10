// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    }
});

// Counter animation for impact numbers
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const targetNumber = counter.innerText;
    counter.innerText = targetNumber; // Display the number directly without animation
});

// Fade up animation for elements
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Gallery hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.querySelector('.gallery-overlay').style.transform = 'translateY(0)';
    });

    item.addEventListener('mouseleave', function() {
        this.querySelector('.gallery-overlay').style.transform = 'translateY(100%)';
    });
});

// Add animation to feature cards
const featureCards = document.querySelectorAll('.feature-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease';
    observer.observe(card);
});

document.addEventListener('DOMContentLoaded', function() {
    const memberForm = document.getElementById('memberForm');
    const formMessage = document.getElementById('formMessage');

    if (memberForm) {
        memberForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);

            fetch('process_contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                formMessage.textContent = data.message;
                formMessage.className = 'form-message ' + data.status;
                
                if (data.status === 'success') {
                    memberForm.reset();
                }
            })
            .catch(error => {
                formMessage.textContent = 'An error occurred. Please try again.';
                formMessage.className = 'form-message error';
            });
        });
    }
});

// Mobile menu toggle and navigation handling
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Toggle menu
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        updateMenuIcon();
    });

    // Function to update menu icon
    function updateMenuIcon() {
        const icon = menuToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            updateMenuIcon();
        }
    });

    // Handle navigation links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // If it's an anchor link on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    navLinks.classList.remove('active');
                    updateMenuIcon();
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (href.includes('#')) {
                // If it's a link to another page with an anchor
                const [pagePath, anchor] = href.split('#');
                if (window.location.pathname.endsWith(pagePath)) {
                    e.preventDefault();
                    const targetSection = document.querySelector(`#${anchor}`);
                    if (targetSection) {
                        navLinks.classList.remove('active');
                        updateMenuIcon();
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
            
            // Close menu after clicking any link
            navLinks.classList.remove('active');
            updateMenuIcon();
        });
    });

    // Hide navbar on scroll down, show on scroll up
    let lastScrollTop = 0;
    const navbarHeight = navbar.getBoundingClientRect().height;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
            // Scrolling down - hide navbar
            navbar.style.transform = 'translateY(-100%)';
            // Also close the menu if it's open
            navLinks.classList.remove('active');
            updateMenuIcon();
        } else {
            // Scrolling up - show navbar
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Supabase configuration and initialization
let supabase;
document.addEventListener('DOMContentLoaded', function() {
    const SUPABASE_URL = 'https://ychxawrxbrimnucpvuow.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljaHhhd3J4YnJpbW51Y3B2dW93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyNjkyMTIsImV4cCI6MjA1OTg0NTIxMn0.ibgPSg60maA1yevlLQxL_AeIBQeOfLaoBY-QPVdhZ5E';
    
    // Initialize Supabase client
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const formMessage = document.getElementById('formMessage');
            
            // Get form data
            const name = form.name.value;
            const email = form.email.value;
            const phone = form.phone.value;

            console.log('Form Data:', { name, email, phone }); // Debug log

            // Validate phone number (10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone)) {
                formMessage.textContent = 'Please enter a valid 10-digit phone number';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            try {
                console.log('Attempting to insert data into Supabase...'); // Debug log
                
                // Insert data into Supabase
                const { data, error } = await supabase
                    .from('contacts')
                    .insert({
                        name: name,
                        email: email,
                        phone: phone
                    });

                console.log('Supabase Response:', { data, error }); // Debug log

                if (error) {
                    console.error('Supabase Error:', error); // Debug log
                    throw error;
                }

                // Show success message
                formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Reset form
                form.reset();
            } catch (error) {
                console.error('Detailed Error:', error); // Debug log
                
                // Show error message
                formMessage.textContent = 'Sorry, something went wrong. Please try again later.';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit';
            }
        });
    }
}); 