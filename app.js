const map = L.map("map").setView([45,70], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.marker([51,3.60]).addTo(map);
async function loadCities() {
    //data ophalen in "response"
    const response = await fetch('cities.json');
    //data omzetten in "data"
    const data = await response.json();
    console.log(data);
    showCities(data);
};

function showCities(cities){
    cities.forEach(city => {
        const marker = L.marker([city.lat, city.long]).addTo(map);
        marker.on('click', () => {
            showCity(city);
        });
    });
};

function showCity () {

}

loadCities();