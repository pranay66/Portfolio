// Theme Toggle







document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("cursor");
    const cursorHighlight = document.querySelector(".cursor-highlight");

    // Handle mouse movement
    document.addEventListener("mousemove", (e) => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
        cursorHighlight.style.top = `${e.clientY}px`;
        cursorHighlight.style.left = `${e.clientX}px`;
    });

    // Button and Link Hover
    const interactiveElements = document.querySelectorAll("button, a");
    interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            cursor.style.transform = "scale(1.2)"; // Slightly enlarge the cursor
            cursor.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Darker color
        });

        element.addEventListener("mouseleave", () => {
            cursor.style.transform = "scale(1)"; // Reset size
            cursor.style.backgroundColor = "rgba(0, 0, 0, 0.6)"; // Reset color
        });
    });

    // Ensure cursor is always visible
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0"; // Hide cursor when leaving viewport
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1"; // Show cursor when entering viewport
    });
});





document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.getElementById("cursor");
    const cursorHighlight = document.querySelector(".cursor-highlight");

    // Track cursor visibility
    let isCursorVisible = false;

    // Function to show the cursor
    function showCursor() {
        if (!isCursorVisible) {
            cursor.style.opacity = "1"; // Fully visible
            cursorHighlight.style.opacity = "0.2";
            isCursorVisible = true;
        }
    }

    // Function to hide the cursor
    function hideCursor() {
        cursor.style.opacity = "0"; // Fully hidden
        cursorHighlight.style.opacity = "0"; // Fully hidden
        isCursorVisible = false;
    }

    // Debounce function to limit rapid event triggering
    function debounce(func, delay = 50) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    }

    // Handle cursor movement with throttling
    const updateCursorPosition = debounce((e) => {
        if (isCursorVisible) {
            cursor.style.top = `${e.clientY}px`;
            cursor.style.left = `${e.clientX}px`;
            cursorHighlight.style.top = `${e.clientY}px`;
            cursorHighlight.style.left = `${e.clientX}px`;
        }
    }, 10);

    // Event: Mouse movement
    document.addEventListener("mousemove", (e) => {
        showCursor();
        updateCursorPosition(e);
    });

    // Event: Mouse leaving the viewport
    document.addEventListener("mouseleave", () => {
        hideCursor();
    });

    // Event: Mouse entering the viewport
    document.addEventListener("mouseenter", () => {
        showCursor();
    });

    // Specific handling for nav bar elements
    const nav = document.querySelector("nav");

    nav.addEventListener("mouseenter", () => {
        showCursor(); // Ensure the cursor remains visible in the nav bar
    });

    nav.addEventListener("mouseleave", (e) => {
        // Hide the cursor only if fully leaving the nav bar
        if (!e.relatedTarget || !nav.contains(e.relatedTarget)) {
            hideCursor();
        }
    });

    // Add hover effects for interactive elements (e.g., buttons, links, images)
    const interactiveElements = document.querySelectorAll("nav, img, a, button");
    interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", showCursor);
        element.addEventListener(
            "mouseleave",
            debounce((e) => {
                // Hide only if leaving the element entirely
                if (!e.relatedTarget || !element.contains(e.relatedTarget)) {
                    hideCursor();
                }
            }, 50)
        );
    });
});
