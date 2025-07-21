import React, { useState } from 'react';
import "./ToDoItem.css";

function TodoItem({ item, updateTodo, deleteTodo, refetchTodos }) {
  const [editMode, setEditMode] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [newDesc, setNewDesc] = useState(item.desc);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`https://todolist-fastapi-ga9v.onrender.com/update-todo?token=${token}&todo_id=${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, desc: newDesc, checked: item.checked }),
      });
      await res.json();
      setEditMode(false);
      refetchTodos();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="todo-card">
      {editMode ? (
        <div className="edit-form">
          <input
            className="edit-input"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <input
            className="edit-input"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description"
          />
          <div className="button-group">
            <button className="btn save" onClick={handleUpdate}>Save</button>
            <button className="btn cancel" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="list-item">
          <div className="todo-text">
            <h4>Title: {item.title}</h4>
            <p>Description: {item.desc}</p>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => updateTodo(item.id, !item.checked)}
              />
              {item.checked ? ' Completed' : ' Not Completed'}
            </label>
          </div>
          <div className="todo-buttons">
            <button className="btn edit" onClick={() => setEditMode(true)}>Edit</button>
            <button className="btn delete" onClick={() => deleteTodo(item.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;
