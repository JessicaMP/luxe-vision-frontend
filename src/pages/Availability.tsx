import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Studio, StudioSpecialty } from "@/types/studio";
import {
  generateTimeSlots,
  getAvailableEndTimes,
  isDayFullyBooked,
  isTimeSlotAvailable,
  isTimeSlotBooked,
  parseTimeRange,
} from "../utils/date-utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { TimeSelect } from "@/components/TimeSelect";
import { AvailabilityProps } from "@/types/availability";
import { Specialty } from "@/types/specialty";
import { QuoteDTO } from "@/types/quote";
import { UnauthModal } from "@/components/pages/bookings/modals/UnauthModal";
import { useNavigate } from "react-router-dom";
import { bookingSlice } from "@/reducers/bookingReducer";

export default function Availability({
  studioAvailability,
  occupiedSlots,
  onReserve,
}: AvailabilityProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quote = useSelector(
    (state: RootState) => state.bookings.quote
  ) as QuoteDTO;

  const [date, setDate] = useState<Date | undefined>(
    quote ? new Date(quote.date + "T00:00:00") : undefined
  );
  const [startTime, setStartTime] = useState<string | undefined>(
    quote ? quote.startTime : undefined
  );
  const [endTime, setEndTime] = useState<string | undefined>(
    quote ? quote.endTime : undefined
  );

  const [showUnauthModal, setShowUnauthModal] = useState(false);

  const onLogin = () => {
    navigate("/login");
  };

  const [hoursFormatted, setHoursFormatted] = useState<string>();
  const [totalFormatted, setTotalFormatted] = useState<string>();

  const studio: Studio = useSelector(
    (state: RootState) => state.studios.studio
  ) as Studio;

  const [studioSpecialties, setStudioSpecialties] = useState<StudioSpecialty[]>(
    studio.studioSpecialties
  );

  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>(
    quote ? quote.specialty : undefined
  );

  const studioPriceSpecialty = studio.studioPrices?.find(
    (sp) => sp.specialtyID === selectedSpecialty?.id
  );

  const costPerHour = studioPriceSpecialty?.price;

  const isAuthenticated = useSelector(
    (state: RootState) => state.users.isAuthenticated
  );

  const total = () => {
    if (!startTime || !endTime) return 0;

    return (
      parseFloat(endTime.split(":")[0]) +
      parseFloat(endTime.split(":")[1]) / 60 -
      (parseFloat(startTime.split(":")[0]) +
        parseFloat(startTime.split(":")[1]) / 60)
    );
  };

  useEffect(() => {
    setHoursFormatted(formattedDuration());
  }, [endTime, startTime]);

  useEffect(() => {
    setTotalFormatted(formatTotal());
  }, [studioPriceSpecialty, hoursFormatted]);

  const formattedDuration = () => {
    if (!(date || startTime || endTime)) return "Select hours";

    const totalTime = total();
    if (totalTime === 0) return "Select hours";

    const hours = Math.floor(totalTime);
    const minutes = Math.round((totalTime - hours) * 60);

    if (minutes === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minutes`;
  };

  const timeSlots = useMemo(() => {
    if (!date || !startTime || !endTime) return [];

    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();

    const daySchedule = studioAvailability[dayOfWeek];

    if (daySchedule === "Closed") return [];
    const { start, end } = parseTimeRange(daySchedule);
    return generateTimeSlots(start, end);
  }, [date, studioAvailability]);

  const availableEndTimes = useMemo(() => {
    if (!date || !startTime) return [];
    return getAvailableEndTimes(
      date,
      startTime,
      occupiedSlots,
      studioAvailability
    );
  }, [date, startTime, occupiedSlots, studioAvailability]);

  const isSlotAvailable = (slot: string) => {
    return (
      date && isTimeSlotAvailable(date, slot, occupiedSlots, studioAvailability)
    );
  };

  const isSlotBooked = (slot: string) => {
    return date && isTimeSlotBooked(date, slot, occupiedSlots);
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setStartTime(undefined);
    setEndTime(undefined);
  };

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    setEndTime(undefined);
  };

  const formatTotal = () => {
    if (!studioPriceSpecialty) return "Complete the form";
    return Number(studioPriceSpecialty?.price * total()).toLocaleString(
      "en-US",
      {
        style: "currency",
        currency: "USD",
      }
    );
  };

  const handleReserve = () => {
    const pricePerHour = studioPriceSpecialty?.price ?? 0;

    if (!isAuthenticated) {
      const quote = {
        date,
        startTime,
        endTime,
        pricePerHour,
        totalHours: total(),
        specialty: selectedSpecialty,
        studio: studio,
      };
      dispatch(bookingSlice.actions.setQuote(quote));
      setShowUnauthModal(true);
      return;
    }

    if (date && startTime && endTime && selectedSpecialty) {
      onReserve({
        date,
        startTime,
        endTime,
        pricePerHour,
        totalHours: total(),
        specialty: selectedSpecialty,
        studio: studio,
      });
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex flex-col sm:flex-row gap-12 max-w-2xl">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <Label>Which day?</Label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => {
                handleDateChange(date);
              }}
              className="border rounded-lg"
              disabled={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const day = date
                  .toLocaleDateString("en-US", {
                    weekday: "long",
                  })
                  .toLowerCase();
                return (
                  date < today ||
                  !studioAvailability ||
                  !studioAvailability[day] ||
                  studioAvailability[day] === "Closed" ||
                  isDayFullyBooked(date, occupiedSlots, studioAvailability)
                );
              }}
              modifiers={{
                booked: (date) =>
                  isDayFullyBooked(date, occupiedSlots, studioAvailability),
              }}
              modifiersClassNames={{
                booked: "line-through text-red-500",
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <TimeSelect
                label="From what hours?"
                value={startTime}
                onValueChange={handleStartTimeChange}
                timeSlots={timeSlots}
                disabled={!date || timeSlots.length === 0}
                placeholder="Start time"
                isSlotAvailable={isSlotAvailable}
                isSlotBooked={isSlotBooked}
                classname="mt-2"
              />

              <TimeSelect
                label="Until what hours?"
                value={endTime}
                onValueChange={setEndTime}
                timeSlots={availableEndTimes}
                disabled={!startTime}
                placeholder="End time"
                isSlotAvailable={isSlotAvailable}
                isSlotBooked={isSlotBooked}
                classname="mt-2"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 gap-y-6">
          <div className="space-y-4">
            <Label>Appointment Specialty</Label>
            <Select
              value={selectedSpecialty?.id?.toString()}
              onValueChange={(value) => {
                const specialty = studioSpecialties.find(
                  (s) => s.specialty.id.toString() === value
                )?.specialty;
                setSelectedSpecialty(specialty);
              }}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Choose a specialty" />
              </SelectTrigger>
              <SelectContent>
                {studioSpecialties &&
                  studioSpecialties.map((specialty) => (
                    <SelectItem
                      key={specialty.specialty.id}
                      value={specialty.specialty.id.toString()}
                    >
                      {specialty.specialty.specialtyName}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-6 border rounded-lg p-4">
            <Label className="text-2xl font-semibold">Subtotal:</Label>
            <hr className="w-full" />

            <div className="flex justify-between">
              <Label className="font-bold">Specialty</Label>
              <Label>
                {selectedSpecialty?.specialtyName || "Select a specialty"}
              </Label>
            </div>
            <div className="flex justify-between">
              <Label className="font-bold">Date</Label>
              <Label>{date?.toDateString() || "Select a date"}</Label>
            </div>
            <div className="flex justify-between">
              <Label className="font-bold">Hours</Label>
              <Label>
                {startTime && endTime
                  ? `From ${startTime} to ${endTime} `
                  : "Select hours"}
              </Label>
            </div>
            <div className="flex justify-between">
              <Label className="font-bold">Total hours</Label>
              <Label className="text-right break-words max-w-[150px]">
                {startTime && endTime && hoursFormatted
                  ? `${hoursFormatted}`
                  : "Select hours"}
              </Label>
            </div>

            <div className="flex justify-between">
              <Label className="font-bold">Cost per hour</Label>
              <Label>
                {selectedSpecialty?.specialtyName
                  ? costPerHour == 0
                    ? "Contact us"
                    : `${costPerHour?.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}`
                  : "Select a specialty"}
              </Label>
            </div>
            <hr className="w-full" />

            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Total</Label>
              <Label>{totalFormatted}</Label>
            </div>
          </div>
          <Button
            className={cn(
              "w-full bg-red-500 hover:bg-red-600 text-white",
              (!date || !startTime || !endTime) &&
                "opacity-50 cursor-not-allowed"
            )}
            onClick={handleReserve}
            disabled={!date || !startTime || !endTime || !selectedSpecialty}
          >
            Reserve now
          </Button>
        </div>
      </div>
      <UnauthModal
        isOpen={showUnauthModal}
        onClose={() => setShowUnauthModal(false)}
        onLogin={onLogin}
      />
    </div>
  );
}
