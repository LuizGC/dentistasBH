function buscarEndereco() {
    "use strict";
    var endereco = document.getElementById("endereco").value;
    return document.getElementById("listaDentistas").style.display = "none", directionsDisplay.setDirections({
        routes: []
    }), infowindow ? infowindow.open(null) : infowindow = new google.maps.InfoWindow(), 
    endereco && "" !== endereco ? (enderecoMarker || (enderecoMarker = new google.maps.Marker({
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    })), enderecoMarker.setMap(null), void geocoder.geocode({
        address: melhorarEndereco(endereco),
        region: "BR"
    }, manipularEndereco)) : void alert("O campo endereço é obrigatório");
}

function melhorarEndereco(endereco) {
    "use strict";
    return -1 === endereco.search(/BH/i) && -1 === endereco.search(/Belo Horizonte/i) && (endereco += ", Belo Horizonte, Minas Gerais"), 
    endereco += " ,Brasil";
}

function manipularEndereco(results, status) {
    if (status == google.maps.GeocoderStatus.OK && results[0]) {
        var latitude = results[0].geometry.location.lat(), longitude = results[0].geometry.location.lng(), location = new google.maps.LatLng(latitude, longitude);
        enderecoMarker.setMap(mapa), enderecoMarker.setPosition(location), mapa.setCenter(location), 
        mapa.setZoom(16), mostrarDentistas(listarDentistasProximos());
    }
}

function listarDentistasProximos() {
    "use strict";
    var proximos = [];
    return mapa.data.forEach(function(feature) {
        proximos.push({
            feature: feature,
            distancia: google.maps.geometry.spherical.computeDistanceBetween(enderecoMarker.getPosition(), feature.getGeometry().get())
        });
    }), proximos.sort(function(a, b) {
        return a.distancia - b.distancia;
    });
}

function mostrarDentistas(lista) {
    "use strict";
    if (!lista || lista.length <= 0) return void alert("Não foram encontrados dentistas proximos!");
    var domListaDentistas = document.getElementById("listaDentistas");
     var selecione = document.createElement("li");
     selecione.innerHTML = 'Selecione um dentista: ';
       domListaDentistas.appendChild(selecione);
    domListaDentistas.innerHTML = "", domListaDentistas.style.display = "block", lista.forEach(function(item) {
        var li = document.createElement("li");
        li.addEventListener("click", function() {
            infowindow && infowindow.open(null);
            var request = {
                origin: enderecoMarker.getPosition(),
                destination: item.feature.getGeometry().get(),
                travelMode: google.maps.TravelMode.WALKING
            };
            directionsService.route(request, function(response, status) {
                status === google.maps.DirectionsStatus.OK && directionsDisplay.setDirections(response);
            }), geocoder.geocode({
                location: item.feature.getGeometry().get()
            }, function(results, status) {
                status === google.maps.GeocoderStatus.OK && (infowindow.setContent("<h3>" + item.feature.R.name + "</h3>" + results[0].formatted_address), 
                infowindow.setPosition(item.feature.getGeometry().get()), infowindow.setOptions({
                    pixelOffset: new google.maps.Size(0, -30)
                }), infowindow.open(mapa));
            });
        });
        var html = " <fieldset><legend>Dentista</legend> ";
        html += '<a href="#">' + item.feature.R.name + "</a> <br><br>" + item.feature.R.cro + "</fieldset>", 
        li.innerHTML = html, domListaDentistas.appendChild(li);
        
       
    });
}

var enderecoMarker, infowindow;
