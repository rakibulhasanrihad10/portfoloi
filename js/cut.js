// =============scrolling =============

// Scroll event to handle navigation between sections
window.addEventListener("wheel", (event) => {
    if (isNavigating) return;

    const currentSection = allSection[currentSectionIndex];
    const sectionScrollPosition = currentSection.scrollTop + currentSection.clientHeight;
    const isAtBottom = sectionScrollPosition >= currentSection.scrollHeight;
    const isAtTop = currentSection.scrollTop <= 0;

    if (event.deltaY > 0) {
        // Scrolling down
        if (isAtBottom && currentSectionIndex < totalSection - 1) {
            // Go to the next section if at the bottom
            isNavigating = true;
            navigateToSection(currentSectionIndex + 1);
        }
    } else if (event.deltaY < 0) {
        // Scrolling up
        if (isAtTop && currentSectionIndex > 0) {
            // Go to the previous section if at the top
            isNavigating = true;
            navigateToSection(currentSectionIndex - 1);
        }
    }

    // Delay navigation to prevent rapid switching
    setTimeout(() => {
        isNavigating = false;
    }, 500);
});


let startY = 0;
let endY = 0;


// Touch event listeners
window.addEventListener("touchstart", (event) => {
    startY = event.touches[0].clientY;
});

window.addEventListener("touchmove", (event) => {
    endY = event.touches[0].clientY;
});

window.addEventListener("touchend", () => {
    if (isNavigating) return;

    const currentSection = allSection[currentSectionIndex];
    const sectionScrollPosition = currentSection.scrollTop + currentSection.clientHeight;
    const isAtBottom = sectionScrollPosition >= currentSection.scrollHeight;
    const isAtTop = currentSection.scrollTop <= 0;

    // Calculate swipe direction
    const swipeDistance = endY - startY;
    if (swipeDistance < -30 && isAtBottom && currentSectionIndex < totalSection - 1) {
        // Swipe up (next section)
        isNavigating = true;
        navigateToSection(currentSectionIndex + 1);
    } else if (swipeDistance > 30 && isAtTop && currentSectionIndex > 0) {
        // Swipe down (previous section)
        isNavigating = true;
        navigateToSection(currentSectionIndex - 1);
    }

    // Delay navigation to prevent rapid switching
    setTimeout(() => {
        isNavigating = false;
    }, 500);
});


// Smooth scrolling within the section itself
allSection.forEach(section => {
    section.style.scrollBehavior = "smooth";
});

// ============= scrolling =============

//============= show .html in url box =============

function navigateToSection(index) {
    if (index < 0 || index >= totalSection) return;

    removeBackSection();
    allSection.forEach(section => section.classList.remove("active"));

    currentSectionIndex = index;
    addBackSection(currentSectionIndex);
    allSection[currentSectionIndex].classList.add("active");
    updateNav(navList[currentSectionIndex].querySelector("a"));

    // Change URL to mimic a clean .html file path
    const sectionName = navList[currentSectionIndex].querySelector("a").getAttribute("href").replace("#", "");
    history.pushState(null, null, `${sectionName}.html`);
}

// Handle back button functionality to keep the section in sync with the URL
window.addEventListener("popstate", () => {
    // Check the current URL and find the section that matches
    const sectionName = window.location.pathname.split("/").pop().replace(".html", "");
    const targetSectionIndex = Array.from(navList).findIndex(item =>
        item.querySelector("a").getAttribute("href").includes(sectionName)
    );
    if (targetSectionIndex >= 0) {
        navigateToSection(targetSectionIndex);
    }
});

// ============= show .html in url =============
