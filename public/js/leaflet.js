/* eslint-disable */

const mapEl = document.getElementById('map');
// if (!mapEl) return;

const locations = JSON.parse(mapEl.dataset.locations);

const firstLocation = locations[0];

const map = L.map('map', {
  scrollWheelZoom: false,
  zoomControl: false,
});

const bounds = L.latLngBounds();

// Add OpenStreetMap tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; OpenStreetMap &copy; CARTO',
}).addTo(map);

// Add markers + build bounds
locations.forEach((loc) => {
  const [lng, lat] = loc.coordinates; // MongoDB style: [lng, lat]

  const marker = L.marker([lat, lng]).addTo(map);

  // Optional popup (similar to Mapbox Popup)
  if (loc.day && loc.description) {
    marker.bindPopup(`Day ${loc.day}: ${loc.description}`);
  }

  bounds.extend([lat, lng]);
});

// Fit map to all locations
map.fitBounds(bounds, {
  padding: [50, 50], // [y, x] padding
});
