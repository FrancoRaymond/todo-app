import React, { useState, useEffect } from 'react';
import { Reorder } from 'framer-motion';
import './index.css';

function App() {
  const [item, setItem] = useState('');
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem('ITEMS');
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem('ITEMS', JSON.stringify(tasks));
  }, [tasks]);

  function handleSubmit(e) {
    e.preventDefault();
    if (item.trim() === '') {
      alert('Please enter an item.');
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: crypto.randomUUID(), title: item, completed: false },
    ]);
    setItem('');
  }

  function toggleTodo(id, completed) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  return (
    <div className="px-2 bg-blue-950 min-h-[100vh] py-1 max-w-[700px] mx-auto">
      <form action="" className="flex flex-col my-3" onSubmit={handleSubmit}>
        <label htmlFor="item" className="text-white text-2xl font-semibold">
          New item
        </label>
        <input
          value={item}
          onChange={(e) => setItem(e.target.value)}
          type="text"
          name="item"
          id="item"
          autoComplete="off"
          placeholder="Add task/item"
          className="bg-orange-500 mt-4 px-4 py-1 rounded-md border-0 outline-none text-white placeholder-gray-300"
        />
        <button
          type="submit"
          className="border rounded-md mt-4 w-5/6 mx-auto px-4 py-1 text-white bg-orange-500 bg-opacity-30 border-orange-500 active:scale-105 transition duration-100 active:font-semibold"
        >
          Add
        </button>
      </form>

      <p className="text-white text-lg font-semibold mb-3">Your list</p>
      <div className="pb-8">
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
            if (axis === 'y') {
              return;
            }
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
                  onClick={() => deleteTask(task.id)}
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
    </div>
  );
}

export default App;

