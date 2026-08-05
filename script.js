// Date and Time Logic
function updateDateTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  
  let hours = now.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  document.getElementById('time').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById('date').textContent = `${day}/${month}/${year}`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navList = document.querySelector('.nav-list');

mobileMenu.addEventListener('click', () => {
  navList.classList.toggle('active');
  mobileMenu.classList.toggle('is-active');
});

// Carousel Logic
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function startSlideShow() {
  slideInterval = setInterval(nextSlide, 5000); // 5 seconds
}

function resetSlideShow() {
  clearInterval(slideInterval);
  startSlideShow();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetSlideShow();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetSlideShow();
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    goToSlide(index);
    resetSlideShow();
  });
});

startSlideShow();
