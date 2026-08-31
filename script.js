/* =========================================================
   JAISAL VIEW — PREMIUM JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= PRELOADER ================= */

    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("hide");
            }
        }, 800);
    });


    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });


        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* ================= NAVBAR EFFECT ================= */

    const navbar = document.querySelector(".navbar");

    function updateNavbar() {

        if (!navbar) return;

        if (window.scrollY > 70) {

            navbar.style.position = "fixed";
            navbar.style.background = "rgba(7, 6, 5, .94)";
            navbar.style.backdropFilter = "blur(16px)";
            navbar.style.borderBottom =
                "1px solid rgba(215, 173, 90, .18)";

        } else {

            navbar.style.position = "absolute";
            navbar.style.background = "transparent";
            navbar.style.backdropFilter = "none";
            navbar.style.borderBottom =
                "1px solid rgba(255,255,255,.1)";

        }

    }

    window.addEventListener("scroll", updateNavbar);

    updateNavbar();


    /* ================= HERO PARALLAX ================= */

    const heroBg = document.querySelector(".hero-bg");

    function heroParallax() {

        if (!heroBg) return;

        const scroll = window.scrollY;

        if (scroll <= window.innerHeight) {

            heroBg.style.transform =
                `scale(1.08) translateY(${scroll * 0.10}px)`;

        }

    }

    window.addEventListener("scroll", heroParallax);


    /* ================= SCROLL REVEAL ================= */

    const revealElements = document.querySelectorAll(
        ".experience-card, " +
        ".day-card, " +
        ".review-card, " +
        ".contact-item, " +
        ".gallery-item, " +
        ".heritage-content, " +
        ".camp-content, " +
        ".intro-text"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach((element, index) => {

            element.classList.add("reveal-hidden");

            element.style.transitionDelay =
                `${Math.min(index * 0.05, 0.3)}s`;

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("reveal-visible");
        });

    }


    /* ================= 3D EXPERIENCE CARDS ================= */

    const cards =
        document.querySelectorAll(".experience-card");


    cards.forEach(card => {

        card.addEventListener("mousemove", event => {

            // Disable on touch devices
            if (window.innerWidth <= 700) return;

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -5;

            const rotateY =
                ((x - centerX) / centerX) * 5;

            card.style.transform =
                `perspective(900px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-10px)`;

        });


        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";

        });

    });


    /* ================= INTRO IMAGE 3D ================= */

    const imageCard =
        document.querySelector(".image-card");


    if (imageCard) {

        imageCard.addEventListener("mousemove", event => {

            if (window.innerWidth <= 700) return;

            const rect =
                imageCard.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - .5) * 9;

            const rotateX =
                ((y / rect.height) - .5) * -9;

            imageCard.style.transform =
                `perspective(1000px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 scale(1.02)`;

        });


        imageCard.addEventListener("mouseleave", () => {

            imageCard.style.transform =
                "perspective(1000px) rotateY(-7deg) rotateX(3deg)";

        });

    }


    /* ================= FLOATING CARD ================= */

    const floatingCard =
        document.querySelector(".floating-card");


    if (floatingCard) {

        document.addEventListener("mousemove", event => {

            if (window.innerWidth <= 700) return;

            const x =
                (event.clientX / window.innerWidth - .5) * 10;

            const y =
                (event.clientY / window.innerHeight - .5) * 10;

            floatingCard.style.transform =
                `translate(${x}px, ${y}px) rotate(-8deg)`;

        });

    }


    /* ================= GALLERY LIGHTBOX ================= */

    const galleryItems =
        document.querySelectorAll(".gallery-item");


    const lightbox =
        document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close"
                aria-label="Close image">

            <i class="fa-solid fa-xmark"></i>

        </button>

        <img src=""
             alt="Jaisal View Gallery">

        <div class="lightbox-caption"></div>
    `;

    document.body.appendChild(lightbox);


    const lightboxImage =
        lightbox.querySelector("img");

    const lightboxCaption =
        lightbox.querySelector(".lightbox-caption");

    const lightboxClose =
        lightbox.querySelector(".lightbox-close");


    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            const image =
                item.querySelector("img");

            const title =
                item.querySelector("h3");

            if (!image) return;

            lightboxImage.src = image.src;

            lightboxImage.alt =
                image.alt || "Jaisal View";

            lightboxCaption.textContent =
                title ? title.textContent : "";

            lightbox.classList.add("active");

            document.body.style.overflow =
                "hidden";

        });

    });


    function closeLightbox() {

        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {
                closeLightbox();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeLightbox();
            }

        }
    );


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ================= BACK TO TOP ================= */

    const backTop =
        document.getElementById("backTop");


    function updateBackTop() {

        if (!backTop) return;

        if (window.scrollY > 650) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateBackTop
    );


    if (backTop) {

        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ================= IMAGE FALLBACK ================= */

    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {

            img.classList.add("image-error");

            console.warn(
                "Image not found:",
                img.getAttribute("src")
            );

        });

    });


    /* ================= PHONE / WHATSAPP ================= */

    document.querySelectorAll(
        'a[href*="wa.me"]'
    ).forEach(button => {

        button.addEventListener("click", () => {

            console.log(
                "Opening WhatsApp enquiry..."
            );

        });

    });


    /* ================= CURRENT YEAR ================= */

    const footerText =
        document.querySelector(".footer-bottom p");


    if (footerText) {

        footerText.innerHTML =
            footerText.innerHTML.replace(
                /©\s*\d{4}/,
                `© ${new Date().getFullYear()}`
            );

    }


    /* ================= PERFORMANCE ================= */

    // Prevent accidental horizontal overflow
    document.documentElement.style.overflowX =
        "hidden";


    console.log(
        "✨ JAISAL VIEW — Luxury Desert Experience loaded."
    );

});
