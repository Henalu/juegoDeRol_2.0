//Importar
import {Ticket} from "../../Clientes/ticket/ticket.js";

function borrarChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//Iniciar desplegables del Menu
function iniciarDesplegables() {
    var menu = JSON.parse(localStorage.getItem('menu'));
    var desplegables = document.getElementsByClassName('m_desplegables');

    let i = 0;
    while (i < 7) {
        //Bebidas
        let li = document.createElement('li');
        desplegables[0].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menu.nombre[i]}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);

        i++;
    };

    let j = 7;
    while (j < 12) {
        //Primeros
        let li = document.createElement('li');
        desplegables[1].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menu.nombre[j]}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);

        j++;
    }

    let k = 12;
    while (k < 16) {
        //Segundos
        let li = document.createElement('li');
        desplegables[2].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menu.nombre[k]}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);

        k++;
    }

    let m = 16;
    while (m < 21) {
        //Postres
        let li = document.createElement('li');
        desplegables[3].append(li);
        li.innerHTML = (`<span class = 'articulo'>${menu.nombre[m]}</span>`);

        let span = document.createElement('span');
        span.innerHTML = (` <span class = 'restar'>-</span> <span class='cantidad'>0</span> <span class='sumar'>+</span>`);

        li.append(span);

        m++;
    }

}

//Añadir y quitar cantidades de cada elemento del menu
function sumarYRestar() {
    var restar = document.getElementsByClassName('restar');
    var sumar = document.getElementsByClassName('sumar');
    var spanCantidad = document.getElementsByClassName('cantidad');

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

//Muestra la comanda de la mesa Actual
function verComanda(mesa, mesaActual) {
    borraComanda();
    var menu = JSON.parse(localStorage.getItem('menu'));
    var mostrarComanda = document.querySelector('#m_comanda');
    let ul = document.createElement('ul');

    let h2 = document.createElement('h2');
    h2.innerHTML = 'Comanda';

    mostrarComanda.append(h2);
    mostrarComanda.append(ul);

    for (let j = 0; j < mesa[mesaActual].comanda.length; j++) {
        if (mesa[mesaActual].comanda[j] > 0) {
            let li = document.createElement('li');
            li.setAttribute('class', 'articuloComanda');
            li.innerHTML = `${menu.nombre[j]}: ${mesa[mesaActual].comanda[j]}`
            ul.append(li);
        }
    }
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

//Cerrar Mesa
function cerrarMesa(mesa, mesaActual, camareroActual) {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();

    let users = JSON.parse(localStorage.camarero);
    let username = users.map(element => element.nombre_camarero);
    var camareroActual = localStorage.getItem("camareroActual")
    var camareroActualN = "";
    switch (camareroActual) {
        case "1": camareroActualN = username[0]
            break;
        case "2": camareroActualN = username[1]
            break;
        case "3": camareroActualN = username[2]
            break;
        case "4": camareroActualN = username[3]
            break;
    }

    var menu = JSON.parse(localStorage.getItem('menu'));
    var total = 0;
    var pagado = false;
    var ticketsLista = JSON.parse(localStorage.getItem("ticket"));
    var inicioTicket = [];
    for (let i = 0; i < mesa[mesaActual].comanda.length; i++) {
        total += mesa[mesaActual].comanda[i] * menu.precio[i];
    }
    if (!ticketsLista) {
        var newTicket = new Ticket(0, fechaticket, mesaActual, camareroActualN, mesa[mesaActual].comanda, total, pagado);
        inicioTicket.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(inicioTicket))
    } else {
        var id_anterior = ticketsLista[ticketsLista.length - 1].id_ticket + 1;
        var newTicket = new Ticket(id_anterior, fechaticket, mesaActual, camareroActualN, mesa[mesaActual].comanda, total, pagado);
        ticketsLista.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(ticketsLista))
    }
    mesa[mesaActual].estado = 'cerrada';
    mesa[mesaActual].comanda = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    localStorage.setItem('mesa', JSON.stringify(mesa));

    window.location = '../camarero/camarero.html';


    let mesasAtendidas = JSON.parse(localStorage.camarero)[localStorage.camareroActual].mesasAtendidas;
    users[localStorage.camareroActual - 1].mesasAtendidas = mesasAtendidas + 1;
    localStorage.setItem("camarero", JSON.stringify(users))
}
function adicionarComanda() {
    //Recoger mesaActual
    var mesa = JSON.parse(localStorage.getItem('mesa'));
    // localStorage.setItem('mesaActual', 1);
    var mesaActual = parseInt(localStorage.getItem('mesaActual'));
    var camareroActual = parseInt(localStorage.getItem('camareroActual'));
    document.querySelector('h1').innerHTML = 'Mesa' + ' ' + (mesaActual + 1);
    document.querySelector('#m_cerrarMesa').innerHTML = 'Generar Cuenta Mesa' + ' ' + (mesaActual + 1);
    var comanda = mesa[mesaActual].comanda;

    //Añadir cantidades
    var spanCantidad = document.getElementsByClassName('cantidad');

    var añadir = document.getElementById('m_añadir');
    añadir.addEventListener('click', () => {
        for (let i = 0; i < spanCantidad.length; i++) {
            let cantidad = spanCantidad[i].innerHTML;
            if (cantidad > 0) {
                comanda[i] = parseInt(comanda[i]) + parseInt(cantidad);
                spanCantidad[i].innerHTML = 0;
            }
        }
        mesa[mesaActual].comanda = comanda;
        mesa[mesaActual].id_camarero = camareroActual;
        localStorage.setItem('mesa', JSON.stringify(mesa));
        verComanda(mesa, mesaActual)
    });

    return [mesa, mesaActual, camareroActual]
}

window.addEventListener('load', ()=>{
    iniciarDesplegables();
    sumarYRestar();
    var add = adicionarComanda();
    verComanda(add[0], add[1]);

    var cerrar = document.querySelector('#m_cerrarMesa');
    cerrar.addEventListener('click', () => {
        cerrarMesa(add[0], add[1], add[2]);
    });

    //Estilo desplegable
    var desplegables = document.getElementsByClassName('m_desplegables');
    var opciones = document.querySelectorAll('.m_opciones h2');
    for (let i = 0; i < opciones.length; i++) {
        opciones[i].addEventListener('click', () => {
            desplegar(desplegables[i]);
        });
    }

    //Boton de Volver
    var volver = document.querySelector('#m_volver');
    volver.addEventListener('click', () => {
        window.location = '../camarero/camarero.html'
    });
    
});//Fin load