import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LoadDialogProps {
  savedSlots: number[];
  onLoad: (slot: number) => void;
  onDelete: (slot: number) => void;
}

const LoadDialog: React.FC<LoadDialogProps> = ({
  savedSlots,
  onLoad,
  onDelete,
}) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="secondary">Load</Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Load Saved Grid</DialogTitle>
      </DialogHeader>
      <div className="grid grid-cols-1 gap-4">
        {savedSlots.length > 0 ? (
          savedSlots.map((slot) => (
            <div key={slot} className="flex justify-between items-center">
              <span>Slot {slot}</span>
              <div>
                <Button onClick={() => onLoad(slot)} className="mr-2">
                  Load
                </Button>
                <Button variant="destructive" onClick={() => onDelete(slot)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p>No saved grids available.</p>
        )}
      </div>
    </DialogContent>
  </Dialog>
);

export default LoadDialog;
