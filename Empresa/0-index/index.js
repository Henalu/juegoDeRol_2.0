//---------------------------------------- FUNCIONES INDEX ---------------------------------
function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    return localStorage.getItem(clave);
}

//--------------------Inicializamos datos basicos para el restaurante: menu, mesa y camareros-----------------------
class camarero{
    constructor(id, nombre, password){
        this.id = id;
        this.nombre = nombre;
        this.password = password;

        this.mesasActuales = [];
        this.mesasAtendidas = 0;
    }
    actualizarMesasActuales(mesa){
        this.mesasActuales.push(mesa);
    }
    añadirMesasAtendidas(){
        this.mesasActuales += 1;
    }
    finDeMes(){
        this.mesasActuales = 0;
    }
}

const camarero1 = new camarero(1, 'Sebas', 1234);
const camarero2 = new camarero(2, 'Ambar', 1234);
console.log(camarero1);

const listaCamarerosClass = [];
listaCamarerosClass.push(camarero1, camarero2);
console.log(listaCamarerosClass);

class mesa{
    constructor(numero){
        this.numero = numero;

        this.estado = '';
        this.idCamarero = 0;
        this.comanda = [];
    }
}

const listaMesasClass = [];


class articulo {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.descripciones = [];
    }
    añadirDescripcion(descripcion) {
        this.descripciones.push(descripcion);
    }
    borrarDescripcion(descripcion) {
        this.descripciones.pop(descripcion);
    }
}

class menu{
    constructor(titulo){
        this.titulo = titulo;
        this.articulosMenu = [];
    }

    añadirArticulos(articulo){
        this.articulosMenu.push(articulo);
    }
}

const tartaDeQueso = new articulo('Tarta de Queso', 4.99);
const flan = new articulo('Flan', 3.99);
tartaDeQueso.añadirDescripcion('Una deliciosa tarta de queso casera');
console.log(tartaDeQueso);

const menuPostres = new menu ('Menu de Postres');
menuPostres.añadirArticulos(tartaDeQueso);
menuPostres.añadirArticulos(flan);
console.log(menuPostres);

function iniciar() {
    if (localStorage.length == 0) {
        var listaCamareros = [];
        for (let i = 1; i < 5; i++) {
            var camarero = {
                id_camarero: `${i}`,
                nombre_camarero: `camarero${i}`,
                password: "1234",
                mesasActuales: {},
                mesasAtendidas: 0
            }
            listaCamareros.push(camarero);
        }
        subir("camarero", JSON.stringify(listaCamareros))

        var listaMesas = [];
        for (let i = 1; i < 11; i++) {

            var mesa = {
                numero: `${i}`,
                estado: 'cerrada',
                id_camarero: 0,
                comanda: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
            listaMesas.push(mesa);
        }

        subir("mesa", JSON.stringify(listaMesas));

        var menu = {
            "id_articulo": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            'nombre': ['Vino tinto', 'Vino blanco', 'Cerveza', 'Refresco', 'Zumo', 'Café', 'Café especial', 'Gazpacho', 'Ensalada mixta', 'Ensaladilla', 'Lasaña', 'Puré de verduras', 'Secreto ibérico', 'Escalope de pollo', 'Bacalao a la riojana', 'Hamburguesa', 'Tarta de queso', 'Fruta del tiempo', 'Flan de la casa', 'Tarta de la abuela', 'Varios'],
            'precio': [2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5]
        }
        subir('menu', JSON.stringify(menu));
    }
}

//Funcion logIn de camareros y admin
function iniciarSesion() {
    let loginUser = document.getElementById("a_nombre").value;
    let loginPass = document.getElementById("password").value;
    let users = JSON.parse(localStorage.camarero);
    let username = users.map(element => element.nombre_camarero);
    let password = users.map(element => element.password);
    let id_camarero = users.map(element => element.id_camarero);
    if (loginUser == "admin" && loginPass == "nimda") {
        window.location = "../admin/admin.html"
    }
    else {
        loginok = false
        for (let i = 0; i < username.length; i++) {
            if (loginUser == username[i] && loginPass == password[i]) {
                window.location = "../camarero/camarero.html";
                localStorage.setItem("camareroActual", id_camarero[i]);
                loginok = true
            }
        }
        if (!loginok) { alert("Usuario y/o contraseña incorrecta") }
    }
}

window.addEventListener('load', () => {
    iniciar();

    var i_iniciar_sesion = document.querySelector('#i_iniciar_sesion');
    i_iniciar_sesion.addEventListener('click', () => {
        iniciarSesion();
    });

});//Fin Load
