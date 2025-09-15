/* ========= Dataset (>= 9 itens) ========= */
const temples = [
    { name: "Salt Lake Utah Temple", location: "Salt Lake City, Utah, USA", dedicated: 1893, area: 382207, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-city-utah/2018/320x200/slctemple7.jpg" },
    { name: "Nauvoo Illinois Temple", location: "Nauvoo, Illinois, USA", dedicated: 1846, area: 54000, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/nauvoo-illinois/320x200/nauvoo-temple-756499-wallpaper.jpg" },
    { name: "Rome Italy Temple", location: "Rome, Italy", dedicated: 2019, area: 41010, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/320x200/7-Rome-Temple-2160340.jpg" },
    { name: "San Diego California Temple", location: "San Diego, California, USA", dedicated: 1993, area: 72000, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/san-diego-california/320x200/san-diego-mormon-temple-1164678-wallpaper.jpg" },
    { name: "Gilbert Arizona Temple", location: "Gilbert, Arizona, USA", dedicated: 2014, area: 85326, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/gilbert-arizona/320x200/gilbert-arizona-temple-exterior-1207309-wallpaper.jpg" },
    { name: "Paris France Temple", location: "Le Chesnay, France", dedicated: 2017, area: 44175, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/paris-france/320x200/paris-france-temple-exterior-1905503.jpg" },
    { name: "Laie Hawaii Temple", location: "Laie, Hawaii, USA", dedicated: 1919, area: 42100, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/laie-hawaii/320x200/laie-temple-772761-wallpaper.jpg" },
    { name: "Rio de Janeiro Temple", location: "Rio de Janeiro, BRA", dedicated: 2022, area: 29966, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rio-de-janeiro-brazil/320x200/4-5aa85fb6f20a17f629302687710142328a707d4d.jpeg" },
    { name: "Provo City Center Temple", location: "Provo, Utah, USA", dedicated: 2016, area: 85084, imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/provo-city-center/2018/320x200/Provo-City-Center-Temple01.jpg" }
];

/* ========= Utilidades ========= */
const galleryEl = document.getElementById("gallery");
const titleEl = document.getElementById("view-title");

function makeCard(t) {
    const fig = document.createElement("figure");
    fig.className = "card";

    const img = document.createElement("img");
    img.loading = "lazy";
    img.width = 600;
    img.height = 400;
    img.src = t.imageUrl;
    img.alt = `${t.name} – ${t.location}`;

    const cap = document.createElement("figcaption");
    cap.innerHTML = `
    <strong>${t.name}</strong>
    <span class="meta">${t.location}</span>
    <span class="meta">Dedicated: ${t.dedicated} • Area: ${t.area.toLocaleString()} ft²</span>
  `;

    fig.append(img, cap);
    return fig;
}

function render(list, label = "Home") {
    galleryEl.innerHTML = "";
    titleEl.textContent = label;
    list.forEach(t => galleryEl.appendChild(makeCard(t)));
}

/* ========= Filtros do menu ========= */
const filters = {
    home: () => temples,
    old: () => temples.filter(t => t.dedicated < 1950),
    new: () => temples.filter(t => t.dedicated > 2020),
    large: () => temples.filter(t => t.area >= 100000),
    small: () => temples.filter(t => t.area < 50000)
};

document.getElementById("primary-nav").addEventListener("click", (e) => {
    const link = e.target.closest("a[data-filter]");
    if (!link) return;
    e.preventDefault();

    // estado visual do menu
    document.querySelectorAll("#primary-nav a").forEach(a => a.classList.remove("active"));
    link.classList.add("active");

    const key = link.dataset.filter;
    render(filters[key](), link.textContent.trim());

    // ao escolher, fecha o menu (somente em mobile)
    closeMenu();
});

/* ========= Hamburger (mostra apenas no mobile via CSS) ========= */
const menuBtn = document.getElementById("menu");
const nav = document.getElementById("primary-nav");

function toggleMenu() {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuBtn.textContent = isOpen ? "✕" : "☰";   // requisito: usar símbolo “X” para fechar
}
function closeMenu() {
    if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    }
}
menuBtn.addEventListener("click", toggleMenu);

/* ========= Footer: ano e last modified ========= */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastmod").textContent = document.lastModified;

/* ========= Render inicial ========= */
render(temples, "Home");
