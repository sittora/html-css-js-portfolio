/* ================================================================
   SITORA EVERMAN - PORTFOLIO SCRIPTS
   Burgundy Theme with Professional Animations
   ================================================================ */

// ===== DARK MODE TOGGLE =====
function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function initThemeToggle() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.documentElement.classList.add('dark');
  }
}

// ===== HAMBURGER MENU TOGGLE =====
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// ===== SCROLL PROGRESS BAR =====
function initScrollProgress() {
  // Create progress bar element
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.width = '0%';
  document.body.prepend(progressBar);

  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Select all elements with reveal classes
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
  
  // Also add reveal to sections that don't have it
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));
  
  // Add reveal class and observe sections
  sections.forEach(section => {
    if (!section.classList.contains('reveal')) {
      section.classList.add('reveal');
    }
    observer.observe(section);
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// ===== INITIALIZE ALL SCRIPTS =====
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollProgress();
  initScrollReveal();
  initSmoothScroll();
  initNavHighlight();
  
  // Trigger reveal for elements already in view
  setTimeout(() => {
    window.dispatchEvent(new Event('scroll'));
  }, 100);
});