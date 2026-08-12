// =====================================
// Project Gallery Lightbox
// =====================================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");

const galleryImages = Array.from(
    document.querySelectorAll("#gallery-images img")
);

let currentIndex = 0;


// =====================================
// Open Lightbox
// =====================================

function openLightbox(index) {

    currentIndex = index;

    updateImage();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


// =====================================
// Close Lightbox
// =====================================

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "auto";

}


// =====================================
// Change Image
// =====================================

function changeImage(direction) {

    currentIndex += direction;

    if (currentIndex < 0) {

        currentIndex = galleryImages.length - 1;

    }

    if (currentIndex >= galleryImages.length) {

        currentIndex = 0;

    }

    updateImage();

}


// =====================================
// Update Image
// =====================================

function updateImage() {

    lightboxImage.src = galleryImages[currentIndex].src;

    lightboxImage.alt = galleryImages[currentIndex].alt;

}


// =====================================
// Close when clicking outside image
// =====================================

lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

        closeLightbox();

    }

});


// =====================================
// Keyboard Controls
// =====================================

document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("active")) {

        return;

    }

    switch (event.key) {

        case "Escape":
            closeLightbox();
            break;

        case "ArrowLeft":
            changeImage(-1);
            break;

        case "ArrowRight":
            changeImage(1);
            break;

    }

});


// =====================================
// Touch Swipe Support (Mobile)
// =====================================

let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener("touchstart", function (event) {

    touchStartX = event.changedTouches[0].screenX;

});

lightbox.addEventListener("touchend", function (event) {

    touchEndX = event.changedTouches[0].screenX;

    if (touchEndX < touchStartX - 50) {

        changeImage(1);

    }

    if (touchEndX > touchStartX + 50) {

        changeImage(-1);

    }

});