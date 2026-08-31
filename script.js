===========================
// SCREEN CHANGE
// ================================

const screens = document.querySelectorAll(".screen");

function showScreen(id) {

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    document
        .getElementById(id)
        .classList.add("active");
}


// ================================
// OPEN BUTTON
// ================================

document
    .getElementById("openBtn")
    .addEventListener("click", function () {

        showScreen("gallery");

        createBurst();

    });


// ================================
// NEXT BUTTON
// ================================

document
    .getElementById("nextBtn")
    .addEventListener("click", function () {

        showScreen("final");

        createBurst();

    });


// ================================
// HEART / SPARKLE EFFECT
// ================================

function createBurst() {

    for (let i = 0; i < 30; i++) {

        const heart =
            document.createElement("span");

        heart.innerHTML =
            Math.random() > 0.25
            ? "♥"
            : "✦";


        heart.style.position = "fixed";

        heart.style.left = "50%";

        heart.style.top = "50%";

        heart.style.zIndex = "100";

        heart.style.pointerEvents = "none";

        heart.style.color = "#ff70b9";

        heart.style.fontSize =
            (14 + Math.random() * 24) + "px";


        heart.style.transition =
            "transform 1.4s ease, opacity 1.4s ease";


        document.body.appendChild(heart);


        setTimeout(function () {

            const x =
                (Math.random() - 0.5) * 450;

            const y =
                (Math.random() - 0.5) * 650;

            const rotate =
                Math.random() * 360;


            heart.style.transform =
                `translate(${x}px, ${y}px)
                 rotate(${rotate}deg)`;


            heart.style.opacity = "0";

        }, 20);


        setTimeout(function () {

            heart.remove();

        }, 1500);

    }

}


// ================================
// BACKGROUND STARS
// ================================

const canvas =
    document.getElementById("stars");

const ctx =
    canvas.getContext("2d");


let stars = [];


function resizeCanvas() {

    const dpr =
        window.devicePixelRatio || 1;


    canvas.width =
        window.innerWidth * dpr;

    canvas.height =
        window.innerHeight * dpr;


    stars = [];


    for (let i = 0; i < 120; i++) {

        stars.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            radius:
                Math.random() * 1.8 + 0.4,

            alpha:
                Math.random(),

            speed:
                Math.random() * 0.01 + 0.002

        });

    }

}


// ================================
// DRAW STARS
// ================================

function animateStars() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    stars.forEach(function (star) {

        star.alpha += star.speed;


        if (
            star.alpha > 1 ||
            star.alpha < 0.08
        ) {

            star.speed *= -1;

        }


        ctx.globalAlpha =
            star.alpha;


        ctx.fillStyle = "white";


        ctx.beginPath();


        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );


        ctx.fill();

    });


    requestAnimationFrame(
        animateStars
    );

}


// ================================
// START
// ================================

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

animateStars();
