window.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    const reveals = document.querySelectorAll(".reveal");

    // HEADER SCROLL
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

        revealOnScroll(); // važno
    });

    // REVEAL FUNCTION
    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        for (let i = 0; i < reveals.length; i++) {
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 120;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }

    // RUN ON LOAD (KLJUČNO)
    revealOnScroll();

});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        toTop.classList.add("show");
    } else {
        toTop.classList.remove("show");
    }
});

toTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

(function(){
    emailjs.init({
        publicKey: "RJ5gDlCfE0JXNguxp",

        blockHeadless: true,

        limitRate: {
            id: "aurum-form",
            throttle: 10000
        }
    });
})();


const form = document.getElementById("contact-form");
const sendButton = document.getElementById("send-button");


form.addEventListener("submit", function(event){

    event.preventDefault();

    if(this.website.value !== "") {
        return;
    }

    const captchaResponse = grecaptcha.getResponse();

    if(captchaResponse.length === 0){

        alert("Molimo potvrdite da niste robot.");

        return;
    }

    sendButton.disabled = true;
    sendButton.textContent = "Slanje...";

    emailjs.sendForm(
        "service_42tmdpd",
        "template_ut3kt1t",
        this
    )
    .then(() => {

        const modal = document.getElementById("success-modal");

        modal.classList.add("active");

        form.reset();

        sendButton.disabled = false;
        sendButton.textContent = "Pošalji poruku";

    }, 
    (error) => {

        console.log(error);

        alert("Došlo je do greške. Molimo pokušajte ponovo.");

        sendButton.disabled = false;
        sendButton.textContent = "Pošalji poruku";

    });

});

const closeModal = document.getElementById("close-modal");

closeModal.addEventListener("click", function(){

    const modal = document.getElementById("success-modal");

    modal.classList.remove("active");

});

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");


hamburger.addEventListener("click", () => {
     
    hamburger.classList.toggle("active");
    mobileMenu.classList.toggle("active");

});

document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

        hamburger.classList.remove("active");

    });

});

document.addEventListener("click", (e)=>{

    if(
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
    ){

        mobileMenu.classList.remove("active");
        hamburger.classList.remove("active");

    }

});