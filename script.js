/* ============================================================
   MOHAMED SATHAM — PORTFOLIO JAVASCRIPT
   Structure:
   1.  Wait for DOM to load
   2.  Dark Mode Toggle
   3.  Mobile Navigation Menu
   4.  Active Navigation Link Highlight
   5.  Navbar Shadow on Scroll
   6.  Scroll Reveal Animation
   ============================================================ */


/* ============================================================
   1. WAIT FOR DOM TO LOAD
   All code runs only after the HTML page is fully loaded.
   This prevents errors from trying to access elements that
   do not exist yet.
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {


  /* ==========================================================
     2. DARK MODE TOGGLE
     
     How it works:
     - We find the dark mode button in the HTML
     - When clicked, we add or remove the class "dark-mode"
       on the <body> element
     - CSS already has all dark mode styles defined under
       body.dark-mode — so adding that class is all we need
     - We save the user's choice in localStorage so it
       persists when they refresh or revisit the page
  ========================================================== */

  const darkModeButton = document.querySelector('.dark-mode-toggle');
  const body           = document.body;

  /* --- Step 1: Check if user has a saved preference --- */
  /*
    localStorage is a small storage built into the browser.
    It remembers data even after the page is closed.
    We stored the theme as the string "dark" or "light".
  */
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    darkModeButton.textContent = 'Light Mode';
  } else {
    darkModeButton.textContent = 'Dark Mode';
  }

  /* --- Step 2: Toggle dark mode when button is clicked --- */
  darkModeButton.addEventListener('click', function () {

    /* classList.toggle adds the class if missing, removes if present */
    body.classList.toggle('dark-mode');

    /* Check which mode is now active and update accordingly */
    if (body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      darkModeButton.textContent = 'Light Mode';
    } else {
      localStorage.setItem('theme', 'light');
      darkModeButton.textContent = 'Dark Mode';
    }
  });


  /* ==========================================================
     3. MOBILE NAVIGATION MENU

     How it works:
     - On mobile screens, the nav links are hidden (CSS handles this)
     - We show a hamburger button instead
     - When hamburger is clicked, we toggle a class that
       shows or hides the nav links on mobile
     - Clicking any nav link also closes the menu
  ========================================================== */

  const hamburgerButton = document.querySelector('.hamburger-menu');
  const navLinks        = document.querySelector('.nav-links');

  /* Toggle the mobile menu open/closed */
  hamburgerButton.addEventListener('click', function () {

    /* Toggle a CSS class to show/hide the nav links */
    navLinks.classList.toggle('nav-open');

    /* Update button text to reflect current state */
    if (navLinks.classList.contains('nav-open')) {
      hamburgerButton.textContent = 'Close';
    } else {
      hamburgerButton.textContent = 'Menu';
    }
  });

  /* Close the mobile menu when any nav link is clicked */
  const allNavLinks = document.querySelectorAll('.nav-links a');

  allNavLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('nav-open');
      hamburgerButton.textContent = 'Menu';
    });
  });


  /* ==========================================================
     4. ACTIVE NAVIGATION LINK HIGHLIGHT

     How it works:
     - As the user scrolls, we detect which section is currently
       visible in the viewport
     - We add an "active" class to the matching nav link
     - CSS uses this class to highlight the current section link
     
     IntersectionObserver watches elements and fires a callback
     whenever they enter or leave the visible screen area.
  ========================================================== */

  /* Collect all page sections that have an id */
  const sections = document.querySelectorAll('section[id]');

  /* Observer options:
     rootMargin: shrinks the detection area so the link
                 activates when the section is near the top
     threshold:  fires when at least 20% of the section is visible
  */
  const observerOptions = {
    rootMargin: '-80px 0px -60% 0px',
    threshold:   0.1
  };

  const sectionObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

      /* Find the nav link whose href matches this section's id */
      const id             = entry.target.getAttribute('id');
      const matchingLink   = document.querySelector('.nav-links a[href="#' + id + '"]');

      if (!matchingLink) return; /* Skip if no matching link found */

      if (entry.isIntersecting) {
        /* Remove active from all links first */
        allNavLinks.forEach(function (l) { l.classList.remove('active'); });
        /* Add active to the matching link */
        matchingLink.classList.add('active');
      }
    });

  }, observerOptions);

  /* Start observing every section */
  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });


  /* ==========================================================
     5. NAVBAR SHADOW ON SCROLL

     How it works:
     - When the page scrolls down more than 10 pixels,
       we add a CSS class to the navbar that shows a shadow
     - When back at the top, we remove it
     - This gives visual depth and separates the nav from content
  ========================================================== */

  const navbar = document.querySelector('header');

  window.addEventListener('scroll', function () {

    if (window.scrollY > 10) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  });


  /* ==========================================================
     6. SCROLL REVEAL ANIMATION

     How it works:
     - Cards and sections start invisible (opacity 0, shifted down)
     - As the user scrolls and an element enters the viewport,
       we add a class "revealed" that transitions it into view
     - This creates a professional "fade in on scroll" effect
     
     We use CSS for the actual animation — JS only adds/removes
     the class. This keeps things clean and performant.
  ========================================================== */

  /* Elements we want to animate on scroll */
  const revealElements = document.querySelectorAll(
    '.project-card, .skill-group, .education-card, .contact-item, .about-content'
  );

  /* Add the starting hidden state class to each element */
  revealElements.forEach(function (el) {
    el.classList.add('reveal-hidden');
  });

  /* Observer: fires when element enters the screen */
  const revealObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.remove('reveal-hidden');
        entry.target.classList.add('revealed');

        /* Stop watching after it has been revealed once */
        revealObserver.unobserve(entry.target);
      }
    });

  }, { threshold: 0.12 });

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });


/* ============================================================
   End of DOMContentLoaded
   All the code above is wrapped inside this listener so it
   only runs after the full HTML page has been parsed and ready.
============================================================ */
});


/* ============================================================
   ADDITIONAL CSS INJECTED BY JAVASCRIPT
   
   Instead of editing style.css, we inject the small set of
   styles that JavaScript features depend on directly here.
   This keeps all JS-related styles in one place.
   
   Styles added:
   - .nav-open       — shows mobile nav when hamburger is clicked
   - .active         — highlights the current nav link
   - .nav-scrolled   — adds shadow to navbar on scroll
   - .reveal-hidden  — starting state for scroll reveal
   - .revealed       — animated end state for scroll reveal
============================================================ */
const dynamicStyles = document.createElement('style');

dynamicStyles.textContent = `

  /* Mobile nav — shown when hamburger is clicked */
  @media (max-width: 768px) {
    .nav-links.nav-open {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 70px;
      left: 0;
      width: 100%;
      background-color: var(--color-surface);
      border-bottom: 1px solid var(--color-border);
      padding: 1.5rem 5%;
      gap: 1.25rem;
      z-index: 999;
      animation: slideDown 0.25s ease;
    }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Active nav link — highlighted when section is in view */
  .nav-links a.active {
    color: var(--color-accent);
  }

  .nav-links a.active::after {
    width: 100%;
  }

  /* Navbar shadow — appears after scrolling down */
  header.nav-scrolled {
    box-shadow: 0 2px 20px rgba(26, 26, 46, 0.10);
  }

  body.dark-mode header.nav-scrolled {
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.40);
  }

  /* Scroll reveal — hidden starting state */
  .reveal-hidden {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.55s ease, transform 0.55s ease;
  }

  /* Scroll reveal — visible end state */
  .revealed {
    opacity: 1;
    transform: translateY(0);
  }
`;

document.head.appendChild(dynamicStyles);
