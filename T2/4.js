function plataforma(){
	var plat = "Plataforma utilizada:" + navigator.platform;
	document.getElementById("casilla").innerHTML = plat;
}

/*Se le ha solicitado al objeto navigator que nos muestro en pantalla la propiedad platform, que nos indicará sobre qué 
tipo de plataforma está trabajando nuestro navegador (lado cliente)*/