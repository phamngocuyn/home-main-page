//Slider banner
function makeSlideshow(selector) {
    const slider = document.querySelector(selector);
    const slides = slider.querySelectorAll('.slide');
    const prevButton = slider.querySelector('.prev');
    const nextButton = slider.querySelector('.next');
    const dotsContainer = slider.querySelector('.slider-dots');
    let currentIndex = 0;
    let slideInterval;
 
    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        updateDots();
    }

    function updateDots() {
        dotsContainer.querySelectorAll('button').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function showSlide(index) {
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        slider.querySelector('.slider-content').style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });

    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });

    createDots();
    startAutoSlide();
}

makeSlideshow('.slider1');

//Slider footer
document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dot-footer');
    const slides = document.querySelectorAll('.slide-footer');
    let currentSlide = 0;
    const intervalTime = 5000; 

    function showSlide(index) {
        dots.forEach(d => d.classList.remove('active'));
        slides.forEach(s => s.style.display = 'none');
        dots[index].classList.add('active');
        slides[index].style.display = 'block';
    }
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    let slideInterval = setInterval(nextSlide, intervalTime);
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval); 
            currentSlide = index;
            showSlide(currentSlide);
            slideInterval = setInterval(nextSlide, intervalTime); 
        });
    });

    showSlide(slider);
});


// Scroll top
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { 
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });
});
