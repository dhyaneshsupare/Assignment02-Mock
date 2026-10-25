import Column from "./Column";

const COLUMNS = ["To Do", "In Progress", "Done"];

function Board({ tasks, onEditTask, onUpdateStatus, onDeleteTask }) {
  return (
    <div className="board">
      {COLUMNS.map((columnStatus) => {
        const columnTasks = tasks.filter(
          (task) => task.status === columnStatus,
        );

        return (
          <Column
            key={columnStatus}
            title={columnStatus}
            tasks={columnTasks}
            onEditTask={onEditTask}
            onUpdateStatus={onUpdateStatus}
            onDeleteTask={onDeleteTask}
          />
        );
      })}
    </div>
  );
}

export default Board;
