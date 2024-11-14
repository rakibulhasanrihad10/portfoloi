/* ============= typing animation ======================= */

// var typed = new Typed(".typing", {
//     strings:["Computer Science Undergraduate Student", "Muslim", "Programmer", "Learner"],
//     typeSpeed: 100,
//     backSpeed: 60,
//     loop: true
// })

const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length,
    allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;

let currentSectionIndex = 0;
let isNavigating = false; // Flag to prevent rapid navigation

// Initial setup for click navigation
for(let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        navigateToSection(i);
    });
}

// Function to remove back-section class
function removeBackSection() {
    allSection.forEach(section => section.classList.remove("back-section"));
}

// Function to add back-section class
function addBackSection(index) {
    allSection[index].classList.add("back-section");
}

// Function to navigate to a specific section by index
function navigateToSection(index) {
    if (index < 0 || index >= totalSection) return;

    removeBackSection();
    allSection.forEach(section => section.classList.remove("active"));

    currentSectionIndex = index;
    addBackSection(currentSectionIndex);
    allSection[currentSectionIndex].classList.add("active");
    updateNav(navList[currentSectionIndex].querySelector("a"));
}

// Update navigation to set active class on the current section
function updateNav(element) {
    navList.forEach((navItem) => {
        navItem.querySelector("a").classList.remove("active");
    });
    element.classList.add("active");
}

// Hire-me button functionality
document.querySelector(".hire-me").addEventListener("click", function() {
    const sectionIndex = parseInt(this.getAttribute("data-section-index"));
    navigateToSection(sectionIndex);
});

// Sidebar toggler for mobile view
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    allSection.forEach(section => section.classList.toggle("open"));
}

// Scroll event to handle smooth navigation between sections
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

// Smooth scrolling within the section itself
allSection.forEach(section => {
    section.style.scrollBehavior = "smooth";
});

// Last modified date display (Bangladesh local time in GMT+6)
let lastMod = new Date(document.lastModified);
let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZone: 'Asia/Dhaka'
};
let formattedDateTime = new Intl.DateTimeFormat('en-US', options).format(lastMod);
document.getElementById("last-modified").textContent += `${formattedDateTime} (BD Local Time, GMT+6)`;


// Function to navigate to a specific section by index
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



function openMailClient() {
    window.location.href = "mailto:rakibulhasanrihad@gmail.com";
}

