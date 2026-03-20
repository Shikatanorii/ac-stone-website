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

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinksContainer = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

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

// ---------------------------------------------
// SAFE SCROLL REVEAL HELPER
// Uses gsap.fromTo() so elements ALWAYS end at full opacity,
// even if the ScrollTrigger fires late or is already past.
// ---------------------------------------------
function safeReveal(selector, fromVars, toVars, triggerOpts) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        gsap.fromTo(el, 
            { ...fromVars },
            {
                ...toVars,
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    once: true,
                    ...triggerOpts
                }
            }
        );
    });
}

// General Scroll Reveals
safeReveal('.gs-reveal',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1.1, ease: 'power2.out' }
);

// Reveal Up (individual elements with this class)
safeReveal('.gs-reveal-up',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
);

// Reveal Right
safeReveal('.gs-reveal-right',
    { x: 35, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.1, ease: 'power2.out' }
);

// Reveal Left
safeReveal('.gs-reveal-left',
    { x: -35, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.1, ease: 'power2.out' }
);

// ---------------------------------------------
// STAGGERED REVEALS (parent-triggered, smooth cascade)
// Uses gsap.fromTo() for safety — elements always end visible.
// ---------------------------------------------
function staggerReveal(parentSelector, childSelector, opts = {}) {
    const parent = document.querySelector(parentSelector);
    if (!parent) return;
    const children = parent.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.fromTo(children,
        { y: 40, opacity: 0 },
        {
            y: 0,
            opacity: 1,
            duration: opts.duration || 1,
            stagger: opts.stagger || 0.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: parent,
                start: "top 82%",
                once: true
            }
        }
    );
}

// Services cards stagger
staggerReveal('.gs-services-stagger', '.service-card', { stagger: 0.15 });

// Gallery items stagger
staggerReveal('.gs-gallery-stagger', '.gallery-item', { stagger: 0.2 });
