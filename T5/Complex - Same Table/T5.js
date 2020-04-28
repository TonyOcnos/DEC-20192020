window.onload = function() {

    var biArray = [[],[]];

    domElements();
    tableSetup();
    tilesAssignment();
    loadScreen();

    function domElements(){

        var mainDiv = document.createElement('div');
        mainDiv.id = 'mainDiv';
        document.body.appendChild(mainDiv);

        divCreation('fieldDiv', 'mainDiv');
        divCreation('buttonDiv', 'mainDiv');

        buttonCreation('startButton', 'START', 'buttonDiv');
        buttonCreation('giveupButton', 'GENERATE MAP', 'buttonDiv');

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

        document.getElementById('startButton').addEventListener('click', startgame);
        document.getElementById('giveupButton').addEventListener('click', restart);

        function divCreation (divId, appendTo) {

            var div = document.createElement('div');
            div.id = divId;
            document.getElementById(appendTo).appendChild(div);
            return div;
        }

        function buttonCreation(buttonId, buttonText, appendTo) {

            var button = document.createElement('button');
            button.id = buttonId;
            button.textContent = buttonText;
            document.getElementById(appendTo).appendChild(button);
            return button;
        }

        function labelCreation(labelId, labelFor, labelContent, appendTo){
            
            var label = document.createElement('label');
            label.id = labelId;
            label.for = labelFor;
            label.textContent = labelContent;
            document.getElementById(appendTo).appendChild(label);
            return label;
        }

        function inputCreation(inputId, inputType, appendTo){

            var input = document.createElement('input');
            input.id = inputId;
            input.type = inputType;
            document.getElementById(appendTo).appendChild(input);
            return input;
        }
    }

    function tableSetup(){

        var tile = document.createElement('img');
        // tile.className = 'tiles';

        for(var i=0;i<=15;i++){
            fieldDiv.appendChild(tile.cloneNode());
        }
    }

    function tilesAssignment(){

        for(var i=0;i<=3;i++){
            biArray[i] = [];
            for(var i2=0;i2<=3;i2++){
                biArray[i][i2] = 'path';
            }
        }

        if(bombs.value == ''){
            bombs.value = 1
        }
        if(players.value == ''){
            players.value = 1
        }

        for(var i=0;i<document.getElementById('bombs').value;i++){
            while(!randomTiles('bomb')){};
        }
        
        if(players.value == 1){
            while(!randomTiles('current1')){};
        }
        else{
            while(!randomTiles('current1')){};
            while(!randomTiles('current2')){};
        }
        while(!randomTiles('end')){};

        function randomTiles(type){
            
            var r1 = ran(3);
            var r2 = ran(3);

            if(biArray[r1][r2] == 'path'){
                biArray[r1][r2] = type;
                if(type == 'current1'){
                    p1c1 = r1;
                    p1c2 = r2;
                    biArray[p1c1][p1c2] = 'current1';
                }
                if(type == 'current2'){
                    p2c1 = r1;
                    p2c2 = r2;
                    biArray[p2c1][p2c2] = 'current2';
                }
                return true;
            }

            function ran(max){
                return x = Math.floor(Math.random()*(max-0+1));
            }
        }
    }

    function loadScreen(){

        var x = 0;

        for(var i=0;i<=3;i++){
            for(var i2=0;i2<=3;i2++){
                fieldDiv.childNodes[x].id = biArray[i][i2];
                x++;
            }
        }
    }
    
    function startgame(){

        document.body.addEventListener('keydown' , move, false);
        loadScreen();
    }

    function move(e){

        var keydown = e.key;

        switch(keydown){
            case('w'):
                if(p1c1-1 >= 0 && biArray[p1c1-1][p1c2] != 'current2'){
                    biArray[p1c1][p1c2] = 'path';
                    p1c1--;
                    comp(p1c1, p1c2, 'current1');
                    document.getElementById('current1').style.transform = `scaleX(${direction})`;
                }
            break;
            case('s'):
                if(p1c1+1 <= 3 && biArray[p1c1+1][p1c2] != 'current2'){
                    biArray[p1c1][p1c2] = 'path';
                    p1c1++;
                    comp(p1c1, p1c2, 'current1');
                    document.getElementById('current1').style.transform = `scaleX(${direction})`;
                }
            break;
            case('a'):
                
                if(p1c2-1 >= 0 && biArray[p1c1][p1c2-1] != 'current2'){
                    biArray[p1c1][p1c2] = 'path';
                    p1c2--;
                    comp(p1c1, p1c2, 'current1');
                    direction = '-1';
                    document.getElementById('current1').style.transform = `scaleX(${direction})`;
                }
            break;
            case('d'):
                if(p1c2+1 <= 3 && biArray[p1c1][p1c2+1] != 'current2'){
                    biArray[p1c1][p1c2] = 'path';
                    p1c2++;
                    comp(p1c1, p1c2, 'current1');
                    direction = '1';
                    document.getElementById('current1').style.transform = `scaleX(${direction})`;
                }
            break;
            case('ArrowUp'):
                if(p2c1-1 >= 0 && biArray[p2c1-1][p2c2] != 'current1'){
                    biArray[p2c1][p2c2] = 'path';
                    p2c1--;
                    comp(p2c1, p2c2, 'current2');
                    document.getElementById('current2').style.transform = `scaleX(${direction})`;
                }
            break;
            case('ArrowDown'):
                if(p2c1+1 <= 3 && biArray[p2c1+1][p2c2] != 'current1'){
                    biArray[p2c1][p2c2] = 'path';
                    p2c1++;
                    comp(p2c1, p2c2, 'current2');
                    document.getElementById('current2').style.transform = `scaleX(${direction})`;
                }
            break;
            case('ArrowLeft'):
                if(p2c2-1 >= 0 && biArray[p2c1][p2c2-1] != 'current1'){
                    biArray[p2c1][p2c2] = 'path';
                    p2c2--;
                    comp(p2c1, p2c2, 'current2');
                    direction = '-1';
                    document.getElementById('current2').style.transform = `scaleX(${direction})`;
                }
            break;
            case('ArrowRight'):
                if(p2c2+1 <= 3 && biArray[p2c1][p2c2+1] != 'current1'){
                    biArray[p2c1][p2c2] = 'path';
                    p2c2++;
                    comp(p2c1, p2c2, 'current2');
                    direction = '1';
                    document.getElementById('current2').style.transform = `scaleX(${direction})`;
                }
            break;
        }

        function comp(pc1, pc2, currentP){
            if(biArray[pc1][pc2] == 'bomb'){
                if (currentP == 'current1'){
                    alert('PLAYER 1 DIED\n\nPlease, click "Generate" to create a new map and start again');
                }
                else {
                    alert('PLAYER 2 DIED\n\nPlease, click "Generate" to create a new map and start again');
                }
                biArray[pc1][pc2] = 'explosion_simple';
                loadScreen();
                document.body.removeEventListener('keydown' , move, false);
                document.getElementById('startButton').removeEventListener('click', startgame);
            }
            if(biArray[pc1][pc2] == 'end'){
                if (currentP == 'current1'){
                    alert('PLAYER 1 SAVED HIS LIFE...\n\nPlease, click "Generate" to create a new map');
                }
                else{
                    alert('PLAYER 2 SAVED HIS LIFE...\n\nPlease, click "Generate" to create a new map');
                }
                biArray[pc1][pc2] = currentP;
                loadScreen();
                document.body.removeEventListener('keydown' , move, false);
                document.getElementById('startButton').removeEventListener('click', startgame);
            }
            if(biArray[pc1][pc2] == 'path'){
                biArray[pc1][pc2] = currentP;
                loadScreen();  
            }
        }
    }

    function restart() {
        document.getElementById('startButton').addEventListener('click', startgame);
        document.body.removeEventListener('keydown' , move, false);
        tilesAssignment();
        loadScreen();    
    }
}