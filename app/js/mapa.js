function initMap() {
	"use strict";


	var mapa = new google.maps.Map(document.getElementById('mapa'), {
		zoom: 7,
		center: {lat: -19.9166813, lng: -43.9344931},
		zoomControl: true,
		scaleControl: true
	});

	var marker, buffer;
	google.maps.event.addListener(mapa, 'click', function (event) {

		if(marker){
			marker.setMap();
		}
		if(buffer){
			buffer.setMap();
		}

		var position = event.latLng;

		marker = new google.maps.Marker({
			position: position,
			map: mapa
		});

		buffer = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: mapa,
			center: position,
			radius: 10000
		});

		mapa.panTo(position);


	});


}