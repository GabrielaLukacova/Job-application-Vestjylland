document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu-toggle");
    const nav = document.querySelector("#navigation");

    function closeMenu() {
        nav.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-label", "Open navigation");
    }

    menu.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menu.setAttribute("aria-expanded", String(open));
        menu.setAttribute(
            "aria-label",
            open ? "Close navigation" : "Open navigation"
        );
    });

    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && nav.classList.contains("open")) {
            closeMenu();
            menu.focus();
        }
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".navigation")) {
            closeMenu();
        }
    });

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove("pending");
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        document.querySelectorAll(".reveal").forEach(element => {
            if (element.getBoundingClientRect().top > window.innerHeight) {
                element.classList.add("pending");
                observer.observe(element);
            }
        });
    }

    if ("IntersectionObserver" in window) {
        const links = nav.querySelectorAll("a");

        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                links.forEach(link => {
                    const active =
                        link.getAttribute("href") === "#" + entry.target.id;

                    link.classList.toggle("active", active);

                    if (active) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            });
        }, {
            rootMargin: "-15% 0px -55% 0px"
        });

        document.querySelectorAll(
            "#home, #motivation, #about, #contribution, #contact"
        ).forEach(section => sectionObserver.observe(section));
    }
});
