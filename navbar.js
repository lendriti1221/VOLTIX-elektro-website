document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container");
    if (!navbarContainer) return;

    fetch("navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load navbar");
            }
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;

            const menuToggle = document.getElementById("mobile-menu");
            const navList = document.getElementById("nav-list");

            if (menuToggle && navList) {
                menuToggle.addEventListener("click", function () {
                    navList.classList.toggle("active");
                    navList.classList.toggle("show");
                    menuToggle.classList.toggle("active");
                });

                const navLinks = navList.querySelectorAll("a");
                navLinks.forEach(link => {
                    link.addEventListener("click", function () {
                        navList.classList.remove("active");
                        navList.classList.remove("show");
                        menuToggle.classList.remove("active");
                    });
                });
            }
        })
        .catch(error => {
            console.error("Navbar load error:", error);
        });
});
