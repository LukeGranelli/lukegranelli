document.addEventListener("DOMContentLoaded", () => {
    const hamburgerButton = document.getElementById("hamburger");
    const navbar = document.getElementById("mobile-navbar");

    hamburgerButton.addEventListener("click", () => {
        hamburgerButton.classList.toggle("active");
        navbar.classList.toggle("open");

        //ensures body cannot scroll while menu is open
        document.body.classList.toggle("no-scroll");
    });
    // Close mobile menu when a link is clicked
    document.querySelectorAll("#mobile-navbar a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navbar.classList.remove("open");
            document.body.classList.remove("no-scroll");
        });
    });
    // Theme toggle functionality
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
        localStorage.setItem("theme", document.body.classList.contains("light-mode") ? "light" : "dark");
    });
    // Store theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-mode");
    }



    // Active link highlighting based on scroll position

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("#desktop-navbar a");

    // Update active link based on current hash (for clicks + refresh)
    function updateActiveLink() {
        const current = window.location.hash.slice(1) || "about-section";

        navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
        });
    }

    // Update active link as user scrolls (built in native browser API: IntersectionObserver)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            
            navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
            }
            });
            // Updates URL in respect to currently viewed section
            history.replaceState(null, null, `#${id}`);
        }
        });
    }, {
        // sets observer's viewport margins to track changges within
        rootMargin: "-30% 0px -45% 0px",
        threshold: 0,
    });

    // Observe all <section> elements with an ID
    sections.forEach(section => observer.observe(section));

    // Keep click behavior working
    window.addEventListener("hashchange", updateActiveLink);
    updateActiveLink();











});