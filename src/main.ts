import { TodoList } from "./TodoList";

// Skapar själva listan där alla uppgifter hanteras
const todoList = new TodoList();

// Hämtar alla element från HTML:en
const form = document.getElementById("todoForm") as HTMLFormElement;
const taskInput = document.getElementById("task") as HTMLInputElement;
const priorityInput = document.getElementById("priority") as HTMLSelectElement;
const todoContainer = document.getElementById("todoContainer") as HTMLDivElement;
const errorBox = document.getElementById("error") as HTMLDivElement;

// Funktion som visar alla uppgifter på sidan
function renderTodos() {
    todoContainer.innerHTML = ""; // Tömmer innehållet

    todoList.getTodos().forEach((todo, index) => {
        const div = document.createElement("div");
        div.className = `todo-item ${todo.completed ? "todo-done" : ""}`;

        // HTML-innehållet för varje uppgift
        div.innerHTML = `
            <p>${todo.task} (prio: ${todo.priority})</p>

            <p>Skapad: ${new Date(todo.createdAt).toLocaleString([], { 
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
            })}</p>

            <p class="status ${todo.completed ? "status-done" : "status-not-done"}">
                ${todo.completed ? "Klar" : "Inte klar"}
            </p>

            <button data-index="${index}" class="toggleBtn">
                ${todo.completed ? "Markera oklar" : "Markera klar"}
            </button>

            <button data-index="${index}" class="deleteBtn">
                Ta bort
            </button>
        `;

        todoContainer.appendChild(div);
    });

    // Toggle-knapp
    document.querySelectorAll(".toggleBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number((e.target as HTMLButtonElement).dataset.index);
            const todo = todoList.getTodos()[index];

            if (todo.completed) {
                todoList.unmarkTodoCompleted(index);
            } else {
                todoList.markTodoCompleted(index);
            }

            renderTodos();
        });
    });

    // Delete-knapp
    document.querySelectorAll(".deleteBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number((e.target as HTMLButtonElement).dataset.index);
            todoList.deleteTodo(index);
            renderTodos();
        });
    });
}

// När man skickar formuläret (lägger till en uppgift)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    errorBox.textContent = "";

    const task = taskInput.value;
    const priority = Number(priorityInput.value);

    const success = todoList.addTodo(task, priority);

    if (!success) {
        errorBox.textContent = "Fel: kontrollera text och prioritet.";
        return;
    }

    taskInput.value = "";
    priorityInput.value = "1";

    renderTodos();
});

// Visar uppgifterna direkt när sidan laddas
renderTodos();
