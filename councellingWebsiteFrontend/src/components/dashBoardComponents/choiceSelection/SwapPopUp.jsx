import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

const SwapPopUp = ({ startInd, handleSwap }) => {
  const [isSwapOpen, setSwapOpen] = useState(false);
  const [swapNum, setSwapNum] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const endIndex = parseInt(swapNum);
    if (isNaN(endIndex) || endIndex <= 0) return;

    handleSwap(startInd, endIndex - 1);
    setSwapNum("");
    setSwapOpen(false);
  };

  return (
    <Dialog open={isSwapOpen} onOpenChange={setSwapOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
          ↑↓
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">
            Swap Positions
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="swap-number" className="text-sm font-medium">
              Swap choice number <strong>{startInd + 1}</strong> with:{" "}
              <strong>{swapNum}</strong>
            </Label>
            <Input
              id="swap-number"
              type="number"
              placeholder="Enter target choice number"
              value={swapNum}
              onChange={(e) => setSwapNum(e.target.value)}
              className="rounded-md"
              min={1}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!swapNum}
          >
            Confirm Swap
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SwapPopUp;
