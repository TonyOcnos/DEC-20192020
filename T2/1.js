function horoscopo(){
	
	var fecha = window.prompt("Introduce tu fecha de nacimiento (mm/dd/yyyy:)");
	
	/*Aquí llamamos a la función "validar" para poder validar el formato de la fecha, y la llamamos con la variable fecha cargada
	como parámetro*/
	validar(fecha)
	
	var x = new Date(fecha);
	var dia = x.getDate(fecha);
	
	/*Aquí no logré comprender muy bien porque al usar getmonth para fecha, me almacenaba el mes introducido - 1. Por eso le tuve que sumar +1
	Por favor, si puedes en comentarios indicarme el porqué te lo agradecería*/
	var mes = x.getMonth(fecha) + 1;

	/*Comprobación para el horóscopo a mostrar mediante condicionales if para los diferentes rangos de fecha*/
	/*LAGARTO*/
	if (((mes==12) && (dia<=13)) || ((mes==1) && (dia>=9))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-lagarto/";
		url(site)
	}
	/*MONO*/
	if (((mes==1) && (dia>=10)) || ((mes==2) && (dia<=13))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-mono/";
		url(site)	
	}
	/*HALCÓN*/
	if (((mes==2) && (dia>=7)) || ((mes==3) && (dia<=6))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-halcon/";
		url(site)	
	}
	/*JAGUAR*/
	if (((mes==3) && (dia>=7)) || ((mes==4) && (dia<=3))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-jaguar/";
		url(site)	
	}
	/*ZORRO*/
	if (((mes==4) && (dia>=4)) || ((mes==5) && (dia<=1))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-zorro/";
		url(site)	
	}
	/*SERPIENTE*/
	if (((mes==5) && (dia>=2)) || ((mes==5) && (dia<=29))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-serpiente/";
		url(site)	
	}
	/*ARDILLA*/
	if (((mes==5) && (dia>=30)) || ((mes==6) && (dia<=26))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-ardilla/";
		url(site)	
	}
	/*TORTUGA*/
	if (((mes==6) && (dia>=27)) || ((mes==7) && (dia<=25))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-tortuga/";
		url(site)	
	}
	/*MURCIÉLAGO*/
	if (((mes==7) && (dia>=26)) || ((mes==8) && (dia<=22))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-murcielago/";
		url(site)	
	}
	/*ESCORPIÓN*/
	if (((mes==8) && (dia>=23)) || ((mes==9) && (dia<=19))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-escorpion/";
		url(site)	
	}
	/*VENADO*/
	if (((mes==9) && (dia>=20)) || ((mes==10) && (dia<=17))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-venado/";
		url(site)	
	}
	/*LECHUZA*/
	if (((mes==10) && (dia>=18)) || ((mes==11) && (dia<=14))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-lechuza/";
		url(site)	
	}
	/*PAVO REAL*/
	if (((mes==11) && (dia>=15)) || ((mes==12) && (dia<=12))){
		var site = "http://www.horoscopomaya2018.com/horoscopo-maya-pavo-real/";
		url(site)	
	}
		
}

/*Función para acceder al elemento iframe con el nombre marco y cambiarle el valor de .src desde la variable site, cargada con las diferentes
url de los distintos horóscopos*/
function url(site){
	document.getElementsByName('marco')[0].src = site;
}

/*Aunque busqué información en internet para la comprobación del formato correcto de fecha de una manera más eficiente, eso me sirvió para 
entender las expresiones regulares a través de la página "developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions" 
y finalmente entender a lo que se refiere la expresion /^\d{1,2}\/\d{1,2}\/\d{2,4}$/ Supongo que investigar también forma parte de la programación!*/
function validar(fecha) {
      var patron = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
      if ((fecha.match(patron)) && (fecha!='')) {
            return true;
      } else {
            alert("FORMATO INCORRECTO!");
			horoscopo()
      }
}