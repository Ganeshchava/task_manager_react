import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import the Modal component

const TaskForm = ({ addTask, editTask, currentTask, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('Medium'); // New state for priority
  const [isModalOpen, setIsModalOpen] = useState(true); // Manage modal visibility

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setDeadline(currentTask.deadline.toISOString().slice(0, 16)); // Set to datetime-local format
      setPriority(currentTask.priority); // Set priority for editing
    } else {
      setTitle('');
      setDescription('');
      setDeadline('');
      setPriority('Medium'); // Reset priority
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !deadline) {
      alert('Please fill out all fields');
      return;
    }

    const newTask = {
      title,
      description,
      deadline: new Date(deadline),
      status: 'To Do',
      priority, // Include priority in the new task
    };

    if (currentTask) {
      editTask({ ...newTask, id: currentTask.id }); // Include the current task's id when editing
    } else {
      addTask(newTask);
    }

    // Clear the form after submission and close the modal
    setTitle('');
    setDescription('');
    setDeadline('');
    onClose(); // Close the modal after submission
  };

  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <h2>{editTask ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Task Title</label>
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Description</label>
          <textarea
            placeholder="Enter task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Deadline</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <button type="submit">{currentTask ? 'Save Changes' : 'Add Task'}</button>
      </form>
    </Modal>
  );
};

export default TaskForm;
