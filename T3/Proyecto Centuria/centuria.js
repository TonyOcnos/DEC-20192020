window.onload = function() { 

/*CONDICIONES INICIALES DEL MENÚ DE BOTONES*/

	document.getElementById("asign-infante").disabled = true;
	document.getElementById("remove-infante").disabled = true;
	document.getElementById("create-and-remove-centurion").disabled = true;
	document.getElementById("order").disabled = true;
	document.getElementById("retirerment").disabled = true;

}	        
        var arrayCenturia = []; /*Variables globales para ser accedidas desde cualquier punto del código.*/
		var arrayReserva = [];

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
            if (nuevonombre === "" || Number.isInteger(nuevonombre))
            this._nombre = "-";
            else 
            this._nombre = nuevonombre;
        }
            
        get edad() {
            return this._edad;
        }
            
        set edad(nuevaedad){ 
            if (nuevaedad === "" || nuevaedad === 0)
            this._edad = "-";
            else 
            this._edad = nuevaedad;
        }
        
        get altura(){
            return this._altura;
        }
            
        set altura(nuevaaltura){ 
            if (nuevaaltura === "" || nuevaaltura === 0)
            this._altura = "-";
            else 
            this._altura = nuevaaltura;
        }
        
        toString() {
            return `Nombre del infante: ${this._nombre}<br>Edad: ${this._edad}<br>Altura: ${this._altura}<br>`;
        }
    }
    
    class Centurion extends Infante{
    
        constructor (nombre, edad, altura, tiempo) {
            super(nombre, edad, altura, tiempo);
        }
            
        get tiempo() {
            return this._tiempo;
        }
        
        set tiempo(nuevotiempo){
            if (nuevotiempo === "" || nuevotiempo === 0)
            this._tiempo = "-";
            else
            this._tiempo = nuevotiempo;
        }
        
        gritar() {
			var ordenes = [ 
				"Ad signa!",
				"Dextrórsum vos disponte!",
				"Ordine secunda, unum ordinem facite!",
				"Milite!",
				"Laxate!",
				"Intente!",
				"Ordine secunda, duos ordine facite!",
				"Sinestrorsum vos disponte!",
				"Contuberni….intente!",
				"Procedite!"];
			
            var nOrden = Math.floor(Math.random() * 10);
            alert(ordenes[nOrden]);
        }
        
        toString() {
            return `Nombre del centurión: ${this._nombre}<br>Edad: ${this._edad}<br>Altura: ${this._altura}<br>Tiempo en el cargo: ${this._tiempo}<br>`;
        }
    }
    
    class Centuria{
        
        constructor (nombrecen, nombreleg, provincia, centurion){
            this._nombrecen = nombrecen;
            this._nombreleg = nombreleg;
            this._provincia = provincia;
            this.centurion = centurion;
			this.arrayCenturia = [];
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
        
        set provincia(nuevaprovincia) {
            if (nuevaprovincia === "" || Number.isInteger(nuevaprovincia))
            this._provincia = "-";
            else 
            this._provincia = nuevaprovincia;
        }
        
        addInf(nuevoinfante) {
            arrayCenturia.push(arrayReserva[nuevoinfante]);
			cargaCenturia();
        }
        
        toString() {
            return `Nombre centuria: ${this._nombrecen}<br>Nombre legión: ${this._nombreleg}<br>Provincia: ${this._provincia}<br>`;
        }
    }
	
function newCenturia(){
		
		nombre = prompt("Nombre de la centuria:");
		legion = prompt("Nombre de la legión:");
		provincia = prompt("Provincia:");
		
		centuria = new Centuria(nombre, legion, provincia);
		
		centuria.nombrecen = nombre;
		centuria.nombreleg = legion;
		centuria.provincia = provincia;
		
		$("#name").replaceWith(`<th id="name">Nombre: ${centuria._nombrecen}<br>Legión: ${centuria._nombreleg}<br>Provincia: ${centuria._provincia}</th>`);
		$("#total").replaceWith(`<th id="total">Total infantes: ${arrayCenturia.length}</th>`);
		$("#centurion").replaceWith(`<th id="centurion">Centurión no asignado</th>`);

		document.getElementById("create-centuria").disabled = true;
		document.getElementById("create-and-remove-centurion").disabled = false;
		document.getElementById("asign-infante").disabled = false;
}

function newCenturion(){ 

		var nombre = prompt("Nombre del centurión:");
		var edad = prompt("Edad:");
		var altura = prompt("Altura:");
		var tiempo = prompt("Años en el cargo:");
		
		centurion1 = new Centurion(nombre, edad, altura, tiempo);
		
		centurion1.nombre = nombre;
		centurion1.edad = edad;
		centurion1.altura = altura;
		centurion1.tiempo = tiempo;
		
		$("#centurion").replaceWith(`<th id="centurion">Centurión: ${centurion1._nombre}<br>Edad: ${centurion1._edad}<br>Altura: ${centurion1._altura} cm<br>Tiempo en el cargo: ${centurion1._tiempo}</th>`);	
		
		document.getElementById("order").disabled = false;
}

function newInfante(){
		
		var nombre = prompt("Nombre del soldado:");
		var edad = prompt("Edad:");
		var altura = prompt("Altura:");
		
		infante = new Infante(nombre, edad, altura);
		
		infante.nombre = nombre;
		infante.edad = edad;
		infante.altura = altura;

		if (infante.nombre !== "-"){		
			arrayReserva.push(infante);
			cargaReserva();
			document.getElementById("retirerment").disabled = false;
		}
		else{
			alert("Por favor, introduce un nombre correcto");
		}
}

function assignInf(){
		
		var nombre2 = prompt("Introduzca el nombre del soldado a asignar...")
		for (let i in arrayReserva){
			if (nombre2 == arrayReserva[i].nombre){
				centuria.addInf(i);
				arrayReserva.splice(i, 1);
				if (arrayReserva.length !== 0){
					cargaReserva();
					$("#total").replaceWith(`<th id="total">Total infantes: ${arrayCenturia.length}</th>`);
				}
				else{
					$("#list2 td").remove();
				}
			}
		}
		
		document.getElementById("remove-infante").disabled = false;
}

function retireInf(){
		
		var ind = prompt("Seleccione el index del soldado que desear retirar de la reserva...");
		
		if (arrayReserva[ind].edad > 45){
			$("#R"+ind).remove();
			alert(`El soldado ${arrayReserva[ind].nombre} ha sido dado de baja`);
			arrayReserva.splice(ind,1);
		}
		else{
		alert("El soldado aun no tiene edad para retirarse.");
		}
		
		cargaReserva();
}

function removeInf(){
		
		var ind = prompt("Seleccione el index del soldado que desea retirar de la centuria y devolver a la reserva...");
		
		$("#C"+ind).remove();
		alert(`El soldado ${arrayCenturia[ind].nombre} ha sido dado de baja`);
		arrayReserva.push(arrayCenturia[ind]);
		arrayCenturia.splice(ind,1);
		cargaCenturia();
		$("#total").replaceWith(`<th id="total">Total infantes: ${arrayCenturia.length}</th>`);
		cargaReserva();
}

function cargaReserva(){
		
		$("#list2 td").remove();
		for (let i in arrayReserva){
			$("#list2").append(`<tr id="R${i}"><td>${i}</td><td>${arrayReserva[i].nombre}</td><td>${arrayReserva[i].edad}</td><td>${arrayReserva[i].altura}</td></tr>`);
		}
}

function cargaCenturia(){
	
		$("#list1 td").remove();
		for (let i in arrayCenturia){
			$("#list1").append(`<tr id="C${i}"><td>${i}</td><td>${arrayCenturia[i].nombre}</td><td>${arrayCenturia[i].edad}</td><td>${arrayCenturia[i].altura}</td></tr>`);	
		}
}

function initialize(){
	
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
		arrayReserva.push(infante1);
		arrayReserva.push(infante2);
		arrayReserva.push(infante3);
		arrayReserva.push(infante4);
		arrayReserva.push(infante5);
		arrayReserva.push(infante6);
		arrayReserva.push(infante7);
		arrayReserva.push(infante8);
		arrayReserva.push(infante9);
		arrayReserva.push(infante10);
		cargaReserva();

		document.getElementById("initialize").disabled = true;
		document.getElementById("retirerment").disabled = false;
}