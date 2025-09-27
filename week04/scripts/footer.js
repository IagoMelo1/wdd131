document.addEventListener("DOMContentLoaded", () => {
    const footer = document.getElementById("lastModified");
    if (footer) {
        const date = new Date(document.lastModified);
        footer.textContent = `Last modified: ${date.toLocaleString()}`;
    }
});
