// 1. Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// 2. GSAP ScrollTrigger Registration
gsap.registerPlugin(ScrollTrigger);

// 3. Hero Parallax Text (Scrolls down slightly as you scroll to create depth)
if (document.querySelector("#parallax-bg-text")) {
    gsap.to("#parallax-bg-text", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
}

// 4. Subtle Float for Tags (All floating synchronously on the same horizontal level)
const tags = ['#tag-ui', '#tag-ux', '#tag-des', '#tag-dev'];
tags.forEach((tag) => {
    if (document.querySelector(tag)) {
        gsap.to(tag, {
            y: -10,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
});

// 5. Work Section Card Entrance
const cards = document.querySelectorAll('.project-card');

cards.forEach((card, index) => {
    // Initial entrance animation
    gsap.from(card, {
        y: 200,
        opacity: 0,
        rotationX: -10,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// 6. Experience Timeline Animations
const expItems = document.querySelectorAll('.exp-item');

expItems.forEach((item) => {
    const card = item.querySelector('.exp-card');
    const node = item.querySelector('.exp-node');
    const isLeft = item.classList.contains('left');

    // Entrance for card
    gsap.from(card, {
        x: isLeft ? -100 : 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Entrance for node
    gsap.from(node, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate the vertical line drawing itself
if (document.querySelector('.exp-line')) {
    gsap.from('.exp-line', {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
            trigger: '.experience-section',
            start: "top 70%",
            end: "bottom 80%",
            scrub: true
        }
    });
}

// 6. Page Transition Logic
document.addEventListener('DOMContentLoaded', () => {
    const transitionEl = document.querySelector('.page-transition');
    if (!transitionEl) return;

    // Check if we need to sweep OUT (entrance animation)
    // If the element has the 'active' class on load, it means we are entering
    if (transitionEl.classList.contains('active')) {
        setTimeout(() => {
            transitionEl.classList.add('exit');
            transitionEl.classList.remove('active');
        }, 50); // slight delay to ensure render
    }

    // Intercept project clicks
    const projectLinks = document.querySelectorAll('.project-link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetUrl = link.getAttribute('href');
            
            // Sweep IN (cover the screen left-to-right)
            transitionEl.classList.remove('exit');
            transitionEl.classList.add('active');
            
            // After animation finishes, navigate
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 600); // matches the 0.6s CSS transition
        });
    });
});
