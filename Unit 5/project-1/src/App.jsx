import { useState, useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";
import TodoForm from "./components/TodoForm";
import FilterTabs from "./components/FilterTabs";
import TodoList from "./components/TodoList";

function AppContent() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [filter, setFilter] = useState("All");

  // CREATE
  const addTodo = (text) => {
    const newTodo = { id: Date.now().toString(), text, completed: false };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // UPDATE (toggle complete)
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // UPDATE (edit text)
  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  // DELETE
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  // REORDER (drag & drop)
  const reorderTodos = (draggedId, overId) => {
    setTodos((prev) => {
      const dragIndex = prev.findIndex((t) => t.id === draggedId);
      const overIndex = prev.findIndex((t) => t.id === overId);
      if (dragIndex === -1 || overIndex === -1) return prev;
      const updated = [...prev];
      const [dragged] = updated.splice(dragIndex, 1);
      updated.splice(overIndex, 0, dragged);
      return updated;
    });
  };

  // READ (filtered view)
  const filteredTodos = useMemo(() => {
    if (filter === "Active") return todos.filter((t) => !t.completed);
    if (filter === "Completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const counts = useMemo(
    () => ({
      All: todos.length,
      Active: todos.filter((t) => !t.completed).length,
      Completed: todos.filter((t) => t.completed).length,
    }),
    [todos]
  );

  return (
    <div className="app">
      <div className="todo-card">
        <header className="todo-header">
          <h1>My Tasks</h1>
          <ThemeToggle />
        </header>

        <TodoForm onAdd={addTodo} />
        <FilterTabs current={filter} onChange={setFilter} counts={counts} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
          onReorder={reorderTodos}
        />

        <p className="hint">Drag ⠿ to reorder · Double-click a task to edit it</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
