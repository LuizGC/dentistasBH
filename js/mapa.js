function initMap() {
    "use strict";
    mapa = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 10,
        center: {
            lat: -19.9166813,
            lng: -43.9344931
        },
        zoomControl: !0,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        streetViewControl: !1,
        scaleControl: !0
    }), geocoder = new google.maps.Geocoder(), directionsService = new google.maps.DirectionsService(), 
    directionsDisplay = new google.maps.DirectionsRenderer({
        draggable: !1,
        map: mapa,
        suppressMarkers: !0,
        preserveViewport: !0
    }), document.getElementById("endereco").focus(), mapa.data.addGeoJson(dentistas);
}

var mapa, geocoder, directionsService, directionsDisplay;