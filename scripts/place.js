// Footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastmod").textContent = document.lastModified;

// Weather (estático conforme instrução)
const temperatureC = 8;
const windSpeedKmh = 6;

document.getElementById("temp").textContent = temperatureC;
document.getElementById("wind").textContent = windSpeedKmh;

// Fórmula em uma linha (°C)
const calculateWindChill = (t, v) => 13.12 + 0.6215 * t - 11.37 * Math.pow(v, 0.16) + 0.3965 * t * Math.pow(v, 0.16);

// Só calcula se t<=10°C e v>4.8 km/h
let wc = "N/A";
if (temperatureC <= 10 && windSpeedKmh > 4.8) wc = `${Math.round(calculateWindChill(temperatureC, windSpeedKmh))} °C`;
document.getElementById("windchill").textContent = wc;
