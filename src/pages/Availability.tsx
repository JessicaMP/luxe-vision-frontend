"use client";

import { useState, useMemo } from "react";
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
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AvailabilityProps, Studio } from "@/types";
import {
  generateTimeSlots,
  isTimeSlotAvailable,
  parseTimeRange,
} from "../utils/date-utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Availability({
  schedule,
  onReserve,
}: AvailabilityProps) {
  const [date, setDate] = useState<Date>();
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [specialty, setSpecialty] = useState<string>();
  const [costPerHour, setCostPerHour] = useState<number>(75);
  const studio: Studio = useSelector(
    (state: RootState) => state.studios.studio
  ) as Studio;

  const total = useMemo(() => {
    if (!startTime || !endTime) return 0;
    return (
      parseFloat(endTime.split(":")[0]) +
      parseFloat(endTime.split(":")[1]) / 60 -
      (parseFloat(startTime.split(":")[0]) +
        parseFloat(startTime.split(":")[1]) / 60)
    );
  }, [startTime, endTime, costPerHour]);

  const formattedDuration = useMemo(() => {
    if (!total) return "Select hours";

    const hours = Math.floor(total);
    const minutes = Math.round((total - hours) * 60);

    if (minutes === 0) return `${hours} hour${hours !== 1 ? "s" : ""}`;
    return `${hours} hour${hours !== 1 ? "s" : ""} and ${minutes} minutes`;
  }, [total]);

  const availableTimeSlots = useMemo(() => {
    if (!date) return [];

    const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
    const daySchedule = schedule.openHours[dayOfWeek];

    if (daySchedule === "Closed") return [];

    const { start, end } = parseTimeRange(daySchedule);
    return generateTimeSlots(start, end).filter((slot) =>
      isTimeSlotAvailable(date, slot, schedule.appointments, schedule.openHours)
    );
  }, [date, schedule]);

  const handleReserve = () => {
    if (date && startTime && endTime) {
      onReserve(startTime, endTime, date);
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
              onSelect={setDate}
              className="border rounded-lg"
              disabled={(date) => {
                const day = date.toLocaleDateString("en-US", {
                  weekday: "long",
                });
                return schedule.openHours[day] === "Closed";
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label>From what hours?</Label>
                <Select
                  value={startTime}
                  onValueChange={(value) => {
                    setStartTime(value);
                    setEndTime(undefined);
                  }}
                  disabled={!date || availableTimeSlots.length === 0}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Start time">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startTime || "Select time"}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Until what hours?</Label>
                <Select
                  value={endTime}
                  onValueChange={setEndTime}
                  disabled={!startTime}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="End time">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endTime || "Select time"}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimeSlots
                      .filter((time) => time > (startTime || ""))
                      .map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 gap-y-6">
          <div className="space-y-4">
            <Label>Appointment Specialty</Label>
            <Select
              value={specialty}
              onValueChange={(value) => setSpecialty(value)}
            >
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Choose a specialty" />
              </SelectTrigger>
              <SelectContent>
                {studio.studioSpecialties.map((specialty) => (
                  <SelectItem
                    key={specialty.id}
                    value={specialty.specialty.specialtyName}
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
              <Label>Specialty</Label>
              <Label>{specialty || "Select a specialty"}</Label>
            </div>
            <div className="flex justify-between">
              <Label>Date</Label>
              <Label>{date?.toDateString() || "Select a date"}</Label>
            </div>
            <div className="flex justify-between">
              <Label>Hours</Label>
              <Label>
                {startTime && endTime
                  ? `From ${startTime} to ${endTime} `
                  : "Select hours"}
              </Label>
            </div>
            <div className="flex justify-between">
              <Label>Total hours</Label>
              <Label className="text-right break-words max-w-[150px]">
                {startTime && endTime ? `${formattedDuration}` : "Select hours"}
              </Label>
            </div>

            <div className="flex justify-between">
              <Label>Cost per hour</Label>
              <Label>{costPerHour}$</Label>
            </div>
            <hr className="w-full" />

            <div className="flex justify-between items-center">
              <Label className="text-lg font-semibold">Total</Label>
              <Label>
                {total
                  ? `${(total * costPerHour).toFixed(2)}$`
                  : "Select hours"}
              </Label>
            </div>
          </div>
          <Button
            className={cn(
              "w-full bg-red-500 hover:bg-red-600 text-white",
              (!date || !startTime || !endTime) &&
                "opacity-50 cursor-not-allowed"
            )}
            onClick={handleReserve}
            disabled={!date || !startTime || !endTime}
          >
            Reserve now
          </Button>
        </div>
      </div>
    </div>
  );
}
