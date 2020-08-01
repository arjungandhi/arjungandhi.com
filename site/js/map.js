document.addEventListener("DOMContentLoaded", main);


function main() {
    var map = L.map('map').setView([42.2,-72], 9);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJqdW5nYW5kaGkiLCJhIjoiY2tjNmd1bDZjMHJseTJ4bXIydjlqbzM4dCJ9.C_lIe26P-oz4jmvG1JNTjg'
}).addTo(map);


}