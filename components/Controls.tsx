import React from "react";
import { FaPlay, FaPause, FaRandom, FaTrash, FaSave } from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface ControlsProps {
  running: boolean;
  onStartStop: () => void;
  onRandomize: () => void;
  onClear: () => void;
  onSave: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  running,
  onStartStop,
  onRandomize,
  onClear,
  onSave,
}) => (
  <>
    <Button variant={running ? "destructive" : "default"} onClick={onStartStop}>
      {running ? <FaPause className="mr-2" /> : <FaPlay className="mr-2" />}
      {running ? "Stop" : "Start"}
    </Button>
    <Button variant="secondary" onClick={onRandomize}>
      <FaRandom className="mr-2" />
      Randomize
    </Button>
    <Button variant="outline" onClick={onClear}>
      <FaTrash className="mr-2" />
      Clear
    </Button>
    <Button variant="default" onClick={onSave}>
      <FaSave className="mr-2" />
      Save
    </Button>
  </>
);

export default Controls;
