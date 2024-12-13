"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LockIcon } from "lucide-react";

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function UnauthModal({
  isOpen,
  onClose,
  onLogin,
}: AuthRequiredModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center space-y-4">
          <div className="rounded-full bg-yellow-100 p-3">
            <LockIcon className="h-8 w-8 text-yellow-500" />
          </div>
          <DialogTitle className="text-2xl font-semibold text-center">
            Authentication Required
          </DialogTitle>
          <DialogDescription className="text-center">
            You need to be logged in to make a reservation. Please log in to
            continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            data-cy="booking-login-modal"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={onLogin}
          >
            Log In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
