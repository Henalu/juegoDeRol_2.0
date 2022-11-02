//Importar
import { Ticket } from "../../Clientes/ticket/ticket.js";
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
    console.log(menuBebidas, menuPrimeros, menuSegundos, menuPostres);
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

//funcion desplegables para reutilizar en los clicks
function desplegar(desplegable) {
    let display = desplegable.style.display;
    if (display == 'none') {
        desplegable.style.display = 'block';
    } else {
        desplegable.style.display = 'none';
    }
}

function adicionarComanda() {
    var camareroActual = JSON.parse(localStorage.getItem('camareroActual'));
    console.log(camareroActual);
    //Recoger mesaActual
    var mesas = JSON.parse(localStorage.getItem('listaMesas'));
    console.log(mesas);

    // localStorage.setItem('mesaActual', 1);
    // var mesaActual = parseInt(localStorage.getItem('mesaActual') - 1);
    var mesaActual = mesas[localStorage.mesaActual];
    console.log(mesaActual);
    console.log(mesaActual.numero);
    let comanda = mesaActual.comanda;
    console.log(comanda);

    document.querySelector('h1').innerHTML = 'Mesa' + ' ' + (mesaActual.numero);
    document.querySelector('#m_cerrarMesa').innerHTML = 'Generar Cuenta Mesa' + ' ' + (mesaActual.numero);

    //Añadir cantidades
    var spanCantidad = document.getElementsByClassName('cantidad');
    var spanArticulo = document.getElementsByClassName('articulo');

    var añadir = document.getElementById('m_añadir');
    añadir.addEventListener('click', () => {
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
    });

    return [mesas, mesaActual.numero, camareroActual, comanda]
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
            li.innerHTML = `${comanda[j].nombre}: ${comanda[j].cantidad}`
            ul.append(li);
        }
    }
}

//Cerrar Mesa
function cerrarMesa(mesas, mesaActual, camareroActual) {
    var fecha = new Date;
    var fechaticket = fecha.getDay() + "/" + fecha.getMonth() + "/" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes();

    let camareros = JSON.parse(localStorage.getItem('listaCamareros'));
    console.log(camareros);
    let entriesCamareros = Object.entries(camareros);
    let nombresCamareros = [];
    entriesCamareros.forEach(element => {
        nombresCamareros.push(element[1].nombre);
    });

    var camareroActual = localStorage.getItem("camareroActual")
    var camareroActualN = "";
    switch (camareroActual) {
        case "1": camareroActualN = nombresCamareros[0]
            break;
        case "2": camareroActualN = nombresCamareros[1]
            break;
        case "3": camareroActualN = nombresCamareros[2]
            break;
        case "4": camareroActualN = nombresCamareros[3]
            break;
    }

    var total = 0;
    console.log(mesas[mesaActual].comanda.length);
    var pagado = false;
    var ticketsLista = JSON.parse(localStorage.getItem("ticket"));
    var inicioTicket = [];
    for (let i = 0; i < mesas[mesaActual-1].comanda.length; i++) {
        total += mesas[mesaActual-1].comanda[i].cantidad * mesas[mesaActual].comanda[i].precio;
        console.log(mesas[mesaActual-1].comanda[i].cantidad);
        console.log(mesas[mesaActual-1].comanda[i].precio);
    }
    if (!ticketsLista) {
        var newTicket = new Ticket(0, fechaticket, mesaActual, JSON.parse(camareroActual), mesas[mesaActual].comanda, total, pagado);
        inicioTicket.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(inicioTicket))
    } else {
        var id_anterior = ticketsLista[ticketsLista.length - 1].id_ticket + 1;
        var newTicket = new Ticket(id_anterior, fechaticket, mesaActual, JSON.parse(camareroActual), mesas[mesaActual].comanda, total, pagado);
        ticketsLista.push(newTicket);
        localStorage.setItem("ticket", JSON.stringify(ticketsLista))
    }

    //Reseteamos los valores de la mesa y añadimos mesas atendidas al camarero
    console.log(mesaActual);
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

window.addEventListener('load', () => {
    iniciarDesplegables();
    sumarYRestar();
    var add = adicionarComanda();
    verComanda(add[3]);

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
});//Fin load