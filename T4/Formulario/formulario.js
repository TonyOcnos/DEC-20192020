/*
Alumno: Antonio Manuel Montes Martínez
Tema: T4 - Validación de formularios
Apartado: 1
*/

window.onload = inicializar;

function inicializar() {
	
	/*Antes que nada vamos a inicializar los eventos para los diferentes botones y inputs tipo texto.
	Dichos eventos los programaremos para fase de burbujeo, es decir, desde dentro a afuera de nuestra estructura.
	Dichos eventos dispararán las diferentes funciones. Dichas funciones se explicaran en las funciones en sí*/	
	document.getElementById("enviar").addEventListener('click', validar, false);
	document.getElementById("borrar").addEventListener('click', borrar, false);
	document.getElementById("reset").addEventListener('click', resetear, false);
	document.getElementById("nombre").addEventListener('focus', cambiar, false);
	document.getElementById("apellidos").addEventListener('focus', cambiar, false);
	document.getElementById("contraseña").addEventListener('focus', cambiar, false);
	document.getElementById("contraseña-ver").addEventListener('focus', cambiar, false);
	/*Situamos el foco en primer campo del formulario*/
	document.getElementById("nombre").focus();
}

function validar(elemento) {
	
	/*Aquí validaderemos que todos los campos han sido rellenados de acuerdo a las especificaciones del ejercicio*/
	if (valtodo(this) && confirm("¿Seguro que quiere enviar el formulario?")) {
		elemento.preventDefault(); 
		/*Usamos el preventDefault para evitar que el botón submit ejecute la acción asignada por defecto, ir a una URL*/
		document.getElementById("resultado").innerHTML = `<b>Nombre</b>: ${document.getElementById("nombre").value}<br><b>Apellidos</b>: ${document.getElementById("apellidos").value}<br><b>Contraseña</b>: ${document.getElementById("contraseña").value}<br><b>Nacionalidad</b>: ${document.getElementById("nacionalidad").value}`;
		/*Con esta string mostraremos en pantalla los datos introducidos en nuestro formulario en el DIV con ID resultado*/
		
	}
	
	else {
		elemento.preventDefault();
		/*Usamos el preventDefault para evitar que el botón submit ejecute la acción asignada por defecto, ir a una URL*/
		document.getElementById("resultado").innerHTML = `${e1}${e2}${e3}${e4}`;
		/*Mostramos en pantalla los errores cometidos durante la inserción de datos. Dicha string se ha creado a partir de las variables globales
		asignadas en el caso de cometer un error. Lo veremos más adelante en el código*/
		return false;
	}
}

function valtodo(elemento) { 
	/*Hemos incluído todas las validaciones en una misma función. Dicha función tiene como argumento el elemento que la llamó.
	Usaremos dicho argumento para acceder al formulario al que pertenece el elemento que llamó la función, en este caso, el botón*/
	var formulario = elemento.form;
	var con1 = document.getElementById("contraseña");
	var con2 = document.getElementById("contraseña-ver");
	/*La varible cont se ha creado para cuantificar el número de errores cometidos. De ser 0 retornará TRUE a la validación y dará el formulario
	por bueno. En caso contrario, ira aumentando el contador (hubiese valido una asignacion cont=1 también) y en la condición final habría retornado
	FALSE a la validación del formulario*/
	var cont=0;
	/*Las siguientes variables globales se han creado para poder mostrar por pantalla los errores cometidos y hacer más fácil el manejo de la string
	mostrada en el DIV cond ID resultado*/
	e1 = "";
	e2 = "";
	e3 = "";
	e4 = "";

	/*Procederemos a la creación de los diferentes patrones RegExp que validarán los campos de nuestro formulario/*/
	/*Empezando por pat - Aquí estamos buscando un match para aquellos caracteres que no sean alfabéticos y que ocurran de 0 a más veces para que
	pueda detectar también el caso de camp vacío*/
	var pat = /^[^a-zA-Z]*$/;
	/*Para pat2 - Aquí estamos buscando un match para un mínimo de 3 a un máximo de 40 caracteres alfabéticos incluyendo caracteres especiales
	del alfabeto español*/
	var pat2 = /^([aA-zZáÁéÉíÍúÚóÓñÑçÇ\s]{3,40})$/;
	/*Para pat3 - Lo mismo que el pat2 pero para un mínimo de 4 a un máximo de 60 caracteres*/
	var pat3 = /^[aA-zZáÁéÉíÍúÚóÓñÑçÇ\s]{4,60}$/;
	/*Para pat4 - Aquí hemos creado un patrón de múltiples patrones. Para el caso de querer un condicional OR hubiesemos usado el símbolo "|", pero
	como lo que queremos es que todas las condiciones se cumplan, es decir, un condicional AND, basta con poner los diferentes patrones
	entre paréntesis y seguidos entre sí. 
	El primer grupo evaluará caracteres alfabeticos con un mínimo de 1 coincidencia. Más tarde se hará el contéo de caracteres consecutivos y no consecutivos.
	El segundo grupo busca al menos una minúscula.
	El tercer grupo evalua desde 0 dígitos. Más tarde se hará el contéo exacto de carácteres máximos consecutivos y no consecutivos.
	El cuarto grupo busca al menos 1 caracter "ú".
	Y el quinto y último grupo busca que la cadena termine (mediante el símbolo $) "." , "#" o "{".*/
	var pat4 = /^(?=.*[aA-zZáÁéÉíÍúÚóÓñÑçÇ]{1,})(?=.*[a-z]{1,})(?=.*\d{0,})(?=.*[ú]{1,})(?=.*[\.#}]$)/;
	
	/*Con este bucle for eliminamos las etiquetas de clase que se hayan podido asignar a los diferentes campos del formulario (para errores, aciertos, focus...).*/
	for (let i=0; i<formulario.elements.length; i++) {
		formulario.elements[i].className = "";
	}
	/*Este condicional evaluará el primer pat O que el segundo pat de como resultado falso (TEST devuelve TRUE or FALSE)*/
	if ((pat.test(formulario.nombre.value) || pat2.test(formulario.nombre.value)==false)) {
		e1 = `<b>Fallo en el nombre</b>: Rellena el nombre con las siguientes normas:<br>- No se admite campo vacío<br>- No se admiten números o caracteres especiales<br>- Mínimo de 3 y máximo de 40 caracteres<br><br>`;
		formulario.nombre.style.background = "red";
		/*En caso de error, asignaremos el string de este error a la variable que luego será usada en la validación.
		De igual forma, también pondremos el fondo del input en rojo en caso de error*/
		cont++;
	}
	else {
		/*En caso de que el pattern se valide, pondremos el fondo de verde*/
		formulario.nombre.style.background = "green";
	}	
	
	if ((pat.test(formulario.apellidos.value) || pat3.test(formulario.apellidos.value)==false)) {
		e2 = `<b>Fallo en los apellidos</b>: Rellena los apellidos con las siguientes normas:<br>- No se admite campo vacío<br>- No se admiten números o caracteres especiales<br>- Mínimo de 4 y máximo de 60 caracteres<br><br>`;
		formulario.apellidos.style.background = "red";
		/*En caso de error, asignaremos el string de este error a la variable que luego será usada en la validación.
		De igual forma, también pondremos el fondo del input en rojo en caso de error*/
		cont++;
	}
	else {
		/*En caso de que el pattern se valide, pondremos el fondo de verde*/
		formulario.apellidos.style.background = "green";
	}
	
	if (pat4.test(con1.value) && (9<con1.value.length<13) && ((con1.value.match(/\d/g) || []).length <= 3) && (con1.value.match(/[aA-zZáÁéÉíÍúÚóÓñÑçÇ]/g) || []).length > 3) {
		/*Se comprueba la validación con el pat4 y la validación de caracteres mínimos/máximos de la cadena con la propiedad length en un match para los caracteres
		alfabéticos y se mira la propiedad length para otro match con los caracteres numéricos*/		
		/*En caso de que el pattern se valide, pondremos el fondo de verde*/
		con1.style.background = "green";
	}
	else { 
		e3 = `<b>Fallo en la contraseña</b>: Rellena la contraseña con las siguientes normas:<br>- Total de 9 a 12 caracteres<br>- Al menos 3 caracteres alfabéticos<br>- Una minúscula al menos<br>- Debe contener al menos un caracter "ú"<br>- De 0 a 3 dígitos<br>- Debe terminar con los caracteres '.' , '#' o '}'<br><br>`;
		con1.style.background = "red";
		/*En caso de error, asignaremos el string de este error a la variable que luego será usada en la validación.
		De igual forma, también pondremos el fondo del input en rojo en caso de error*/
		cont++;
	}
	
	if (con1.value === con2.value && con1.value != "") {
		/*En caso de que el pattern se valide, pondremos el fondo de verde*/
		con2.style.background = "green";
	}
	else {
		e4 = `<b>Fallo en la verificación de contraseña</b>: Por favor, las contraseñas deben coincidir`;
		con2.style.background = "red";
		/*En caso de error, asignaremos el string de este error a la variable que luego será usada en la validación.
		De igual forma, también pondremos el fondo del input en rojo en caso de error*/
		cont++;
	}
	
	/*El siguiente condicional evaluará si se han cometido errores o no, para devolver a la validación o bien FALSE en caso de fallo o TRUE en caso de todo aciertos*/
	/*Si se hubiesen realizado las validaciones por separado no haría falta esto, con devolver true o false a una validación general desde las validaciones individuales
	hubiese bastado. Ese método ha sido empleado en la segunda parte del ejercicio*/
	if (cont===0) {
		return true
	} 
	else {
		return false
	}
}

function borrar() {
	/*Esta función borrará mediante el botón con ID borrar el contenido sobre el que hayamos hecho clic. Sabemos qué elemento hemos seleccionado
	gracias a la asignación que se ha hecho en la función cambiar()*/
	document.getElementById(idelemento).value = "";
	document.getElementById(idelemento).style.background = "white";
}

function cambiar(elemento) {
	/*Mediante la llamada a este método con el evento focus para las cajas de texto, vamos a cambiar el fondo en amarillo cada vez que hagamos clic en ellos,
	y ademas, vamos a asignar a la variable global idelemento el id del elemento en el que nos encontramos. También vamos a capturar el color de fondo
	que tiene en ese momento el elemento para más tarde ponerlo de ese color en caso de que perdamos el foco*/
	var colorelemento = this.style.background;
	idelemento = this.id;
	this.style.background = "yellow";
	/*Además, en caso de que quitemos el focus del elemento, vamos a volver el fondo del elemento blanco, tal y como estaba*/
	this.addEventListener('blur', function(){this.style.background=colorelemento;}, false);
}

function resetear(elemento) {
	/*Con esta función nos aseguramos que una vez el reset el pulsado, además de limpiar todos los campos, los estilos de fondo vuelve a blanco y se pone el foco
	en el campo nombre, el primer campo*/
	document.getElementById("nombre").style.background = "white";
	document.getElementById("apellidos").style.background = "white";
	document.getElementById("contraseña").style.background = "white";
	document.getElementById("contraseña-ver").style.background = "white";
	document.getElementById("nombre").focus();
}