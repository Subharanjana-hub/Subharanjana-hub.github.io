/**
 * Subharanjana A - Personal Portfolio
 * Vanilla JavaScript (Zero-dependency, accessible, performance-focused)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. Theme Switcher (Light / Dark Mode with System Preference & LocalStorage)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;
  const storageKey = 'portfolio-theme';

  // Determine initial theme: localStorage -> system preference -> default light
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem(storageKey);
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const isDark = theme === 'dark';
      themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      themeToggleBtn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  // Initial application
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  // Toggle button event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(storageKey, newTheme);
      applyTheme(newTheme);
    });
  }

  // Listen for OS system theme changes if user hasn't explicitly set preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(storageKey)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. Mobile Navigation Drawer & Backdrop
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const siteNav = document.getElementById('site-nav');
  const navBackdrop = document.getElementById('nav-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  function openMobileNav() {
    if (!siteNav || !mobileToggle) return;
    siteNav.classList.add('open');
    mobileToggle.classList.add('active');
    mobileToggle.setAttribute('aria-expanded', 'true');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeMobileNav() {
    if (!siteNav || !mobileToggle) return;
    siteNav.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileNav);
  }

  // Close nav when clicking any nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close mobile nav on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav && siteNav.classList.contains('open')) {
      closeMobileNav();
    }
  });

  /* --------------------------------------------------------------------------
     3. Scrollspy (Active Nav Link Highlighting)
     -------------------------------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const headerHeight = 80;

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + headerHeight + 60;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          const href = link.getAttribute('href');
          if (href === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  /* --------------------------------------------------------------------------
     4. Number Count-up Animation for Stats Card
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateStatNumber(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const decimals = parseInt(element.getAttribute('data-decimals') || '0', 10);

    if (isNaN(target)) return;

    if (prefersReducedMotion) {
      element.textContent = decimals > 0 ? target.toFixed(decimals) : target.toString();
      return;
    }

    const duration = 1600; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic curve: 1 - (1 - progress)^3
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentVal = easeOut * target;

      if (decimals > 0) {
        element.textContent = currentVal.toFixed(decimals);
      } else {
        element.textContent = Math.floor(currentVal).toString();
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = decimals > 0 ? target.toFixed(decimals) : target.toString();
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const statsCard = document.querySelector('.stats-card');
  if (statsCard && 'IntersectionObserver' in window) {
    let statsAnimated = false;
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach((el) => animateStatNumber(el));
            statsObserver.unobserve(statsCard);
          }
        });
      },
      { threshold: 0.25 }
    );
    statsObserver.observe(statsCard);
  } else {
    // Fallback if IntersectionObserver is unsupported
    statNumbers.forEach((el) => animateStatNumber(el));
  }

  /* --------------------------------------------------------------------------
     5. Scroll Reveal Animation for Sections & Cards
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // Instantly reveal all elements
    revealElements.forEach((el) => el.classList.add('revealed'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* --------------------------------------------------------------------------
     6. Video Player Coordination (Pause one when another starts)
     -------------------------------------------------------------------------- */
  const videos = document.querySelectorAll('.demo-video');
  videos.forEach((video) => {
    video.addEventListener('play', () => {
      videos.forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) {
          otherVideo.pause();
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     7. Smooth Anchor Scroll Handling with Offset
     -------------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (headerHeight - 6);

        if (prefersReducedMotion) {
          window.scrollTo(0, offsetPosition);
        } else {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }

        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, '', targetId);
        }
      }
    });
  });
});
