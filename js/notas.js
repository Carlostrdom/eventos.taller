// Inicializar array de notas y variable idGlobal
let notas = [
    { id: 1, titulo: "Nota 1", texto: "Texto de la nota 1", realizada: false },
    { id: 2, titulo: "Nota 2", texto: "Texto de la nota 2", realizada: true }
];
let idGlobal = 2;


const pintarNotas = () => {
    const contenedorNotas = document.getElementById('contenedorNotas');
    contenedorNotas.innerHTML = '';

    if (notas.length === 0) {
        contenedorNotas.innerHTML = '<p>No hay notas para mostrar</p>';
        return;
    }

    const filtroTexto = document.getElementById('filterText').value.toLowerCase();
    const filtroRealizadas = document.getElementById('filterCompleted').checked;

    const notasFiltradas = notas.filter(nota => {
        const matchTexto = nota.titulo.toLowerCase().includes(filtroTexto) || nota.texto.toLowerCase().includes(filtroTexto);
        const matchRealizadas = !filtroRealizadas || nota.realizada;
        return matchTexto && matchRealizadas;
    });

    if (notasFiltradas.length === 0) {
        contenedorNotas.innerHTML = '<p>No hay notas para mostrar</p>';
        return;
    }

    notasFiltradas.forEach(nota => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('card', 'mb-3');
        tarjeta.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${nota.titulo}</h5>
                <p class="card-text">${nota.texto}</p>
                <button class="btn btn-danger" onclick="borrarNota(${nota.id})">Borrar Nota</button>
                <div class="form-check mt-2">
                    <input type="checkbox" class="form-check-input" onclick="marcarRealizada(${nota.id})" ${nota.realizada ? "checked" : ""}>
                    <label class="form-check-label">Realizada</label>
                </div>
            </div>
        `;
        contenedorNotas.appendChild(tarjeta);
    });
};

const agregarNota = (titulo, texto) => {
    idGlobal++;
    notas.push({ id: idGlobal, titulo, texto, realizada: false });
};

const borrarNota = (id) => {
    notas = notas.filter(nota => nota.id !== id);
    pintarNotas();
};

const marcarRealizada = (id) => {
    const nota = notas.find(nota => nota.id === id);
    nota.realizada = !nota.realizada;
    pintarNotas();
};

document.getElementById('guardarNotaBtn').addEventListener('click', () => {
    const titulo = document.getElementById('tituloInput').value;
    const texto = document.getElementById('textoInput').value;

    if (titulo.trim() && texto.trim()) {
        agregarNota(titulo, texto);
        pintarNotas();
        document.getElementById('tituloInput').value = '';
        document.getElementById('textoInput').value = '';
    }
});

document.getElementById('limpiarCamposBtn').addEventListener('click', () => {
    document.getElementById('tituloInput').value = '';
    document.getElementById('textoInput').value = '';
});

document.getElementById('filterText').addEventListener('input', pintarNotas);
document.getElementById('filterCompleted').addEventListener('change', pintarNotas);

pintarNotas();
