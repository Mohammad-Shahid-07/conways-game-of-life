# Conway's Game of Life

This project is the Conway's Game of Life build using Next.js, Tailwind CSS, Shadcn-ui, and Bun. The game simulates cellular automaton based on a set of rules applied to a 30x30 grid.

## Features

- **Start/Stop Simulation:** Control the game simulation.
- **Randomize Grid:** Generate a random initial state.
- **Clear Grid:** Reset the grid to an empty state.
- **Save and Load Grids:** Save up to 5 grid states and load them as needed.
- **Speed Control:** Adjust the simulation speed.
- **Light/Dark Mode:** Toggle between light and dark themes.

## Getting Started

### Prerequisites

- Node.js
- Bun/npm (for bundling and running the project)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Mohammad-Shahid-07/conways-game-of-life
   cd conways-game-of-life
   ```

2. **Install dependencies:**
   You can use either Bun or npm to install dependencies:

   ```bash
   bun install
   ```

   or

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   bun dev
   ```

   or

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- **Start/Stop the Game:** Click the "Start" button to begin the simulation and the "Stop" button to pause it.
- **Randomize the Grid:** Click the "Randomize" button to fill the grid with a random pattern.
- **Clear the Grid:** Click the "Clear" button to reset the grid to an empty state.
- **Save the Grid:** Click the "Save" button to save the current grid state. You can save up to 5 different states.
- **Load a Saved Grid:** Click the "Load" button to choose and load a previously saved grid state.
- **Delete a Saved Grid:** Click the "Delete" button to remove a saved grid state.
- **Adjust Speed:** Use the speed control to change the simulation speed.
- **Toggle Light/Dark Mode:** Use the mode toggle button to switch between light and dark themes.
