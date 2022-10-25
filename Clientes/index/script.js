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


// Funcion para que el cliente pueda ver el ticket de su consumicion y pagarlo
function consulta_ticket(id_ticket) {
    localStorage.setItem("ticketSeleccionado", id_ticket);
    window.location = "../ticket/ticket.html";
}

window.addEventListener('load', () => {
    iniciar();

    var consultar = document.querySelector('#cl_consultar');
    consultar.addEventListener('click', () => {
        consulta_ticket(document.getElementById('cl_ticket').value);
    });

});//Fin Load
