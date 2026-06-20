import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodoId, setCurrentTodoId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    if (isEditing) {
      setTodos(
        todos.map((todo) =>
          todo.id === currentTodoId ? { ...todo, text: input } : todo
        )
      );
      setIsEditing(false);
      setCurrentTodoId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    }
    setInput('');
  };

  const startEdit = (todo) => {
    setIsEditing(true);
    setCurrentTodoId(todo.id);
    setInput(todo.text);
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-app">
      <div className="todo-container">
        <h1>Task Manager</h1>
        
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? 'Update' : 'Add'}
          </button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => toggleComplete(todo.id)} className="todo-text">
                {todo.text}
              </span>
              <div className="action-buttons">
                <button onClick={() => startEdit(todo)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {todos.length === 0 && <p className="empty-msg">Your task list is empty!</p>}
      </div>
    </div>
  );
}

export default App;