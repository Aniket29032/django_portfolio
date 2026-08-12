console.log("Script Loaded Successfully");

// =========================
// Mobile Menu
// =========================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// =========================
// Custom Project Slider
// =========================

const track = document.getElementById("projectTrack");
const slides = document.querySelectorAll(".project-slide");
const prevBtn = document.getElementById("projectPrev");
const nextBtn = document.getElementById("projectNext");

const currentPage = document.getElementById("currentPage");
const totalPages = document.getElementById("totalPages");
const dotsContainer = document.getElementById("projectDots");

let currentIndex = 0;
let cardsPerPage = window.innerWidth < 768 ? 1 : 2;

function getTotalPages() {
    return Math.ceil(slides.length / cardsPerPage);
}

function updateSlider() {

    cardsPerPage = window.innerWidth < 768 ? 1 : 2;

    const pageWidth = 100;

    track.style.transform =
        `translateX(-${currentIndex * pageWidth}%)`;

    currentPage.textContent =
        String(currentIndex + 1).padStart(2, "0");

    totalPages.textContent =
        String(getTotalPages()).padStart(2, "0");

    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === getTotalPages() - 1;

    updateDots();

}

function createDots() {

    dotsContainer.innerHTML = "";

    for (let i = 0; i < getTotalPages(); i++) {

        const dot = document.createElement("button");

        dot.classList.add("project-dot");

        if (i === currentIndex)
            dot.classList.add("active");

        dot.addEventListener("click", () => {

            currentIndex = i;
            updateSlider();

        });

        dotsContainer.appendChild(dot);

    }

}

function updateDots() {

    const dots = document.querySelectorAll(".project-dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle("active", index === currentIndex);

    });

}

nextBtn.addEventListener("click", () => {

    if (currentIndex < getTotalPages() - 1) {

        currentIndex++;

        updateSlider();

    }

});

prevBtn.addEventListener("click", () => {

    if (currentIndex > 0) {

        currentIndex--;

        updateSlider();

    }

});

window.addEventListener("resize", () => {

    cardsPerPage = window.innerWidth < 768 ? 1 : 2;

    if (currentIndex >= getTotalPages()) {

        currentIndex = getTotalPages() - 1;

    }

    createDots();

    updateSlider();

});

createDots();

updateSlider();