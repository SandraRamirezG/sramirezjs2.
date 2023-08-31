// Variables globales
const descuentoTarjeta = 0.1;
const descuentoEfectivo = 0.2;

// Función para obtener un número válido desde el usuario
const obtenerNumero = (mensaje) => {
    while (true) {
        const input = prompt(mensaje);
        const numero = parseFloat(input);
        if (!isNaN(numero)) {
            return numero;
        }
        alert("¡Error! Debes ingresar un número válido.");
    }
};

// Función para calcular el costo total de las actividades pagadas usando función de orden superior
const calcularCostoTotal = (pagos) => {
    return pagos.reduce((total, pago) => total + pago, 0);
};

// Función para calcular el descuento en caso de pago con tarjeta de crédito o efectivo
const calcularDescuento = (monto, formaPago) => {
    return formaPago === "1" ? monto * descuentoEfectivo : formaPago === "2" ? monto * descuentoTarjeta : 0;
};

// Función para obtener la forma de pago del usuario
const obtenerFormaPago = () => {
    while (true) {
        const formaPago = prompt("Seleccione forma de pago: (1) Efectivo 20% Descuento, (2) Tarjeta de crédito 10% Descuento");
        if (formaPago === "1" || formaPago === "2") {
            return formaPago;
        }
        alert("Opción inválida. Seleccione 1 o 2.");
    }
};

// Función para obtener la cantidad de entradas por actividad
const obtenerCantidadEntradas = (nombreActividad) => {
    return obtenerNumero(`Ingresa la cantidad de entradas para ${nombreActividad}:`);
};

// Función principal
const main = () => {
    // Variables locales con valores de actividades
    const valoresActividades = {
        "Acceso al parque 10000 pesos por persona": 10000,
        "Rueda de la Fortuna 1500 pesos por persona": 1500, // Cambio de valor
        "Laberinto de espejos incluido en la entrada por persona": 0, // Valor incluido en la entrada
        "Almuerzo entretenido 5000 pesos por persona": 5000,
        "Traslados 500 pesos por persona": 500
    };
    const categorias = Object.keys(valoresActividades);
    const pagos = {};

    // Obtener datos del usuario
    const nombre = prompt("Ingresa tu nombre:");
    const apellido = prompt("Ingresa tu apellido:");
    const clave = prompt("Ingresa tu clave de acceso: 4 últimos dígitos del RUT");

    // Mostrar resumen previo de valores de actividades
    console.log("Resumen de Valores de Actividades:");
    for (const categoria of categorias) {
        console.log(`${categoria}: $${valoresActividades[categoria].toFixed(2)}`);
    }

    // Carrito de compra
    const carrito = [];

// Almacenar valores originales de actividades
const valoresOriginales = { ...valoresActividades };


    // Agregar actividades al carrito
    for (const categoria of categorias) {
        const cantidad = obtenerCantidadEntradas(categoria);
        if (cantidad > 0) {
            carrito.push({ actividad: categoria, cantidad, precio: valoresActividades[categoria] * cantidad });
       // Modificar los valores de las actividades según las entradas del usuario
            valoresActividades[categoria] = valoresActividades[categoria] * cantidad;
        }
    }

    // Mostrar carrito de compra con confirmación
    console.log("Carrito de Compra:");
    for (const item of carrito) {
        console.log(`${item.actividad} - Cantidad: ${item.cantidad} - Precio: $${item.precio.toFixed(2)}`);
    }
    const confirmacion = confirm("¿Desea continuar con la compra?");

    if (!confirmacion) {
        console.log("Compra cancelada.");
        return;
    }

    // Cálculo costo total de actividades pagadas usando función de orden superior
    const costoTotal = calcularCostoTotal(carrito.map(item => item.precio));

    // Obtener forma de pago del usuario
    const formaPago = obtenerFormaPago();

    // Cálculo descuento
    const descuento = calcularDescuento(costoTotal, formaPago);

    // Cálculo monto final a pagar
    const montoFinal = costoTotal - descuento;

    // Mostrar resultado en consola
    console.log("Resumen de compra:");
    console.log(`Nombre: ${nombre} ${apellido}`);
    console.log(`Clave de acceso: ${clave}`);
    console.log("Carrito de Compra:");
    for (const item of carrito) {
        console.log(`${item.actividad} - Cantidad: ${item.cantidad} - Precio: $${item.precio.toFixed(2)}`);
    }
    console.log(`Costo total: $${costoTotal.toFixed(2)}`);
    if (descuento > 0) {
        console.log(`Descuento: $${descuento.toFixed(2)}`);
    }
    console.log(`Monto final a pagar: $${montoFinal.toFixed(2)}`);

    // Alerta de compra exitosa
    alert(`¡Compra exitosa, ${nombre} ${apellido}!\n\nDetalle de compra:\n${carrito.map(item => `${item.actividad} - Cantidad: ${item.cantidad}`).join('\n')}\nCosto total: $${costoTotal.toFixed(2)}\nDescuento: $${descuento.toFixed(2)}\nMonto final a pagar: $${montoFinal.toFixed(2)}`);
};

// Ejecutar función principal
main();
