import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, toggleTask, deleteTask } from '../redux/taskSlice';
import ErrorBoundary from './ErrorBoundary';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.items);
  const status = useSelector((state) => state.tasks.status);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleToggle = async (taskId) => {
    try {
      await dispatch(toggleTask(taskId)).unwrap();
      const task = tasks.find(t => t._id === taskId);
      setToastMessage(task?.completed ? 'Task marked as incomplete' : 'Task marked as complete');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to toggle task:', error);
      setToastMessage('Failed to update task status');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await dispatch(deleteTask(taskId)).unwrap();
      setToastMessage('Task deleted successfully');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error('Failed to delete task:', error);
      setToastMessage('Failed to delete task');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const confirmDelete = (taskId) => {
    setShowDeleteConfirm(taskId);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (status === 'loading') {
    return <div className="loading">Loading tasks...</div>;
  }

  if (status === 'failed') {
    return <div className="error-message">Failed to load tasks</div>;
  }

  return (
    <div className="task-list-container">
      <div className="task-filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Tasks
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active Tasks
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed Tasks
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="no-tasks">
          {filter === 'all' && 'No tasks yet. Add one above!'}
          {filter === 'active' && 'No active tasks.'}
          {filter === 'completed' && 'No completed tasks.'}
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task._id)}
                  aria-label={`Mark task "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <div className="task-details">
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                </div>
              </div>
              <div className="task-actions">
                {showDeleteConfirm === task._id ? (
                  <div className="delete-confirm">
                    <button
                      className="confirm-btn"
                      onClick={() => handleDelete(task._id)}
                    >
                      Confirm
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={cancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="delete-btn"
                    onClick={() => confirmDelete(task._id)}
                    aria-label={`Delete task "${task.title}"`}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {showToast && (
        <div className="toast">
          <span className="toast-message">{toastMessage}</span>
          <button className="toast-close" onClick={() => setShowToast(false)}>×</button>
        </div>
      )}
    </div>
  );
};

// Wrap the TaskList component with ErrorBoundary
const TaskListWithErrorBoundary = () => (
  <ErrorBoundary>
    <TaskList />
  </ErrorBoundary>
);

export default TaskListWithErrorBoundary; 