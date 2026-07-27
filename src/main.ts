import { TodoList } from "./TodoList";

// Listan där alla uppgifter hanteras
const todoList = new TodoList();

// Hämtar alla element från HTML som vi behöver jobba med
const form = document.getElementById("todoForm") as HTMLFormElement;
const taskInput = document.getElementById("task") as HTMLInputElement;
const priorityInput = document.getElementById("priority") as HTMLSelectElement;
const todoContainer = document.getElementById("todoContainer") as HTMLDivElement;
const errorBox = document.getElementById("error") as HTMLDivElement;

// Funktion som ritar ut alla uppgifter på sidan
function renderTodos() {
    // Tömmer innehållet innan vi lägger till allt igen
    todoContainer.innerHTML = "";

    // Hämtar alla uppgifter från klassen och går igenom dem en och en
    todoList.getTodos().forEach((todo, index) => {
        const div = document.createElement("div");
        div.className = "todo-item";

        // Skapar själva HTML-innehållet för varje uppgift
        div.innerHTML = `
            <p>${todo.task} (prio: ${todo.priority})</p>
            <p>Status: ${todo.completed ? "Klar" : "Inte avklarad"}</p>

            <button data-index="${index}" class="toggleBtn">
                ${todo.completed ? "Markera som icke-klarad" : "Markera som avklarad"}
            </button>
        `;

        todoContainer.appendChild(div);
    });

    // Lägger till click-event på alla knappar
    document.querySelectorAll(".toggleBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = Number((e.target as HTMLButtonElement).dataset.index);
            const todo = todoList.getTodos()[index];

            // Enkel toggling: om klar → gör icke-klar, annars gör klar
            if (todo.completed) {
                todoList.unmarkTodoCompleted(index);
            } else {
                todoList.markTodoCompleted(index);
            }

            // Ritar om listan så att knappen och status uppdateras
            renderTodos();
        });
    });
}

// När man skickar formuläret (lägger till en uppgift)
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Stoppar sidan från att laddas om
    errorBox.textContent = ""; // Tömmer eventuella felmeddelanden

    const task = taskInput.value;
    const priority = Number(priorityInput.value);

    // Försöker lägga till uppgiften i klassen addTodo
    const success = todoList.addTodo(task, priority);

    // Visa ett enkelt felmeddelande om något är fel
    if (!success) {
        errorBox.textContent = "Fel: kontrollera text och prioritet (1–3).";
        return;
    }

    // Tömmer fälten efter att uppgiften lagts till
    taskInput.value = "";
    priorityInput.value = "1";

    // Ritar ut uppdaterad lista
    renderTodos();
});

// Ritar ut uppgifterna direkt när sidan laddas
renderTodos();
