const footerYear = document.getElementById("year");

if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const navLinks = document.querySelectorAll(".nav-menu a");

navLinks.forEach(function (link) {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

        link.setAttribute("aria-current", "page");

    } else {

        link.classList.remove("active");

        link.removeAttribute("aria-current");

    }

});

const enquiryForm = document.getElementById("enquiry-form");

if (enquiryForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const orderTypeInput = document.getElementById("order-type");
    const dateInput = document.getElementById("date");
    const messageInput = document.getElementById("message");

    if (dateInput) {

        const today = new Date();

        const localDate = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localDate;

    }

    const popupOverlay = document.createElement("div");

    popupOverlay.style.position = "fixed";
    popupOverlay.style.top = "0";
    popupOverlay.style.left = "0";
    popupOverlay.style.width = "100%";
    popupOverlay.style.height = "100%";
    popupOverlay.style.backgroundColor = "rgba(0, 0, 0, 0.75)";
    popupOverlay.style.display = "none";
    popupOverlay.style.justifyContent = "center";
    popupOverlay.style.alignItems = "center";
    popupOverlay.style.zIndex = "9999";
    popupOverlay.style.padding = "20px";
    popupOverlay.style.boxSizing = "border-box";

    const popupBox = document.createElement("div");

    popupBox.style.backgroundColor = "#E9E7D9";
    popupBox.style.color = "#442727";
    popupBox.style.padding = "35px";
    popupBox.style.borderRadius = "10px";
    popupBox.style.maxWidth = "450px";
    popupBox.style.width = "100%";
    popupBox.style.textAlign = "center";
    popupBox.style.border = "3px solid #927D14";
    popupBox.style.boxSizing = "border-box";

    const popupIcon = document.createElement("div");

    popupIcon.textContent = "✓";
    popupIcon.style.fontSize = "55px";
    popupIcon.style.color = "#927D14";
    popupIcon.style.fontWeight = "bold";
    popupIcon.style.marginBottom = "10px";

    const popupTitle = document.createElement("h2");

    popupTitle.textContent = "Thank You for Your Enquiry!";

    const popupMessage = document.createElement("p");

    popupMessage.textContent =
        "Thank you for contacting Amazingly Sweet Bakery. " +
        "We appreciate your interest and look forward to helping you.";

    popupMessage.style.lineHeight = "1.6";

    const popupOrder = document.createElement("p");

    popupOrder.style.backgroundColor = "#D2C6B2";
    popupOrder.style.padding = "12px";
    popupOrder.style.borderRadius = "10px";
    popupOrder.style.margin = "20px 0";

    const closePopupButton = document.createElement("button");

    closePopupButton.type = "button";
    closePopupButton.textContent = "Close";
    closePopupButton.style.backgroundColor = "#927D14";
    closePopupButton.style.color = "#FFFFFF";
    closePopupButton.style.border = "none";
    closePopupButton.style.padding = "12px 30px";
    closePopupButton.style.borderRadius = "10px";
    closePopupButton.style.cursor = "pointer";
    closePopupButton.style.fontSize = "16px";

    popupBox.appendChild(popupIcon);
    popupBox.appendChild(popupTitle);
    popupBox.appendChild(popupMessage);
    popupBox.appendChild(popupOrder);
    popupBox.appendChild(closePopupButton);

    popupOverlay.appendChild(popupBox);

    document.body.appendChild(popupOverlay);

    function closePopup() {

        popupOverlay.style.display = "none";

        document.body.classList.remove("lightbox-open");

        enquiryForm.reset();

        if (dateInput) {

            const today = new Date();

            const localDate = new Date(
                today.getTime() - today.getTimezoneOffset() * 60000
            ).toISOString().split("T")[0];

            dateInput.min = localDate;

        }

    }

    closePopupButton.addEventListener("click", closePopup);

    popupOverlay.addEventListener("click", function (event) {

        if (event.target === popupOverlay) {

            closePopup();

        }

    });

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            popupOverlay.style.display === "flex"
        ) {

            closePopup();

        }

    });

    enquiryForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const customerName = nameInput.value.trim();
        const customerEmail = emailInput.value.trim();
        const orderType = orderTypeInput.value;
        const requiredDate = dateInput.value;
        const customerMessage = messageInput.value.trim();

        if (
            customerName === "" ||
            customerEmail === "" ||
            orderType === "" ||
            customerMessage === ""
        ) {

            alert("Please complete all required fields.");

            return;

        }

        if (customerName.length < 2) {

            alert("Please enter a valid full name.");

            nameInput.focus();

            return;

        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(customerEmail)) {

            alert("Please enter a valid email address.");

            emailInput.focus();

            return;

        }

        if (customerMessage.length < 10) {

            alert("Please enter an enquiry with at least 10 characters.");

            messageInput.focus();

            return;

        }

        if (requiredDate) {

            const selectedDate = new Date(requiredDate + "T00:00:00");

            const today = new Date();

            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {

                alert("Please select today or a future date.");

                dateInput.focus();

                return;

            }

        }

        const formattedOrderType = orderType
            .split("-")
            .map(function (word) {

                return word.charAt(0).toUpperCase() + word.slice(1);

            })
            .join(" ");

        popupOrder.textContent = "Enquiry Type: " + formattedOrderType;

        popupOverlay.style.display = "flex";

        document.body.classList.add("lightbox-open");

    });

}

const menuImages = document.querySelectorAll(".menu-item img");

if (menuImages.length > 0) {

    let currentImageIndex = 0;

    const lightbox = document.createElement("div");

    lightbox.className = "lightbox";
    lightbox.innerHTML = `
        <button class="lightbox-close" type="button" aria-label="Close image">&times;</button>

        <button class="lightbox-prev" type="button" aria-label="Previous image">&#10094;</button>

        <figure class="lightbox-figure">
            <img class="lightbox-image" src="" alt="">
            <figcaption class="lightbox-caption"></figcaption>
        </figure>

        <button class="lightbox-next" type="button" aria-label="Next image">&#10095;</button>

        <p class="lightbox-help">Use the arrow keys to browse images. Press Escape to close.</p>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");

    const closeLightboxButton = lightbox.querySelector(".lightbox-close");
    const previousButton = lightbox.querySelector(".lightbox-prev");
    const nextButton = lightbox.querySelector(".lightbox-next");

    function showLightbox(index) {

        currentImageIndex = index;

        const selectedImage = menuImages[currentImageIndex];
        lightboxImage.src = selectedImage.src;
        lightboxImage.alt = selectedImage.alt;
        lightboxCaption.textContent =
            selectedImage.alt || "Amazingly Sweet Bakery product";
        lightbox.style.display = "flex";
        document.body.classList.add("lightbox-open");
    }

    function closeLightbox() {
        lightbox.style.display = "none";
        document.body.classList.remove("lightbox-open");
    }

    function showPreviousImage() {

        currentImageIndex--;

        if (currentImageIndex < 0) {
            currentImageIndex = menuImages.length - 1;
        }

        showLightbox(currentImageIndex);

    }

    function showNextImage() {

        currentImageIndex++;

        if (currentImageIndex >= menuImages.length) {
            currentImageIndex = 0;
        }

        showLightbox(currentImageIndex);

    }

    menuImages.forEach(function (image, index) {
        image.style.cursor = "pointer";
        image.addEventListener("click", function () {
            showLightbox(index);

        });

    });


    closeLightboxButton.addEventListener("click", closeLightbox);
    previousButton.addEventListener("click", showPreviousImage);
    nextButton.addEventListener("click", showNextImage);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function (event) {
        if (lightbox.style.display === "flex") {

            if (event.key === "ArrowLeft") {
                showPreviousImage();
            }

            if (event.key === "ArrowRight") {
                showNextImage();
            }

            if (event.key === "Escape") {
                closeLightbox();
            }

        }

    });

}

const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {
            backToTopButton.classList.add("is-visible");
        } else {
            backToTopButton.classList.remove("is-visible");
        }

    });

    backToTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

console.log("Welcome to Amazingly Sweet Bakery!");
console.log("Thank you for visiting our website.");