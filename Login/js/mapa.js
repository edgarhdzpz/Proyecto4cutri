var map = L.map('map').setView([18.600822,-98.469740], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

document.getElementById("lugares").addEventListener("change",function(e){
    let coordenada =e.target.value.split(",");
    map.flyTo(coordenada,16);
    document.getElementById("latitud").value = coordenada[0];
    document.getElementById("longitud").value = coordenada[1];

    var marker = L.marker([coordenada[0],coordenada[1]]).addTo(map);

    var circle = L.circle([coordenada[0],coordenada[1]], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.4,
        radius: 100
    }).addTo(map);

    marker.bindPopup("<b>Hola</b><br>").openPopup();
    circle.bindPopup("Área por verificar.");
});


function marcar(){
    let lat = document.getElementById("latitud").value;
    let long = document.getElementById("longitud").value;

    var polygon = L.polygon([
        [lat,long],
        [18.616572,-98.451852],
        [18.600822,-98.469740]
    ]).addTo(map);

    polygon.bindPopup("Zona de peligro!!!.");
}

function agregar(){
    let lat = document.getElementById("latitud").value;
    let long = document.getElementById("longitud").value;
    let nom = document.getElementById("nombre").value;

    let opt = document.createElement("option");
    opt.value= lat + "," + long;
    opt.innerHTML = nom;

    document.getElementById("lugares").appendChild(opt);
}

function miUbicacion(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(posicion){
            document.getElementById("latitud").value = posicion.coords.latitude;
            document.getElementById("longitud").value = posicion.coords.longitude;
            document.getElementById("nombre").value = posicion.coords.accuracy;
        })
    }
    else{
        alert("El navegador no soporta la función de Geolocalización...");
    }
}
