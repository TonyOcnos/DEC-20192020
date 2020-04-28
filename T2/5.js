function calculos(){
	
	/*Se solicita el lado del hexágono sobre el que se realizarán los cálculos de apotema y área*/
	var lado = window.prompt("Por favor, introduce el dato del lado del hexágono (cm):");
	
	/*Aquí comprobamos que el número introducido es un número mediante isNaN (is Not a Number?), que nos devolverá
	false si ES un número y true si NO ES un número*/
	compr = isNaN(lado);
	
	/*Si es un numero ejecutamos los cálculos y si no nos volverá a pedir introducir un número válido. Se comprueba que tampoco es negativo*/
	if (compr==false && lado>0){
		
		var apotema = lado / 1.15;
		var Area = 3 * lado * apotema;
		
		/*Aquí ajustamos los resultados para mostrar únicamente 2 decimales*/
		apotema = apotema.toFixed(2);
		Area = Area.toFixed(2);
		
		document.getElementById("apotema").innerHTML = "El apotema de este hexágono es de: " + apotema + " cm";
		document.getElementById("area").innerHTML = "El área de este hexágono es de: " + Area + " cm\262";
	}
	
	else{
		alert("Por favor, introduce un valor númerico no negativo y que no sea una letra.");
		calculos();
	}
}