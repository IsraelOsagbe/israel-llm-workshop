// Presentation Navigation

const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const slideCounter = document.getElementById('slideCounter');

let currentSlide = 0;
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    slideCounter.textContent = `${index + 1} / ${totalSlides}`;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === totalSlides - 1;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
    } else if (e.key === 'Home') {
        currentSlide = 0;
        showSlide(currentSlide);
    } else if (e.key === 'End') {
        currentSlide = totalSlides - 1;
        showSlide(currentSlide);
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) nextSlide();
        else prevSlide();
    }
});

// Initialize
showSlide(0);