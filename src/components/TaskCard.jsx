import { useState } from "react";

const STATUS_OPTIONS = ["To Do", "In Progress", "Done"];

function TaskCard({ task, onEditTask, onUpdateStatus, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const currentIndex = STATUS_OPTIONS.indexOf(task.status);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEditTask(task.id, editTitle.trim(), editDescription.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  return (
    <div className="task-card">
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Task title"
          />
          <textarea
            rows="3"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Task description"
          />
          <div className="card-actions">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-header">
            <h3>{task.title}</h3>
            <div className="card-top-buttons">
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
                title="Edit Task"
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => onDeleteTask(task.id)}
                title="Delete Task"
              >
                Delete
              </button>
            </div>
          </div>

          {task.description && <p className="task-desc">{task.description}</p>}

          {/* Status Progression Controls */}
          <div className="card-footer">
            <button
              className="move-btn"
              disabled={currentIndex === 0}
              onClick={() =>
                onUpdateStatus(task.id, STATUS_OPTIONS[currentIndex - 1])
              }
              title="Move Left"
            >
              &larr;
            </button>

            {/* <select
              className="status-select"
              value={task.status}
              onChange={(e) => onUpdateStatus(task.id, e.target.value)}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select> */}

            <button
              className="move-btn"
              disabled={currentIndex === STATUS_OPTIONS.length - 1}
              onClick={() =>
                onUpdateStatus(task.id, STATUS_OPTIONS[currentIndex + 1])
              }
              title="Move Right"
            >
              &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskCard;
