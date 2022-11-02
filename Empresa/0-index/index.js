//---------------------------------------- FUNCIONES INDEX ---------------------------------
function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    return localStorage.getItem(clave);
}

//--------------------Inicializamos datos basicos para el restaurante: menu, mesa y camareros-----------------------
export class usuario {
    constructor(nombre, password) {
        this.nombre = nombre;
        this.password = password;
    }

    login(nombre, password) {
        return this.nombre == nombre && this.password == password;
    }
}

export class camarero extends usuario {
    constructor(nombre, password) {
        super(nombre, password);
        // this.id = id;

        this.mesasActuales = [];
        this.mesasAtendidas = 0;
    }
    actualizarMesasActuales(mesa) {
        this.mesasActuales.push(mesa);
    }
    añadirMesasAtendidas() {
        this.mesasActuales += 1;
    }
    finDeMes() {
        this.mesasActuales = 0;
    }
}

export class admin extends usuario {
    constructor(nombre, password) {
        super(nombre, password);
        // this.id = id;
    }
}

export class mesa {
    constructor(numero) {
        this.numero = numero;

        this.estado = 'cerrada';
        this.nombreCamarero = '';
        this.comanda = [];
    }

    addComanda(...articulos){
        articulos.forEach(element =>{
            this.comanda.push(element);
        })
    }
}

export class articulo {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;

        this.cantidad = 0;
        this.descripciones = [];
    }
    addDescripcion(descripcion) {
        this.descripciones.push(descripcion);
    }
    borrarDescripcion(descripcion) {
        this.descripciones.pop(descripcion);
    }
}

export class menu {
    constructor(titulo) {
        this.titulo = titulo;
        this.articulosMenu = [];
    }

    addArticulos(...articulo) {
        articulo.forEach(element => {
            this.articulosMenu.push(element);
        });

    }
}

//Funcion logIn de camareros y admin
function iniciarSesion() {
    let loginUser = document.getElementById("a_nombre").value;
    let loginPass = document.getElementById("password").value;

    let camareros = JSON.parse(localStorage.listaCamareros);
    let entriesCamareros = Object.entries(camareros);
    let arrayCamareros = [];
    let arrayPasswords = [];

    if (loginUser == "admin" && loginPass == "1234") {
        window.location = "../admin/admin.html"
    }
    else {
        entriesCamareros.forEach(element => {
            arrayCamareros.push(element[1].nombre);
        });
        entriesCamareros.forEach(element => {
            arrayPasswords.push(element[1].password);
        });

        let login = false;

        for (let i = 0; i < arrayCamareros.length; i++) {
            if (loginUser == arrayCamareros[i] && loginPass == arrayPasswords[i]) {
                window.location = "../camarero/camarero.html";
                localStorage.setItem("camareroActual", JSON.stringify(arrayCamareros[i]));
                login = true;
            }
        }
        if(!login){
            alert("Usuario y/o contraseña incorrecta");
        }
    }
}

window.addEventListener('load', () => {
    if(localStorage.camareroActual){
        localStorage.setItem("camareroActual", 0);
    }
    
    if (localStorage.length == 0) {
        const admin1 = new admin('admin', 1234);
        localStorage.setItem('admin', JSON.stringify(admin1));

        const camarero1 = new camarero('camarero1', 1234);
        const camarero2 = new camarero('camarero2', 1234);
        const camarero3 = new camarero('camarero3', 1234);
        const camarero4 = new camarero('camarero4', 1234);

        const listaCamareros = { camarero1, camarero2, camarero3, camarero4 };
        localStorage.setItem('listaCamareros', JSON.stringify(listaCamareros));

        //Articulos del Menu
        const vinoTinto = new articulo('Vino tinto', 1.50);
        const vinoBlanco = new articulo('Vino blanco', 1.50);
        const cerveza = new articulo('cerveza', 1.50);
        const refresco = new articulo('refresco', 1.50);
        const zumo = new articulo('zumo', 1.50);

        const cafe = new articulo('cafe', 1);
        const cafeEspecial = new articulo('cafe Especial', 1.5);

        const gazpacho = new articulo('gazpacho', 5.2);
        const ensaladaMixta = new articulo('ensalada Mixta', 4.5);
        const ensaladilla = new articulo('ensaladilla', 5.5);
        const lasania = new articulo('lasaña', 6.3);
        const pureVerduras = new articulo('pure de verduras', 5.6);

        const secretoIberico = new articulo('secreto iberico', 10.5);
        const escalopePollo = new articulo('escalope pollo', 9.5);
        const bacalaoRiojana = new articulo('bacalao riojana', 12.5);
        const hamburguesa = new articulo('hamburguesa', 8.9);

        const tartaQueso = new articulo('tarta de queso', 2.99);
        const frutaTiempo = new articulo('fruta del tiempo', 1.6);
        const flan = new articulo('Flan', 3.99);

        tartaQueso.addDescripcion('Una deliciosa tarta de queso casera');

        //Mesas
        const listaMesas = [];
        let mesaI = 'mesa';
        for (let i = 1; i < 11; i++) {
            mesaI = new mesa(i);
            mesaI.addComanda(vinoTinto, vinoBlanco, cerveza, refresco, zumo, cafe, cafeEspecial, gazpacho, ensaladaMixta, ensaladilla, lasania, pureVerduras, secretoIberico, escalopePollo, bacalaoRiojana, hamburguesa, tartaQueso, frutaTiempo, flan);
            
            listaMesas.push(mesaI);
        }
        localStorage.setItem('listaMesas', JSON.stringify(listaMesas));

        //Menus:
        const primeros = new menu('Primeros');
        primeros.addArticulos(gazpacho, ensaladaMixta, ensaladilla, lasania, pureVerduras);
        // localStorage.setItem('primeros', JSON.stringify(primeros));

        const segundos = new menu('Segundos');
        segundos.addArticulos(secretoIberico, escalopePollo, bacalaoRiojana, hamburguesa);
        // localStorage.setItem('segundos', JSON.stringify(segundos));

        const bebidas = new menu('Bebidas');
        bebidas.addArticulos(vinoTinto, vinoBlanco, cerveza, refresco, zumo, cafe, cafeEspecial);
        // localStorage.setItem('bebidas', JSON.stringify(bebidas));

        const postres = new menu('Postres');
        postres.addArticulos(tartaQueso, frutaTiempo, flan);
        // localStorage.setItem('postres', JSON.stringify(postres));

        const menus = { primeros, segundos, bebidas, postres }
        localStorage.setItem('Menus', JSON.stringify(menus));
        
    }//Fin IF

    var i_iniciar_sesion = document.querySelector('button#i_iniciar_sesion');
    i_iniciar_sesion.addEventListener('click', () => {
        iniciarSesion();
    });

});//Fin Load
