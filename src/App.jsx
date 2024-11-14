import React, { useState, useEffect, createContext, useContext } from 'react';
import './index.css';
import Form from './components/Form';
import List from './components/List';

const AppContext = createContext()

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
    <AppContext.Provider value={
      {
        handleSubmit,
        deleteTask,
        setItem,
        item,
        tasks,
        setTasks,
        toggleTodo
      }
    }>
      <div className="px-2 bg-blue-950 min-h-[100vh] py-1 max-w-[700px] mx-auto">
        <Form />
        <List /> 
      </div>
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext)
}

export default App;

