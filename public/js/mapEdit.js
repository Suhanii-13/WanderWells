document.addEventListener("DOMContentLoaded", function() {
    var lat = parseFloat(document.querySelector('input[name="listing[latitude]"]').value) || 0;
    var lon = parseFloat(document.querySelector('input[name="listing[longitude]"]').value) || 0;
    var locationTitle = document.querySelector('input[name="listing[location]"]').value || 'Current Location';

    var map = L.map('map').setView([lat, lon], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var marker = L.marker([lat, lon]).addTo(map)
        .bindPopup(locationTitle)
        .openPopup();

    document.querySelector('input[name="listing[location]"]').addEventListener('input', function() {
        var location = this.value;
        fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + location)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    var newLat = parseFloat(data[0].lat);
                    var newLon = parseFloat(data[0].lon);

                    document.querySelector('input[name="listing[latitude]"]').value = newLat;
                    document.querySelector('input[name="listing[longitude]"]').value = newLon;

                    map.setView([newLat, newLon], 13);
                    marker.setLatLng([newLat, newLon]);
                    marker.getPopup().setContent(location).openPopup();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
