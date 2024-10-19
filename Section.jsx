import React from 'react';
import TaskCard from './TaskCard.jsx';

const Section = ({ title, tasks, deleteTask, completeTask, startEditing, markAsNotCompleted }) => {
    return (
        <div className="task-section">
            <h3>{title}</h3>
            <div className="task-cards">
                {tasks.length === 0 ? (
                    <p>No tasks available</p>
                ) : (
                    tasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onEdit={startEditing}
                            onDelete={deleteTask}
                            completeTask={completeTask}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Section;
