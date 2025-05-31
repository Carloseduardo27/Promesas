// Obtener referencias del DOM
const botonIniciarPedido = document.getElementById('iniciarPedido');
const mensajes = document.getElementById('mensajes');

//Simula la preparación de un platillo con un retardo.

const simularPreparacion = (platillo) => {
    return new Promise((resolve) => {
        // Añadir mensaje de inicio de preparación
        mensajes.innerHTML += `<p>Preparando ${platillo}...</p>`;
        // Simular un tiempo de preparación de 2 segundos
        setTimeout(() => {
            // Añadir mensaje de platillo listo
            mensajes.innerHTML += `<p>${platillo} listo.</p>`;
            resolve(); // Resolver la promesa
        }, 2000); // 2 segundos de simulación
    });
};

// Añadir un "event listener" al botón para iniciar el pedido
botonIniciarPedido.addEventListener('click', () => {
    // Limpiar mensajes anteriores al iniciar un nuevo pedido
    mensajes.innerHTML = '';
    // Deshabilitar el botón mientras se procesa el pedido
    botonIniciarPedido.disabled = true;
    botonIniciarPedido.textContent = 'Procesando pedido...';

    // Encadenar las promesas para simular la secuencia de preparación
    simularPreparacion('bebida')
        .then(() => simularPreparacion('pizza'))
        .then(() => simularPreparacion('postre'))
        .then(() => {
            // Mensaje final de orden completa
            mensajes.innerHTML += '<p>¡Orden completa entregada!</p>';
            console.log('¡Orden completa entregada!');
        })
        .catch((error) => {
            // Manejo de errores si alguna promesa falla
            mensajes.innerHTML += `<p>Ocurrió un error: ${error.message}</p>`;
        })
        .finally(() => {
            // Habilitar el botón de nuevo al finalizar el proceso
            botonIniciarPedido.disabled = false;
            botonIniciarPedido.textContent = 'Iniciar Pedido';
        });
});
