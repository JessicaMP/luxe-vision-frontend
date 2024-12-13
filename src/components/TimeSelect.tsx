import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeSelectProps {
  label?: string;
  value: string | undefined;
  onValueChange?: (value: string) => void;
  timeSlots: string[];
  disabled: boolean;
  placeholder: string;
  isSlotAvailable?: (slot: string) => boolean;
  isSlotBooked?: (slot: string) => boolean;
  classname?: string;
}

export const TimeSelect: React.FC<TimeSelectProps> = ({
  label,
  value,
  onValueChange,
  timeSlots,
  disabled,
  placeholder,
  isSlotAvailable = () => true,
  isSlotBooked = () => false,
  classname,
}) => {
  return (
    <div className=" h-full">
      <Label>{label && label}</Label>
      <div
        data-cy="booking-timeStart"
        className={cn("h-full w-full", classname)}
      >
        <Select
          value={value}
          onValueChange={onValueChange ?? undefined}
          disabled={disabled}
        >
          <SelectTrigger className="!mt-0 h-full">
            <SelectValue placeholder={placeholder}>
              <div className="flex items-center">{value || placeholder}</div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem
                key={time}
                value={time}
                disabled={!isSlotAvailable(time) || isSlotBooked(time)}
                className={cn(
                  isSlotBooked(time) && "text-red-500 line-through",
                  !isSlotAvailable(time) && "text-gray-400"
                )}
              >
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
