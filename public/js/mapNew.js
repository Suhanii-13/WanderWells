// mapNew.js - Interactive map for new listing form using Leaflet
document.addEventListener('DOMContentLoaded', () => {
  // Initialize map centered on India (default)
  const map = L.map('map').setView([20.5937, 78.9629], 4);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  let marker = null;

  // Update map when location input changes
  const locationInput = document.getElementById('locationInput');
  if (locationInput) {
    locationInput.addEventListener('change', async () => {
      const location = locationInput.value;
      if (!location) return;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`
        );
        const data = await response.json();
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          map.setView([lat, lon], 10);
          if (marker) marker.remove();
          marker = L.marker([lat, lon]).addTo(map)
            .bindPopup(location)
            .openPopup();
        }
      } catch (err) {
        console.log('Geocoding error:', err);
      }
    });
  }

  // Allow clicking on map to select location
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    if (marker) marker.remove();
    marker = L.marker([lat, lng]).addTo(map);
  });
});
