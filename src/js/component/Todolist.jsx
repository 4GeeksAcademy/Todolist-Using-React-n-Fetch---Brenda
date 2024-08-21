import React, { useState, useEffect } from 'react';
import '../../styles/index.css';

function TodoContainer() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    // Fetch tasks from the API
    useEffect(() => {
        fetch('https://playground.4geeks.com/todo/users/brenda')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, []);

    // Add a new task to the API
    const addTask = (event) => {
        if (event.key === 'Enter' && input.trim() !== '') {
            const newTask = { label: input.trim(), done: false }; // Ajusta esto según la estructura que la API espera
            fetch('https://playground.4geeks.com/todo/users/brenda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask)
            })
            .then(response => response.json())
            .then(data => {
                setTasks([...tasks, data]);
                setInput('');
            })
            .catch(error => console.error('Error adding task:', error));
        }
    };

    // Delete a task from the API
    const deleteTask = (index) => {
        const taskToDelete = tasks[index];
        fetch(`https://playground.4geeks.com/todo/users/brenda/${taskToDelete.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(() => {
            setTasks(tasks.filter((_, i) => i !== index));
        })
        .catch(error => console.error('Error deleting task:', error));
    };

    return (
        <div className="todo-container">
            <h1>Todos</h1>
            <input
                type="text"
                placeholder="What needs to be done?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={addTask}               
            />
            <ul>
                {tasks.length === 0 ? (
                    <li id="no-tasks">No tasks, add a task</li>
                ) : (
                    tasks.map((task, index) => (
                        <li key={index}>
                            {task.label}
                            <span className="delete-icon" onClick={() => deleteTask(index)}>✖</span>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default TodoContainer;
