document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('listingForm').addEventListener('submit', function(event) {
        event.preventDefault();

        var location = document.getElementById('locationInput').value;
        fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + location)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    var lat = data[0].lat;
                    var lon = data[0].lon;

                    document.getElementById('latitude').value = lat;
                    document.getElementById('longitude').value = lon;

                    this.submit();
                } else {
                    alert('Location not found');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
