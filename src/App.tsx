import React, { useState } from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  const [width, setWidth] = useState(10);
  const [height, setHeight] = useState(10);

  const updateWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const w = Number(e.target.value)
    setWidth(w)
  }

  const updateHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const h = Number(e.target.value)
    setHeight(h)
  }

  return (
    <>
      height: <input type="number" value={height} onChange={updateHeight} />
      <br />
      width: <input type="number" value={width} onChange={updateWidth} />
      <div className="App">
        <Board height={height} width={width} />
      </div>
    </>
  );
}

export default App;
