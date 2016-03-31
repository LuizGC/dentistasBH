function initMap() {
	"use strict";

	var mapa = new google.maps.Map(document.getElementById('mapa'), {
		zoom: 7,
		center: {lat: -19.9166813, lng: -43.9344931},
		zoomControl: true,
		scaleControl: true
	});


	console.log(dentistas);

}
