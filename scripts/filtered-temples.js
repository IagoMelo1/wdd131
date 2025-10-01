/* ========= Dataset (9 templos) ========= */
const temples = [
    {
        templeName: "Salt Lake Utah",
        location: "Salt Lake City, Utah, USA",
        dedicated: 1893,
        area: 382207,
        imageUrl: "images/slctemple.jpg"
    },
    {
        templeName: "Nauvoo Illinois",
        location: "Nauvoo, Illinois, USA",
        dedicated: 1846,
        area: 54000,
        imageUrl: "images/nauvoo-temple.jpg"
    },
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: 2005,
        area: 11500,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: 1888,
        area: 74792,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: 2015,
        area: 96630,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: 2020,
        area: 6861,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: 1974,
        area: 156558,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: 1986,
        area: 9600,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: 1983,
        area: 116642,
        imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    }
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
    img.alt = `${t.templeName} – ${t.location}`;
    img.classList.add("fade"); // começa invisível

    const cap = document.createElement("figcaption");
    cap.innerHTML = `
    <strong>${t.templeName}</strong>
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

    // Ativa observer para as novas imagens
    observeImages();
}

/* ========= Filtros ========= */
const filters = {
    home: () => temples,
    old: () => temples.filter(t => t.dedicated < 1900),
    new: () => temples.filter(t => t.dedicated > 2000),
    large: () => temples.filter(t => t.area >= 90000),
    small: () => temples.filter(t => t.area < 10000)
};

document.getElementById("primary-nav").addEventListener("click", (e) => {
    const link = e.target.closest("a[data-filter]");
    if (!link) return;
    e.preventDefault();

    document.querySelectorAll("#primary-nav a").forEach(a => a.classList.remove("active"));
    link.classList.add("active");

    const key = link.dataset.filter;
    render(filters[key](), link.textContent.trim());

    closeMenu();
});

/* ========= Hamburger ========= */
const menuBtn = document.getElementById("menu");
const nav = document.getElementById("primary-nav");

function toggleMenu() {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    menuBtn.textContent = isOpen ? "✕" : "☰";
}
function closeMenu() {
    if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    }
}
menuBtn.addEventListener("click", toggleMenu);

/* ========= Footer ========= */
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastmod").textContent = document.lastModified;

/* ========= Observer para fade-in ========= */
function observeImages() {
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target); // não precisa observar mais
            }
        });
    }, options);

    document.querySelectorAll(".gallery img").forEach(img => {
        observer.observe(img);
    });
}

/* ========= Render inicial ========= */
render(temples, "Home");
