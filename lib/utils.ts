import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const numRows: number = 30;
const numCols: number = 30;

export const createEmptyGrid = (): number[][] => {
  return Array(numRows)
    .fill(null)
    .map(() => Array(numCols).fill(0));
};

export const createSimplePattern = (): number[][] => {
  const grid = createEmptyGrid();
  grid[1][2] = 1;
  grid[2][3] = 1;
  grid[3][1] = 1;
  grid[3][2] = 1;
  grid[3][3] = 1;
  return grid;
};
