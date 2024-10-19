import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, completeTask }) => {
  return (
    <div className="card my-2" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{task.title}</h5>
        <p className="card-text">Description: {task.description}</p>
        <p className="card-text">Deadline: {task.deadline.toLocaleString('en-IN')}</p>
        <button className="btn btn-primary me-2" onClick={() => onEdit(task.id)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
        {task.status === 'To Do' && (
          <button className="btn btn-success" onClick={() => completeTask(task.id)}>Complete</button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
