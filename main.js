import { Task } from "./task.js";

let tareas = [];
let filtroActual = "todas";

// DOM
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const showAllBtn = document.getElementById("showAll");
const showCompletedBtn = document.getElementById("showCompleted");
const showPendingBtn = document.getElementById("showPending");
const markAllBtn = document.getElementById("markAll");
const unmarkAllBtn = document.getElementById("unmarkAll");
const deleteCompletedBtn = document.getElementById("deleteCompleted");

// Agregar tarea personalizada con botón
addTaskBtn.addEventListener("click", () => {
  const taskName = taskInput.value.trim();
  if (taskName) {
    agregarTarea(taskName);
    taskInput.value = ""; // Limpia el input
  }
});

// Agregar tarea personalizada con tecla Enter
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const taskName = taskInput.value.trim();
    if (taskName) {
      agregarTarea(taskName);
      taskInput.value = ""; // Limpia el input
    }
  }
});

// Dropdown personalizado
const dropdownToggle = document.getElementById("dropdownToggle");
const dropdownContent = document.getElementById("dropdownContent");
const addSelectedTasksBtn = document.getElementById("addSelectedTasksBtn");

const tareasPredefinidas = [
  "Actualizar base de datos",
  "Actualizar sitio web",
  "Configurar nueva herramienta",
  "Enviar factura",
  "Hacer backup de archivos",
  "Hacer pausa activa",
  "Hacer reporte de avances",
  "Investigar tendencias del mercado",
  "Llamada con cliente X",
  "Organizar carpetas en la nube",
  "Organizar reunión virtual",
  "Planificar agenda diaria",
  "Preparar informe semanal",
  "Preparar presupuesto",
  "Preparar presentación",
  "Redactar propuesta de proyecto",
  "Responder mensajes en Slack",
  "Revisar correos",
  "Revisar métricas del mes",
  "Revisar tareas del equipo",
];

// Función para generar ID
const generarId = () => Date.now();

// Funciones
function agregarTarea(taskName) {
  if (!taskName.trim()) return;
  const nuevaTarea = new Task(generarId(), taskName);
  tareas.push(nuevaTarea);
  mostrarTareas();
}

function eliminarTarea(taskId) {
  tareas = tareas.filter((t) => t.id !== taskId);
  mostrarTareas();
}

function mostrarTareas() {
  taskList.innerHTML = "";
  let tareasFiltradas = tareas;

  if (filtroActual === "completadas") {
    tareasFiltradas = tareas.filter((t) => t.completed);
  } else if (filtroActual === "pendientes") {
    tareasFiltradas = tareas.filter((t) => !t.completed);
  }

  tareasFiltradas.forEach((t) => {
    const li = document.createElement("li");
    const info = document.createElement("div");
    info.className = "task-info";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = t.completed;
    checkbox.addEventListener("click", () => {
      t.toggleCompleted();
      mostrarTareas();
    });

    const span = document.createElement("span");
    span.textContent = t.name;
    if (t.completed) span.classList.add("completed");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => eliminarTarea(t.id));

    info.appendChild(checkbox);
    info.appendChild(span);
    li.appendChild(info);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Filtros
function filtrarTareas(filtro) {
  filtroActual = filtro;
  mostrarTareas();
}

// Lote
function marcarTodas() {
  tareas.forEach((t) => (t.completed = true));
  mostrarTareas();
}

function desmarcarTodas() {
  tareas.forEach((t) => (t.completed = false));
  mostrarTareas();
}

function eliminarCompletadas() {
  tareas = tareas.filter((t) => !t.completed);
  mostrarTareas();
}

// Eventos
addTaskBtn.addEventListener("click", () => agregarTarea(taskInput.value));
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") agregarTarea(taskInput.value);
});

showAllBtn.addEventListener("click", () => filtrarTareas("todas"));
showCompletedBtn.addEventListener("click", () => filtrarTareas("completadas"));
showPendingBtn.addEventListener("click", () => filtrarTareas("pendientes"));

markAllBtn.addEventListener("click", marcarTodas);
unmarkAllBtn.addEventListener("click", desmarcarTodas);
deleteCompletedBtn.addEventListener("click", eliminarCompletadas);

// Dropdown
dropdownToggle.addEventListener("click", () => {
  dropdownContent.style.display =
    dropdownContent.style.display === "block" ? "none" : "block";
});

addSelectedTasksBtn.addEventListener("click", () => {
  const checkboxes = dropdownContent.querySelectorAll(
    'input[type="checkbox"]:checked'
  );
  if (checkboxes.length === 0) {
    alert("Selecciona al menos una tarea");
    return;
  }

  checkboxes.forEach((c) => {
    agregarTarea(c.value);
    c.checked = false;
  });

  dropdownContent.style.display = "none";
});

// Inicializar tareas predefinidas en dropdown
tareasPredefinidas.sort().forEach((t) => {
  const label = document.createElement("label");
  label.innerHTML = `<input type="checkbox" value="${t}"> ${t}`;
  dropdownContent.appendChild(label);
});
