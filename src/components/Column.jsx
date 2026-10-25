import TaskCard from "./TaskCard";

function Column({ title, tasks, onEditTask, onUpdateStatus, onDeleteTask }) {
  return (
    <div className="column">
      <div className="column-header">
        <h2>{title}</h2>
        <span className="task-count">{tasks.length}</span>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="empty-column">No tasks in {title}</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEditTask={onEditTask}
              onUpdateStatus={onUpdateStatus}
              onDeleteTask={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Column;
