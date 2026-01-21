// Smooth scrolling for nav links and buttons
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Fade-in sections on scroll
const sections = document.querySelectorAll('.skills, .work-experience, .projects, .contact');

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
  section.classList.add('opacity-zero'); // hide initially
  observer.observe(section);
});

// Highlight active nav link while scrolling
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 70;
    if(pageYOffset >= sectionTop){
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === '#' + current){
      link.classList.add('active');
    }
  });
});

// Dynamic year in footer
const footerYear = document.querySelector('.footer p');
if(footerYear){
  const currentYear = new Date().getFullYear();
  footerYear.textContent = `© ${currentYear} Meenakshi Kashyap`;
}
