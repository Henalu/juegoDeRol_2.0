function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    return localStorage.getItem(clave);
}

function borrarChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

import { consulta_ticket } from "../../Clientes/ticket/ticket.js";
import { Ticket } from "../../Clientes/ticket/ticket.js";
// class Ticket {
//     constructor(id_ticket, fecha, id_mesa, nombre_camarero, comanda, total, pagado) {
//         this.id_ticket = id_ticket;
//         this.fecha = fecha;
//         this.id_mesa = id_mesa;
//         this.nombre_camarero = nombre_camarero;
//         this.comanda = comanda;
//         this.total = total;
//         this.pagado = pagado;
//     }
// }

//Baja datos de las mesas y camarero logueado - llama a la función que carga la info
function camareroIn() {
    let camareros = JSON.parse(localStorage.listaCamareros);
    let arrayCamareros = Object.values(camareros);
    var camareroActual = JSON.parse(localStorage.getItem('camareroActual'));
    var mesas = JSON.parse(localStorage.listaMesas);
    document.getElementById('c_nombre').innerHTML = camareroActual.toUpperCase();
    cargarMesas(camareroActual, mesas);
}


function borraMesas() {
    var mesasA = document.querySelector('.c_cpntainer1');
    var mesasC = document.querySelector('.c_cpntainer2');
    var mesasR = document.querySelector('.c_cpntainer3');
    borrarChild(mesasA);
    borrarChild(mesasC);
    borrarChild(mesasR);
}
//CARGA LA INFO EN EL HTML CAMARERO: MESAS ABIERTAS/OCUPADAS Y LIBRES
function cargarMesas(camareroActual, mesas) {
    //BORRA MESAS ANTERIORES PARA ACTUALIZAR
    borraMesas();
    for (let i = 0; i < mesas.length; i++) {
        //FILTRA MESAS ABIERTAS DEL CAMARERO Y LAS PINTA
        if (mesas[i].estado == 'abierta' && mesas[i].nombreCamarero == camareroActual) {
            var divMesa = document.createElement('button');
            divMesa.className = `c_mesasA`;
            divMesa.addEventListener('click', () => { enviaMesa(i); })
            var numero = document.createTextNode((mesas[i].numero));
            divMesa.appendChild(numero);
            document.querySelector('.c_cpntainer1').appendChild(divMesa);
        }

        //FILTRA MESAS DISPONIBLES Y LAS PINTA
        if (mesas[i].estado == 'cerrada') {
            var divMesa = document.createElement('button');
            divMesa.className = `c_mesasC`;
            divMesa.addEventListener('click', () => {
                checkMesa(i, camareroActual);

                var listaCamareros = JSON.parse(localStorage.getItem('listaCamareros'));
                listaCamareros[camareroActual].mesasActuales.push(mesas[i].numero);
                localStorage.setItem('listaCamareros', JSON.stringify(listaCamareros))
            })
            var numero = document.createTextNode((mesas[i].numero));
            divMesa.appendChild(numero);
            document.querySelector('.c_cpntainer2').appendChild(divMesa);
        }

        //FILTRA MESAS ABIERTAS DE OTROS CAMAREROS Y LAS PINTA
        if (mesas[i].estado == 'abierta' && mesas[i].nombreCamarero != camareroActual) {
            var divMesa = document.createElement('button');
            divMesa.className = `c_mesasR`;
            var numero = document.createTextNode(mesas[i].numero);
            divMesa.appendChild(numero);
            document.getElementsByClassName("c_cpntainer3")[0].appendChild(divMesa);
        }
    }

    if (JSON.parse(localStorage.getItem('ticket')) != null) {
        historial();
    } else {
        let historial = document.querySelector('#c_historial');
        historial.innerHTML = 'No hay tickets';
    }
}

//ENVÍA LA MESA A MESA.HTML
function checkMesa(indice, camareroActual) {
    var mesas = JSON.parse(localStorage.listaMesas);
    mesas[indice].estado = 'abierta';
    mesas[indice].nombreCamarero = camareroActual;

    subir('listaMesas', JSON.stringify(mesas));
    camareroIn();
    enviaMesa(indice)
}

function enviaMesa(indice) {
    subir('mesaActual', indice);
    window.location = "../mesa/mesa.html";
}
function historial() {
    var tickets = JSON.parse(localStorage.ticket);
    var camareros = JSON.parse(localStorage.getItem('listaCamareros'));
    var camareroActual = JSON.parse(localStorage.getItem("camareroActual"));

    for (let i = 0; i < tickets.length; i++) {
        if (tickets[i].nombre_camarero == camareros[camareroActual].nombre) {
            var idTicket = tickets[i].id_ticket
            var botonTicket = document.createElement('button');
            botonTicket.className = `c_ticket`;
            botonTicket.addEventListener('click', () => {
                consulta_ticket(idTicket);
                window.location = "../../Clientes/ticket/ticket.html"
            })
            var id = document.createTextNode(`Fecha: ${tickets[i].fecha} | id: ${idTicket}`);
            botonTicket.appendChild(id);
            document.querySelector('#c_historial').appendChild(botonTicket);
        }
    }
}

window.addEventListener('load', () => {
    camareroIn();
});