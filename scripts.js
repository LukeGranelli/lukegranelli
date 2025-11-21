document.addEventListener("DOMContentLoaded", () => {
    const hamburgerButton = document.getElementById("hamburger");
    const navbar    = document.getElementById("navbar");

    hamburgerButton.addEventListener("click", () => {
        hamburgerButton.classList.toggle("active");
        navbar.classList.toggle("open");

        //ensures body cannot scroll while menu is open
        document.body.classList.toggle("no-scroll");
    });

    document.querySelectorAll("#navbar a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navbar.classList.remove("open");
            document.body.classList.remove("no-scroll");
        });
    });

    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    });
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }

























});