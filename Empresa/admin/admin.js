// ---------------------------------------------- FUNCIONES ADMIN -------------------------------------
function subir(clave, valor) {
    localStorage.setItem(clave, valor);
}
function bajar(clave) {
    return localStorage.getItem(clave);
}

function mostrarDatos() {
    let users = JSON.parse(localStorage.camarero);
    let rendimiento = document.getElementsByClassName("a_rendimiento")
    let username = users.map(element => element.nombre_camarero);
    let password = users.map(element => element.password);
    var placeholders_name = document.getElementsByClassName("userName");
    var placeholders_pass = document.getElementsByClassName("userPass");
    var mesas = JSON.parse(localStorage.mesa)

    var mesasAtendidas1 = []
    for (let i = 0; i < 10; i++) {
        if (mesas[i].estado == 'abierta' && mesas[i].id_camarero == 1) {
            mesasAtendidas1.push(mesas[i].numero)
        }
    }
    var mesasAtendidas2 = []
    for (let i = 0; i < 10; i++) {
        if (mesas[i].estado == 'abierta' && mesas[i].id_camarero == 2) {
            mesasAtendidas2.push(mesas[i].numero)
        }
    }
    var mesasAtendidas3 = []
    for (let i = 0; i < 10; i++) {
        if (mesas[i].estado == 'abierta' && mesas[i].id_camarero == 3) {
            mesasAtendidas3.push(mesas[i].numero)
        }
    }
    var mesasAtendidas4 = []
    for (let i = 0; i < 10; i++) {
        if (mesas[i].estado == 'abierta' && mesas[i].id_camarero == 4) {
            mesasAtendidas4.push(mesas[i].numero)
        }
    }

    for (let i = 0; i < placeholders_name.length; i++) {
        placeholders_name[i].value = username[i];
        placeholders_pass[i].value = password[i];

    }
    rendimiento[0].innerHTML = mesasAtendidas1;
    rendimiento[1].innerHTML = mesasAtendidas2;
    rendimiento[2].innerHTML = mesasAtendidas3;
    rendimiento[3].innerHTML = mesasAtendidas4;
}
function guardarCambios() {
    var placeholders_name = document.getElementsByClassName("userName");
    var placeholders_pass = document.getElementsByClassName("userPass");
    var names = [];
    var pass = [];
    let users = JSON.parse(localStorage.camarero);
    for (let i = 0; i < placeholders_name.length; i++) {
        names.push(placeholders_name[i].value);
        pass.push(placeholders_pass[i].value);
    };

    for (let k = 0; k < placeholders_name.length; k++) {
        users[k].nombre_camarero = names[k];
        users[k].password = pass[k];
    };

    localStorage.setItem("camarero", JSON.stringify(users))
}

//---------------------------------------- GRAFICA RESULTADOS -------------------------------------------------------------------------------------
function cargarGraficos(num) {

    // DATOS -------------

    var tickets = JSON.parse(bajar('ticket'))
    var camareros = JSON.parse(bajar('camarero'))
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
            if (tickets[i].nombre_camarero == camareros[0].nombre_camarero) {
                total1.push(tickets[i].total)
            }
            if (tickets[i].nombre_camarero == camareros[1].nombre_camarero) {
                total2.push(tickets[i].total)
            }
            if (tickets[i].nombre_camarero == camareros[2].nombre_camarero) {
                total3.push(tickets[i].total)
            }
            if (tickets[i].nombre_camarero == camareros[3].nombre_camarero) {
                total4.push(tickets[i].total)
            }
        }
        mesas = total.length - 1
        mesas1 = total1.length - 1
        mesas2 = total2.length - 1
        mesas3 = total3.length - 1
        mesas4 = total4.length - 1
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
        camareros[0].nombre_camarero,
        camareros[1].nombre_camarero,
        camareros[2].nombre_camarero,
        camareros[3].nombre_camarero
    ];
    const DATA_COUNT = 4;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Mesas servidas',
            backgroundColor: 'blcak',
            borderColor: 'blcak',
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
        camareros[0].nombre_camarero,
        camareros[1].nombre_camarero,
        camareros[2].nombre_camarero,
        camareros[3].nombre_camarero
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

window.addEventListener('load', () => {
    cargarGraficos();

    var a_mostrar_datos = document.querySelector('#a_mostrar_datos');
    a_mostrar_datos.addEventListener('click', ()=>{
        mostrarDatos();
    });

    var a_guardar_cambios = document.querySelector('#a_guardar_cambios');
    a_guardar_cambios.addEventListener('click', ()=>{
        guardarCambios();
    });

    var resultados = document.querySelectorAll('.a_resultados1');
    resultados[1].addEventListener('click', ()=>{
        cargarGraficos(0);
    });
    resultados[2].addEventListener('click', ()=>{
        cargarGraficos(1);
    });
});