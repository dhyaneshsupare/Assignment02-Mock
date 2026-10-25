import { useState, useEffect } from "react";
import Board from "./components/Board";
import "./App.css";

function App() {
  // Initialize with saved tasks from localStorage, or an empty array [] if none exist
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("kanban_tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Form state for creating a new task
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  // Synchronize task state with localStorage
  useEffect(() => {
    localStorage.setItem("kanban_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // CREATE: Add a new task in order
  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      status,
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setTitle("");
    setDescription("");
    setStatus("To Do");
  };

  // UPDATE (Edit Details): Update a task's title and description
  const editTask = (id, updatedTitle, updatedDescription) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, title: updatedTitle, description: updatedDescription }
          : task,
      ),
    );
  };

  // UPDATE (Status Progression): Move a task to a different column
  const updateTaskStatus = (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  };

  // DELETE: Remove a task by ID
  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Task Management Board</h1>
      </header>

      {/* Create Task Form */}
      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
        <button type="submit" className="add-btn">
          + Add Task
        </button>
      </form>

      {/* Only render the Board once the user has added at least one task */}
      {tasks.length > 0 && (
        <Board
          tasks={tasks}
          onEditTask={editTask}
          onUpdateStatus={updateTaskStatus}
          onDeleteTask={deleteTask}
        />
      )}
    </div>
  );
}

export default App;
