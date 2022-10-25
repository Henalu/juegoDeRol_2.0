//---------------------------------------- FUNCIONES INDEX ---------------------------------
function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    return localStorage.getItem(clave);
}

//--------------------Inicializamos datos basicos para el restaurante: menu, mesa y camareros-----------------------
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
    i_iniciar_sesion.addEventListener('click', ()=>{
        iniciarSesion();
    });

});//Fin Load
