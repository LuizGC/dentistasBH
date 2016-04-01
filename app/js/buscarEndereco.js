var enderecoMarker;

function buscarEndereco(){
	"use strict";

	var endereco = document.getElementById("endereco").value;

	document.getElementById('listaDentistas').style.display = 'none';

	directionsDisplay.setDirections({routes: []});

	if(!endereco || endereco === ''){

		alert('O campo endereço é obrigatório');

		return;

	}


	if(!enderecoMarker){

		enderecoMarker = new google.maps.Marker({
			icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
		});

	}

	enderecoMarker.setMap(null);


	geocoder.geocode({ 'address': melhorarEndereco(endereco), 'region': 'BR' }, manipularEndereco);

	document.getElementById("endereco").value = '';

}

function melhorarEndereco(endereco){
	"use strict";

	if(endereco.search(/BH/i) === -1 && endereco.search(/Belo Horizonte/i) === -1){
		endereco += ', Belo Horizonte, Minas Gerais';
	}

	endereco += ' ,Brasil';

	return endereco;
}

function manipularEndereco(results, status) {
	if (status == google.maps.GeocoderStatus.OK) {
		if (results[0]) {
			var latitude = results[0].geometry.location.lat();
			var longitude = results[0].geometry.location.lng();

			var location = new google.maps.LatLng(latitude, longitude);

			enderecoMarker.setMap(mapa);

			enderecoMarker.setPosition(location);

			mapa.setCenter(location);

			mapa.setZoom(16);

			mostrarDentistas(listarDentistasProximos());
		}
	}
}


function listarDentistasProximos(){
	"use strict";

	var proximos = [];

	mapa.data.forEach(function(feature){

		proximos.push({
			feature: feature,
			distancia: google.maps.geometry.spherical.computeDistanceBetween(enderecoMarker.getPosition(), feature.getGeometry().get())

		});

	});

	return proximos.sort(function(a, b){

		return a.distancia - b.distancia;

	});

}




function mostrarDentistas(lista) {
	"use strict";

	if(!lista || lista.length <= 0){

		alert('Não foram encontrados dentistas proximos!');

		return;
	}

	var domListaDentistas = document.getElementById('listaDentistas');

	domListaDentistas.innerHTML = '';

	domListaDentistas.style.display = 'block';

	lista.forEach(function(item){

				var li =  document.createElement('li');

				li.addEventListener("click", function(){

					var request = {
						origin: enderecoMarker.getPosition(),
						destination: item.feature.getGeometry().get(),
						travelMode: google.maps.TravelMode.WALKING
					};


					directionsService.route(request, function(response, status) {

						if (status === google.maps.DirectionsStatus.OK) {

							directionsDisplay.setDirections(response);

						}
					});

				});

				var html =  ' <fieldset><legend>Dentista</legend> ';

				html +=  '<a href="#">' + item.feature.R.name +'</a> <br><br>' +
					item.feature.R.cro +

					'</fieldset>';

				li.innerHTML = html;

				domListaDentistas.appendChild(li);

		//geocoder.geocode({'location': item.feature.getGeometry().get()}, function(results, status) {
		//
		//	(status === google.maps.GeocoderStatus.OK ? 'Endereço: ' + results[0].formatted_address : '') +
		//});



	});

}