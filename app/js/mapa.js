function initMap() {
	"use strict";


	var mapa = new google.maps.Map(document.getElementById('mapa'), {
		zoom: 7,
		center: {lat: -19.9166813, lng: -43.9344931},
		zoomControl: true,
		scaleControl: true
	});

	var layers = {};
	new ControleLimpar(layers, mapa);




	google.maps.event.addListener(mapa, 'click', function (event) {



		var position = event.latLng;

		layers.marker = new google.maps.Marker({
			position: position,
			map: mapa
		});

		layers.buffer = new google.maps.Circle({
			strokeColor: '#FF0000',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#FF0000',
			fillOpacity: 0.35,
			map: mapa,
			center: position,
			radius: 2000
		});

		mapa.panTo(position);

		instrucoes.style.display = 'none';
	});

	var instrucoes = document.getElementById("instrucoes");

	window.addEventListener('mousemove', function(event){

		var x = event.clientX + 20,
		y = event.clientY- 25;
		if ( x && y ){
			instrucoes.style.left = x + "px";
			instrucoes.style.top = y + "px";
		}
	}, false);


}
