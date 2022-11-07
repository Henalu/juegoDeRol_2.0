// ---------------------------------------------- FUNCIONES ADMIN -------------------------------------
function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    return localStorage.getItem(clave);
}

import { camarero, menu, mesa } from "../0-index/index.js";
import { vinoTinto, vinoBlanco, cerveza, refresco, zumo, cafe, cafeEspecial, gazpacho, ensaladaMixta, ensaladilla, lasania, pureVerduras, secretoIberico, escalopePollo, bacalaoRiojana, hamburguesa, tartaQueso, frutaTiempo, flan } from "../0-index/index.js";
import { borrarChild } from "../camarero/camarero.js";

function borraMesas() {
    var mesasA = document.querySelector('#a_mesas');
    borrarChild(mesasA);
}
//Datos Camareros
function mostrarDatos() {
    let camareros = JSON.parse(localStorage.listaCamareros);
    console.log(camareros);
    let entriesCamareros = Object.entries(camareros);
    console.log(entriesCamareros);
    let nombresCamareros = [];
    let passwordCamareros = [];
    entriesCamareros.forEach(element => {
        nombresCamareros.push(element[1].nombre)
    });
    console.log(nombresCamareros);
    entriesCamareros.forEach(element => {
        passwordCamareros.push(element[1].password)
    });
    console.log(passwordCamareros);

    let rendimiento = document.querySelectorAll(".a_rendimiento");

    var placeholders_name = document.getElementsByClassName("userName");
    var placeholders_pass = document.getElementsByClassName("userPass");
    for (let i = 0; i < placeholders_name.length; i++) {
        placeholders_name[i].value = nombresCamareros[i];
        placeholders_pass[i].value = passwordCamareros[i];
    }

    var mesas = JSON.parse(localStorage.listaMesas);

    for (let i = 0; i < mesas.length; i++) {
        if (mesas[i].estado == 'abierta' && mesas[i].nombreCamarero == nombresCamareros[0]) {
            rendimiento[0].innerHTML += `${(mesas[i].numero)}, `
        }
        if (mesas[i].estado == 'abierta' && mesas[i].nombreCamarero == nombresCamareros[1]) {
            rendimiento[1].innerHTML += `${(mesas[i].numero)}, `
        }
        if (mesas[i].estado == 'abierta' && mesas[i].nombreCamarero == nombresCamareros[2]) {
            rendimiento[2].innerHTML += `${(mesas[i].numero)}, `
        }
        if (mesas[i].estado == 'abierta' && mesas[i].nombreCamarero == nombresCamareros[3]) {
            rendimiento[3].innerHTML += `${(mesas[i].numero)}, `
        }
    }
}

//Cambiar datos camareros
function guardarCambios() {
    var placeholders_name = document.getElementsByClassName("userName");
    var placeholders_pass = document.getElementsByClassName("userPass");
    var names = [];
    var pass = [];
    let camareros = JSON.parse(localStorage.listaCamareros);
    let arrayCamareros = Object.values(camareros);
    console.log(arrayCamareros);
    for (let i = 0; i < placeholders_name.length; i++) {
        names.push(placeholders_name[i].value);
        pass.push(placeholders_pass[i].value);
    };

    for (let k = 0; k < placeholders_name.length; k++) {
        arrayCamareros[k].nombre = names[k];
        arrayCamareros[k].password = pass[k];
    };

    localStorage.setItem("listaCamareros", JSON.stringify(arrayCamareros))
}

//Mesas
function cargarMesas() {
    borraMesas();
    let mesas = JSON.parse(localStorage.getItem('listaMesas'));
    for (let i = 0; i < mesas.length; i++) {
        var divMesa = document.createElement('div');
        divMesa.className = `a_mesas`;
        var numero = document.createTextNode((mesas[i].numero));
        divMesa.appendChild(numero);
        document.querySelector('#a_mesas').appendChild(divMesa);
    }
};

//Menus
function cargarMenus() {
    var menus = JSON.parse(localStorage.getItem('Menus'));
    menus = Object.entries(menus);
    console.log(menus);
    const selectMenus = document.getElementById('a_select_menu');

    menus.forEach(element => {
        const option = document.createElement('option');
        option.append(element[0]);
        option.setAttribute('value', element[0]);
        selectMenus.append(option);
    });
};

function pintarMenu(listaMenus, menuSeleccionado) {
    let mostrarMenu = document.getElementById('a_mostrar_menu');
    mostrarMenu.style.display = 'flex';
    borrarChild(mostrarMenu);

    let articulosMenu = listaMenus[`${menuSeleccionado}`].articulosMenu;
    let h2 = document.createElement('h2');
    h2.append(menuSeleccionado.toUpperCase());
    mostrarMenu.append(h2);

    articulosMenu.forEach(element => {
        let div = document.createElement('div');
        div.setAttribute('class', 'a_articulo_menu');
        let img = document.createElement('img');
        img.setAttribute('class', 'a_foto_articulo');
        let spanNombre = document.createElement('span');
        let spanPrecio = document.createElement('span');
        let p = document.createElement('p');
        spanNombre.append(element.nombre);
        spanPrecio.append(element.precio.toFixed(2) + '€');
        p.append(spanNombre);
        p.append(spanPrecio);

        if (element.foto == undefined) {
            element.foto = 'https://cdn.pixabay.com/photo/2017/09/22/19/05/casserole-dish-2776735_960_720.jpg';
            img.setAttribute('src', `${element.foto}`);
        } else {
            img.setAttribute('src', `${element.foto}`);
        }

        div.append(img);
        div.append(p);
        if (element.descripcion != undefined) {
            div.append(element.descripcion);
        }
        mostrarMenu.append(div);
    });
}

function cargaMenuSeleccionado() {
    let tabla = document.getElementById("a_tablaMenus");

    const selectMenus = document.getElementById('a_select_menu');
    const selectArticulo = document.getElementById('a_select_articulo');

    var menus = JSON.parse(localStorage.getItem('Menus'));
    menus = Object.entries(menus);
    var articulosMenu = '';
    var menuElegido = '';
    const opciones = document.querySelectorAll('#a_select_menu option');
    menuElegido = selectMenus.value;
    //Crear tabla de Menu
    if (menuElegido != opciones[0].value) {
        borrarChild(tabla);

        const tr = document.createElement('tr');
        const thPrecio = document.createElement('th');
        const thArticulo = document.createElement('th');
        thArticulo.append('Articulos');
        thPrecio.append('Precio');
        tr.append(thArticulo);
        tr.append(thPrecio);
        tabla.append(tr);

        menus.forEach(element => {
            if (element[0] == menuElegido) {
                const articulosMenu = (element[1].articulosMenu);

                let articulos = [];
                let precios = [];
                for (let j = 0; j < articulosMenu.length; j++) {
                    articulos.push(articulosMenu[j].nombre);
                    precios.push(articulosMenu[j].precio);
                }

                for (let i = 0; i < articulos.length; i++) {
                    var fila = document.createElement("tr");
                    var articulo = document.createElement("td");
                    var precio = document.createElement("td");

                    articulo.innerHTML = articulos[i];
                    articulo.setAttribute("class", "a_articulos")
                    precio.innerHTML = precios[i];
                    fila.append(articulo);
                    fila.append(precio);
                    tabla.append(fila);
                }
            }
        });

    }

    //Cargar opciones del select de articulos
    if (menuElegido != opciones[0].value) {
        borrarChild(selectArticulo);
        for (let i = 0; i < menus.length; i++) {
            if (menuElegido == menus[i][0]) {
                articulosMenu = menus[i][1].articulosMenu;
                console.log(articulosMenu);
            }
        }

        for (let i = 0; i < articulosMenu.length; i++) {
            const option = document.createElement('option');
            option.append(articulosMenu[i].nombre);
            option.setAttribute('value', articulosMenu[i].nombre);
            selectArticulo.append(option);
        }
    }
    return [articulosMenu, menuElegido, menus];
}

function borrarArticulos(menuElegido) {
    const selectArticulo = document.getElementById('a_select_articulo');
    var articuloElegido = selectArticulo.value;

    var menusLS = JSON.parse(localStorage.getItem('Menus'));
    var mesas = JSON.parse(localStorage.getItem('listaMesas'));

    var borrado = [];
    menusLS[`${menuElegido}`].articulosMenu.filter(element => {
        if (element.nombre != articuloElegido) {
            borrado.push(element);
        }
    });
    menusLS[`${menuElegido}`].articulosMenu = borrado;

    var borradoComanda = [];
    mesas[0].comanda.filter(element => {
        if (element.nombre != articuloElegido) {
            borradoComanda.push(element);
        }
    });
    mesas.forEach(mesa => mesa.comanda = borradoComanda);

    localStorage.setItem('Menus', JSON.stringify(menusLS));
    localStorage.setItem('listaMesas', JSON.stringify(mesas));
}

function addArticulos(articulosMenu, menuElegido) {
    var articulo = document.getElementsByName('articulo')[0].value;
    var precio = document.getElementsByName('precio')[0].value;
    precio = parseFloat(precio);
    console.log(precio);
    var foto = document.getElementsByName('foto')[0].value;
    if (foto == '') {
        foto = undefined;
    }
    var descripcion = document.getElementsByName('descripcion')[0].value;

    console.log(articulosMenu);

    var menusLS = JSON.parse(localStorage.getItem('Menus'));
    var mesas = JSON.parse(localStorage.getItem('listaMesas'));
    let busqueda = false;
    let posicion = 0;
    for (let j = 0; j < menusLS[`${menuElegido}`].articulosMenu.length; j++) {
        if (menusLS[`${menuElegido}`].articulosMenu[j].nombre == articulo) {
            busqueda = true;
            posicion = j;
        }
    };
    console.log('busqueda final: ', busqueda, 'en posicion: ', posicion);

    if (busqueda == false) {
        let nuevoArticulo = {
            'nombre': `${articulo}`,
            'precio': precio,
            'foto': foto,
            'cantidad': 0,
            'descripciones': `${descripcion}`
        }
        console.log(nuevoArticulo);
        menusLS[`${menuElegido}`].articulosMenu.push(nuevoArticulo);
        mesas.forEach(mesa => mesa.comanda.push(nuevoArticulo));
    } else {
        menusLS[`${menuElegido}`].articulosMenu[`${posicion}`].precio = precio;
        mesas.forEach(mesa => mesa.comanda.precio = precio);
    }
    console.log(menusLS);
    localStorage.setItem('Menus', JSON.stringify(menusLS));
    localStorage.setItem('listaMesas', JSON.stringify(mesas));
}

//---------------------------------------- GRAFICA RESULTADOS -------------------------------------------------------------------------------------
function cargarGraficos(num) {
    // DATOS -------------

    var tickets = JSON.parse(bajar('ticket'))
    let camareros = JSON.parse(localStorage.listaCamareros);
    let arrayCamareros = Object.values(camareros);
    var total = [0]
    var total1 = [0]
    var total2 = [0]
    var total3 = [0]
    var total4 = [0]
    var mesas = 0, mesas1 = 0, mesas2 = 0, mesas3 = 0, mesas4 = 0;
    var sTotal = 0, sTotal1 = 0, sTotal2 = 0, sTotal3 = 0, sTotal4 = 0;
    if (tickets != null) {
        for (let i = 0; i < tickets.length; i++) {
            total.push(tickets[i].total)
            if (tickets[i].nombre_camarero == arrayCamareros[0].nombre) {
                total1.push(tickets[i].total)
            }
            if (tickets[i].nombre_camarero == arrayCamareros[1].nombre) {
                total2.push(tickets[i].total)
            }
            if (tickets[i].nombre_camarero == arrayCamareros[2].nombre) {
                total3.push(tickets[i].total)
            }
            if (tickets[i].nombre_camarero == arrayCamareros[3].nombre) {
                total4.push(tickets[i].total)
            }
        }
        mesas = total.length - 1;
        mesas1 = total1.length - 1;
        mesas2 = total2.length - 1;
        mesas3 = total3.length - 1;
        mesas4 = total4.length - 1;
        sTotal = total.reduce(function (a, b) { return a + b });
        sTotal1 = total1.reduce(function (a, b) { return a + b });
        sTotal2 = total2.reduce(function (a, b) { return a + b });
        sTotal3 = total3.reduce(function (a, b) { return a + b });
        sTotal4 = total4.reduce(function (a, b) { return a + b });
    } else {
        document.getElementById('a_resultados').innerHTML = "No hay datos"
    }
    /*---- Config graficas ----*/
    const labels = [
        'total',
        arrayCamareros[0].nombre,
        arrayCamareros[1].nombre,
        arrayCamareros[2].nombre,
        arrayCamareros[3].nombre
    ];
    const DATA_COUNT = 4;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Mesas servidas',
            backgroundColor: 'black',
            borderColor: 'black',
            data: [mesas, mesas1, mesas2, mesas3, mesas4]
        }]
    };

    const config = {
        type: 'bar',
        data: data, min: 0,
        options: {}
    };

    const labels1 = [
        'total',
        arrayCamareros[0].nombre,
        arrayCamareros[1].nombre,
        arrayCamareros[2].nombre,
        arrayCamareros[3].nombre
    ];
    const DATA_COUNT1 = 5;
    const data1 = {
        labels: labels1,
        datasets: [{
            label: 'Importe total',
            backgroundColor: 'black',
            borderColor: 'black',
            data: [sTotal, sTotal1, sTotal2, sTotal3, sTotal4]
        }]
    };

    const config1 = {
        type: 'bar',
        data: data1, min: 0,
        options: {}
    };

    switch (num) {
        case 0:
            document.getElementById('a_resultados').innerHTML = ""
            var canvas = document.createElement('canvas')
            canvas.setAttribute('id', 'myChart')
            document.getElementById('a_resultados').append(canvas)
            const myChart = new Chart(
                document.getElementById('myChart'),
                config
            );

            break;
        case 1:
            document.getElementById('a_resultados').innerHTML = ""
            var canvas = document.createElement('canvas')
            canvas.setAttribute('id', 'myChart1')
            document.getElementById('a_resultados').append(canvas)
            const myChart1 = new Chart(
                document.getElementById('myChart1'),
                config1
            );

    }

}

window.addEventListener('DOMContentLoaded', () => {
    var options = document.getElementById('a_options');
    var gestion = document.getElementById('a_gestion');
    var contenedorMesas = document.getElementById('a_contenedor_mesas');
    var contenedorMenus = document.getElementById('a_contenedor_menus');
    var stats = document.getElementById('a_stats');

    var verEmpleados = document.querySelector('.a_ver_empleados');
    var verMesas = document.querySelector('.a_ver_mesas');
    var verMenus = document.querySelector('.a_ver_menus');
    var verStats = document.querySelector('.a_ver_stats');

    verEmpleados.addEventListener('click', () => {
        options.style.display = 'none';
        gestion.style.display = 'flex';
    });
    verMesas.addEventListener('click', () => {
        options.style.display = 'none';
        contenedorMesas.style.display = 'flex';
    });
    verMenus.addEventListener('click', () => {
        options.style.display = 'none';
        contenedorMenus.style.display = 'flex';

        let menus = document.getElementById('a_menus');
        menus.style.display = 'flex';

        const edit = document.getElementById('a_edit');
        edit.style.display = 'flex';
    });
    verStats.addEventListener('click', () => {
        options.style.display = 'none';
        stats.style.display = 'flex';
    });

    cargarMesas();

    //Boton Volver
    var volver = document.querySelectorAll('.a_volver');
    volver.forEach(element => {
        element.addEventListener('click', (() => {
            options.style.display = 'flex';
            gestion.style.display = 'none';
            contenedorMesas.style.display = 'none';
            contenedorMenus.style.display = 'none';
            stats.style.display = 'none';

            let mostrarMenu = document.getElementById('a_mostrar_menu');
            mostrarMenu.style.display = 'none';
            borrarChild(mostrarMenu);

            var editMenu = document.getElementById('a_edit_menu');
            editMenu.style.display = 'none';
        }));
    });

    //Datos Camareros
    var a_mostrar_datos = document.querySelector('#a_mostrar_datos');
    a_mostrar_datos.addEventListener('click', () => {
        mostrarDatos();
    });

    var a_guardar_cambios = document.querySelector('#a_guardar_cambios');
    a_guardar_cambios.addEventListener('click', () => {
        guardarCambios();
    });

    //Graficos
    var resultados = document.querySelectorAll('.a_resultados1');
    resultados[1].addEventListener('click', () => {
        cargarGraficos(0);
    });
    resultados[2].addEventListener('click', () => {
        cargarGraficos(1);
    });

    //Mesas
    const botonCrearMesa = document.getElementById('a_crear_mesa');
    botonCrearMesa.addEventListener('click', () => {
        let mesas = JSON.parse(localStorage.getItem('listaMesas'));
        let nuevaMesa = new mesa(mesas.length + 1);
        nuevaMesa.addComanda(vinoTinto, vinoBlanco, cerveza, refresco, zumo, cafe, cafeEspecial, gazpacho, ensaladaMixta, ensaladilla, lasania, pureVerduras, secretoIberico, escalopePollo, bacalaoRiojana, hamburguesa, tartaQueso, frutaTiempo, flan);
        mesas.push(nuevaMesa);
        localStorage.setItem('listaMesas', JSON.stringify(mesas));
        cargarMesas();
    });

    const botonBorrarMesa = document.getElementById('a_borrar_mesa');
    botonBorrarMesa.addEventListener('click', () => {
        let mesas = JSON.parse(localStorage.getItem('listaMesas'));
        if (mesas[mesas.length - 1].estado != 'abierta') {
            mesas.pop();
        } else {
            alert('esta mesa se encuentra abierta actualmente, intente borrarla más tarde');
        }
        localStorage.setItem('listaMesas', JSON.stringify(mesas));
        cargarMesas();
    });

    //Ver Menus
    cargarMenus();

    var listaMenus = JSON.parse(localStorage.getItem('Menus'));
    var menu = document.querySelectorAll('.a_menu');
    menu.forEach(element => {
        element.addEventListener('click', () => {
            let menus = document.getElementById('a_menus');
            menus.style.display = 'none';
            var menuSeleccionado = element.getAttribute('id');
            pintarMenu(listaMenus, menuSeleccionado);

            var menush2 = document.querySelector('#a_contenedor_menus h2');
            menush2.innerHTML = 'Volver a Menus';
            menush2.addEventListener('click', () => {
                let menus = document.getElementById('a_menus');
                menus.style.display = 'flex';
                let mostrarMenu = document.getElementById('a_mostrar_menu');
                mostrarMenu.style.display = 'flex';
                borrarChild(mostrarMenu);

                menush2.innerHTML = 'Menus';
            });
        });
    });

    //Edit Menus
    const edit = document.getElementById('a_edit');
    edit.addEventListener('click', () => {
        let menus = document.getElementById('a_menus');
        menus.style.display = 'none';
        edit.style.display = 'none';

        var editMenu = document.getElementById('a_edit_menu');
        editMenu.style.display = 'flex';

        var menush2 = document.querySelector('#a_contenedor_menus h2');
        menush2.innerHTML = 'Volver a Menus';
        menush2.addEventListener('click', () => {
            menus.style.display = 'flex';
            edit.style.display = 'flex';
            editMenu.style.display = 'none';

            menush2.innerHTML = 'Menus';
        });
    });

    const botonVerMenu = document.getElementById('a_boton_verMenu');
    var seleccion = '';
    botonVerMenu.addEventListener('click', () => {
        seleccion = cargaMenuSeleccionado();
        console.log(seleccion);
    });

    const botonBorrar = document.getElementById('a_botonBorrar_Articulo');
    botonBorrar.addEventListener('click', () => {
        console.log(seleccion);
        borrarArticulos(seleccion[1]);
        cargaMenuSeleccionado();
    });

    const botonAdd = document.getElementById('a_boton_addArticulo');
    botonAdd.addEventListener('click', () => {
        addArticulos(seleccion[0], seleccion[1]);
        cargaMenuSeleccionado()
    });

});