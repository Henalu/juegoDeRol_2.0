// ---------------------------------------PASARELA DE PAGO -----------------------------------

function cargarPago(tickets, ticketSeleccionado) {
    var precio = tickets[ticketSeleccionado].total
    var p_total = document.getElementById("p_total")
    p_total.innerText = precio + "€";
}

function checkPago(tickets, ticketSeleccionado) {
    var visa = document.getElementById("num_tarjeta").value;
    var regexp = /^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/
    var validation = true;
    var validationCard = regexp.test(visa);
    var nombre = document.getElementById("nombre_tarjeta").value;
    var pagado = tickets[ticketSeleccionado].pagado;
    if (!nombre.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)) {
        alert("El nombre introducido no es válido.");
        validation = false;
    }
    var mes = document.getElementById("mes_tarjeta").value;
    var ano = document.getElementById("ano_tarjeta").value;
    if (mes.length != 2 && mes <= 12) {
        alert("El Mes debe estar escrito con dos cifras.")
        validation = false;
    }

    if (ano.length != 2 && ano >= 22) {
        alert("El Año debe estar escrito con dos cifras.")
        validation = false;
    }
    var cvv = document.getElementById("cvv").value
    if (cvv.length != 3) {
        alert("El CVV debe tener tres cifras")
        validation = false
    }
    if (!validationCard) { alert("El número de tarjeta introducido no es Visa o Mastercard") }
    if (validation && validationCard) {
        alert("Operación finalizada con éxito.")
        window.location = "../index/index.html";
        pagado = true;
    }
    tickets[ticketSeleccionado].pagado = pagado;
    localStorage.setItem("ticket", JSON.stringify(tickets))
}

window.addEventListener('DOMContentLoaded', ()=>{
    var ticketSeleccionado = localStorage.ticketSeleccionado;
    var tickets = JSON.parse(localStorage.ticket)
    cargarPago(tickets, ticketSeleccionado);

    var pagar = document.getElementById('p_pagar');
    pagar.addEventListener('click', ()=>{
        checkPago(tickets, ticketSeleccionado);
    });
});