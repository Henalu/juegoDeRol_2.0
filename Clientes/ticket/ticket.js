// Funcion para que el cliente pueda ver el ticket de su consumicion y pagarlo.

function imprimirTicket(id_ticket_entrada) {
    let tabla = document.getElementById("t_tabla");
    let ticketsLista = JSON.parse(localStorage.ticket);
    let ticket = ticketsLista[id_ticket_entrada]
    console.log(ticket);

    let comanda = ticket.comanda;
    console.log(comanda);
    let articulos = [];
    let precios = [];
    let cantidades = []
    for (let j = 0; j < comanda.length; j++) {
        if (comanda[j].cantidad > 0) {
            articulos.push(comanda[j].nombre);
            precios.push(comanda[j].precio);
            cantidades.push(comanda[j].cantidad);
        }
    }

    for (let i = 0; i < articulos.length; i++) {
        var fila = document.createElement("tr");
        var articulo = document.createElement("td");
        var precio = document.createElement("td");
        var cant = document.createElement("td");
        var total = document.createElement("td");

        articulo.innerHTML = articulos[i];
        articulo.setAttribute("class", "t_articulos")
        precio.innerHTML = precios[i];
        cant.innerHTML = cantidades[i];
        total.innerHTML = (cantidades[i] * precios[i]).toFixed(2);
        fila.appendChild(articulo);
        fila.appendChild(cant);
        fila.appendChild(precio);
        fila.appendChild(total);
        tabla.appendChild(fila);
    }

    var p_total = document.getElementById("t_total");
    p_total.innerText = `${(ticket.total).toFixed(2)} €`;

    var p_camarero = document.getElementById("t_nombreCamarero");
    p_camarero.innerText = ticket.nombre_camarero;

    var p_id_ticket = document.getElementById("t_id_ticket");
    p_id_ticket.innerText = ticket.id_ticket;

    var p_id_mesa = document.getElementById("t_id_mesa");
    p_id_mesa.innerText = ticket.id_mesa;
}

function consulta_ticket(id_ticket) {
    localStorage.setItem("ticketSeleccionado", id_ticket);
    // window.location = "ticket.html";
}

window.addEventListener('DOMContentLoaded', () => {
    imprimirTicket(localStorage.ticketSeleccionado);

    var botonPagar = document.getElementById('t_boton_pagar');
    botonPagar.addEventListener('click', () => {
        var ticketSeleccionado = localStorage.ticketSeleccionado
        var tickets = JSON.parse(localStorage.ticket)
        var pagado = tickets[ticketSeleccionado].pagado;
        if (pagado) {
            alert("Esta cuenta está pagada. muchas gracias");
        }else{
            window.location = '../pago/pago.html';
        }
    });
});