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

    addComanda(...articulos) {
        articulos.forEach(element => {
            this.comanda.push(element);
        })
    }
}

export class articulo {
    constructor(nombre, precio, foto) {
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;

        this.cantidad = 0;
        this.descripciones = [];
    }
    addDescripcion(descripcion) {
        this.descripciones.push(descripcion);
    }
    borrarDescripcion(descripcion) {
        this.descripciones.pop(descripcion);
    }
    addFoto(descripcion) {
        this.descripciones.push(descripcion);
    }
    borrarFoto(descripcion) {
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

//Articulos Menu
export const vinoTinto = new articulo('Vino tinto', 1.50, 'https://cdn.pixabay.com/photo/2017/06/26/12/49/red-wine-2443699_960_720.jpg');
export const vinoBlanco = new articulo('Vino blanco', 1.50, 'https://cdn.pixabay.com/photo/2017/09/26/16/44/wine-2789265_960_720.jpg');
export const cerveza = new articulo('cerveza', 1.50, 'https://cdn.pixabay.com/photo/2017/06/24/23/41/beer-2439237__340.jpg');
export const refresco = new articulo('refresco', 1.50, 'https://cdn.pixabay.com/photo/2014/09/26/19/51/drink-462776__340.jpg');
export const zumo = new articulo('zumo', 1.50, 'https://cdn.pixabay.com/photo/2017/03/04/21/28/orange-juice-2117019__340.jpg');

export const cafe = new articulo('cafe', 1, 'https://cdn.pixabay.com/photo/2013/08/11/19/46/coffee-171653__340.jpg');
export const cafeEspecial = new articulo('cafe Especial', 1.5, 'https://cdn.pixabay.com/photo/2017/09/04/18/39/coffee-2714970__340.jpg');

export const gazpacho = new articulo('gazpacho', 5.2, 'https://cdn.pixabay.com/photo/2017/05/05/19/06/tomato-soup-2288056__340.jpg');
export const ensaladaMixta = new articulo('ensalada Mixta', 4.5, 'https://cdn.pixabay.com/photo/2016/09/15/19/24/salad-1672505__340.jpg');
export const ensaladilla = new articulo('ensaladilla', 5.5, 'https://cdn.pixabay.com/photo/2018/08/10/15/11/eggs-3597043__340.jpg');
export const lasania = new articulo('lasaña', 6.3, 'https://cdn.pixabay.com/photo/2015/05/03/18/35/lasagna-751504__340.jpg');
export const pureVerduras = new articulo('pure de verduras', 5.6, 'https://cdn.pixabay.com/photo/2015/05/04/10/16/vegetables-752153__340.jpg');

export const secretoIberico = new articulo('secreto iberico', 10.5, 'https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132__340.jpg');
export const escalopePollo = new articulo('pollo en salsa', 9.5, 'https://cdn.pixabay.com/photo/2019/07/17/08/21/chicken-4343402__340.jpg');
export const bacalaoRiojana = new articulo('salmon', 12.5, 'https://cdn.pixabay.com/photo/2016/03/05/19/02/salmon-1238248__340.jpg');
export const hamburguesa = new articulo('hamburguesa', 8.9, 'https://cdn.pixabay.com/photo/2016/03/26/23/19/hamburger-1281855__340.jpg');

export const tartaQueso = new articulo('tarta de queso', 2.99, 'https://cdn.pixabay.com/photo/2018/07/22/18/26/cake-3555186__340.jpg');
export const frutaTiempo = new articulo('fruta del tiempo', 1.6, 'https://cdn.pixabay.com/photo/2017/05/11/19/44/fresh-fruits-2305192__340.jpg');
export const flan = new articulo('Flan', 3.99, 'https://cdn.pixabay.com/photo/2017/01/06/17/18/caramel-1958358_960_720.jpg');

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
                localStorage.setItem("camareroActual", JSON.stringify(arrayCamareros[i]));
                login = true;
                window.location = "../camarero/camarero.html";
            }
        }
        if (!login) {
            alert("Usuario y/o contraseña incorrecta");
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.camareroActual) {
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

    var i_iniciar_sesion = document.querySelector('#i_iniciar_sesion');
    i_iniciar_sesion.addEventListener('click', () => {
        iniciarSesion();
    });

});//Fin Load
