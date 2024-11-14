import React, { useState } from 'react';
import { Reorder } from 'framer-motion';
import { useAppContext } from '../App';
import ConfirmDelete from './ConfirmDelete.jsx';

const List = () => {
  const { tasks, setTasks, toggleTodo, deleteTask } = useAppContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);


  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsModalVisible(true);
  };


  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <p className="text-white text-lg font-semibold mb-3">Your list ({tasks.length})</p>
      <div className="pb-8 mx-3">
        {tasks.length === 0 ? (
          <div className="text-gray-500 text-lg font-semibold mt-9 px-6 text-center transition duration-100 bg-gray-100 bg-opacity-10 rounded-md h-40 grid items-center">
            Your tasks/items will appear here
          </div>
        ) : (
          <Reorder.Group
            axis="y"
            values={tasks}
            onReorder={setTasks}
            onDirectionLock={(axis) => {
              if (axis === 'y') return;
            }}
          >
            {tasks.map((task) => (
              <Reorder.Item key={task.id} value={task}>
                <div className="flex gap-3 items-center mt-2 p-1 bg-orange-500 bg-opacity-15 rounded-md xs:px-5 xs:gap-4 xs:py-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="h-4 w-4"
                    id={task.id}
                    onChange={(e) => toggleTodo(task.id, e.target.checked)}
                  />
                  <p
                    className={`text-gray-200 ${
                      task.completed ? 'line-through text-red-400' : ''
                    }`}
                  >
                    {task.title}
                  </p>
                  <button
                    onClick={() => handleDeleteClick(task)}
                    className="bg-gray-300 text-red-500 bg-opacity-10 p-1 ml-auto rounded-md border border-red-500 active:bg-white active:bg-opacity-80 transition duration-75"
                  >
                    Delete
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        )}
      </div>
      
      <ConfirmDelete
        isVisible={isModalVisible}
        onConfirm={confirmDelete}
        onCancel={() => setIsModalVisible(false)}
        taskTitle={taskToDelete?.title || ''}
      />
    </>
  );
};

export default List;
