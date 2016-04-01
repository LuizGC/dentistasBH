var mapa, geocoder;

function initMap() {
	"use strict";

	mapa = new google.maps.Map(document.getElementById('mapa'), {
		zoom: 10,
		center: {lat: -19.9166813, lng: -43.9344931},
		zoomControl: true,
		zoomControlOptions: {
			position: google.maps.ControlPosition.LEFT_TOP
		},
		streetViewControl: false,
		scaleControl: true
	});

	geocoder = new google.maps.Geocoder();

	mapa.data.addGeoJson(dentistas);

}
