// Recuperar o inicializar la lista de botines desde localStorage
let listaDeBotines = JSON.parse(localStorage.getItem("botines")) || [
    { id: 1, nombre: "mercurial", color: "negro", marca: "nike", precio: 15000 },
    { id: 2, nombre: "tiempo", color: "blanco", marca: "nike", precio: 14000 },
    { id: 3, nombre: "top sala", color: "negro", marca: "adidas", precio: 13000 },
    { id: 4, nombre: "top flex", color: "blanco", marca: "joma", precio: 12000 },
];

// Clase Botin
class Botin {
    constructor(id, nombre, marca, color, precio) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.color = color;
        this.precio = precio;
    }
}

// Actualizar el localStorage
function actualizarLocalStorage() {
    localStorage.setItem("botines", JSON.stringify(listaDeBotines));
}

// Agregar un nuevo botín
function agregarBotin() {
    const id = listaDeBotines.length + 1;
    const nombre = prompt("Ingrese el nombre del botin");
    const color = prompt("Ingrese el color");
    const marca = prompt("Ingrese la marca");
    const precio = parseFloat(prompt("Ingrese el precio del botin"));
    const nuevoBotin = new Botin(id, nombre, marca, color, precio);
    listaDeBotines.push(nuevoBotin);
    actualizarLocalStorage();
    alert("Agregado correctamente");
}

// Mostrar botines por color
function mostrarBotinesPorColor(color) {
    const botinesFiltrados = listaDeBotines.filter(botin => botin.color.toLowerCase() === color.toLowerCase());
    if (botinesFiltrados.length > 0) {
        let mensaje = `Botines de color ${color}:\n`;
        botinesFiltrados.forEach(botin => {
            mensaje += `Nombre: ${botin.nombre}, Marca: ${botin.marca}, Precio: $${botin.precio}\n`;
        });
        mostrarMensaje(mensaje);
    } else {
        mostrarMensaje(`No se encontraron botines de color ${color}`);
    }
}

// Buscar botín por nombre
function buscarBotinPorNombre(nombre) {
    const botinEncontrado = listaDeBotines.find(botin => botin.nombre.toLowerCase() === nombre.toLowerCase());
    if (botinEncontrado) {
        mostrarMensaje(`Botin encontrado: \nNombre: ${botinEncontrado.nombre}\nMarca: ${botinEncontrado.marca}\nColor: ${botinEncontrado.color}\nPrecio: $${botinEncontrado.precio}`);
    } else {
        mostrarMensaje(`No se encontró un botin con el nombre ${nombre}`);
    }
}

// Mostrar todos los botines
function mostrarTodosLosBotines() {
    let mensaje = "Lista completa de botines:\n";
    listaDeBotines.forEach(botin => {
        mensaje += `Nombre: ${botin.nombre}, Marca: ${botin.marca}, Color: ${botin.color}, Precio: $${botin.precio}\n`;
    });
    mostrarMensaje(mensaje);
}

// Mostrar el precio total de todos los botines
function mostrarPrecioTotal() {
    const precioTotal = listaDeBotines.reduce((total, botin) => total + botin.precio, 0);
    mostrarMensaje(`El precio total de todos los botines es: $${precioTotal}`);
}

// Mostrar mensaje en el DOM
function mostrarMensaje(mensaje) {
    const contenidoDiv = document.getElementById("contenido");
    contenidoDiv.textContent = mensaje;
}

// Manejar selección del menú
document.getElementById("opciones").addEventListener("change", function () {
    const opcionElegida = parseInt(this.value);
    switch (opcionElegida) {
        case 1:
            agregarBotin();
            break;
        case 2:
            mostrarBotinesPorColor("blanco");
            break;
        case 3:
            mostrarBotinesPorColor("negro");
            break;
        case 4:
            const nombreABuscar = prompt("Ingrese el nombre del botin a buscar (top flex, top sala, tiempo, mercurial)");
            buscarBotinPorNombre(nombreABuscar);
            break;
        case 5:
            mostrarTodosLosBotines();
            break;
        case 6:
            mostrarPrecioTotal();
            break;
        default:
            mostrarMensaje("Opción no válida");
            break;
    }
});
