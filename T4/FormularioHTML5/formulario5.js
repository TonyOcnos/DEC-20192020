/*
Alumno: Antonio Manuel Montes Martínez
Tema: T4 - Validación de formularios
Apartado: 2
*/

window.onload = inicializar;

function inicializar() {
	
	/*Antes que nada vamos a inicializar los eventos para los diferentes botones y inputs tipo texto.
	Dichos eventos los programaremos para fase de burbujeo, es decir, desde dentro a afuera de nuestra estructura.
	Dichos eventos dispararán las diferentes funciones. Dichas funciones se explicaran en las funciones en sí*/	
	document.getElementById("enviar").addEventListener('click', enviar, false);
	document.getElementById("reset").addEventListener('click', resetear, false);
 	document.getElementById("nombre").addEventListener('input', validarNomYDes, false);
	document.getElementById("descripcion").addEventListener('input', validarNomYDes, false);
	document.getElementById("participantes").addEventListener('input', validarPart, false);
	document.getElementById("armamento").addEventListener('input', validarArm, false);
	/*Situamos el foco en primer campo del formulario*/
	document.getElementById("nombre").focus();
	
	/*Aquí estableceremos 0 en el localStorage para los intentos y los fallos en caso de que sea NULL, es decir, desde el momento en que dichas variables
	todavía no están definidas y su valor a la hora de mostrarlo va a ser NULL. Con getItem cogeremos la variable definida con setItem en localStorage*/
	if (localStorage.getItem("Aciertos") == null) {
		localStorage.setItem("Aciertos", 0);
		}
	if (localStorage.getItem("Fallos") == null) {
		localStorage.setItem("Fallos", 0);
		}
	/*En la función que inicializa el formulario, ya mostramos el número de intentos (fallidos y acertados) en nuestro DIV resultado con mostrar()*/
	mostrar();
}

function enviar(elemento) {
	
	/*Mediante checkValidity comprobaremos el valor booleano que devuelve dicha función y la guardamos en la variable correspondiente
	para ser evaluada en el checking general*/
	var nombre = document.getElementById("nombre").checkValidity();
	var descripcion = document.getElementById("descripcion").checkValidity();
	var participantes = document.getElementById("participantes").checkValidity();
	var arma = document.getElementById("armamento").checkValidity();
	
	/*En este checking general, comprobaremos todos los checkValidity para todos los campos y cuando todas las condiciones se cumplan (mediante &&)
	se detendrá el envío del formulario con preventDefault, se añadirá un acierto mediante la función aciertos() y se actualizará el contador con mostrar()*/
	if (nombre && descripcion && participantes && arma){
	elemento.preventDefault();
	aciertos();
	mostrar();
	}
	/*En caso contrario, se actualiza el contador de fallos con con fallos() y se actualiza el contador con mostrar()*/
	else {
	fallos();
	mostrar();
	}
	
	/*Estas dos funciones se han añadido dentro de la función de verificar para proteger un poco más las variables de localStorage y evitar que puedan
	sobreescribirse accidentalmente*/
	function fallos() {
		intentosF = localStorage.getItem("Fallos");
		intentosF++;
		localStorage.setItem("Fallos", intentosF);
		mostrar();
	}
	
	function aciertos() {
		intentosE = localStorage.getItem("Aciertos");
		intentosE++;
		localStorage.setItem("Aciertos", intentosE);
		mostrar();
	}
}

function validarNomYDes(elemento) {
	/*Aquí evaluaremos el campo nombre y descripción:
	Primero nos aseguramos de que el campo no está vació.
	Después, mediante la propiedad patternMismatch, comprobamos si devuelve true o false, en función de si coincide con el patter de nuestro HTML
	Y finalmente comprobamos la longitud del string que no sea menor de 6 caracteres. El máximo viene delimitado por el atributo de elemento maxlength*/
	/*De no pasar la validación, se cambiará el mensaje de alerta por defecto por el establecido por setCustomValidity
	También se cambiará el fondo del contenido a amarillo*/
	if (this.value == "" || this.validity.patternMismatch || this.value.length < 6) {
 		this.setCustomValidity("Por favor, rellene el campo correctamente. Se admiten letras, números y espacios. Mínimo de 6 caracteres.");
 		this.style.background = "yellow";
	}
	/*De pasar la validación, el setCustomValidity será un string vacío y el fondo volverá a blanco*/
	else {
 		this.setCustomValidity("");
 		this.style.background = "white";
	}
}

function validarPart(elemento) {
	/*Aquí evaluaremos el campo de número de participantes:
	Primero nos aseguramos de que el campo no está vació.
	Después, comprobamos la longitud del string y comprobamos si es mayor que 2 y menor a 100*/
	/*De no pasar la validación, se cambiará el mensaje de alerta por defecto por el establecido por setCustomValidity
	También se cambiará el fondo del contenido a amarillo*/
	if (this.value == "" || this.value < 2 || this.value > 100) {
		this.setCustomValidity("Por favor, rellene el campo correctamente. Se admiten números del 2 al 100.");
 		this.style.background = "yellow";
	}
	
	else {
	/*De pasar la validación, el setCustomValidity será un string vacío y el fondo volverá a blanco*/
		this.setCustomValidity("");
 		this.style.background = "white";
	}
}

function validarArm(elemento) {
	/*Aquí evaluaremos el campo armamento:
	Únicamente nos aseguramos de que el campo no está vació.
	/*De no pasar la validación, se cambiará el mensaje de alerta por defecto por el establecido por setCustomValidity
	También se cambiará el fondo del contenido a amarillo*/
	if (this.value == "") {
		this.setCustomValidity("Por favor, rellene el campo correctamente. No se admite el campo vacío.");
 		this.style.background = "yellow";
	}
	
	else {
	/*De pasar la validación, el setCustomValidity será un string vacío y el fondo volverá a blanco*/
		this.setCustomValidity("");
 		this.style.background = "white";
	}
}

function mostrar() {
	/*Esta función nos mostrará en nuestro DIV resultado, el contenido de las variables del contador de aciertos y fallos*/
	document.getElementById("resultado").innerHTML = `Intentos fallidos: ${localStorage.getItem("Fallos")}<br>Intentos con éxito: ${localStorage.getItem("Aciertos")}`;
}

function resetear() {
	/*Con esta función nos aseguramos que una vez el reset el pulsado, además de limpiar todos los campos, resetea los contadores ejecutando
	la funcion localStorage.clear() en la consola de nuestro navegador. Además se vuelve a inicializar para poner las variables null a un
	valor de 0*/
	window.console.log(localStorage.clear());
	inicializar();
}