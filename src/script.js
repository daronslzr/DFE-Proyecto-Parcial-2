//#region CLASE TAREA   
class Tarea {
    constructor(id,title, description, completed, priority, tag, dueDate) {
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

    initEliminarTareaControlador();
}

function initEliminarTareaControlador(){
    document.querySelectorAll('.editarBoton').forEach(boton => {
        boton.addEventListener('click', () => {
            const tareaId = boton.getAttribute('tarea-id');
            editarTarea(tareaId);
        })
    })
}

function refrescarTareas(){
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

    document.getElementById('tarea-form').addEventListener('submit', event => {
        event.preventDefault();
        procesarEnvioTarea();
    });
}

function abrirAgregarTareaModal() {
    document.getElementById('tarea-form').reset();
    document.getElementById('modal-background').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
}

function cerrarAgregarTareaModal() {
    document.getElementById('tarea-form').reset();
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
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

function editarTareaEnModal(tarea){
    abrirAgregarTareaModal();
    document.getElementById('titulo-field').value = tarea.title;
    document.getElementById('descripcion-field').value = tarea.description;
    document.getElementById('prioridad-field').value = tarea.priority;
    document.getElementById('tag-field').value = tarea.tag;
    document.getElementById('date-field').value = tarea.dueDate;
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

function getTareas(){
    fetchAPI(`${apiURL}/tasks`, 'GET')
    .then(data => {
        const tareasList = mapAPIToTasks(data);
        displayTareas(tareasList);
    })
}

function editarTarea(tareaId){
    fetchAPI(`${apiURL}/tasks/${tareaId}`, 'GET')
    .then(tarea => {
        editarTareaEnModal(tarea);
    })
}
//#endregion CONSUMO DE DATOS DESDE API

//#region INICIALIZACION
initAgregarTareaControlador();
getTareas();
//displayTareas(tareasList);

//#endregion INCIALIZACION