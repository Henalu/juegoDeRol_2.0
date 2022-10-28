//TICKET

export class Ticket{
    constructor(id_ticket, fecha, id_mesa, nombre_camarero, comanda, total, pagado) {
        this.id_ticket = id_ticket;
        this.fecha = fecha;
        this.id_mesa = id_mesa;
        this.nombre_camarero = nombre_camarero;
        this.comanda = comanda;
        this.total = total;
        this.pagado = pagado;
    }
};

// Funcion para que el cliente pueda ver el ticket de su consumicion y pagarlo.

function imprimirTicket(id_ticket_entrada) {
    let tabla = document.getElementById("t_tabla");
    let articulos = JSON.parse(localStorage.menu).nombre;
    let precios = JSON.parse(localStorage.menu).precio;
    let ticketsLista = JSON.parse(localStorage.ticket);
    let ticket = ticketsLista.filter((element) => {
        if (element.id_ticket == id_ticket_entrada) {
            return element
        }
    })

    let comanda = ticket[0].comanda;
    var totalCuenta = 0;
    for (let i = 0; i < comanda.length; i++) {
        if (comanda[i] > 0) {
            var fila = document.createElement("tr");
            var articulo = document.createElement("td");
            var precio = document.createElement("td");
            var cant = document.createElement("td");
            var total = document.createElement("td");
            articulo.innerHTML = articulos[i];
            articulo.setAttribute("class", "t_articulos")
            precio.innerHTML = precios[i];
            cant.innerHTML = comanda[i];
            total.innerHTML = comanda[i] * precios[i];
            fila.appendChild(articulo);
            fila.appendChild(cant);
            fila.appendChild(precio);
            fila.appendChild(total);
            tabla.appendChild(fila);
            totalCuenta += (comanda[i] * precios[i]);
        }
    }
    var p_total = document.getElementById("t_total");
    p_total.innerText = `${totalCuenta} €`;
    var p_camarero = document.getElementById("t_nombreCamarero");
    p_camarero.innerText = ticket[0].nombre_camarero;
    var p_id_ticket = document.getElementById("t_id_ticket");
    p_id_ticket.innerText = ticket[0].id_ticket;
    var p_id_mesa = document.getElementById("t_id_mesa");
    p_id_mesa.innerText = ticket[0].id_mesa + 1;
}

function consulta_ticket(id_ticket) {
    localStorage.setItem("ticketSeleccionado", id_ticket);
    window.location = "ticket.html";
}

export {consulta_ticket};