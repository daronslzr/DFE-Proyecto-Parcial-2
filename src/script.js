
class Tarea {
    constructor(title, description, completed, priority, tag, dueDate) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.priority = priority;
        this.tag = tag;
        this.dueDate = dueDate;
    }
}

const tarea1= new Tarea("Tarea Front","Proyecto del Segundo Parcial",false,"Alta","DFE-2-2023",Date("2022-03-25"));
const tarea2= new Tarea("Tarea DVJ","Smash Friends",false,"Media","DVJ-2-2023",Date("2023-08-25"));
const tareasList = [tarea1,tarea2];

function displayTareas(tareas) {
    const tareasBody = document.getElementById('tareas-container');

    tareas.forEach(tarea => {
        const card = document.createElement('div');
        //card.className('tarea-container');
        card.className = 'tarea-container';
        card.innerHTML = `
                    <div class="prioridadTag">
                        <p class="prioridad">${tarea.priority}</p>
                        <p class="tag">${tarea.tag}</p>
                    </div>
                    <div class="informacionTarea">
                        <input type="checkbox" class="checkboxEstatus">
                        <div class="descripcionTarea">
                            <div class="tituloDescripcion">
                                <p class="titulo">${tarea.title}</p>
                                <p class="descripcion">${tarea.description}</p>
                                <p class="dueDate">${tarea.dueDate}</p>
                            </div>
                        </div>
                        <i class="fa-solid fa-pen-to-square"></i>
                    </div>
        `;
        tareasBody.appendChild(card);
    })
}

const modal = document.getElementById("botonAgregarNota");
modal.addEventListener('click',() =>{
    document.getElementById('modal-background').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
})

const cerrarModal = document.getElementById("modal-background");
cerrarModal.addEventListener('click',() =>{
    document.getElementById('modal-background').style.display = 'none';
    document.getElementById('modal').style.display = 'none';
})

displayTareas(tareasList);