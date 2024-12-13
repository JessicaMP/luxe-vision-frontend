import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ErrorModalProps {
  isOpen: boolean;
  onClose?: () => void;
  errorMessage?: string;
}

export function ErrorModal({ isOpen, onClose, errorMessage }: ErrorModalProps) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center text-center px-4 pb-8 pt-4">
          <h2 className="text-2xl font-semibold mb-6">
            Reservation was unsuccessful
          </h2>
          <p className="text-gray-600 mb-8">
            {errorMessage ||
              "An error occurred while processing your reservation."}
          </p>
          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-8"
            onClick={handleClose}
          >
            Try again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
