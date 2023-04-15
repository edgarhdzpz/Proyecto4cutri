function vermapa(){

    navigator.geolocation.getCurrentPosition(function(location) {
        $('#lat').html(location.coords.latitude);
        $('#long').html(location.coords.longitude);
      
          var map;
          var center = {lat: location.coords.latitude, lng: location.coords.longitude};
          function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
              center: center,
              zoom: 6
              });
      
              var marker = new google.maps.Marker({
              position: {lat: location.coords.latitude, lng: location.coords.longitude},
              map:map,
              title: "Estas aqui! actualmente"
      
              });
      
          }
          initMap();
      });
    }

function enviarCoordenadas (){
         var nombre = document.getElementById("infoN")
         var latitud = document.getElementById("lat")
         var longitud = document.getElementById("long")
        if(nombre.textContent && latitud.textContent && longitud.textContent){
      
          let xhr = new XMLHttpRequest();
        xhr.open("POST","http://localhost/nuevaApi/practica/agregar")
        xhr.setRequestHeader("Accept","application/json")
        xhr.setRequestHeader("Content-Type","application/json")
        xhr.onreadystatechange = function (){
          if(xhr.readyState===3){
            alert("datos enviados")// Eliminar funciones de envio y añadir alert
          }
        }
        let data ={
          "nombre":nombre.textContent,
          "latitud":latitud.textContent,
          "longitud":longitud.textContent
        }
      
        xhr.send(JSON.stringify(data) )// convertimos la data en json para poder enviarlo
      }
             
}