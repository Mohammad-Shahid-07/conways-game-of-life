import React from "react";

interface GameGridProps {
  grid: number[][];
  onCellClick: (i: number, j: number) => void;
}

const numCols: number = 30;

const GameGrid: React.FC<GameGridProps> = ({ grid, onCellClick }) => (
  <div
    className="grid gap-[1px] bg-grid p-1 rounded-lg shadow-lg"
    style={{
      gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
    }}
  >
    {grid.map((row, i) =>
      row.map((cell, j) => (
        <div
          key={`${i}-${j}`}
          className={`w-3 h-3 md:w-4 md:h-4 ${
            cell ? "bg-cell-alive" : "bg-cell-dead"
          } rounded-sm transition-colors duration-300 ease-in-out hover:bg-cell-hover`}
          onClick={() => onCellClick(i, j)}
        />
      )),
    )}
  </div>
);

export default GameGrid;
