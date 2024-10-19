import React from 'react';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="task-list">
      <h2>Task List</h2>
      {tasks.length === 0 ? (
        <p>No tasks available. Add a new task to get started.</p>
      ) : (
        <ul className="task-list-items">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => onDelete(task.id)}
              onEdit={() => onEdit(task.id)}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
