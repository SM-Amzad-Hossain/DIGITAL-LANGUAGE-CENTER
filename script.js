// Load Header Component
document.addEventListener("DOMContentLoaded", () => {
  const headerPlaceholder = document.getElementById("header-placeholder");
  if (headerPlaceholder) {
    fetch("header.html")
      .then(response => response.text())
      .then(html => {
        headerPlaceholder.outerHTML = html;
        initMobileMenu();
      })
      .catch(error => console.error("Error loading header:", error));
  } else {
    initMobileMenu();
  }

  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    fetch("footer.html")
      .then(response => response.text())
      .then(html => {
        footerPlaceholder.outerHTML = html;
        const currentYearSpan = document.getElementById('current-year');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }
      })
      .catch(error => console.error("Error loading footer:", error));
  }
});

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
  
  const timeEl = document.getElementById('time');
  const dateEl = document.getElementById('date');
  if (timeEl && dateEl) {
    timeEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    dateEl.textContent = `${day}/${month}/${year}`;
  }
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Mobile menu toggle
function initMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');
  
  if (mobileMenu && navList) {
    // Remove existing listener to prevent duplicates if called twice
    const newMobileMenu = mobileMenu.cloneNode(true);
    mobileMenu.parentNode.replaceChild(newMobileMenu, mobileMenu);
    
    newMobileMenu.addEventListener('click', () => {
      const activeNavList = document.querySelector('.nav-list');
      activeNavList.classList.toggle('active');
      newMobileMenu.classList.toggle('is-active');
    });
  }
}

// Carousel Logic
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (slides.length > 0 && prevBtn && nextBtn) {
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
}

// E-Book Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const bookCards = document.querySelectorAll('.book-card');

if (filterBtns.length > 0 && bookCards.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      bookCards.forEach(card => {
        if (filterValue === 'all') {
          card.classList.remove('hidden');
        } else {
          if (card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });
}

// Verification Portal Logic
const verifyCards = document.querySelectorAll('.verify-card');
const verifyForms = document.querySelectorAll('.verify-form');

if (verifyCards.length > 0 && verifyForms.length > 0) {
  // Check URL parameters for direct linking (e.g. ?tab=result)
  const urlParams = new URLSearchParams(window.location.search);
  const targetTab = urlParams.get('tab');
  
  if (targetTab) {
    const targetCard = document.querySelector(`.verify-card[data-target="${targetTab}-form"]`);
    if (targetCard) {
      verifyCards.forEach(c => c.classList.remove('active'));
      verifyForms.forEach(f => f.classList.remove('active'));
      targetCard.classList.add('active');
      document.getElementById(`${targetTab}-form`).classList.add('active');
    }
  }
  verifyCards.forEach(card => {
    card.addEventListener('click', () => {
      // Remove active class from all cards and forms
      verifyCards.forEach(c => c.classList.remove('active'));
      verifyForms.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked card
      card.classList.add('active');
      
      // Hide result when switching tabs
      const resultContainer = document.getElementById('verification-result');
      if (resultContainer) resultContainer.classList.add('hidden');
      
      // Show corresponding form
      const targetFormId = card.getAttribute('data-target');
      document.getElementById(targetFormId).classList.add('active');
    });
  });

  // Dynamic Form Submission Logic
  const resultContainer = document.getElementById('verification-result');

  document.getElementById('certificate-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const certId = document.getElementById('cert-id').value;
    resultContainer.innerHTML = `
      <div class="result-card">
        <i class="fa-solid fa-circle-check result-icon"></i>
        <h3>Certificate Verified</h3>
        <div class="result-details">
          <p>Certificate ID: <span>${certId}</span></p>
          <p>Status: <span style="color: #2e7d32;">Valid & Authentic</span></p>
        </div>
      </div>
    `;
    resultContainer.classList.remove('hidden');
  });

  document.getElementById('result-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const regNo = document.getElementById('reg-no').value;
    const rollNo = document.getElementById('roll-no').value;
    const session = document.getElementById('exam-session').value;
    const examDate = document.getElementById('exam-date').value;
    
    resultContainer.innerHTML = `
      <div class="result-card">
        <i class="fa-solid fa-circle-check result-icon"></i>
        <h3>Result Found</h3>
        <div class="result-details">
          <p>Registration No: <span>${regNo}</span></p>
          <p>Roll No: <span>${rollNo}</span></p>
          <p>Session: <span>${session}</span></p>
          <p>Exam Date: <span>${examDate}</span></p>
          <p>Status: <span style="color: #2e7d32;">Passed (Grade A+)</span></p>
        </div>
      </div>
    `;
    resultContainer.classList.remove('hidden');
  });

  document.getElementById('admission-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const studentName = document.getElementById('student-name').value;
    const studentPhone = document.getElementById('student-phone').value;
    const dob = document.getElementById('dob').value;

    resultContainer.innerHTML = `
      <div class="result-card">
        <i class="fa-solid fa-circle-check result-icon"></i>
        <h3>Admission Confirmed</h3>
        <div class="result-details">
          <p>Name: <span>${studentName}</span></p>
          <p>Phone Number: <span>${studentPhone}</span></p>
          <p>Date of Birth: <span>${dob}</span></p>
          <p>Status: <span style="color: #2e7d32;">Enrolled Active</span></p>
        </div>
      </div>
    `;
    resultContainer.classList.remove('hidden');
  });

}

// Admission Form Passport Logic
const passportCheckbox = document.getElementById('passport-yes');
const passportDetails = document.getElementById('passport-details');

if (passportCheckbox && passportDetails) {
  passportCheckbox.addEventListener('change', function() {
    if (this.checked) {
      passportDetails.classList.add('show');
      // Make fields required when shown
      document.getElementById('passport-no').required = true;
      document.getElementById('nationality').required = true;
      document.getElementById('passport-issue').required = true;
      document.getElementById('passport-expiry').required = true;
    } else {
      passportDetails.classList.remove('show');
      // Remove required when hidden
      document.getElementById('passport-no').required = false;
      document.getElementById('nationality').required = false;
      document.getElementById('passport-issue').required = false;
      document.getElementById('passport-expiry').required = false;
    }
  });
}
