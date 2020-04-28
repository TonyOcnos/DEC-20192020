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

        var buttonDiv = document.createElement('div');
        buttonDiv.id = 'buttonDiv';
        document.body.appendChild(buttonDiv);

        var startBut = document.createElement('button');
        var giveupBut = document.createElement('button');
        startBut.id = 'startButton';
        startBut.textContent = 'START';
        giveupBut.id = 'giveupButton';
        giveupBut.textContent = 'GENERATE';
        document.getElementById('buttonDiv').appendChild(startBut);
        document.getElementById('buttonDiv').appendChild(giveupBut);

        document.getElementById('startButton').addEventListener('click', startgame);
        document.getElementById('giveupButton').addEventListener('click', restart);
    }

    function tableSetup(){

        var tile = document.createElement('img');
        tile.className = 'tiles';

        for(var i=0;i<=15;i++){
            mainDiv.appendChild(tile.cloneNode());
        }
    }

    function tilesAssignment(){

        for(var i=0;i<=3;i++){
            biArray[i] = [];
            for(var i2=0;i2<=3;i2++){
                biArray[i][i2] = 'path';
            }
        }

        while(!randomTiles('bomb')){};
        while(!randomTiles('start')){};
        while(!randomTiles('end')){};

        function randomTiles(type){
            
            var r1 = ran(3);
            var r2 = ran(3);

            if(biArray[r1][r2] == 'path'){
                biArray[r1][r2] = type;
                if(type == 'start'){
                    s1 = r1;
                    s2 = r2;
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
                document.getElementsByClassName('tiles')[x].id = biArray[i][i2];
                x++;
            }
        }
    }
    
    function startgame(){

        document.body.addEventListener('keydown' , move, false);
        biArray[s1][s2] = 'current';
        loadScreen();
    }

    function move(e){

        var keydown = e.key;

        switch(keydown){
            case('w'):
                biArray[s1][s2] = 'path';
                if(s1-1 >= 0){
                    s1--;
                    comp();
                    document.getElementById('current').style.transform = `scaleX(${direction})`;
                }
            break;
            case('s'):
                biArray[s1][s2] = 'path';
                if(s1+1 <= 3){
                    s1++;
                    comp();
                    document.getElementById('current').style.transform = `scaleX(${direction})`;
                }
            break;
            case('a'):
                biArray[s1][s2] = 'path';
                if(s2-1 >= 0){
                    s2--;
                    comp();
                    direction = '-1';
                    document.getElementById('current').style.transform = `scaleX(${direction})`;
                }
            break;
            case('d'):
                biArray[s1][s2] = 'path';
                if(s2+1 <= 3){
                    s2++;
                    comp();
                    direction = '1';
                    document.getElementById('current').style.transform = `scaleX(${direction})`;
                }
            break;
        }

        function comp(){
            if(biArray[s1][s2] == 'bomb'){
                alert('YOU DIED\n\nPlease, click "Generate" to create a new map');
                biArray[s1][s2] = 'explosion_simple';
                document.body.removeEventListener('keydown' , move, false);
                document.getElementById('startButton').removeEventListener('click', startgame);
                loadScreen();
            }
            else{
                if(biArray[s1][s2] == 'end'){
                    alert('YOU SAVED YOUR LIFE...\n\nPlease, click "Generate" to create a new map');
                    biArray[s1][s2] = 'current';
                    document.body.removeEventListener('keydown' , move, false);
                    document.getElementById('startButton').removeEventListener('click', startgame);
                    loadScreen();
                }
                else{
                    biArray[s1][s2] = 'current';
                    loadScreen();  
                }

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