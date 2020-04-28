function puntosycomas(){
	
	/*Se solicita la cadena con espacios y puntos*/
	var cadena = window.prompt("Introduce una frase con espacios y puntos");
	
	var nueva;
	
	/*Sustitución del caracter punto (no entiendo porque no me lo aceptada si no lo metía como código de output)*/
	nueva = cadena.replace(/\56/g, ",");
	
	/*Abajo explico porque la creación de una segunda variable para el tratamiento con replace*/
	nueva2 = nueva;
	
	nueva = nueva2.replace(/ /g, ".");

	document.getElementById("casilla").innerHTML = nueva;
}

/*He tenido algo de problemas utilizando replace 2 veces sobre la misma variable, por eso he tenido que crear una variable aparte
y realizar el tratamiento del espacio y el punto. Por favor, me podrías decir el porqué no he podido hacerlo sobre la misma
variable?. Gracias!*/