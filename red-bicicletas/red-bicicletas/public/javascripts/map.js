var map = L.map('main_map').setView([38.1308, -110.5863], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">Openstreetmap</a> contributors'
}).addTo(map);

var marker1 = L.marker([38.1338, -110.5863]).addTo(map);
var marker2 = L.marker([38.1328, -110.5763]).addTo(map);
var marker3 = L.marker([38.1318, -110.5463]).addTo(map);
var marker4 = L.marker([38.1308, -110.5563]).addTo(map);

$.ajax({
    dataType: 'json',
    url: 'API/bicicleta', 
    succes: function reult(result) {
        console.log(result);
        result.bicicletas.forEach((bici) => {
            L.marker(bici.Ubicacion, {title: bici.id}).addTo(map);
        });
    }
})