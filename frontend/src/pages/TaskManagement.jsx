import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import styles from './TaskManagement.module.css';

const TaskManagement = () => {
  const { eventId } = useParams();
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Book Venue', status: 'completed', assignedTo: 'Rahul Sharma', dueDate: '2025-01-15' },
    { id: 2, title: 'Confirm Catering', status: 'in-progress', assignedTo: 'Priya Patel', dueDate: '2025-01-20' },
    { id: 3, title: 'Send Invitations', status: 'pending', assignedTo: 'Amit Kumar', dueDate: '2025-01-25' },
    { id: 4, title: 'Arrange Decorations', status: 'pending', assignedTo: 'Kavya Iyer', dueDate: '2025-02-01' }
  ]);

  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', dueDate: '' });

  const addTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { ...newTask, id: Date.now(), status: 'pending' }]);
      setNewTask({ title: '', assignedTo: '', dueDate: '' });
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status } : task));
  };

  const progress = Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100);

  return (
    <div className={styles.page}>
      <Navbar />
      
      <div className={styles.container}>
        <h1>Task Management</h1>
        <p className={styles.subtitle}>Track and manage event tasks</p>

        <div className={styles.progressCard}>
          <div className={styles.progressHeader}>
            <span>Overall Progress</span>
            <span className={styles.progressValue}>{progress}%</span>
          </div>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className={styles.addTask}>
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Assigned to"
            value={newTask.assignedTo}
            onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button onClick={addTask} className={styles.btnAdd}>+ Add Task</button>
        </div>

        <div className={styles.taskList}>
          {tasks.map(task => (
            <div key={task.id} className={styles.taskCard}>
              <div className={styles.taskHeader}>
                <h3>{task.title}</h3>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                  className={`${styles.statusSelect} ${styles[task.status]}`}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className={styles.taskDetails}>
                <span>👤 {task.assignedTo}</span>
                <span>📅 {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
