let notas = [
    { id: 1, titulo: "Nota 1", texto: "Texto de la nota 1", realizada: false },
    { id: 2, titulo: "Nota 2", texto: "Texto de la nota 2", realizada: true }
];
let idGlobal = 2;


let pintarNotas = () => {
    let contenedorNotas = document.getElementById('contenedorNotas');
    contenedorNotas.innerHTML = '';

    if (notas.length === 0) {
        contenedorNotas.innerHTML = '<p>No hay notas para mostrar</p>';
        return;
    }

    let filtroTexto = document.getElementById('filterText').value.toLowerCase();
    let filtroRealizadas = document.getElementById('filterCompleted').checked;

    let notasFiltradas = notas.filter(nota => {
        let matchTexto = nota.titulo.toLowerCase().includes(filtroTexto) || nota.texto.toLowerCase().includes(filtroTexto);
        let matchRealizadas = !filtroRealizadas || nota.realizada;
        return matchTexto && matchRealizadas;
    });

    if (notasFiltradas.length === 0) {
        contenedorNotas.innerHTML = '<p>No hay notas para mostrar</p>';
        return;
    }

    notasFiltradas.forEach(nota => {
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card', 'mb-3', 'col-5', 'col-sm-3', 'col-md-2', 'mx-2', 'd-inline-block');
        tarjeta.innerHTML += `
            <div class="card bg-warning m-1">
                <div class="card-header">
                    <input id="${nota.id}" onclick="marcarRealizada(${nota.id})" type="checkbox" ${nota.realizada ? 'checked' : ''} />
                    <label for="${nota.id}">
                        <h5>${nota.titulo}</h5>
                    </label>
                </div>
                <div class="card-body d-flex flex-column align-items-center justify-content-between">
                    <p  class="card-text ${nota.realizada ? 'text-decoration-line-through' : ''}">${nota.texto}</p>
                    <button id="borrar" type="button" class="btn btn-danger" onclick="borrarNota(${nota.id})">Borrar Nota</button>
                </div>
            </div>
        `;
        contenedorNotas.appendChild(tarjeta);
    });
};


let agregarNota = (titulo, texto) => {
    idGlobal++;
    notas.push({ id: idGlobal, titulo, texto, realizada: false });
    pintarNotas();
};


let borrarNota = (id) => {
    notas = notas.filter(nota => nota.id !== id);
    pintarNotas();
};


let marcarRealizada = (id) => {
    let nota = notas.find(nota => nota.id === id);
    nota.realizada = !nota.realizada;
    pintarNotas();
};

document.getElementById('guardarNotaBtn').addEventListener('click', () => {
    let titulo = document.getElementById('tituloInput').value;
    let texto = document.getElementById('textoInput').value;

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


document.getElementById('buscarNotasBtn').addEventListener('click', pintarNotas);

document.getElementById('filterText').addEventListener('input', pintarNotas);
document.getElementById('filterCompleted').addEventListener('change', pintarNotas);


pintarNotas();
