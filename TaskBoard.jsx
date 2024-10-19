import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm.jsx';
import DateTimeDisplay from './DateTimeDisplay.jsx';
import Notification from './Notification.jsx';
import TaskItem from './TaskItem.jsx'; // Import TaskItem

function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [activeSection, setActiveSection] = useState('To Do');
  const [notification, setNotification] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const checkOverdueTasks = () => {
      const now = new Date();
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task.deadline < now && task.status !== 'Completed' && task.status !== 'Overdue' 
          ? { ...task, status: 'Overdue' } 
          : task
        )
      );
    };

    const interval = setInterval(checkOverdueTasks, 1000);
    return () => clearInterval(interval);
  }, []);

  const addTask = (newTask) => {
    const now = new Date();
    const taskStatus = newTask.deadline < now ? 'Overdue' : 'To Do';
    setTasks(prevTasks => [...prevTasks, { ...newTask, status: taskStatus }]);
    setShowForm(false);
    setCurrentTask(null);
    showNotificationWithMessage("Task added successfully!");
  };

  const editTask = (updatedTask) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === currentTask.id ? { ...task, ...updatedTask } : task
    ));
    setShowForm(false);
    setCurrentTask(null);
    showNotificationWithMessage("Task edited successfully!");
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    showNotificationWithMessage("Task deleted successfully!");
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task => task.id === taskId ? { ...task, status: newStatus } : task)
    );
    showNotificationWithMessage(
      newStatus === 'Completed' ? "Task marked as completed!" : "Task marked as not completed!"
    );
  };

  const showNotificationWithMessage = (message) => {
    setNotification(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="task-board">
      <DateTimeDisplay />
      <h2>Task Manager</h2>

      <button onClick={() => {
        setShowForm(!showForm);
        setCurrentTask(null);
      }}>
        {showForm ? 'Cancel' : 'Add Task'}
      </button>

      {showForm && (
        <TaskForm
          addTask={currentTask ? null : addTask}
          editTask={currentTask ? (updatedTask) => editTask(updatedTask) : null}
          currentTask={currentTask}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="task-filter-buttons">
        <button onClick={() => setActiveSection('To Do')}>To Do</button>
        <button onClick={() => setActiveSection('Completed')}>Completed</button>
        <button onClick={() => setActiveSection('Overdue')}>Overdue</button>
      </div>

      <div className="task-sections">
        {activeSection === 'To Do' && (
          <Section
            title="To Do"
            tasks={tasks.filter(task => task.status === 'To Do')}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
            startEditing={setCurrentTask}
          />
        )}

        {activeSection === 'Completed' && (
          <Section
            title="Completed"
            tasks={tasks.filter(task => task.status === 'Completed')}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
          />
        )}

        {activeSection === 'Overdue' && (
          <Section
            title="Overdue"
            tasks={tasks.filter(task => task.status === 'Overdue')}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
            startEditing={setCurrentTask}
          />
        )}
      </div>

      {showNotification && (
        <Notification message={notification} onClose={() => setShowNotification(false)} />
      )}
    </div>
  );
}

const Section = ({ title, tasks, updateTaskStatus, deleteTask, startEditing }) => (
  <div className="section">
    <h3>{title}</h3>
    {tasks.length === 0 ? (
      <p>No tasks in this section.</p>
    ) : (
      tasks.map(task => (
        <div key={task.id} className="task-card">
          <TaskItem
            task={task}
            updateTaskStatus={updateTaskStatus}
          />
          <button onClick={() => deleteTask(task.id)}>Delete</button>
          {startEditing && <button onClick={() => startEditing(task)}>Edit</button>}
        </div>
      ))
    )}
  </div>
);

export default TaskBoard;
