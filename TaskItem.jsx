const TaskItem = ({ task, updateTaskStatus }) => {
  const handleComplete = () => {
    if (task.status === 'To Do' || task.status === 'Overdue') {
      updateTaskStatus(task.id, 'Completed');
    }
  };

  const handleNotComplete = () => {
    if (task.status === 'Completed') {
      // Check if the task is overdue and move it back to 'overdue' or 'todo'
      const now = new Date();
      const newStatus = task.deadline < now ? 'Overdue' : 'To Do';
      updateTaskStatus(task.id, newStatus);
    }
  };

  return (
    <div className="task-item">
      <h4>{task.title} (Priority: {task.priority})</h4>
      <p>{task.description}</p>
      <p>Deadline: {task.deadline.toLocaleString('en-IN')}</p>

      {/* Show the "Mark as Completed" button if task is not completed */}
      {task.status !== 'Completed' && (
        <button onClick={handleComplete}>Mark as Completed</button>
      )}

      {/* Show the "Mark as Not Completed" button if task is completed */}
      {task.status === 'Completed' && (
        <button onClick={handleNotComplete}>Mark as Not Completed</button>
      )}
    </div>
  );
};

export default TaskItem;
