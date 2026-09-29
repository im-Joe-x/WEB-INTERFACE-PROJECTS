import { useState } from "react";

export default function TodoItem({
  todo,
  onToggle,
  onDelete,
  onEdit,
  onDragStart,
  onDragOver,
  onDrop,
  isDragging,
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  const saveEdit = () => {
    const trimmed = draft.trim();
    if (trimmed === "") {
      onDelete(todo.id);
    } else {
      onEdit(todo.id, trimmed);
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") {
      setDraft(todo.text);
      setEditing(false);
    }
  };

  return (
    <li
      className={`todo-item ${todo.completed ? "completed" : ""} ${isDragging ? "dragging" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, todo.id)}
      onDragOver={(e) => onDragOver(e, todo.id)}
      onDrop={(e) => onDrop(e, todo.id)}
    >
      <span className="drag-handle" title="Drag to reorder">⠿</span>

      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />

      {editing ? (
        <input
          type="text"
          className="edit-input"
          value={draft}
          autoFocus
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="todo-text" onDoubleClick={() => setEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className="todo-actions">
        <button className="icon-btn" onClick={() => setEditing(true)} title="Edit">✎</button>
        <button className="icon-btn danger" onClick={() => onDelete(todo.id)} title="Delete">✕</button>
      </div>
    </li>
  );
}
