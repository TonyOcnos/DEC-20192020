window.onload = function () {
	
	/*Realiza la carga del contenido por defecto, LIGA ESPAÑOLA y JORNADA 1*/
	cargarResultados();
	
	function cargarResultados(){
		
		/*Aquí almacenamos en dos variables el "value" de los dos inputs, tanto el selector de liga como el selector de jornada*/
		var jornada = document.getElementById("nJornada").value;
		var liga = document.getElementById("ligas").value;
		
		/*Mediante empty() nos aseguramos que cada vez que se carga el contenido, el contenido anterior se borra*/
		$(".loadRes").empty();
		$(".loadScorers").empty();
		$(".loadReferee").empty();
		
		/*Primera petición AJAX para obtener los resultados de la liga que está guardada en la variable "liga" y "jornada"*/
		/*La función jQuery para AJAX admite como parámetros un objeto que contiene lo siguiente:*/
		$.ajax({
			/*Cabecera de la petición, donde pasaremos un objeto con la propiedad X-Auth-Token que nos identificará para poder obtener datos*/
			headers: { 'X-Auth-Token': '95d56e9d04824446800e474c35ec09e6' },
			/*Dirección a la que realiceremos la petición, con las dos variables de jornada y tipo de liga*/
			url: `http://api.football-data.org/v2/competitions/${liga}/matches/?matchday=${jornada}`,
			/*Aquí el tipo de dato que queremos recibir, en este caso en formato JSON, de esta manera no tendremos que usar eval()*/
			dataType: 'json',
			/*Al ser una petición para RECIBIR datos, será de tipo GET*/
			type: 'GET',
		}).done(function(response) {
			/*Con la propiedad "done" nos aseguramos que una vez obtenidos los datos de la petición, realice la función de modificación del DOM*/
			/*Aquí usamos jQuery para recorrer los diferentes partidos de la jornada dentro del objeto (response) recibido por la petición al server*/
			$.each(response.matches, function (index, value) {
				/*Mediante "append", incluimos al lastChild de nuestro target los elementos que queramos. Con esto crearemos la tabla de resultados
				y también añadiremos el arbitro del partido*/
				$('#tableRes').append(`<tr class="loadRes"><td id="ht${index}">${value.homeTeam.name}</td><td> ${value.score.fullTime.homeTeam}</td><td>${value.score.fullTime.awayTeam}</td><td id="at${index}"> ${value.awayTeam.name}</td></tr>`);
				$('#tableRes').append(`<tr class="loadReferee"><td colspan="4"><i>Referee: ${value.referees[0].name}</i></td></tr>`);
				/*Para señalar que equipo ha ganado, dentro del objeto buscamos la propiedad "winner" que nos dirá que equipo ha resultado victorioso,
				y según nuestra condición, cambiaremos el estilo de esa casilla de tabla a "bold" para resaltar al ganador del encuentro*/
				if (value.score.winner == "AWAY_TEAM") {
					$(`#at${index}`).css('font-weight', 'bold');
				}
				if (value.score.winner == "HOME_TEAM") {
					$(`#ht${index}`).css('font-weight', 'bold');
				}
			});
		/*A través de fail, en caso de que no podamos obtener los datos o bien realizar muchas peticiones, obtenemos un error (alert) en pantalla*/
		}).fail(function() {
			alert("Por favor, introduzca un número de jornada en curso o ya terminada. \n\nTampoco realices muchas peticiones seguidas, ya que por cuestiones de tráfico en el server, este podría denegarte el acceso de manera temporal");
			$('#nJornada').focus();
		});
		/*Se realiza el mismo tipo de petición AJAX para el máximo de jugadores, pasándole como parte de la propiedad del atributo "url" un límite de 5 jugadores*/
		$.ajax({
			headers: { 'X-Auth-Token': '95d56e9d04824446800e474c35ec09e6' },
			url: `http://api.football-data.org/v2/competitions/${liga}/scorers?limit=5`,
			dataType: 'json',
			type: 'GET',
		}).done(function(response) {

			$.each(response.scorers, function (index, value) {
				$('#tableScorers').append(`<tr class="loadScorers"><td>${index+1}. ${value.player.name}</td><td>${value.numberOfGoals}</td><td> ${value.team.name}</td></tr>`);
			});
		});
	}
	/*Asignación de evento al botón para cargar el contenido*/
	$("#cargarJornada").on("click", cargarResultados);
	
	/*Con ajaxStart y ajaxStop hacemos una llamada a las funciones para mostrar o no el logo de carga*/
	$(document).ajaxStart(function(){
		$('#loading').show();
	}).ajaxStop(function(){
		$('#loading').hide();
	});  
}