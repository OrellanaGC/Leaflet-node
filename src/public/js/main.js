const mymap = L.map('map-template').setView([13.794185, -88.89653],10);
const socket = io();
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

L.tileLayer(tileURL, {
    attribution: 'Equipo 09 - IGF115 - 2020',
    maxZoom: 17,
    minZoom: 09,
}).addTo(mymap);



//capturar la ubicacion del usuario
mymap.locate({enableHighAccuracy: true});

//mandar la ubicacion al websocket
mymap.on('locationfound', e => {
    console.log(e);
    const coords = [e.latlng.lat, e.latlng.lng];
    const marker = L.marker(coords);
marker.bindPopup('Rastreada');
mymap.addLayer(marker);
socket.emit('userCoordinates',e.latlng);
});

socket.on('newUserCoordinates', (coords) => {
    console.log('New we');
    const marker = L.marker([coords.lat, coords.lng]);
    marker.bindPopup('Rastreado');
    mymap.addLayer(marker);
});

//estatico
const marker = L.marker([13.794185, -88.89653]);
marker.bindPopup('Rastreadoss');
mymap.addLayer(marker);

