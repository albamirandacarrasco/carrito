const productos = [
    {
        nombre: "Chaqueta de cuero",
        precio: 199,
        descripcion: "Chaqueta de cuero genuino, perfecta para un look casual y elegante.",
        imagen: "https://cdna.lystit.com/520/650/n/photos/mytheresa/a1a69343/balmain-black-Cropped-Leather-Biker-Jacket.jpeg"
    },
    {
        nombre: "Vaqueros slim fit",
        precio: 89,
        descripcion: "Vaqueros de corte slim, fabricados en algodón elástico.",
        imagen: "https://media.istockphoto.com/id/639511940/es/foto/hermosos-pantalones-de-mezclilla.jpg?s=612x612&w=is&k=20&c=u0jBEzMl-2F1WfC6NPFcWC8tphvJeovNtWgDZl3gkZI="
    },
    {
        nombre: "Camisa de algodón",
        precio: 49,
        descripcion: "Camisa de manga larga de algodón suave.",
        imagen: "https://images.unsplash.com/photo-1521747116042-5a810fda9664"
    },
    {
        nombre: "Chaqueta motera",
        precio: 199,
        descripcion: "Chaqueta de cuero genuino, perfecta para un look casual y elegante.",
        imagen: "https://cdna.lystit.com/520/650/n/photos/mytheresa/a1a69343/balmain-black-Cropped-Leather-Biker-Jacket.jpeg"
    },
    {
        nombre: "Vaqueros finos",
        precio: 50,
        descripcion: "Vaqueros de corte slim, fabricados en algodón elástico.",
        imagen: "https://media.istockphoto.com/id/639511940/es/foto/hermosos-pantalones-de-mezclilla.jpg?s=612x612&w=is&k=20&c=u0jBEzMl-2F1WfC6NPFcWC8tphvJeovNtWgDZl3gkZI="
    },
    {
        nombre: "Camisa de algodón",
        precio: 49,
        descripcion: "Camisa de manga larga de algodón suave.",
        imagen: "https://images.unsplash.com/photo-1521747116042-5a810fda9664"
    }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const carritoContainer = document.getElementById("carrito-items");

//Cookies
function establecerCookie(nombre, valor, dias) {
    let expiracion = "";
    if (dias) {
        const fecha = new Date();
        fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
        expiracion = "; expires=" + fecha.toUTCString();
    }
    document.cookie = nombre + "=" + (encodeURIComponent(valor) || "") + expiracion + "; path=/";
}

function obtenerCookie(nombre) {
    const nombreEQ = nombre + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nombreEQ) === 0) return decodeURIComponent(c.substring(nombreEQ.length, c.length));
    }
    return null;
}

// Guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function cargarCarritoCookie() {
    const carritoCookie = obtenerCookie("carrito");
    return carritoCookie ? JSON.parse(carritoCookie) : [];
}


function mostrarCarrito() {
    carritoContainer.innerHTML = '';
    carrito.forEach((producto, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carrito-item");
        itemDiv.innerHTML = `
            <span>${producto.nombre} (${producto.cantidad}) - ${producto.precio}€</span>
            <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        carritoContainer.appendChild(itemDiv);
    });
}


function agregarAlCarrito(producto) {
    const existente = carrito.find(item => item.nombre === producto.nombre);
    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }
    guardarCarrito();
    mostrarCarrito();
}


function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    guardarCarrito();
    mostrarCarrito();
}


function inicializarProductos() {
    const container = document.getElementById("productos-container");
    productos.forEach(producto => {
        const productoDiv = document.createElement("div");
        productoDiv.classList.add("producto");
        productoDiv.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen">
            <h2>${producto.nombre}</h2>
            <p>${producto.descripcion}</p>
            <p class="precio">${producto.precio}€</p>
            <button onclick="agregarAlCarrito({nombre: '${producto.nombre}', precio: ${producto.precio}})">Agregar al carrito</button>
        `;
        container.appendChild(productoDiv);
    });
}


function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}


document.getElementById("vaciar-carrito").addEventListener('click', vaciarCarrito);

window.onload = function() {
    mostrarCarrito();
    inicializarProductos();
};
