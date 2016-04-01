var enderecoMarker;

function buscarEndereco(){
	"use strict";

	var endereco = document.getElementById("endereco").value;

	document.getElementById('listaDentistas').style.display = 'none';

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
			distancia: google.maps.geometry.spherical.computeHeading(enderecoMarker.getPosition(), feature.getGeometry().get())

		});

	});

	return proximos.sort(function(a, b){

		return Math.abs(a.distancia) - Math.abs(b.distancia);

	}).slice(0, 9);

}




function mostrarDentistas(lista) {
	"use strict";

	if(!lista || lista.length <= 0){

		alert('Não foram encontrados dentistas proximos!');

		return;
	}

	console.log(lista);

	var domListaDentistas = document.getElementById('listaDentistas');

	domListaDentistas.innerHTML = '';

	domListaDentistas.style.display = 'block';

	lista.forEach(function(item){

		geocoder.geocode({'location': item.feature.getGeometry().get()}, function(results, status) {

				var li =  document.createElement('li');

				li.addEventListener("click", function(){

					alert('sucesso');

				});

				var html =  ' <fieldset><legend>Dentista</legend> ';

				html +=  '<a href="#">' + item.feature.R.name +'</a> <br><br>' +
					item.feature.R.cro + '<br>'+

					(status === google.maps.GeocoderStatus.OK ? 'Endereço: ' + results[0].formatted_address : '') +
					'</fieldset>';

				li.innerHTML = html;

				domListaDentistas.appendChild(li);


		});



	});

}