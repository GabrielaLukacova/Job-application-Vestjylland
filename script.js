document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {
        const elements = document.querySelectorAll(
            ".section-heading, .prose, .about-statement, " +
            ".contribution-item, .values-grid > div, .center-heading"
        );

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove("pending");
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        elements.forEach(element => {
            element.classList.add("reveal");

            if (element.getBoundingClientRect().top > window.innerHeight) {
                element.classList.add("pending");
                revealObserver.observe(element);
            }
        });

        window.addEventListener("beforeprint", () => {
            elements.forEach(element => {
                element.classList.remove("pending");
            });
        });
    }

    const navigationLinks = document.querySelectorAll("nav a");

    if ("IntersectionObserver" in window) {
        const navObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    navigationLinks.forEach(link => {
                        const active =
                            link.getAttribute("href") ===
                            "#" + entry.target.id;

                        link.classList.toggle("active", active);

                        if (active) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            {
                rootMargin: "-20% 0px -55% 0px",
                threshold: 0
            }
        );

        document.querySelectorAll(
            "#home, #motivation, #about, #contribution, #contact"
        ).forEach(section => navObserver.observe(section));
    }
});
