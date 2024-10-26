let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productos = [
    {
        id: "hamb-01",
        titulo: "Hamburguesa 2ble cuarto! ",
        precio: 10000,
        img: "./img/01.webp",
    },
    {
        id: "hamb-02",
        titulo: "Hamburguesa stacKer",
        precio: 11000,
        img: "./img/02.webp",
    },
    {
        id: "hamb-03",
        titulo: "Hamburguesa Onion",
        precio: 13500,
        img: "./img/03.jpg",
    }
];

const contenedorProductos = document.querySelector("#productos");
const carritoVacio = document.querySelector("#carrito-vacio");
const carritoProductos = document.querySelector("#carrito-productos");
const carritoTotal = document.querySelector("#carrito-total");

productos.forEach((producto) => {
    let div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="producto-img" src=${producto.img}>
        <p>$${producto.precio}</p>
        <h3>${producto.titulo}</h3>
    `;

    let button = document.createElement("button");
    button.classList.add("producto-btn");
    button.innerText = "Agregar al carrito";
    button.addEventListener("click", () => {
        agregarAlCarrito(producto);
    })

    div.append(button);

    contenedorProductos.append(div);
});

function actualizarCarrito() {
    if (carrito.length === 0) {
        carritoVacio.classList.remove("d-none");
        carritoProductos.classList.add("d-none");
        document.getElementById("finalizar").classList.add("d-none"); // Ocultar el botón
    } else {
        carritoVacio.classList.add("d-none");
        carritoProductos.classList.remove("d-none");
        document.getElementById("finalizar").classList.remove("d-none"); // Mostrar el botón

        carritoProductos.innerHTML = "";
        carrito.forEach((producto) => {
            let div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <h3>${producto.titulo}</h3>
                <p>Cant: ${producto.cantidad}</p>
                <p>Subt: $${producto.precio * producto.cantidad}</p>
            `;

            let buttonAumentar = document.createElement("button");
            buttonAumentar.classList.add("carrito-producto-btn");
            buttonAumentar.innerText = "Agregar";
            buttonAumentar.addEventListener("click", () => {
                aumentarCantidad(producto);
            });
            div.append(buttonAumentar);

            let buttonReducir = document.createElement("button");
            buttonReducir.classList.add("carrito-producto-btn");
            buttonReducir.innerText = "Quitar";
            buttonReducir.addEventListener("click", () => {
                reducirCantidad(producto);
            });
            div.append(buttonReducir);

            let button = document.createElement("button");
            button.classList.add("carrito-producto-btn");
            button.innerText = "Eliminar";
            button.addEventListener("click", () => {
                borrarDelCarrito(producto);
            });
            div.append(button);
            carritoProductos.append(div);
        });
    }
    actualizarTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado) {
        itemEncontrado.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    actualizarCarrito();
}

function borrarDelCarrito(producto) {
    let indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);

    actualizarCarrito();
}

function actualizarTotal() {
    let total = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
    carritoTotal.innerText = `$${total}`;
}

function aumentarCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    itemEncontrado.cantidad++;

    actualizarCarrito();
}

function reducirCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado.cantidad >= 2) {
        itemEncontrado.cantidad--;
        actualizarCarrito();
    } else {
        borrarDelCarrito(itemEncontrado);
    }

}

actualizarCarrito();

function reiniciarCompra() {
    carrito = []; 
    localStorage.removeItem("carrito");
    actualizarCarrito(); 
}

document.getElementById("finalizar").addEventListener("click", reiniciarCompra);

let toastifyButton = document.querySelector("#finalizar");

toastifyButton.addEventListener("click", () => {
    Toastify({
        text: "Su compra ha sido realizada!!",
    }).showToast();
});


let buttonAumentar = document.querySelector("#carrito-producto-btn");

function mostrarNotificacion(mensaje, color) {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: color,
    }).showToast();
}

function agregarAlCarrito(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado) {
        itemEncontrado.cantidad++;
        mostrarNotificacion("Cantidad aumentada en el carrito", "green");
    } else {
        carrito.push({...producto, cantidad: 1});
        mostrarNotificacion("Producto agregado al carrito", "green");
    }

    actualizarCarrito();
}

function borrarDelCarrito(producto) {
    let indice = carrito.findIndex((item) => item.id === producto.id);
    carrito.splice(indice, 1);

    mostrarNotificacion("Producto eliminado del carrito", "red");
    actualizarCarrito();
}

function aumentarCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);
    itemEncontrado.cantidad++;

    mostrarNotificacion("Producto agregado en el carrito", "green");
    actualizarCarrito();
}

function reducirCantidad(producto) {
    let itemEncontrado = carrito.find((item) => item.id === producto.id);

    if (itemEncontrado.cantidad >= 2) {
        itemEncontrado.cantidad--;
        mostrarNotificacion("Producto quitado en el carrito", "orange");
    } else {
        borrarDelCarrito(itemEncontrado);
    }

    actualizarCarrito();
}

