let api_key = process.env.API_KEY
let lat = 0;
let lng = 0;

$("#ip").keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
        ip_address();
    }
});

function ip_address() {
    let url = document.getElementsByClassName('ip')[0].value;

    $(function() {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: { apiKey: api_key, domain: url },
            success: function(data) {
                document.getElementById('ipAddress').innerHTML = data.ip;
                let location =
                    `
                    ${data.location.city}. 
                    ${data.location.region} - 
                    ${data.location.country}
                    `
                document.getElementById('location').innerHTML = location;
                document.getElementById('timezone').innerHTML = data.location
                    .timezone;
                document.getElementById('ips').innerHTML = data.isp;

                lat = data.location.lat;
                lng = data.location.lng;
                map.setView(new L.LatLng(lat, lng), 13);
            }
        });
    });
}

const el = document.getElementById('ipButton');
el.addEventListener("click", ip_address, false);

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        maxHeight: 100,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoidGhpYmF1eCIsImEiOiJja2hncWp5NXowYWYxMnpwOW1tNzQ3MzloIn0.b7inczwcWER1ei62o1nc_w'
    }).addTo(map);