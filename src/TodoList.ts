import { Todo } from "./Todo";

export class TodoList {
    // Sparar alla uppgifter i denna array
    private todos: Todo[] = [];

    constructor() {
        // När klassen är skapad, laddas eventuellt sparade uppgifter
        this.loadFromLocalStorage();
    }

    // Lägg till uppgift/todo. Returnerar true ifall allt stämmer
    addTodo(task: string, priority: number): boolean {
        // Validering
        if (task.trim() === "") {
            console.log("Uppgiften var tom så vi kunde inte lägga till den.");
            return false;
        }

        if (priority < 1 || priority > 3) {
            console.log("Prioritet måste vara mellan 1 och 3 (1 = viktigast).");
            return false;
        }

        // Skapa uppgiften/todo:n
        const newTodo: Todo = {
            task: task.trim(),
            completed: false,
            priority: priority,
            createdAt: new Date().toISOString()
        };


        // Lägg till den i listan
        this.todos.push(newTodo);

        // Spara den uppdaterade listan
        this.saveToLocalStorage();

        return true;
    }

    // Markerar uppgift som avklarad
    markTodoCompleted(index: number): void {
        const todo = this.todos[index];

        if (!todo) {
            console.log("Försökte markera en uppgift som klar, men den fanns inte.");
            return;
        }

        todo.completed = true;

        // Spara den uppdaterade listan
        this.saveToLocalStorage();
    }

    // Avmarkerar uppgift så att den inte längre är klar
    unmarkTodoCompleted(index: number): void {
        const todo = this.todos[index];

        if (!todo) {
            console.log("Försökte avmarkera en uppgift som inte finns.");
            return;
        }

        todo.completed = false;

        // Spara den uppdaterade listan
        this.saveToLocalStorage();
    }

    // Returnerar alla uppgifter
    getTodos(): Todo[] {
        return this.todos;
    }

    // Sparar uppgifterna i localStorage.
    saveToLocalStorage(): void {
        localStorage.setItem("todos", JSON.stringify(this.todos));
    }

    // Hämtar todos från localStorage; ifall det finns några
    loadFromLocalStorage(): void {
        const saved = localStorage.getItem("todos");

        if (saved) {
            this.todos = JSON.parse(saved);
        }
    }
}
