window.onload = function(){

    class Infante{
        
        constructor (nombre, edad, altura, tiempo){
                
                this._nombre = nombre;
                this._edad = edad;
                this._altura = altura;
                this._tiempo = tiempo;      
        }
            
        get nombre(){
            return this._nombre;
        }
        
        set nombre(nuevonombre) {
            if (nuevonombre === "" || Number.isInteger(nuevonombre)) /*SE CREA UNA RESTRICCIÓN PARA QUE EL NOMBRE SEA UN STRING, EN CASO CONTRARIO "-"*/
            this._nombre = "-";
            else 
            this._nombre = nuevonombre;
        }
            
        get edad() {
            return this._edad;
        }
            
        set edad(nuevaedad){ 
            if ((typeof nuevaedad === "string") || nuevaedad === "" || nuevaedad === 0) /*SE CREA UNA RESTRICCIÓN PARA QUE EDAD SEA UN NÚMERO, EN CASO CONTRARIO "-"*/
            this._edad = "-";
            else 
            this._edad = nuevaedad;
        }
        
        get altura(){
            return this._altura;
        }
            
        set altura(nuevaaltura){ 
            if ((typeof nuevaaltura === "string") || nuevaaltura === "" || 0) /*SE CREA UNA RESTRICCIÓN PARA QUE ALTURA SEA UN NÚMERO, EN CASO CONTRARIO "-"*/
            this._altura = "-";
            else 
            this._altura = nuevaaltura;
        }
        
        toString() {
            return `Nombre del infante: ${this._nombre}<br>Edad: ${this._edad}<br>Altura: ${this._altura}<br>`;
        }
        
        jubilar() { /*EN VEZ DE DEVOLVER SÓLO TRUE O FALSE, SE CREA UNA CONDICIÓN PARA SABER SI EL INFANTE TIENE MÁS DE 45 AÑOS O NO. EN CASO AFIRMATIVO, SE JUBILA Y SE RETIRA DE LA CENTURIA*/
            if (this._edad >= 45) {
            centuria.removeInfante(infante.nombre);
            }
            if (this._edad >0 && this._edad <45) {
            document.write(`Al soldado le quedan ${45 - this._edad} anhos para la jubilaci&oacute;n<br>`); /*NOS DICEN CUÁNTOS AÑOS LE QUEDA PARA JUBILARSE*/
            }
        }
    }
    
    class Centurion extends Infante{ /*MEDIANTE "EXTENDS" SE INDICA QUE HEREDARÁ PROPIEDADES DE INFANTE*/
    
        constructor (nombre, edad, altura, tiempo) {
            super(nombre, edad, altura) /*MEDIANTE "SUPER" ESPECIFICAMOS CUÁLES SERÁN LAS PROPIEDADES HEREDADAS*/
			this._tiempo = tiempo;
        }
            
        get tiempo() {
            return this._tiempo;
        }
        
        set tiempo(nuevotiempo){
            if ((typeof nuevotiempo === "string") || nuevotiempo === "" || nuevotiempo === 0)
            this._tiempo = "-"
            else 
            this._tiempo = nuevotiempo
        }
        
        gritar() { /*ESTA FUNCIÓN ESTÁ COMPUESTA POR UN ARRAY QUE NUNCA CAMBIA*/
			var ordenes = [
				"Ad signa!",
				"Dextr&oacute;rsum vos disponte!",
				"Ordine secunda, unum ordinem facite!",
				"Milite!",
				"Laxate!",
				"Intente!",
				"Ordine secunda, duos ordine facite!",
				"Sinestrorsum vos disponte!",
				"Contuberni….intente!",
				"Procedite!"];
				
            var nOrden = Math.floor(Math.random() * 10); /*CADA VEZ QUE SE EJECUTE EL SCRIPT, EL CENTURIÓN GRITARÁ UNA ORDEN AL "AZAR"*/
            document.write(ordenes[nOrden]);
        }
        
        toString() {
            return `Nombre del centuri&oacute;n: ${this._nombre}<br>Edad: ${this._edad}<br>Altura: ${this._altura}<br>Tiempo en el cargo: ${this._tiempo}<br>`;
        }
    }
    
    class Centuria{
        
        constructor (nombrecen, nombreleg, provincia, centurion){
            this._nombrecen = nombrecen;
            this._nombreleg = nombreleg;
            this._provincia = provincia;
            this.centurion = centurion;
            this.arrayInfantes = []; /*DETERMINAMOS UN ARRAY DONDE SE IRÁN COLOCANDO LOS DIFERENTES INFANTES. DE MOMENTO NO SE DEFINE SU LONGITUD*/
        }
        
        get nombrecen() {
            return this._nombrecen;
        }
        
        set nombrecen(nuevonombrecen) {
            if (nuevonombrecen === "" || Number.isInteger(nuevonombrecen))
            this._nombrecen = "-";
            else 
            this._nombrecen = nuevonombrecen;
        }
        
        get nombreleg() {
            return this._nombreleg;
        }
        
        set nombreleg(nuevonombreleg) {
            if (nuevonombreleg === "" || Number.isInteger(nuevonombreleg))
            this._nombreleg = "-";
            else 
            this._nombreleg = nuevonombreleg;
        }
        
        get provincia() {
            return this._provincia;
        }
        
        set provincia(nuevaprocincia) {
            if (nuevaprovincia === "" || Number.isInteger(nuevaprovincia))
            this._provincia = "-";
            else 
            this._provincia = nuevaprovincia;
        }
        
        addInfante(infante) {
			this.arrayInfantes.push(infante.nombre); /*LA LISTA PODRÍA INCLUIR TODA LA INFORMACIÓN, PERO PARA NO SOBRECARGARLO VISUALMENTE, SÓLO APLICO PUSH SOBRE EL NOMBRE*/
        }
        
        removeInfante(nombreinfante) {
            for (let ind in this.arrayInfantes){
                if (this.arrayInfantes[ind] === nombreinfante){
                    document.write(`<br>Infante ${nombreinfante} dado de baja o jubilado<br><br>`);
                    this.arrayInfantes.splice(ind, 1); /*CON EL MÉTODO DE ARRAY "SPLICE" NOS ASEGURAMOS QUE AL ELIMINAR UN ELEMENTO DEL ARRAY, SU LENGTH SE MODIFICA Y NO CREA "HUECOS"*/
                }
            }
        }
    
        asignarCenturion(nuevocenturion) {
            document.write(`Nuevo Centuri&oacute;n: ${nuevocenturion.nombre}<br>`);
            this.centurion = nuevocenturion; /*UN NUEVO CENTURÓN REEMPLAZA AL ANTERIOR*/
            return this.centurion;
        }
        
        totalMiembros() {
            document.write(`<b>Infantes:</b><br>`);
            if (this.arrayInfantes.length !== 0){
                for (let ind in this.arrayInfantes) {
                    document.write(`${this.arrayInfantes[ind]}<br>`);
                }
            }
            document.write(`<br>Total infantes: ${this.arrayInfantes.length}<br><br><b>Centurion:</b><br>${this.centurion.nombre}<br>`);
        }
        
        toString() {
            return `Nombre centuria: ${this._nombrecen}<br>Nombre legi&oacute;n: ${this._nombreleg}<br>Provincia: ${this._provincia}<br>`;
        }
    }


/*SENTENCIAS PARA INSTANCIAR CLASES Y EJECUTAR SUS METODOS*/

/******* 1 *******/
var centuria = new Centuria("Romana", "Moderdonia", "Sevilla");
document.write("<u><b>1</b>.Creaci&oacute;n de la centuria instanciando el objeto de clase y creando los diferentes infantes e asignandolos a la centuria</u><br><br>" + centuria + "<br>");

var infante1 = new Infante("Juanus Munhus", 55, 170);
var infante2 = new Infante("Hectus de Miguelus", 34, 178);
var infante3 = new Infante("Vicentus del Boscus", 45, 166);
var infante4 = new Infante("Wismichux", 33, 201);
var infante5 = new Infante("Ignatius", 76, 198);
var infante6 = new Infante("Cabadus", 58, 178);
var infante7 = new Infante("Portutatis", 52, 160);
var infante8 = new Infante("Chendo", 45, 160);
var infante9 = new Infante("Grisum", 22, 205);
var infante10 = new Infante("Ricardus Castelus", 23, 194);
centuria.addInfante(infante1);
centuria.addInfante(infante2);
centuria.addInfante(infante3);
centuria.addInfante(infante4);
centuria.addInfante(infante5);
centuria.addInfante(infante6);
centuria.addInfante(infante7);
centuria.addInfante(infante8);
centuria.addInfante(infante9);
centuria.addInfante(infante10);

/******* 2 *******/
var centurion = new Centurion("Maximo Decimo Meridio", "43", 189, 10);
document.write("<u><b>2</b>.Creaci&oacute;n del centuri&oacute;n instanciando el objeto de clase</u><br><br>" + centurion);

/******* 3 *******/
document.write("<br><u><b>3</b>.El centuri&oacute;n grita una orden diferente cada vez que se ejecuta el script</u><br><br>");
centurion.gritar();

/******* 4 *******/
document.write("<br><br><u><b>4</b>.Se asigna el centurion a la centuria</u><br><br>");
centuria.asignarCenturion(centurion);

/******* 5 *******/
document.write("<br><u><b>5</b>.Procedemos a ver qu&iacute;enes componen la centuria incluido el centurion</u><br><br>")
centuria.totalMiembros();

/******* 6 *******/
document.write('<br><u><b>6</b>.Procedemos a eliminar un infante del array ya creado y volvemos a mostrar la lista para corroborar que el infante ha sido eliminado</u><br>')
centuria.removeInfante("Ignatius");
centuria.totalMiembros();

/******* 7 *******/
document.write("<br><u><b>7</b>.Creacion de un infante nuevo que vamos a enrolar en la centuria y volvemos a ver la centuria para comprobar que se ha enrolado el nuevo infante.</u><br>")
var infante = new Infante("Joannus Ochendus", 28, 175);
document.write("<br>" + infante);
centuria.addInfante(infante);

/******* 8 *******/
document.write("<br><u><b>8</b>.Vamos a crear y reasignar un centurion nuevo. Volvemos a desplegar la lista de la centuria para ver el nuevo infante y centurion asignado</u><br><br>")
centurion = new Centurion("Pepe Villuelus", 34, 199, 5);
centuria.asignarCenturion(centurion);
document.write("<br>"),
centuria.totalMiembros();

/******* 9 ******/
document.write("<br><u><b>9</b>.Intentamos jubilar al ultimo infante creado, pero como la edad con la que se ha creado dicho infante es inferior a 45, recibimos un error y el infante no se jubila.</u><br><br>")
infante.jubilar();

/******* 10 ******/
document.write("<br><u><b>10</b>.Vamos a crear un infante y asignarlo con una edad superior a 45 para poder jubilarlo y ver como se elimina de la centuria.</u><br><br>");
infante = new Infante("Borges Borgus", 46, 180);
centuria.addInfante(infante);
centuria.totalMiembros();
infante.jubilar();
centuria.totalMiembros();
};