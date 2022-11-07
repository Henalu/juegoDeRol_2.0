//---------------------------------------- FUNCIONES INDEX ---------------------------------
export function borrarChild(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

//--------------------Inicializamos datos basicos para el restaurante: menu, mesa y camareros-----------------------
function pintarMenu(listaMenus, menuSeleccionado) {
    let divSeleccionado = document.getElementById(`cl_menu_${menuSeleccionado}`);
    divSeleccionado.style.display = 'flex';
    let divsMenus = document.querySelectorAll('.cl_menu_select');
    divsMenus.forEach(element => {
        if (element != divSeleccionado) {
            element.style.display = 'none';
        }
    })
    borrarChild(divSeleccionado);

    let articulosMenu = listaMenus[`${menuSeleccionado}`].articulosMenu;
    let h2 = document.createElement('h2');
    h2.append(menuSeleccionado.toUpperCase());
    divSeleccionado.append(h2);

    let button = document.createElement('button');
    button.setAttribute('class', 'cl_volver_a_lista_menus');
    button.append('Volver');
    divSeleccionado.append(button);

    button.addEventListener('click', () => {
        let menuSelect = document.querySelectorAll('.cl_menu_select');
        menuSelect.forEach(element => element.style.display = 'none');
        let menus = document.getElementById('cl_menus');
        menus.style.display = 'flex';
    })

    // <button class="cl_volver_a_lista_menus">Volver</button>

    articulosMenu.forEach(element => {
        let div = document.createElement('div');
        div.setAttribute('class', 'cl_articulo_menu');
        let img = document.createElement('img');
        img.setAttribute('class', 'cl_foto_articulo');
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
        divSeleccionado.append(div);
    });
}

function pintarComanda(comanda) {
    let options = document.getElementById('cl_options');
    options.style.display = 'none';
    var divComanda = document.getElementById('cl_comanda_mesa');
    borrarChild(divComanda);
    divComanda.style.display = 'flex';
    comanda.forEach(element => {
        console.log(element);
        console.log(element.cantidad);
        if (element.cantidad > 0) {
            let div = document.createElement('div');
            div.setAttribute('class', 'cl_articulo_menu');
            let img = document.createElement('img');
            img.setAttribute('class', 'cl_foto_articulo');
            let spanNombre = document.createElement('span');
            let spanPrecio = document.createElement('span');
            let p = document.createElement('p');
            spanNombre.append(element.nombre);
            spanPrecio.append(element.precio.toFixed(2) + '€');
            p.append(spanNombre);
            p.append(spanPrecio);

            if (element.foto == undefined || element.foto == "undefined") {
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
            divComanda.append(div);
        }
    });
}


// Funcion para que el cliente pueda ver el ticket de su consumicion y pagarlo
function consulta_ticket(id_ticket) {
    localStorage.setItem("ticketSeleccionado", id_ticket);
    window.location = "../ticket/ticket.html";
}

window.addEventListener('DOMContentLoaded', () => {
    var mesas = JSON.parse(localStorage.getItem('listaMesas'));
    var listaMenus = JSON.parse(localStorage.getItem('Menus'));

    //Volver
    var volver = document.querySelectorAll('.cl_boton_volver');
    volver.forEach(element => {
        element.addEventListener('click', () => {
            let options = document.getElementById('cl_options');
            options.style.display = 'flex';

            let menus = document.getElementById('cl_menus');
            menus.style.display = 'none';

            var introMesa = document.getElementById('cl_intro_mesa');
            introMesa.style.display = 'none';

            var divComanda = document.getElementById('cl_comanda_mesa');
            divComanda.style.display = 'none';

            let divConsultaTicket = document.getElementById('cl_consultar_ticket');
            divConsultaTicket.style.display = 'none';
        });
    });

    //Menus
    var verMenus = document.querySelector('.cl_ver_menus');
    verMenus.addEventListener('click', () => {
        let menus = document.getElementById('cl_menus');
        menus.style.display = 'flex';
        let options = document.getElementById('cl_options');
        options.style.display = 'none';
    });
    var menu = document.querySelectorAll('.cl_menu');
    menu.forEach(element => {
        element.addEventListener('click', () => {
            let menus = document.getElementById('cl_menus');
            menus.style.display = 'none';
            var menuSeleccionado = (element.innerText).toLowerCase();
            console.log(menuSeleccionado);
            pintarMenu(listaMenus, menuSeleccionado);
        });
    });

    //Comanda
    var introComanda = document.querySelector('.cl_boton_comanda');
    introComanda.addEventListener('click', () => {
        let options = document.getElementById('cl_options');
        options.style.display = 'none';
        var introMesa = document.getElementById('cl_intro_mesa');
        introMesa.style.display = 'flex';
    });

    var verComanda = document.getElementById('cl_ver_comanda');
    verComanda.addEventListener('click', () => {
        let numero = document.getElementsByName('numeroMesa')[0].value;
        numero = parseInt(numero);
        let comanda = JSON.parse(localStorage.getItem('listaMesas'))[`${numero - 1}`].comanda;
        console.log(comanda);
        pintarComanda(comanda);
    });

    //Ticket
    var verTicket = document.querySelector('.cl_ver_ticket');
    verTicket.addEventListener('click', () => {
        let divConsultaTicket = document.getElementById('cl_consultar_ticket');
        divConsultaTicket.style.display = 'flex';
        let options = document.getElementById('cl_options');
        options.style.display = 'none';
    });

    var consultar = document.querySelector('#cl_consultar');
    consultar.addEventListener('click', () => {
        consulta_ticket(document.getElementById('cl_ticket').value);
    });

});//Fin Load
