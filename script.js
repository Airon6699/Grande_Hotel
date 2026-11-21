
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector("#preloader");
    const header = document.querySelector("#header");
    const menuBtn = document.querySelector("#menuBtn");
    const navbar = document.querySelector("#navbar");

    const hidePreloader = () => {
        if (preloader) {
            preloader.classList.add("hide");
        }
    };

    window.addEventListener("load", hidePreloader);
    setTimeout(hidePreloader, 2500);

    window.addEventListener("scroll", () => {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    });

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
            menuBtn.innerHTML = navbar.classList.contains("active")
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("active");
                menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }

    document.querySelectorAll(".navbar a").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelectorAll(".navbar a").forEach(item => {
                item.classList.remove("active");
            });

            link.classList.add("active");
        });
    });

    /* ROOM FILTERS */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const roomCards = document.querySelectorAll(".room-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(item => item.classList.remove("active"));
            button.classList.add("active");

            const filter = button.dataset.filter;

            roomCards.forEach(card => {
                const category = card.dataset.category;
                const show = filter === "all" || category === filter;

                card.style.display = show ? "block" : "none";
            });
        });
    });

    /* ROOM FAVORITES */

    document.querySelectorAll(".room-favorite").forEach(button => {
        button.addEventListener("click", () => {
            button.classList.toggle("active");

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.toggle("fa-regular");
                icon.classList.toggle("fa-solid");
            }
        });
    });

    /* ROOM MODAL */

    const modal = document.querySelector("#roomModal");
    const modalClose = document.querySelector("#modalClose");
    const modalImage = document.querySelector("#modalImage");
    const modalTitle = document.querySelector("#modalTitle");
    const modalDescription = document.querySelector("#modalDescription");
    const modalSpecs = document.querySelector("#modalSpecs");
    const modalPrice = document.querySelector("#modalPrice");

    const roomInformation = {
        "Classic Comfort Room": {
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
            description: "Experience comfort and elegance in our Classic Comfort Room. Designed with warm interiors, modern facilities and everything you need for a relaxing stay.",
            specs: ["32 m²", "2 Guests", "King Bed"],
            price: 180
        },
        "Deluxe Garden Room": {
            image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85",
            description: "Enjoy peaceful garden views in this elegant deluxe room. A comfortable atmosphere, refined details and premium amenities create a relaxing experience.",
            specs: ["42 m²", "2 Guests", "King Bed"],
            price: 260
        },
        "Executive Suite": {
            image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1000&q=85",
            description: "A spacious executive suite combining sophisticated design, a separate living area and premium comfort for an exceptional stay.",
            specs: ["65 m²", "3 Guests", "King Bed"],
            price: 390
        },
        "Panoramic View Room": {
            image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85",
            description: "Wake up to beautiful panoramic views from a stylish room featuring modern interiors and carefully selected luxury amenities.",
            specs: ["48 m²", "2 Guests", "King Bed"],
            price: 310
        },
        "Royal Residence Suite": {
            image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",
            description: "Discover exceptional space and privacy in our Royal Residence Suite, featuring refined furnishings and a beautifully designed living area.",
            specs: ["90 m²", "4 Guests", "2 Beds"],
            price: 520
        },
        "Presidential Residence": {
            image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",
            description: "Our finest accommodation offers generous living spaces, exclusive design and an elevated level of comfort for a memorable experience.",
            specs: ["180 m²", "6 Guests", "3 Beds"],
            price: 950
        }
    };

    document.querySelectorAll(".room-details-btn").forEach(button => {
        button.addEventListener("click", () => {
            const roomName = button.dataset.room;
            const room = roomInformation[roomName];

            if (!room || !modal) return;

            modalImage.src = room.image;
            modalTitle.textContent = roomName;
            modalDescription.textContent = room.description;
            modalPrice.textContent = `$${room.price} / night`;

            modalSpecs.innerHTML = room.specs.map(spec => {
                return `<span>${spec}</span>`;
            }).join("");

            modal.classList.add("active");
            document.body.classList.add("no-scroll");
        });
    });

    const closeModal = () => {
        if (!modal) return;

        modal.classList.remove("active");
        document.body.classList.remove("no-scroll");
    };

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeModal();
            closeLightbox();
        }
    });

    /* BOOKING FORM */

    const bookingForm = document.querySelector("#bookingForm");
    const checkIn = document.querySelector("#checkIn");
    const checkOut = document.querySelector("#checkOut");
    const guests = document.querySelector("#guests");
    const roomCount = document.querySelector("#roomCount");
    const bookingMessage = document.querySelector("#bookingMessage");

    const today = new Date();
    const todayString = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");

    if (checkIn && checkOut) {
        checkIn.min = todayString;
        checkOut.min = todayString;

        checkIn.addEventListener("change", () => {
            checkOut.min = checkIn.value;

            if (checkOut.value && checkOut.value <= checkIn.value) {
                checkOut.value = "";
            }
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!checkIn.value || !checkOut.value) {
                bookingMessage.textContent = "Please select your check-in and check-out dates.";
                return;
            }

            const start = new Date(checkIn.value + "T00:00:00");
            const end = new Date(checkOut.value + "T00:00:00");
            const nights = Math.round((end - start) / 86400000);

            if (nights <= 0) {
                bookingMessage.textContent = "Check-out must be after check-in.";
                return;
            }

            if (checkIn.value < todayString) {
                bookingMessage.textContent = "Please select a valid check-in date.";
                return;
            }

            const guestCount = guests.value;
            const rooms = roomCount.value;

            bookingMessage.textContent =
                `Your search: ${nights} night(s), ${guestCount} guest(s), ${rooms} room(s). This is a demo search, not a confirmed reservation.`;
        });
    }

    /* GALLERY LIGHTBOX */

    const galleryItems = [...document.querySelectorAll(".gallery-item")];
    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = document.querySelector("#lightboxImage");
    const lightboxClose = document.querySelector("#lightboxClose");
    const lightboxPrev = document.querySelector("#lightboxPrev");
    const lightboxNext = document.querySelector("#lightboxNext");

    let currentImage = 0;

    const showGalleryImage = index => {
        if (!galleryItems.length || !lightboxImage) return;

        currentImage = (index + galleryItems.length) % galleryItems.length;

        const image = galleryItems[currentImage].dataset.image;

        lightboxImage.src = image;
        lightbox.classList.add("active");
        document.body.classList.add("no-scroll");
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            showGalleryImage(index);
        });
    });

    if (lightboxPrev) {
        lightboxPrev.addEventListener("click", () => {
            showGalleryImage(currentImage - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener("click", () => {
            showGalleryImage(currentImage + 1);
        });
    }

    const closeLightbox = () => {
        if (!lightbox) return;

        lightbox.classList.remove("active");
        document.body.classList.remove("no-scroll");
    };

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (!lightbox || !lightbox.classList.contains("active")) return;

        if (event.key === "ArrowRight") {
            showGalleryImage(currentImage + 1);
        }

        if (event.key === "ArrowLeft") {
            showGalleryImage(currentImage - 1);
        }
    });

    /* FAQ */

    document.querySelectorAll(".faq-item").forEach(item => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        if (item.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        }

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach(other => {
                other.classList.remove("active");

                const otherAnswer = other.querySelector(".faq-answer");

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }
            });

            if (!isActive) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    /* NEWSLETTER */

    const newsletterForm = document.querySelector("#newsletterForm");
    const newsletterEmail = document.querySelector("#newsletterEmail");
    const newsletterMessage = document.querySelector("#newsletterMessage");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!newsletterEmail.value.trim() || !newsletterEmail.checkValidity()) {
                newsletterMessage.textContent = "Please enter a valid email address.";
                return;
            }

            newsletterMessage.textContent = "Thank you! Your demo subscription is complete.";
            newsletterForm.reset();
        });
    }

    /* CONTACT FORM */

    const contactForm = document.querySelector("#contactForm");
    const contactMessageStatus = document.querySelector("#contactMessageStatus");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            contactMessageStatus.textContent =
                "Thank you! Your demo message has been prepared successfully.";

            contactForm.reset();
        });
    }

    /* BACK TO TOP */

    document.querySelectorAll(".back-to-top").forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });

    /* LANGUAGE BUTTON */

    const languageBtn = document.querySelector("#languageBtn");

    if (languageBtn) {
        languageBtn.addEventListener("click", () => {
            alert("Language selection is not available in this demo.");
        });
    }
});
