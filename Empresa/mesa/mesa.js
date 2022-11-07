//Importar
import { Ticket } from "../ticket/ticket.js";
// import { mesa } from "../0-index/index.js";

function borrarChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Iniciar desplegables del Menu
function iniciarDesplegables() {
    const allMenus = JSON.parse(localStorage.getItem('Menus'));
    var menuBebidas = allMenus.bebidas.articulosMenu;
    var menuPrimeros = allMenus.primeros.articulosMenu;
    var menuSegundos = allMenus.segundos.articulosMenu;
    var menuPostres = allMenus.postres.articulosMenu;
    var desplegables = document.getElementsByClassName('m_desplegables');

    for (let i = 0; i < menuBebidas.length; i++) {
        //Bebidas
        let li = document.createElement('li');
        desplegables[0].append(li);

        li.innerHTML = (`<span class = 'articulo'>${menuBebidas[i].nombre}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);
    };

    for (let j = 0; j < menuPrimeros.length; j++) {
        //Primeros
        let li = document.createElement('li');
        desplegables[1].append(li);

        li.innerHTML = (`<span class = 'articulo'>${menuPrimeros[j].nombre}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);
    }

    for (let i = 0; i < menuSegundos.length; i++) {
        //Segundos
        let li = document.createElement('li');
        desplegables[2].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menuSegundos[i].nombre}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);
    }

    for (let i = 0; i < menuPostres.length; i++) {
        //Postres
        let li = document.createElement('li');
        desplegables[3].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menuPostres[i].nombre}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);
    }

}

//Añadir y quitar cantidades de cada elemento del menu
function sumarYRestar(valorSpan, spanRestar, spanSumar) {
    var restar = document.getElementsByClassName(`${spanRestar}`);
    var sumar = document.getElementsByClassName(`${spanSumar}`);
    var spanCantidad = document.getElementsByClassName(`${valorSpan}`);

    for (let i = 0; i < sumar.length; i++) {
        restar[i].addEventListener('click', () => {
            let numero = parseInt(spanCantidad[i].innerHTML);
            if (numero > 0) {
                spanCantidad[i].innerHTML = numero - 1;
            } else {
                spanCantidad[i].innerHTML = numero;
            }
        });
        sumar[i].addEventListener('click', () => {
            let numero = parseInt(spanCantidad[i].innerHTML);
            spanCantidad[i].innerHTML = numero + 1;
        });
    }
}

//Funcion para borrar la comanda una vez se genere la cuenta
function borraComanda() {
    var mostrarComanda = document.querySelector('#m_comanda');
    borrarChild(mostrarComanda);
}

//funcion desplegables para reutilizar en los clicks
function desplegar(desplegable) {
    let display = desplegable.style.display;
    if (display == 'none') {
        desplegable.style.display = 'block';
    } else {
        desplegable.style.display = 'none';
    }
}

//Añadir elementos a la comanda
function adicionarComanda(camareroActual, mesas, mesaActual, comanda) {
    //Añadir cantidades
    var spanCantidad = document.getElementsByClassName('cantidad');
    var spanArticulo = document.getElementsByClassName('articulo');

    for (let i = 0; i < spanCantidad.length; i++) {
        let articulo = spanArticulo[i].innerHTML;
        let cantidad = parseInt(spanCantidad[i].innerHTML);
        if (cantidad > 0 && articulo == comanda[i].nombre) {
            comanda[i].cantidad += cantidad;
        }
        spanCantidad[i].innerHTML = 0;
    }
    mesas[mesaActual.numero - 1].comanda = comanda;
    mesas[mesaActual.numero - 1].nombreCamarero = camareroActual;
    localStorage.setItem('listaMesas', JSON.stringify(mesas));
    verComanda(comanda);

    return [mesas, mesaActual.numero, camareroActual, comanda]
}

//Guardar comanda editada
function guardar(camareroActual, mesas, mesaActual, comanda) {
    var spanArticulo = document.getElementsByClassName('nombreElemento');
    var spanCantidad = document.getElementsByClassName('cantidadElemento');

    let articulos = [];
    let cantidades = [];

    for (let i = 0; i < spanArticulo.length; i++) {
        articulos.push(spanArticulo[i].innerHTML);
        cantidades.push(parseInt(spanCantidad[i].innerHTML));
    }

    for (let i = 0; i < comanda.length; i++) {
        for (let j = 0; j < articulos.length; j++) {
            if (articulos[j] == comanda[i].nombre) {
                comanda[i].cantidad = cantidades[j];
            }
        }
    }

    mesas[mesaActual.numero - 1].comanda = comanda;
    mesas[mesaActual.numero - 1].nombreCamarero = camareroActual;
    localStorage.setItem('listaMesas', JSON.stringify(mesas));
}

//Muestra la comanda de la mesa Actual
function verComanda(comanda) {
    borraComanda();
    // const allMenus = JSON.parse(localStorage.getItem('Menus'));
    // var menuBebidas = allMenus.bebidas.articulosMenu;
    var mostrarComanda = document.querySelector('#m_comanda');
    let ul = document.createElement('ul');

    let h2 = document.createElement('h2');
    h2.innerHTML = 'Comanda';

    mostrarComanda.append(h2);
    mostrarComanda.append(ul);

    for (let j = 0; j < comanda.length; j++) {
        if (comanda[j].cantidad > 0) {
            let li = document.createElement('li');
            li.setAttribute('class', 'articuloComanda');
            li.innerHTML = `<span class='nombreElemento'>${comanda[j].nombre}</span>: <span class='cantidadElemento'>${comanda[j].cantidad}</span>`
            ul.append(li);
        }
    }
}

//Cerrar Mesa
function cerrarMesa(mesas, mesaActual, camareroActual) {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();

    let camareros = JSON.parse(localStorage.getItem('listaCamareros'));
    let entriesCamareros = Object.entries(camareros);
    let nombresCamareros = [];
    entriesCamareros.forEach(element => {
        nombresCamareros.push(element[1].nombre);
    });

    var camareroActual = localStorage.getItem("camareroActual")

    var total = 0;
    var pagado = false;
    var ticketsLista = JSON.parse(localStorage.getItem("ticket"));
    var inicioTicket = [];
    for (let i = 0; i < mesas[mesaActual - 1].comanda.length; i++) {
        total += mesas[mesaActual - 1].comanda[i].cantidad * mesas[mesaActual - 1].comanda[i].precio;
    }
    if (!ticketsLista) {
        var newTicket = new Ticket(0, fechaticket, mesaActual, JSON.parse(camareroActual), mesas[mesaActual - 1].comanda, total, pagado);
        inicioTicket.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(inicioTicket))
    } else {
        var id_anterior = ticketsLista[ticketsLista.length - 1].id_ticket + 1;
        var newTicket = new Ticket(id_anterior, fechaticket, mesaActual, JSON.parse(camareroActual), mesas[mesaActual - 1].comanda, total, pagado);
        ticketsLista.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(ticketsLista))
    }

    //Reseteamos los valores de la mesa y añadimos mesas atendidas al camarero
    mesas[mesaActual - 1].estado = 'cerrada';
    mesas[mesaActual - 1].nombreCamarero = '';
    mesas[mesaActual - 1].comanda.forEach(element => {
        element.cantidad = 0;
    });
    localStorage.setItem('listaMesas', JSON.stringify(mesas));

    let mesasAct = camareros[JSON.parse(camareroActual)].mesasActuales;
    mesasAct = mesasAct.filter(element => element != mesaActual + 1);

    camareros[JSON.parse(camareroActual)].mesasActuales = mesasAct;

    let mesasAtendidas = camareros[JSON.parse(camareroActual)].mesasAtendidas;
    camareros[JSON.parse(camareroActual)].mesasAtendidas = mesasAtendidas + 1;
    localStorage.setItem("listaCamareros", JSON.stringify(camareros));

    window.location = '../camarero/camarero.html';
}

window.addEventListener('DOMContentLoaded', () => {
    var camareroActual = JSON.parse(localStorage.getItem('camareroActual'));
    var mesas = JSON.parse(localStorage.getItem('listaMesas'));
    var mesaActual = mesas[localStorage.mesaActual];
    var comanda = mesaActual.comanda;

    document.querySelector('h1').innerHTML = 'Mesa' + ' ' + (mesaActual.numero);
    document.querySelector('#m_cerrarMesa').innerHTML = 'Generar Cuenta Mesa' + ' ' + (mesaActual.numero);

    iniciarDesplegables();
    sumarYRestar('cantidad', 'restar', 'sumar');
    verComanda(comanda);

    //Añadir elementos a la comanda
    var addElement = document.getElementById('m_addElement');
    addElement.addEventListener('click', () => {
        adicionarComanda(camareroActual, mesas, mesaActual, comanda);
        verComanda(comanda);
    });

    //Generar ticket y cerrar mesa
    var cerrar = document.querySelector('#m_cerrarMesa');
    cerrar.addEventListener('click', () => {
        cerrarMesa(mesas, mesaActual.numero, camareroActual);
    });

    //Estilo desplegable
    var desplegables = document.getElementsByClassName('m_desplegables');
    var opciones = document.querySelectorAll('.m_opciones h2');
    for (let i = 0; i < opciones.length; i++) {
        opciones[i].addEventListener('click', () => {
            desplegar(desplegables[i]);
        });
    }

    //Opcion de editar elementos Comanda
    var editComanda = document.getElementById('m_editar');
    editComanda.addEventListener('click', () => {
        var guardarEdit = document.getElementById('m_guardar_edit');
        var articulosComanda = document.querySelectorAll('.articuloComanda');
        var nombreElemento = document.querySelectorAll('.nombreElemento');
        var cantidadElemento = document.querySelectorAll('.cantidadElemento');

        if (editComanda.innerHTML == 'Editar Comanda') {
            editComanda.innerHTML = 'Salir';
            guardarEdit.style.display = 'block';
            for (let i = 0; i < articulosComanda.length; i++) {
                articulosComanda[i].innerHTML = (`<span class='nombreElemento'>${nombreElemento[i].innerHTML}</span> <span class = 'restarEdit'>-</span> <span class='cantidadElemento'>${cantidadElemento[i].innerHTML}</span> <span class='sumarEdit'>+</span>`);
            }
            sumarYRestar('cantidadElemento','restarEdit', 'sumarEdit');
        } else {
            editComanda.innerHTML = 'Editar Comanda';
            guardarEdit.style.display = 'none';
            verComanda(comanda);
        }

        guardarEdit.addEventListener('click', () => {
            guardar(camareroActual, mesas, mesaActual, comanda);
            editComanda.innerHTML = 'Editar Comanda';
            guardarEdit.style.display = 'none';

            verComanda(comanda);
        });

    });


});//Fin load