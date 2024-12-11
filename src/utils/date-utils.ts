import { OccupiedSlot } from "@/types/availability";
import { StudioAvailability } from "@/types/studio";

export function parseTimeRange(timeRange: string): { start: string; end: string } {
  const [start, end] = timeRange.split('-').map(t => t.trim());
  return { start, end };
}

export function generateTimeSlots(start: string, end: string, 
  isEndTimeSelector?: boolean, endStudioTime?: string): string[] {
  const slots: string[] = [];
  const startTime = new Date(`1970-01-01T${start}`);
  const endTime = new Date(`1970-01-01T${end}`);

  while (startTime.getTime() < endTime.getTime()) {
    slots.push(startTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }));
    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  if(endStudioTime && convertTo24Hour(start) <= convertTo24Hour(endStudioTime) && isEndTimeSelector) {
    slots.push(startTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }));
  }

  return slots;
}

export function isTimeSlotAvailable(
  date: Date,
  timeSlot: string,
  occupiedSlots: OccupiedSlot[],
  workingHours: Record<string, string>
): boolean {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  
  if (workingHours[dayOfWeek] === 'Closed') return false;
  
  const { start: openTime, end: closeTime } = parseTimeRange(workingHours[dayOfWeek]);
  const slotTime = convertTo24Hour(timeSlot);
  const openDateTime = convertTo24Hour(openTime);
  const closeDateTime = convertTo24Hour(closeTime);
  
  if (slotTime < openDateTime || slotTime > closeDateTime) return false;

  const dateString = date.toISOString().split('T')[0];
  return !occupiedSlots.some(slot => 
    slot.date === dateString &&
    (slotTime >= convertTo24Hour(slot.startTime) &&
     slotTime < convertTo24Hour(slot.endTime) ||
     slotTime === convertTo24Hour(slot.endTime))
  );
}

export function isTimeSlotBooked(
  date: Date,
  timeSlot: string,
  occupiedSlots: OccupiedSlot[]
): boolean {
  const dateString = date.toISOString().split('T')[0];
  const slotTime = convertTo24Hour(timeSlot);
  
  return occupiedSlots.some(slot => 
    slot.date === dateString &&
    slotTime >= convertTo24Hour(slot.startTime) &&
    slotTime < convertTo24Hour(slot.endTime)
  );
}

export function convertTo24Hour(time: string): number {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return (hours * 60 + minutes) * 60 + (seconds || 0);
}

export function isDayFullyBooked(
  date: Date,
  occupiedSlots: OccupiedSlot[],
  workingHours: Record<string, string>
): boolean {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  if (!workingHours || !workingHours[dayOfWeek] || workingHours[dayOfWeek] === 'Closed') return true;

  const { start, end } = parseTimeRange(workingHours[dayOfWeek]);
  const timeSlots = generateTimeSlots(start, end);

  return timeSlots.every(slot => !isTimeSlotAvailable(date, slot, occupiedSlots, workingHours));
}

export function getAvailableEndTimes(
  date: Date,
  startTime: string,
  occupiedSlots: OccupiedSlot[],
  studioAvailability: StudioAvailability
): string[] {
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
  const daySchedule = studioAvailability[dayOfWeek];

  if (daySchedule === "Closed") return [];

  let { end } = parseTimeRange(daySchedule);

  const endStudioTime = end;

  // Calculamos la hora mínima de finalización (30 minutos después de la hora de inicio)
  const minEndTime = new Date(`1970-01-01T${startTime}`);
  minEndTime.setMinutes(minEndTime.getMinutes() + 30);
  const minEndTimeString = minEndTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  const dateString = date.toISOString().split('T')[0];
  const relevantOccupiedSlots = occupiedSlots
    .filter(slot => slot.date === dateString)
    .sort((a, b) => convertTo24Hour(a.startTime) - convertTo24Hour(b.startTime));

  for (const occupiedSlot of relevantOccupiedSlots) {
    if (convertTo24Hour(startTime) < convertTo24Hour(occupiedSlot.startTime)) {
      end = occupiedSlot.startTime;
      break;
    }
  }

  return generateTimeSlots(minEndTimeString, end, true, endStudioTime).filter(slot => 
    convertTo24Hour(slot) > convertTo24Hour(startTime) &&
    !relevantOccupiedSlots.some(occupiedSlot => 
      convertTo24Hour(slot) > convertTo24Hour(occupiedSlot.startTime) &&
      convertTo24Hour(slot) <= convertTo24Hour(occupiedSlot.endTime)
    )
  );
}

