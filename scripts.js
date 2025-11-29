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

// *********************************** FORM VALIDATION ***********************************
    document.getElementById("contact-form").addEventListener("submit", async function(event) {
        event.preventDefault();

        // Defining messages
        const errorName = "Please enter your name"
        const errorEmail = "Please enter a valid email address"
        const errorMsg = "Message must be at least 10 characters"
        const successStatusMsg = "Email has been sent"
        const failedStatusMsg = "Something went wrong, please try again"

        // Error response elements
        const nameErrResponse = document.getElementById('name-error')
        const emailErrResponse = document.getElementById('email-error')
        const msgErrResponse = document.getElementById('message-error')

        // Grab elements
        const nameInputEl = document.getElementById("name");
        const emailInputEl = document.getElementById("email");
        const messageInputEl = document.getElementById("message");
        const statusMessageEl = document.getElementById("form-status-message");
        const submitButtonEl = document.getElementById("submit-button");
        
        // Clear previous error messages
        document.querySelectorAll(".error-message").forEach(element => element.style.visibility = "hidden");
        document.querySelectorAll("input, textarea").forEach(element => element.setAttribute("aria-invalid", "false"));
        
        statusMessageEl.textContent = "";
        let hasError = false;
        submitButtonEl.disabled = false;

        // Grab strings (input values)
        const nameValue = nameInputEl.value.trim();
        const emailValue = emailInputEl.value.trim();
        const messageValue = messageInputEl.value.trim();

        // Validate inputs
        if (!nameValue) {
            hasError = true;
            nameErrResponse.textContent = errorName
            nameErrResponse.style.visibility = "visible"; 
            nameInputEl.setAttribute("aria-invalid", "true")
        }
        if (!emailValue || !emailInputEl.checkValidity()) {
            hasError = true;
            emailErrResponse.textContent = errorEmail
            emailErrResponse.style.visibility = "visible";
            emailInputEl.setAttribute("aria-invalid", "true")
        }
        if (messageValue.length < 10) {
            hasError = true;
            msgErrResponse.textContent = errorMsg
            msgErrResponse.style.visibility = "visible";
            messageInputEl.setAttribute("aria-invalid", "true")
        }
        if (hasError) {
            return
        }
        submitButtonEl.disabled = true;
        statusMessageEl.textContent = "Sending..."

        // try send email
        try {
        const response = await fetch("https://formspree.io/f/xovzygkv", {
            method: "POST",
            body: new FormData(document.getElementById("contact-form")),
            headers: {
            "Accept": "application/json"
            }
        });

            if (response.ok) {
                // SUCCESS
                statusMessageEl.textContent = "Message sent! Thank you";
                statusMessageEl.style.color = "var(--accent)";
                document.getElementById("contact-form").reset();
            } else {
                // including error type for debugging
                throw new Error(`Formspree returned ${response.status}`);
            }

        } catch (error) {
        statusMessageEl.textContent = "Failed to send - try again";
        statusMessageEl.style.color = "#ff5555";
        console.error("Form submission error:", error);

        } finally {
        submitButtonEl.disabled = false;
        }
    })
});