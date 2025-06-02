// Obtener referencias del DOM
const botonIniciarPedido = document.getElementById('iniciarPedido');
const mensajes = document.getElementById('mensajes');

//Simula la preparación de un platillo con un retardo.
const simularPreparacion = (platillo) => {
    return new Promise((resolve) => {
        mensajes.innerHTML += `<p>Preparando ${platillo}...</p>`;
        // Simular un tiempo de preparación de 2 segundos
        setTimeout(() => {
            mensajes.innerHTML += `<p>${platillo} listo.</p>`;
            resolve(); 
        }, 2000);
    });
};

// Añadir un "event listener" al botón para iniciar el pedido
botonIniciarPedido.addEventListener('click', () => {
    // Limpiar mensajes anteriores al iniciar un nuevo pedido
    mensajes.innerHTML = '';
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
            mensajes.innerHTML += `<p>Ocurrió un error: ${error.message}</p>`;
        })
        .finally(() => {
            botonIniciarPedido.disabled = false;
            botonIniciarPedido.textContent = 'Iniciar Pedido';
        });
});
