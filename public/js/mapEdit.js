// mapEdit.js - Map for edit listing page using Leaflet
document.addEventListener('DOMContentLoaded', () => {
  // Get coordinates from hidden inputs, default to India if not set
  const latInput = document.querySelector('input[name="listing[latitude]"]');
  const lngInput = document.querySelector('input[name="listing[longitude]"]');

  let lat = latInput && latInput.value ? parseFloat(latInput.value) : 20.5937;
  let lng = lngInput && lngInput.value ? parseFloat(lngInput.value) : 78.9629;
  
  // Fallback if coordinates are 0,0
  if (lat === 0 && lng === 0) {
    lat = 20.5937;
    lng = 78.9629;
  }

  const map = L.map('map').setView([lat, lng], lat === 20.5937 ? 4 : 10);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  let marker = L.marker([lat, lng]).addTo(map);

  // Update marker when location input changes
  const locationInput = document.querySelector('input[name="listing[location]"]');
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
          const newLat = parseFloat(data[0].lat);
          const newLon = parseFloat(data[0].lon);
          map.setView([newLat, newLon], 10);
          marker.setLatLng([newLat, newLon]);
          if (latInput) latInput.value = newLat;
          if (lngInput) lngInput.value = newLon;
        }
      } catch (err) {
        console.log('Geocoding error:', err);
      }
    });
  }

  // Click to update coordinates
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    marker.setLatLng([lat, lng]);
    if (latInput) latInput.value = lat;
    if (lngInput) lngInput.value = lng;
  });
});
