//dropdaown menu
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  menuToggle.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
  });
  function handleClickOutside(event) {
      if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
          mobileMenu.classList.remove('active');
      }
  }
  document.addEventListener('click', handleClickOutside);
});


// fixed srcoll
document.addEventListener('DOMContentLoaded', function() {
  const nav = document.querySelector('nav');
  const scrollThreshold = 50;
  function handleScroll() {
      if (window.scrollY > scrollThreshold) {
          nav.classList.add('nav-fixed');
      } else {
          nav.classList.remove('nav-fixed');
      }
  }
  window.addEventListener('scroll', handleScroll);
});

// dropdown product category
document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.querySelector('.dropdown-toggle');
  const sidebar = document.querySelector('.sidebar1');

  toggleButton.addEventListener('click', function () {
      sidebar.classList.toggle('show');
  });
});

//dropdown sorting
document.addEventListener('DOMContentLoaded', function() {
  var menuToggle = document.querySelector(".dropbtn");
  var mobileMenu = document.querySelector(".dropdown-content");

  menuToggle.addEventListener('click', function(event) {
      mobileMenu.classList.toggle("show");
      event.stopPropagation();
  });
  function handleClickOutside(event) {
      if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
          mobileMenu.classList.remove('show');
      }
  }

  // Add event listener for clicks on the document
  document.addEventListener('click', handleClickOutside);
});

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

// Home
document.querySelector('.sidebar').addEventListener('click', function(e) {
    const clickedCategory = e.target.closest('.category');

    if (clickedCategory) {
        e.stopPropagation();
        const subcategory = clickedCategory.nextElementSibling;
        const arrow = clickedCategory.querySelector('.arrow');

        if (subcategory && subcategory.classList.contains('subcategory')) {
            subcategory.style.display = subcategory.style.display === 'block' ? 'none' : 'block';
            arrow.classList.toggle('down-arrow');
            arrow.classList.toggle('right-arrow');
        } else {
            if (arrow) {
                arrow.classList.remove('down-arrow');
                arrow.classList.add('right-arrow');
            }
        }

        clickedCategory.classList.toggle('active');
        clickedCategory.parentElement.querySelectorAll('.category').forEach(sibling => {
            if (sibling !== clickedCategory) {
                sibling.classList.remove('active');
                const siblingArrow = sibling.querySelector('.arrow');
                if (siblingArrow) {
                    siblingArrow.classList.remove('down-arrow');
                    siblingArrow.classList.add('right-arrow');
                }
                const siblingSubcategory = sibling.nextElementSibling;
                if (siblingSubcategory && siblingSubcategory.classList.contains('subcategory')) {
                    siblingSubcategory.style.display = 'none';
                }
            }
        });

        clickedCategory.parentElement.querySelectorAll('.category').forEach(sibling => {
            if (sibling !== clickedCategory) {
                sibling.classList.remove('selected');
            }
        });
        clickedCategory.classList.toggle('selected');
    }
});

// filter-pricing
const rangeInput = document.querySelectorAll(".range-slider input");
const minValue = document.querySelector(".min-value");
const maxValue = document.querySelector(".max-value");

rangeInput.forEach(input => {
  input.addEventListener("input", e => {
    let minPrice = parseInt(rangeInput[0].value);
    let maxPrice = parseInt(rangeInput[1].value);

    if(maxPrice - minPrice < 0){
      if(e.target.className === "min") {
        rangeInput[0].value = maxPrice;
        minPrice = maxPrice;
      } else {
        rangeInput[1].value = minPrice;
        maxPrice = minPrice;
      }
    }

    minValue.textContent = minPrice;
    maxValue.textContent = maxPrice;
  });
});

//select sort
document.getElementById('sortOrder').addEventListener('change', function() {
  const sortOrder = this.checked ? 'ASC' : 'DESC';
  console.log(sortOrder);
});

// select option filter
document.querySelector('.sortingSelect').addEventListener('change', function() {
  const selectedValue = this.value;
  switch (selectedValue) {
    case 'DEFAULT':
      console.log('Default sorting selected');
      break;
    case 'SORTING1':
      console.log('Sorting 1 selected');
      break;
    case 'SORTING2':
      console.log('Sorting 2 selected');
      break;
    default:
      console.log('Unknown sorting option');
  }
});

//search product
document.getElementById('searchButton').addEventListener('click', function() {
  const searchInput = document.getElementById('searchInput').value;
  if (searchInput.trim() === '') {
    console.log('input rỗng');
    return;
  }
  console.log('Searching for:', searchInput);
});
document.getElementById('searchInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    document.getElementById('searchButton').click();
  }
});

//select số lượng item trong page
function updateResultsInfo() {
  const resultsInfo = document.querySelector('.results-info');
  const perPageSelect = document.querySelector('.perPageSelect');
  const perPage = parseInt(perPageSelect.value, 10);
  const totalResults = 30;
  const totalPages = Math.ceil(totalResults / perPage);
  const currentPage = 1;
  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalResults);
  resultsInfo.textContent = `Showing ${start}-${end} of ${totalResults} results`;
}
document.querySelector('.perPageSelect').addEventListener('change', updateResultsInfo);
updateResultsInfo();

// select fiter theo color
function handleColorSort() {
  const sortingSelect = document.querySelector('.select-by-color');
  const selectedColor = sortingSelect.value;
  switch (selectedColor) {
    case 'ANYCOLOR':
      console.log('Sorting by= color (default)');
      break;
    case 'COLOR1':
      console.log('Sorting by color 1');
      break;
    case 'COLOR2':
      console.log('Sorting by color 2');
      break;
    default:
      console.log('Unknown color option');
  }
}
document.querySelector('.sorting-by-color').addEventListener('change', handleColorSort);

// select filter theo size
function handleSizeFilter() {
  const sizeSelect = document.querySelector('.select-by-size');
  if (!sizeSelect) {
    console.error('Select element not found');
    return;
  }
  const selectedSize = sizeSelect.value;
  console.log('Selected size:', selectedSize);

  switch (selectedSize) {
    case 'ANYSIZE':
      console.log('Filtering by size (default)');
      break;
    case 'SIZE1':
      console.log('Filtering by size 1');
      break;
    case 'SIZE2':
      console.log('Filtering by size 2');
      break;
    default:
      console.log('Unknown size option');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const sizeSelect = document.querySelector('.select-by-size');
  if (sizeSelect) {
    sizeSelect.addEventListener('change', handleSizeFilter);
    handleSizeFilter();
  } else {
    console.error('error');
  }
});

//slider brands (fix)
function ourInitializeSlider() {
  let ourCurrentSlide = 0;
  const ourSlides = document.querySelectorAll('.brands-slider');
  const ourNavDots = document.querySelectorAll('.nav-dot');

  function ourShowSlide(index) {
      ourSlides.forEach((slide, i) => {
          slide.classList.toggle('active', i === index);
          ourNavDots[i].classList.toggle('active', i === index);
      });
  }

  function ourNextSlide() {
      ourCurrentSlide = (ourCurrentSlide + 1) % ourSlides.length;
      ourShowSlide(ourCurrentSlide);
  }

  function ourSetNavDotClickEvents() {
      ourNavDots.forEach((dot, index) => {
          dot.addEventListener('click', () => {
              ourCurrentSlide = index;
              ourShowSlide(ourCurrentSlide);
          });
      });
  }

  ourSetNavDotClickEvents();
  ourShowSlide(ourCurrentSlide);
  setInterval(ourNextSlide, 5000);
}
ourInitializeSlider();
