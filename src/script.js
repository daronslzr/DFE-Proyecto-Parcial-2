//#region CLASE TAREA   
class Tarea {
    constructor(id, title, description, completed, priority, tag, dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.priority = priority;
        this.tag = tag;
        this.dueDate = dueDate;
    }
}

function mapAPIToTasks(data) {
    return data.map(item => {
        return new Tarea(
            item.id,
            item.title,
            item.description,
            item.completed,
            item.priority,
            item.tag,
            new Date(item.dueDate)
        );
    });
}
//#endregion CLASE TAREA   

/*const tarea1= new Tarea(1,"Tarea Front","Proyecto del Segundo Parcial",false,"Alta","DFE-2-2023",Date("2022-03-25"));
const tarea2= new Tarea(2,"Tarea DVJ","Smash Friends",false,"Media","DVJ-2-2023",Date("2023-08-25"));
const tareasList = [tarea1,tarea2];*/

//#region MOSTRAR TAREAS
function displayTareas(tareas) {
    const tareasBody = document.getElementById('tareas-container');

    tareas.forEach(tarea => {
        const card = document.createElement('div');
        card.className = 'tarea-container';
        card.innerHTML = `
                    <div class="prioridadTag">
                        <p class="prioridad">Prioridad: ${tarea.priority}</p>
                        <p class="tag">${tarea.tag}</p>
                    </div>
                    <div class="informacionTarea">
                        <input type="checkbox" class="checkboxEstatus">
                        <div class="descripcionTarea">
                            <div class="tituloDescripcion">
                                <p class="titulo">${tarea.title}</p>
                                <p class="descripcion">${tarea.description}</p>
                                <p class="dueDate">${formatDate(tarea.dueDate)}
                                </p>
                            </div>
                        </div>
                        <i class="fa-solid fa-pen-to-square editarBoton" tarea-id="${tarea.id}"></i>
                    </div>
        `;
        tareasBody.appendChild(card);
    })

    initEditarTareaControlador();
}

function initEditarTareaControlador() {
    document.querySelectorAll('.editarBoton').forEach(boton => {
        boton.addEventListener('click', () => {
            const tareaId = boton.getAttribute('tarea-id');
            abrirTarea(tareaId);
        })
    })
}

function editarBotones(tareaId, tareaCompleted) {
    document.getElementById('eliminarTareaBoton').addEventListener('click', () => {
        eliminarTarea(tareaId);
    });
    document.getElementById('guardarCambiosBoton').addEventListener('click', () => {
        //eliminarTarea(tareaId);
        procesarEnvioTareaEditada(tareaId, tareaCompleted);
    });
}

function refrescarTareas() {
    const tareasBody = document.getElementById('tareas-container');
    tareasBody.innerHTML = '';
    getTareas();
}
//#endregion MOSTRAR TAREAS

//#region MODAL
function initAgregarTareaControlador() {
    document.getElementById('botonAgregarNota').addEventListener('click', () => {
        abrirAgregarTareaModal();
    });

    document.getElementById('modal-background').addEventListener('click', () => {
        cerrarAgregarTareaModal();
    });

    document.getElementById('agregarTareaBoton').addEventListener('click', event => {
        event.preventDefault();
        procesarEnvioTarea();
    });
}

function abrirAgregarTareaModal() {
    document.getElementById('tarea-form').reset();
    document.getElementById('modal-background').style.display = 'block';
    document.getElementById('modal').style.display = 'flex';
}

function cerrarAgregarTareaModal() {
    document.getElementById('tarea-form').reset();
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
    document.getElementById('agregarTareaBoton').style.display = 'block';
    document.getElementById('guardarCambiosBoton').style.display = 'none';
    document.getElementById('eliminarTareaBoton').style.display = 'none';

}


function procesarEnvioTarea() {
    const title = document.getElementById('titulo-field').value;
    const description = document.getElementById('descripcion-field').value;
    const completed = false;
    const priority = document.getElementById('prioridad-field').value;
    const tag = document.getElementById('tag-field').value;
    const dueDate = document.getElementById('date-field').value;

    const tareaNueva = new Tarea(
        null,
        title,
        description,
        completed,
        priority,
        tag,
        dueDate
    );

    enviarTarea(tareaNueva);
}

function procesarEnvioTareaEditada(tareaId, tareaCompleted) {
    const title = document.getElementById('titulo-field').value;
    const description = document.getElementById('descripcion-field').value;
    const completed = tareaCompleted;
    const priority = document.getElementById('prioridad-field').value;
    const tag = document.getElementById('tag-field').value;
    const dueDate = document.getElementById('date-field').value;

    const tareaNueva = new Tarea(
        tareaId,
        title,
        description,
        completed,
        priority,
        tag,
        dueDate
    );

    editarTarea(tareaNueva);
}


function editarTareaEnModal(tarea) {
    abrirAgregarTareaModal();
    document.getElementById('agregarTareaBoton').style.display = 'none';
    document.getElementById('guardarCambiosBoton').style.display = 'block';
    document.getElementById('eliminarTareaBoton').style.display = 'block';

    document.getElementById('titulo-field').value = tarea.title;
    document.getElementById('descripcion-field').value = tarea.description;
    document.getElementById('prioridad-field').value = tarea.priority;
    document.getElementById('tag-field').value = tarea.tag;
    document.getElementById('date-field').value = tarea.dueDate;

    editarBotones(tarea.id, tarea.completed);
}
//#endregion MODAL

//#region CONSUMO DE DATOS DESDE API
function enviarTarea(tarea) {
    fetchAPI(`${apiURL}/tasks`, 'POST', tarea)
        .then(() => {
            cerrarAgregarTareaModal();
            refrescarTareas();
            //window.alert(`Tarea ${tarea.id} creada correctamente.`);
        });
}

function getTareas() {
    fetchAPI(`${apiURL}/tasks`, 'GET')
        .then(data => {
            const tareasList = mapAPIToTasks(data);
            displayTareas(tareasList);
        })
}

function abrirTarea(tareaId) {
    fetchAPI(`${apiURL}/tasks/${tareaId}`, 'GET')
        .then(tarea => {
            editarTareaEnModal(tarea);
        })
}

function editarTarea(tarea) {
    fetchAPI(`${apiURL}/tasks/${tarea.id}`, 'PUT', tarea)
        .then(() => {
            window.alert("Tarea editada");
            cerrarAgregarTareaModal();
            refrescarTareas();
        })
}

function eliminarTarea(tareaId) {
    const confirm = window.confirm(`¿Estás seguro de que deseas eliminar esta tarea?`);

    if (confirm) {
        fetchAPI(`${apiURL}/tasks/${tareaId}`, 'DELETE')
            .then(() => {
                window.alert("Tarea eliminada");
                cerrarAgregarTareaModal();
                refrescarTareas();
            });
    }
}

//#endregion CONSUMO DE DATOS DESDE API

//#region INICIALIZACION
initAgregarTareaControlador();
getTareas();
//displayTareas(tareasList);

//#endregion INCIALIZACION