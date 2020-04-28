function repe(){
	
	/*Solicitamos la cadena con caracteres repetidos*/
	var cadena = window.prompt("Introduce una cadena de caracteres:");
	
	/*Creación variables*/	
	/*Con la propiedad length solicitamos información sobre el numero de caracteres que componen la cadena solicitada mediante el prompt*/
	var longitud = cadena.length;	
	/*Con "x" e "y" haremos las comparaciones de caracteres*/
	var x;
	var y;	
	/*Resul será la cadena una vez filtrada, y ya nos aseguramos de que es una variable cadena vacía*/
	var resul = "";	
	/*Creación de la variable i para recorrer toda la cadena.*/ 
	var i = 0;
	/*Ya introducimos en "x" mediante charAt, el caracter en la posición 0 de nuestra cadena y realizar la primera comparación*/	
	x = cadena.charAt(i);
	
	/*Creación del bucle FOR para recorrer la cadena de caracteres repetidos. Seteamos i=1 para hacer la comparación de "x" con "y".
	Dentro de la variable y introducimos el caracter i=1. Si son iguales, saltará el condicional if y seguirá recorriendo la cadena
	hasta encontrar un caracter desigual al introducido "x". Una vez que esa desigualdad se cumple, la variable "x" se concatena con resultado
	y ahora introducimos en "x" el caracter (i) de la cadena. Al salir i aumentará para saltar al siguiente caracter, meterlo en "y" y seguir
	comparando*/
	for (i=1; i<=longitud; i++){
		y = cadena.charAt(i);
		if (x!=y){
			resul = resul.concat(x);
			x = cadena.charAt(i);
		}
	}
	
	/*Se muestra en pantalla el resultado filtrado una vez recorrida toda la cadena*/
	alert("El resultado filtrado es: " + resul);
}