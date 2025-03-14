import React, { useState } from 'react';
import './App.css';

function App() {
  const [lines, setLines] = useState([0]);

  const handleClick = () => {
    let newLines = [...lines];
    if (newLines[newLines.length - 1] < 9) {
      newLines[newLines.length - 1] += 1;
    } else {
      newLines.push(0);
    }
    setLines(newLines);
  };

  return (
    <div className="App">
      {lines.map((num, index) => (
        <p key={index}>{num}</p>
      ))}
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

export default App;