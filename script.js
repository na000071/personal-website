const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth scrolling for nav links and buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });

      if (targetId === '#main-content') {
        target.focus({ preventScroll: true });
      }
    }
  });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('.skills, .work-experience, .projects, .contact');

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const options = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach(section => {
    section.classList.add('opacity-zero');
    observer.observe(section);
  });
}

// Highlight active nav link while scrolling
const navLinks = document.querySelectorAll('.nav-links a');
const pageSections = Array.from(navLinks)
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateActiveNavLink() {
  let current = pageSections[0]?.id || '';

  pageSections.forEach(section => {
    const sectionTop = section.offsetTop - 90;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    const isActive = link.getAttribute('href') === '#' + current;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Dynamic year in footer
const footerYear = document.querySelector('.footer p');
if(footerYear){
  const currentYear = new Date().getFullYear();
  footerYear.textContent = `© ${currentYear} Meenakshi Kashyap`;
}
