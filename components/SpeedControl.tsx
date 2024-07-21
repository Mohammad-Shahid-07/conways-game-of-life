import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const SpeedControl: React.FC<SpeedControlProps> = ({
  speed,
  onSpeedChange,
}) => (
  <div className="w-full">
    <Label htmlFor="speed-slider" className="block text-sm font-medium mb-2">
      Simulation Speed: {speed}ms
    </Label>
    <Slider
      id="speed-slider"
      value={[speed]}
      max={500}
      min={50}
      step={10}
      onValueChange={(value) => onSpeedChange(value[0])}
    />
  </div>
);

export default SpeedControl;
