import { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onToggle, onDelete, onEdit, onReorder }) {
  const [draggedId, setDraggedId] = useState(null);

  const handleDragStart = (e, id) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, overId) => {
    e.preventDefault();
    if (draggedId === null || draggedId === overId) return;
    onReorder(draggedId, overId);
  };

  const handleDrop = (e, id) => {
    e.preventDefault();
    setDraggedId(null);
  };

  if (todos.length === 0) {
    return <p className="empty-state">No tasks here. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          isDragging={draggedId === todo.id}
        />
      ))}
    </ul>
  );
}
