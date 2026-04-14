document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container");
    if (!navbarContainer) return;

    fetch("navbar.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to load navbar");
            }
            return response.text();
        })
        .then((data) => {
            navbarContainer.innerHTML = data;

            const menuToggle = document.getElementById("mobile-menu");
            const navList = document.getElementById("nav-list");
            const langSelect = navbarContainer.querySelector(".lang-switch");

            function getSavedLanguage() {
                return (
                    localStorage.getItem("selectedLanguage") ||
                    localStorage.getItem("language") ||
                    localStorage.getItem("lang") ||
                    "en"
                );
            }

            function applyNavbarLanguage(lang) {
                const translations = {
                    en: {
                        home: "Home",
                        about: "About",
                        services: "Services",
                        projects: "Projects",
                        contact: "Contact"
                    },
                    de: {
                        home: "Startseite",
                        about: "Über uns",
                        services: "Leistungen",
                        projects: "Projekte",
                        contact: "Kontakt"
                    }
                };

                const t = translations[lang] || translations.en;

                const homeLink = navbarContainer.querySelector('[data-translate="nav_home"]');
                const aboutLink = navbarContainer.querySelector('[data-translate="nav_about"]');
                const servicesLink = navbarContainer.querySelector('[data-translate="nav_services"]');
                const projectsLink = navbarContainer.querySelector('[data-translate="nav_projects"]');
                const contactLink = navbarContainer.querySelector('[data-translate="nav_contact"]');

                if (homeLink) homeLink.textContent = t.home;
                if (aboutLink) aboutLink.textContent = t.about;
                if (servicesLink) servicesLink.textContent = t.services;
                if (projectsLink) projectsLink.textContent = t.projects;
                if (contactLink) contactLink.textContent = t.contact;

                if (langSelect) {
                    langSelect.value = lang;
                }
            }

            const savedLang = getSavedLanguage();
            applyNavbarLanguage(savedLang);

            if (typeof setLanguage === "function") {
                setTimeout(() => {
                    setLanguage(savedLang);
                    applyNavbarLanguage(savedLang);
                }, 0);
            }

            if (langSelect) {
                langSelect.addEventListener("change", function () {
                    const lang = this.value;

                    localStorage.setItem("selectedLanguage", lang);
                    localStorage.setItem("language", lang);
                    localStorage.setItem("lang", lang);

                    applyNavbarLanguage(lang);

                    if (typeof setLanguage === "function") {
                        setLanguage(lang);
                    }
                });
            }

            if (menuToggle && navList) {
                menuToggle.addEventListener("click", function () {
                    navList.classList.toggle("active");
                    navList.classList.toggle("show");
                    menuToggle.classList.toggle("active");
                });

                const navLinks = navList.querySelectorAll("a");
                navLinks.forEach((link) => {
                    link.addEventListener("click", function () {
                        navList.classList.remove("active");
                        navList.classList.remove("show");
                        menuToggle.classList.remove("active");
                    });
                });
            }
        })
        .catch((error) => {
            console.error("Navbar load error:", error);
        });
});
