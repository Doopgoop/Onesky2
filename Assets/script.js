
// ========================================
// Star Field with Mouse Reactivity
// ========================================
const starField = document.getElementById('star-field');
let stars = [];
let mousePos = { x: 0, y: 0 };

// Generate stars
function generateStars() {
  const starCount = 120;
  
  for (let i = 0; i < starCount; i++) {
    const star = {
      id: i,
      baseX: Math.random() * 100,
      baseY: Math.random() * 100,
      x: 0,
      y: 0,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
      speed: Math.random() * 0.5 + 0.2,
      element: null
    };
    star.x = star.baseX;
    star.y = star.baseY;
    
    // Create star element
    const starEl = document.createElement('div');
    starEl.className = 'star';
    
    // Assign color based on id
    const hue = i % 5 === 0 ? 25 : (i % 3 === 0 ? 260 : 215);
    const saturation = hue === 215 ? 60 : 70;
    
    starEl.style.cssText = `
      left: ${star.baseX}%;
      top: ${star.baseY}%;
      width: ${star.size}px;
      height: ${star.size}px;
      background-color: hsl(${hue}, ${saturation}%, ${75 + Math.random() * 15}%);
      box-shadow: 0 0 ${star.size * 2}px hsla(${hue}, ${saturation}%, 70%, 0.4);
      animation: twinkle ${star.duration}s ease-in-out infinite, float ${star.duration * 2}s ease-in-out infinite;
      animation-delay: ${star.delay}s;
    `;
    
    star.element = starEl;
    star.hue = hue;
    star.saturation = saturation;
    stars.push(star);
    starField.appendChild(starEl);
  }
}

// Handle mouse movement
function handleMouseMove(e) {
  const rect = starField.getBoundingClientRect();
  mousePos.x = ((e.clientX - rect.left) / rect.width) * 100;
  mousePos.y = ((e.clientY - rect.top) / rect.height) * 100;
  
  updateStarPositions();
}

// Update star positions based on mouse
function updateStarPositions() {
  stars.forEach(star => {
    const dx = mousePos.x - star.baseX;
    const dy = mousePos.y - star.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 25;
    
    let newX = star.baseX;
    let newY = star.baseY;
    let isNear = false;
    
    if (distance < maxDistance) {
      isNear = true;
      const force = (maxDistance - distance) / maxDistance;
      const moveX = (dx / distance) * force * 8 * star.speed;
      const moveY = (dy / distance) * force * 8 * star.speed;
      newX = star.baseX - moveX;
      newY = star.baseY - moveY;
    }
    
    star.element.style.left = `${newX}%`;
    star.element.style.top = `${newY}%`;
    
    if (isNear) {
      const brightness = 70 + (maxDistance - distance) * 1.2;
      star.element.style.backgroundColor = `hsl(25, 85%, ${brightness}%)`;
      star.element.style.boxShadow = `0 0 ${10 + (maxDistance - distance) * 0.6}px hsl(25, 85%, 60%), 0 0 ${20 + (maxDistance - distance)}px hsla(25, 80%, 50%, 0.5)`;
      star.element.style.transform = `scale(${1 + (maxDistance - distance) * 0.05})`;
    } else {
      star.element.style.backgroundColor = `hsl(${star.hue}, ${star.saturation}%, ${75 + Math.random() * 15}%)`;
      star.element.style.boxShadow = `0 0 ${star.size * 2}px hsla(${star.hue}, ${star.saturation}%, 70%, 0.4)`;
      star.element.style.transform = 'scale(1)';
    }
  });
}

// Shooting stars
function createShootingStar() {
  const shootingStar = document.createElement('div');
  shootingStar.className = 'shooting-star';
  shootingStar.style.left = `${Math.random() * 60 + 20}%`;
  shootingStar.style.top = `${Math.random() * 40}%`;
  
  starField.appendChild(shootingStar);
  
  setTimeout(() => {
    shootingStar.remove();
  }, 1000);
}

// Initialize shooting stars
function initShootingStars() {
  // Initial shooting stars with delays
  setTimeout(() => createShootingStar(), 0);
  setTimeout(() => createShootingStar(), 5000);
  setTimeout(() => createShootingStar(), 12000);
  
  // Periodic shooting stars
  setInterval(() => createShootingStar(), 8000);
  setInterval(() => createShootingStar(), 13000);
  setInterval(() => createShootingStar(), 20000);
}

// ========================================
// Mobile Navigation
// ========================================
const menuToggle = document.getElementById('menu-toggle');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const mobileNav = document.getElementById('mobile-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = !mobileNav.classList.contains('hidden');
  
  if (isOpen) {
    mobileNav.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  } else {
    mobileNav.classList.remove('hidden');
    menuIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
  }
});

// Close mobile nav when clicking a link
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
  });
});

// ========================================
// Smooth scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// Intersection Observer for animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-fade-in-up').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  generateStars();
  initShootingStars();
  
  window.addEventListener('mousemove', handleMouseMove);
  
  // Trigger hero animations immediately
  document.querySelectorAll('.hero-content .animate-fade-in-up').forEach(el => {
    el.style.animationPlayState = 'running';
  });
});


