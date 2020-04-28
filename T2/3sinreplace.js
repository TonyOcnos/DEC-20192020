function puntosycomas(){
	
	/*Se solicita la cadena con espacios y puntos*/
	var cadena = window.prompt("Introduce una frase con espacios y puntos");
	
	var longitud = cadena.length;
	var x = 0;
	var nueva = "";
	
	for (var i=0; i<=longitud; i++){
		x = cadena.charAt(i);
		if (x!="." && x!=" "){
			nueva = nueva.concat(x);
		}
		else if (x=="."){
			nueva = nueva.concat(",");
		}
		
		else if (x==" "){
			nueva = nueva.concat(".");
		}
	}
	
	alert(nueva);
}