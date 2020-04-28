window.onload = function() {
    /*Creacion de variables de manera global.
    Estas podrán ser accesibles para todas las funciones*/
    var biArray = [[],[]]; /*Creación del primer array bidimensional, aun sin definir*/
    var biArray2 = [[],[]]; /*Creación del segundo array bidimensional, aun sin definir*/
    var r1, r2; /*Creación de las variables que se usarán para la generación aleatorio*/
    var p1c1, p1c2, p2c1, p2c2; /*Creación de las variables para las coordenadas de cada jugador*/
    var twee1, twee2; /*Creación de las variables para saber si se han recogido las tenazas*/
    var bomb1, bomb2; /*Creación de las variables para saber cuántas bombas se han desactivado*/
    /*Llamada a las funciones para inicializar el juego*/
    domElements();
    tableSetup();
    tilesAssignment();
    loadScreen();
    alert("You must deactivate all the bombs before arriving to the shelter. To do so, please pick up the tweezers first!\n\nControls P1:\nW: Up\nS: Down\nA: Left\nD: Right\n\nControls P2:\nArrows set");

    function domElements(){
    /*Función para la creación de todos los elementos DOM.
    El archivo HTML sólo contiene lo básico y nada más*/

        /*Creación del DIV que contendrá todo el juego, es decir, el DIV padre de todo lo demás (sin incluir body)*/
        var mainDiv = document.createElement('div');
        mainDiv.id = 'mainDiv';
        document.body.appendChild(mainDiv); 
        /*Llamada a las funciones de creación de DIVs. Ver más abajo explicación*/
        divCreation('field1Div', 'mainDiv');
        divCreation('field2Div', 'mainDiv');
        divCreation('buttonDiv', 'mainDiv');
        /*Llamada a las funciones de creación de BUTTON. Ver más abajo explicación*/
        buttonCreation('startButton', 'START', 'buttonDiv');
        buttonCreation('giveupButton', 'GENERATE MAP', 'buttonDiv');
        /*Creación de las etiquetas y los selectores de número de bombas y jugadores*/
        labelCreation('labelBombs', 'bombs', 'Bombs:', 'buttonDiv');    
        var bombs = inputCreation('bombs', 'number', 'buttonDiv');
        bombs.min = '1';
        bombs.max = '3';
        bombs.value = '1';

        labelCreation('labelPlayers', 'players', 'Players:', 'buttonDiv');
        var players = inputCreation('players', 'number', 'buttonDiv');
        players.min = '1';
        players.max = '2';
        players.value = '1';
        /*Creación del DIV que contendrá el TIMER de cuenta atrás para empezar la partida*/
        divCreation('timerDiv', 'buttonDiv');
        /*Asignación de los eventos tipo "click" en los botones de START y GENERATE*/
        document.getElementById('startButton').addEventListener('click', startgame);
        document.getElementById('giveupButton').addEventListener('click', restart);

        /*Dado que hay sentencias que se repiten en exceso como la creacion de DIVs
        se ha creado una función que recibirá el ID del DIV que queremos crear
        y el nombre del elemento al que lo queremos añadir*/
        function divCreation (divId, appendTo) {

            var div = document.createElement('div');
            div.id = divId;
            document.getElementById(appendTo).appendChild(div);
            return div; /*Retornamos el DIV en caso de que queramos hacer algo con el como variable*/
        }

        /*Dado que hay sentencias que se repiten en exceso como la creacion de BUTTON
        se ha creado una función que recibirá el ID del BUTTON, el texto que contedrá 
        y el nombre del elemento al que lo queremos añadir*/
        function buttonCreation(buttonId, buttonText, appendTo) {

            var button = document.createElement('button');
            button.id = buttonId;
            button.textContent = buttonText;
            document.getElementById(appendTo).appendChild(button);
            return button; /*Retornamos el BUTTON en caso de que queramos hacer algo con el como variable*/
        }
        /*Dado que hay sentencias que se repiten en exceso como la creacion de LABEL
        se ha creado una función que recibirá el ID del LABEL, el elemento al que se le asignará
        la etiqueta, el texto que contendrá y el nombre del elemento al que lo queremos añadir*/
        function labelCreation(labelId, labelFor, labelContent, appendTo){
            
            var label = document.createElement('label');
            label.id = labelId;
            label.for = labelFor;
            label.textContent = labelContent;
            document.getElementById(appendTo).appendChild(label);
            return label; /*Retornamos el LABEL en caso de que queramos hacer algo con el como variable*/
        }
        /*Dado que hay sentencias que se repiten en exceso como la creacion de INPUT
        se ha creado una función que recibirá el ID del INPUT, el tipo de INPUT 
        y el nombre del elemento al que lo queremos añadir*/
        function inputCreation(inputId, inputType, appendTo){

            var input = document.createElement('input');
            input.id = inputId;
            input.type = inputType;
            document.getElementById(appendTo).appendChild(input);
            return input;
        }
    }

    function tableSetup(){
    /*Función que crea el SETUP de los diferentes tableros, creando mediante clonación de nodos
    todas las casillas de los dos tableros*/
        var tile1 = document.createElement('div');
        
        for(var i=0;i<=15;i++){
            field1Div.appendChild(tile1.cloneNode());
            field2Div.appendChild(tile1.cloneNode());
        }
    }

    function tilesAssignment(){
    /*Función que asignará con aletoriedad los diferentes tipos de casilla a los tableros*/
        for(var i=0;i<=3;i++){
            /*Para definir un array bidimensional, lo ideal es definir como array vacío la primera
            "dimensión" del array*/
            biArray[i] = [];
            biArray2[i] = [];
            for(var i2=0;i2<=3;i2++){
                /*Aquí ya definimos la segunda "dimesión" del array y queda completo*/
                biArray[i][i2] = 'path';
                biArray2[i][i2] = 'path';
            }
        }
        /*En caso de que al generar el mapa, el selector "bombs" o "players" esté a cero, 
        se pone por defecto el valor 1*/
        if(bombs.value == ''){
            bombs.value = 1
        }
        if(players.value == ''){
            players.value = 1
        }
        /*En el siguiente bloque se llamará a la función que generará aleatoriedad a la asignación
        de los tipos de casilla a los tableros*/
        /*Aquí se accederá al valor que contiene el selector de número de bombas*/
        for(var i=0;i<document.getElementById('bombs').value;i++){
            while(!randomTiles('bomb')){};
        }
        while(!randomTiles('end')){};
        while(!randomTiles('tweezers')){};
        /*Aquí se accederá al valor que contiene el selector de número de jugadores*/
        if(players.value == 1){
            while(!randomTiles('current1')){};
        }
        else{
            while(!randomTiles('current1')){};
            while(!randomTiles('current2')){};
        }

        function randomTiles(type){
        /*Función para crear los números aleatorios. La función recibe el tipo de casilla a asignar*/
            /*Aquí a la llamada de la función se le asigna el argumento del número máximo sobre
            el que crear la aleatoriedad, en este caso de 0 a 3*/
            r1 = ran(3);
            r2 = ran(3);
            /*Este condicional verifica que la casilla esté vacía y no ocupada ya por otro tipo de casilla*/
            if(biArray[r1][r2] == 'path'){
                switch(type){
                    case('bomb'): 
                        biArray[r1][r2] = type;
                        break;
                    case('end'): 
                        biArray[r1][r2] = type; 
                        break;
                    case('tweezers'): 
                        biArray[r1][r2] = type; 
                    break;
                    case('current1'):
                    /*En caso de current1 o current2, serán las casillas que contendrá las casillas iniciales.
                    A partir de estas coordenadas, se restará o sumara en ellas para mover los personajes*/
                        p1c1 = r1;
                        p1c2 = r2;
                        biArray[p1c1][p1c2] = 'current1' 
                        break;
                    case('current2'):
                    /*Aquí copiamos las coordenadas en caso de dos jugadores, para inicilizar el juego
                    en las mismas condiciones*/
                        p2c1 = p1c1;
                        p2c2 = p1c2;
                        /*El siguiente bloque copia todo el tablero en caso de dos jugadores*/
                        for(var i=0;i<=3;i++){
                            for(var i2=0;i2<=3;i2++){
                                biArray2[i][i2] = biArray[i][i2];
                            }
                        }
                        /*Aunque el tablero 2 es igual que el tablero 1, tenemos que asignar el jugador
                        diferente, es decir, el jugador 2 al tablero 2*/
                        biArray2[p1c1][p1c2] = 'current2';
                        break;
                }
                return true;
            }
            /*Función para la creación de un número aleatorio que recibe el número máximo*/
            function ran(max){
                return x = Math.floor(Math.random()*(max-0+1));
            }
        }
    }

    function loadScreen(){
    /*Función para la carga de la pantalla cada vez que un jugador realice un movimiento*/
        /*Dado que el array es bidimensional, pero el acceso a los childNodes se hace de manera lineal,
        creamos una variable que irá desde 0 a 15*/
        var x = 0;

        for(var i=0;i<=3;i++){
            for(var i2=0;i2<=3;i2++){
                field1Div.childNodes[x].id = biArray[i][i2];
                field2Div.childNodes[x].id = biArray2[i][i2];
                x++;
            }
        }
    }
    
    function startgame(){
    /*Función para comenzar el juego una vez clicado el botón de START*/
        /*Se inicializan las variables que nos dirán si se han cogido las pinzas para desactivas las bombas o no
        También se inicializan las variables para el contador de bombas desactivadas*/
        twee1 = 0;
        twee2 = 0;
        bomb1 = bombs.value;
        bomb2 = bombs.value;
        /*Se inicializa la variable del contador para empezar a jugar*/
        var count = 4;
        var timing = setInterval(

        function(){
		/*Esta función, incluida en la función setInterval, hará un countdown de 3 segundos*/
			count--;
			timerDiv.textContent = `Time to begin: ${count} sec.`;
			/*Cuando el contador llegue a 0 se asignará el evento KEYDOWN a todo el body*/
			if(count===0){
				clearInterval(timing);
				document.body.addEventListener('keydown' , move, false);
			}
			
		},1000);
	}

    function move(e){
    /*Función que recoge los movimientos registrados por el evento KEYDOWN. Recibe como argumento la tecla pulsada*/
        var keydown = e.key;
        /*Switch con los casos de las teclas pulsadas, o bien como PLAYER1 o bien como PLAYER2*/
        /*Vamos a explicar un caso únicamente, siendo aplicable al resto de teclas de manera casi similar*/
        switch(keydown){
            case('w'):
                /*Antes de realizar el movimiento comprobamos que no nos salimos fuera del tablero*/
                if(p1c1-1 >= 0){
                    /*Ponemos la casilla actual como PATH, es decir, casilla con terreno sin nada*/
                    biArray[p1c1][p1c2] = 'path';
                    /*Modificamos la coordenada para el movimiento solicitado*/
                    p1c1--;
                    /*Llamamos a la función de comprobación si es bomba, tenazas o el refugio*/
                    /*Dicha función recibirá como argumento el array a comprobar, las coordenadas del jugador
                    correspondiente y el tipo de casilla actual, es decir, de qué jugador se trata*/
                    comp(biArray, p1c1, p1c2, 'current1');
                    /*En los movimientos verticales, mantendremos la última dirección registrada por
                    un movimiento lateral*/
                    document.getElementById('current1').style.transform = `scaleX(${direction})`;
                }
            break;
            case('s'):
                if(p1c1+1 <= 3){
                    biArray[p1c1][p1c2] = 'path';
                    p1c1++;
                    comp(biArray, p1c1, p1c2, 'current1');
                    document.getElementById('current1').style.transform = `scaleX(${direction})`;
                }
            break;
            case('a'):
                
                if(p1c2-1 >= 0){
                    biArray[p1c1][p1c2] = 'path';
                    p1c2--;
                    comp(biArray, p1c1, p1c2, 'current1');
                    /*Ya que el jugador está por defecto mirando hacia la derecha, en el caso
                    de movimiento a la izquierda, se le asigará el estilo TRANSFORM con el
                    valor scaleX (eje X) = -1. Es decir, efecto espejo*/
                    direction = '-1';
                    document.getElementById('current1').style.transform = `scaleX(${direction})`;
                }
            break;
            case('d'):
                if(p1c2+1 <= 3){
                    biArray[p1c1][p1c2] = 'path';
                    p1c2++;
                    comp(biArray, p1c1, p1c2, 'current1');
                    direction = '1';
                    document.getElementById('current1').style.transform = `scaleX(${direction})`;
                }
            break;
            case('ArrowUp'):
                if(p2c1-1 >= 0  && players.value == 2){
                    biArray2[p2c1][p2c2] = 'path';
                    p2c1--;
                    comp(biArray2, p2c1, p2c2, 'current2');
                    document.getElementById('current2').style.transform = `scaleX(${direction})`;
                }
            break;
            case('ArrowDown'):
                if(p2c1+1 <= 3  && players.value == 2){
                    biArray2[p2c1][p2c2] = 'path';
                    p2c1++;
                    comp(biArray2, p2c1, p2c2, 'current2');
                    document.getElementById('current2').style.transform = `scaleX(${direction})`;
                }
            break;
            case('ArrowLeft'):
                if(p2c2-1 >= 0 && players.value == 2){
                    biArray2[p2c1][p2c2] = 'path';
                    p2c2--;
                    comp(biArray2, p2c1, p2c2, 'current2');
                    direction = '-1';
                    document.getElementById('current2').style.transform = `scaleX(${direction})`;
                }
            break;
            case('ArrowRight'):
                if(p2c2+1 <= 3 && players.value == 2){
                    biArray2[p2c1][p2c2] = 'path';
                    p2c2++;
                    comp(biArray2, p2c1, p2c2, 'current2');
                    direction = '1';
                    document.getElementById('current2').style.transform = `scaleX(${direction})`;
                }
            break;
        }

        function comp(a, pc1, pc2, currentP){
        /*Función de comprobación de casilla bomba, tenazas o refugio. Se explicará el caso para un jugador*/
            /*Para el caso de que se recojan las tenazas*/
            if(a[pc1][pc2] == 'tweezers') {
                if (currentP == 'current1'){
                    /*Se registra en la variable de las tenazas del jugador correspondiente
                    si se ha cogido. Ello nos permitirá desactivar las bombas*/
                    twee1 = 1;
                }
                else {
                    twee2 = 1;
                }
                a[pc1][pc2] = currentP;
                loadScreen(); 
            }

            if(a[pc1][pc2] == 'bomb'){
            /*Para el caso de que se pise una bomba*/
                /*Si se pisa una bomba y no se han recogido las tenazas*/
                if (currentP == 'current1' && twee1 == 0){
                    /*Mensaje de personaje muerto*/
                    alert('PLAYER 1 DIED. USE THE TWEEZERS!\n\nPlease, click "Generate" to create a new map and start again');
                    /*Asignación a las coordenadas tras el movimiento del estilo de explosion_simple*/
                    a[pc1][pc2] = 'explosion_simple';
                    /*Carga de pantalla*/
                    loadScreen();
                    /*Se inhabilita el evento de registro del teclado*/
                    document.body.removeEventListener('keydown' , move, false);
                    /*Se inhabilita el evento de click para el botón START. Primero hay que generar mapa*/
                    document.getElementById('startButton').removeEventListener('click', startgame);
                }
                /*Si se pisa una bomba pero se tienen las tenazas*/
                if (currentP == 'current1' && twee1 == 1){
                    /*Se reduce en uno el contador de bombas disponibles para el jugador correspondiente*/
                    bomb1--;
                    /*Cambio de casilla y carga de la pantalla*/
                    a[pc1][pc2] = currentP;
                    loadScreen(); 
                }
                if (currentP == 'current2' && twee2 == 0){
                    alert('PLAYER 2 DIED. USE THE TWEEZERS!\n\nPlease, click "Generate" to create a new map and start again');
                    a[pc1][pc2] = 'explosion_simple';
                    loadScreen();
                    document.body.removeEventListener('keydown' , move, false);
                    document.getElementById('startButton').removeEventListener('click', startgame);
                }
                if (currentP == 'current2' && twee2 == 1){
                    bomb2--;
                    a[pc1][pc2] = currentP;
                    loadScreen();
                }
            }
            /*Para el caso de llegar al refugio*/
            if(a[pc1][pc2] == 'end'){
                /*Si se llega al refugio y se han desactivado todas las bombas (contador a 0)*/
                if (currentP == 'current1' && bomb1 == 0){
                    /*Mensaje de éxito. El player correspondiente ha ganado*/
                    alert('PLAYER 1 SAVED CHILDREN`S LIFE...\n\nPlease, click "Generate" to create a new map');
                }
                if (currentP == 'current1' && bomb1 != 0){
                    alert('PLAYER 1 LOST. YOU MUST DEACTIVATE THE BOMBS BEFORE ARRIVING TO THE SHELTER...\nOTHERWISE, MORE CHILDREN MIGHT DIE\n\nPlease, click "Generate" to create a new map');
                }
                if (currentP == 'current2' && bomb2 == 0){
                    alert('PLAYER 2 SAVED CHILDREN`S LIFE...\n\nPlease, click "Generate" to create a new map');
                }
                if (currentP == 'current2' && bomb2 != 0){
                    alert('PLAYER 2 LOST. YOU MUST DEACTIVATE THE BOMBS BEFORE ARRIVING TO THE SHELTER...\nOTHERWISE, MORE CHILDREN MIGHT DIE\n\nPlease, click "Generate" to create a new map');
                }
                /*Cambio de casilla y carga de pantalla*/
                a[pc1][pc2] = currentP;
                loadScreen();
                document.body.removeEventListener('keydown' , move, false);
                document.getElementById('startButton').removeEventListener('click', startgame);
            }
            /*En caso de pisar terreno sin ningún elemento, no pasa nada*/
            if(a[pc1][pc2] == 'path'){
                a[pc1][pc2] = currentP;
                loadScreen();  
            }
        }
    }
    
    function restart() {
    /*Función para cuando se pulsa el botón de GENERATE, que generará un mapa nuevo*/
        /*Se asigna el evento CLICK al botón START y se inhabilita el evento de teclado*/
        document.getElementById('startButton').addEventListener('click', startgame);
        document.body.removeEventListener('keydown' , move, false);
        /*Se llama las funciones de generación de tablero nuevo (aleatorio) y carga de pantalla*/
        tilesAssignment();
        loadScreen();    
    }
}