// pages/index.js
import React, { useState, useCallback, useRef } from 'react';
import Head from 'next/head';

const numRows = 30;
const numCols = 30;

const createEmptyGrid = () => {
  return Array(numRows).fill().map(() => Array(numCols).fill(0));
};

export default function Home() {
  const [grid, setGrid] = useState(() => createEmptyGrid());
  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      const newGrid = g.map((row, i) =>
        row.map((cell, j) => {
          let neighbors = 0;
          for (let I = -1; I < 2; I++) {
            for (let J = -1; J < 2; J++) {
              if (I === 0 && J === 0) continue;
              const newI = i + I;
              const newJ = j + J;
              if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                neighbors += g[newI][newJ];
              }
            }
          }

          if (neighbors < 2 || neighbors > 3) {
            return 0;
          }
          if (cell === 0 && neighbors === 3) {
            return 1;
          }
          return cell;
        })
      );
      return newGrid;
    });

    setTimeout(runSimulation, 100);
  }, []);

  const handleCellClick = (i, j) => {
    const newGrid = [...grid];
    newGrid[i][j] = grid[i][j] ? 0 : 1;
    setGrid(newGrid);
  };

  const startStopSimulation = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const randomizeGrid = () => {
    const newGrid = createEmptyGrid();
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        newGrid[i][j] = Math.random() > 0.7 ? 1 : 0;
      }
    }
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(createEmptyGrid());
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-2 bg-gray-100">
      <Head>
        <title>Conway's Game of Life</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-8">
          Conway's Game of Life
        </h1>

        <div className="grid gap-[1px] bg-gray-300 p-[1px]" style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}>
          {grid.map((row, i) =>
            row.map((cell, j) => (
              <div
                key={`${i}-${j}`}
                className={`w-5 h-5 ${cell ? 'bg-black' : 'bg-white'} border border-gray-200`}
                onClick={() => handleCellClick(i, j)}
              />
            ))
          )}
        </div>

        <div className="flex space-x-4 mt-8">
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={startStopSimulation}
          >
            {running ? 'Stop' : 'Start'}
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            onClick={randomizeGrid}
          >
            Randomize
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
            onClick={clearGrid}
          >
            Clear
          </button>
        </div>
      </main>
    </div>
  );
}