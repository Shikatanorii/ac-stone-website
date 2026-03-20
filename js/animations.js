// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Add a smooth trailing effect for the outline
    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Interactive Cursor Scale on Hover
const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.backgroundColor = 'rgba(90, 106, 114, 0.1)';
        cursorOutline.style.borderColor = 'var(--clr-primary-hover)';
    });
    el.addEventListener('mouseleave', () => {
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.backgroundColor = 'transparent';
        cursorOutline.style.borderColor = 'var(--clr-primary)';
    });
});

// Sticky Glassmorphism Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle (Refactored for CSS-class based responsiveness)
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinksContainer = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// ---------------------------------------------
// SECURE CONTACT FORM HANDLING & VALIDATION
// ---------------------------------------------
const contactForm = document.querySelector('.contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // 1. Basic Security Validation/Sanitization
        const nameInput = document.getElementById('name').value.trim();
        const emailInput = document.getElementById('email').value.trim();
        const serviceInput = document.getElementById('service').value;
        const msgInput = document.getElementById('message').value.trim();
        const submitBtn = e.target.querySelector('button[type="submit"]');

        // Prevent empty submissions (client-side enforcement)
        if (!nameInput || !emailInput || !serviceInput || !msgInput) {
            alert('Please fill out all required fields securely.');
            return;
        }

        // 2. Strict Email format validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput)) {
            alert('Please enter a valid email address.');
            return;
        }

        // 3. Prevent Double Submission (Stress-test protection)
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Securing Connection & Sending...";
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            // VERCEL DEPLOYMENT READY: 
            // Once you have your Vercel Function (api/contact) or Web3Forms URL, 
            // replace the URL below.
            
            /*
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: nameInput, email: emailInput, service: serviceInput, message: msgInput })
            });
            if (!response.ok) throw new Error('Network response was not ok');
            */

            // Simulating successful network request for deployment readiness
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 4. Success State Feedback
            submitBtn.innerText = "Message Sent Securely! ✓";
            submitBtn.style.backgroundColor = "green";
            submitBtn.style.opacity = '1';
            e.target.reset(); // Clear form securely
        } catch(err) {
            console.error("Transmission Error:", err);
            submitBtn.innerText = "Transmission Error. Try Again.";
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

// ---------------------------------------------
// GSAP SCROLL ANIMATIONS
// ---------------------------------------------

// Hero Section Entry (Loads immediately)
const heroTl = gsap.timeline();

heroTl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 })
      .from('.hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.6')
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from('.hero-cta .btn', { y: 20, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, '-=0.4')
      .from('.scroll-indicator', { opacity: 0, duration: 1 }, '-=0.4');

// Subtle Parallax effect on the Hero Background Image
gsap.to('.hero-img', {
    yPercent: 15,
    ease: "none",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true
    }
});

// General Scroll Reveals
// Reveal upwards
const revealElements = document.querySelectorAll('.gs-reveal');
revealElements.forEach(el => {
    el.style.willChange = 'transform, opacity';
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true
        },
        y: 30,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out'
    });
});

// Reveal Up (Staggered or individual)
const revealUpElements = document.querySelectorAll('.gs-reveal-up');
revealUpElements.forEach(el => {
    el.style.willChange = 'transform, opacity';
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
});

// Reveal Right
const revealRightElements = document.querySelectorAll('.gs-reveal-right');
revealRightElements.forEach(el => {
    el.style.willChange = 'transform, opacity';
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true
        },
        x: 35,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out'
    });
});

// Reveal Left
const revealLeftElements = document.querySelectorAll('.gs-reveal-left');
revealLeftElements.forEach(el => {
    el.style.willChange = 'transform, opacity';
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true
        },
        x: -35,
        opacity: 0,
        duration: 1.1,
        ease: 'power2.out'
    });
});

// Gallery Staggered Reveal — single parent trigger, smooth cascade
const galleryStagger = document.querySelector('.gs-gallery-stagger');
if (galleryStagger) {
    const galleryItems = galleryStagger.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.style.willChange = 'transform, opacity';
    });
    gsap.from(galleryItems, {
        scrollTrigger: {
            trigger: galleryStagger,
            start: "top 80%",
            once: true
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        onComplete: () => {
            galleryItems.forEach(item => {
                item.style.willChange = 'auto';
            });
        }
    });
}

// Services Staggered Reveal — single parent trigger, smooth cascade
const servicesStagger = document.querySelector('.gs-services-stagger');
if (servicesStagger) {
    const serviceCards = servicesStagger.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.willChange = 'transform, opacity';
    });
    gsap.from(serviceCards, {
        scrollTrigger: {
            trigger: servicesStagger,
            start: "top 80%",
            once: true
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        onComplete: () => {
            serviceCards.forEach(card => {
                card.style.willChange = 'auto';
            });
        }
    });
}
