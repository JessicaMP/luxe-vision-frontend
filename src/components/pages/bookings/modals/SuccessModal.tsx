import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/joy";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { Studio } from "@/types/studio";

interface SuccessModalProps {
  isOpen: boolean;
  onClose?: () => void;
  bookingDetails: {
    date: string;
    time: string;
    duration: string;
    studioName: string;
    specialty: string;
  };
}

export function SuccessModal({
  isOpen,
  onClose,
  bookingDetails,
}: SuccessModalProps) {
  const navigate = useNavigate();

  const studio = useSelector(
    (state: RootState) => state.studios.studio
  ) as Studio;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    navigate("/bookings");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <div className="flex justify-end"></div>
        <div className="flex flex-col items-center text-center px-4 pb-8 pt-4">
          <div className="mb-6">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-6">
            Reservation successfully completed
          </h2>
          <div className="space-y-2 mb-8">
            <p className="text-lg">
              {bookingDetails.date} at {bookingDetails.time} /{" "}
              {bookingDetails.duration}
            </p>
            <div className="flex items-center gap-4 justify-center">
              <Avatar
                alt="logo"
                src={studio.profileImage}
                sx={{ width: 70, height: 70 }}
              />
              <div>
                <p className="font-semibold">{bookingDetails.studioName}</p>
                <p className="text-red-500">{bookingDetails.specialty}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
