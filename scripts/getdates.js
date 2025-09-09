// getdates.js

// 1. Current Year in the footer
const currentYearElement = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
if (currentYearElement) {
    currentYearElement.textContent = currentYear;
}

// 2. Last Modified Date in the footer
const lastModifiedElement = document.getElementById("lastModified");
if (lastModifiedElement) {
    lastModifiedElement.textContent = `Last Modification: ${document.lastModified}`;
}
