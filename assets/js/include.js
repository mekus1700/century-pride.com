document.addEventListener("DOMContentLoaded", function () {
    // Part 1: Include HTML files dynamically
    const includeElements = document.querySelectorAll('[data-include]');
    includeElements.forEach(async (el) => {
        const file = el.getAttribute('data-include');
        try {
            const response = await fetch(file);
            if (response.ok) {
                const content = await response.text();
                el.outerHTML = content;
            } else {
                console.error(`Error loading ${file}: ${response.status}`);
            }
        } catch (error) {
            console.error(`Error loading ${file}: ${error}`);
        }
    });

    // Part 2: Scroll Animation for Sections
    const sections = document.querySelectorAll(".section-animate");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class when the section is in the viewport
                entry.target.classList.add("visible");
            } else {
                // Remove the visible class to reset the animation
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the section is visible

    sections.forEach(section => observer.observe(section));
});
