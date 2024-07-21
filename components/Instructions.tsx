import React from "react";

const Instructions: React.FC = () => (
  <div>
    <h2 className="text-xl font-semibold mb-4 text-theme-subtitle">
      How to Play:
    </h2>
    <ul className="list-disc pl-5 space-y-2 text-sm">
      <li>Click cells to toggle life</li>
      <li>Use controls to start/stop</li>
      <li>Adjust speed with the slider</li>
      <li>Save up to 5 configurations</li>
    </ul>
  </div>
);

export default Instructions;
