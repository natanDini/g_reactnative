import React, { useState } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const completeTask = (index) => {
    let updatedTasks = [...tasks];
    updatedTasks[index].completed = true;
    setTasks([...updatedTasks.filter(t => !t.completed), ...updatedTasks.filter(t => t.completed)]);
  };

  return (
    <div className="App">
      <h2>Checklist</h2>
      <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
        placeholder="Digite um afazer..." 
      />
      <button onClick={addTask}>Salvar</button>
      <ul>
        {tasks.map((t, index) => (
          <li key={index} style={{ textDecoration: t.completed ? 'line-through' : 'none' }}>
            {t.text} 
            {!t.completed && <button onClick={() => completeTask(index)}>V</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;