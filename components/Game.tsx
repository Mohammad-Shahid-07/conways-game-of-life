"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ModeToggle } from "./ThemeToggle";
import Controls from "@/components/Controls";
import GameGrid from "@/components/GameGrid";
import Instructions from "@/components/Instructions";
import LoadDialog from "@/components/LoadDialog";
import SpeedControl from "@/components/SpeedControl";
import { createSimplePattern, createEmptyGrid } from "@/lib/utils";

const numRows: number = 30;
const numCols: number = 30;
const MAX_SAVE_SLOTS = 5;

const Game: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>(() => createSimplePattern());
  const [running, setRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(100);
  const [savedSlots, setSavedSlots] = useState<number[]>([]);
  const runningRef = useRef<boolean>(running);
  const speedRef = useRef<number>(speed);
  runningRef.current = running;
  speedRef.current = speed;

  useEffect(() => {
    updateSavedSlots();
  }, []);

  const updateSavedSlots = () => {
    const slots = [];
    for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
      if (localStorage.getItem(`savedGrid${i}`)) {
        slots.push(i);
      }
    }
    setSavedSlots(slots);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return g.map((row, i) =>
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
        }),
      );
    });

    setTimeout(runSimulation, speedRef.current);
  }, []);

  const handleCellClick = (i: number, j: number) => {
    const newGrid = grid.map((row) => [...row]);
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
        newGrid[i][j] = Math.random() > 0.85 ? 1 : 0;
      }
    }
    setGrid(newGrid);
  };

  const clearGrid = () => {
    setGrid(createEmptyGrid());
  };

  const saveGrid = () => {
    for (let i = 1; i <= MAX_SAVE_SLOTS; i++) {
      if (!localStorage.getItem(`savedGrid${i}`)) {
        localStorage.setItem(`savedGrid${i}`, JSON.stringify(grid));
        updateSavedSlots();
        toast({
          title: "Grid Saved",
          description: `Your grid has been saved to slot ${i}.`,
        });
        return;
      }
    }
    toast({
      title: "Save Failed",
      description:
        "All save slots are full. Please delete a save to make room.",
      variant: "destructive",
    });
  };

  const loadGrid = (slotNumber: number) => {
    const savedGrid = localStorage.getItem(`savedGrid${slotNumber}`);
    if (savedGrid) {
      setGrid(JSON.parse(savedGrid));
      toast({
        title: "Grid Loaded",
        description: `Grid from slot ${slotNumber} has been loaded.`,
      });
    } else {
      toast({
        title: "Load Failed",
        description: `No saved grid found in slot ${slotNumber}.`,
        variant: "destructive",
      });
    }
  };

  const deleteSave = (slotNumber: number) => {
    localStorage.removeItem(`savedGrid${slotNumber}`);
    updateSavedSlots();
    toast({
      title: "Save Deleted",
      description: `Save in slot ${slotNumber} has been deleted.`,
    });
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
    speedRef.current = newSpeed;
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-8 bg-theme text-theme">
      <Card className="w-full max-w-4xl p-6">
        <CardContent>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-theme-title">
              Conway&rsquo;s Game of Life
            </h1>
            <ModeToggle />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="col-span-2">
              <GameGrid grid={grid} onCellClick={handleCellClick} />
            </div>
            <Instructions />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Controls
              running={running}
              onStartStop={startStopSimulation}
              onRandomize={randomizeGrid}
              onClear={clearGrid}
              onSave={saveGrid}
            />
            <LoadDialog
              savedSlots={savedSlots}
              onLoad={loadGrid}
              onDelete={deleteSave}
            />
          </div>

          <div className="flex justify-between items-center mb-8">
            <SpeedControl speed={speed} onSpeedChange={handleSpeedChange} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Game;
