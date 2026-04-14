document.addEventListener("DOMContentLoaded", function () {
    const savedLang = localStorage.getItem("selectedLanguage") || "de";

    // 🔹 LOAD FUNCTION
    function loadComponent(containerId, fileName, callback) {
        const container = document.getElementById(containerId);
        if (!container) return;

        fetch(fileName)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load ${fileName}`);
                return res.text();
            })
            .then(data => {
                container.innerHTML = data;
                if (callback) callback();
            })
            .catch(err => console.error(`${fileName} error:`, err));
    }

    // 🔹 LOAD NAVBAR
    loadComponent("navbar-container", "navbar.html", function () {

        const menuToggle = document.getElementById("mobile-menu");
        const navList = document.getElementById("nav-list");

        // Apply language AFTER navbar loads
        if (typeof setLanguage === "function") {
            setLanguage(savedLang);
        }

        // Mobile menu toggle
        if (menuToggle && navList) {
            menuToggle.addEventListener("click", function () {
                navList.classList.toggle("show");
                navList.classList.toggle("active");
                menuToggle.classList.toggle("is-active");
            });

            // Close menu on link click
            navList.querySelectorAll("a").forEach(link => {
                link.addEventListener("click", function () {
                    navList.classList.remove("show");
                    navList.classList.remove("active");
                    menuToggle.classList.remove("is-active");
                });
            });
        }
    });

    // 🔹 LOAD FOOTER
    loadComponent("footer-container", "footer.html", function () {
        // Apply language AFTER footer loads
        if (typeof setLanguage === "function") {
            setLanguage(savedLang);
        }
    });
});
