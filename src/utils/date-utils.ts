import { Appointment, OpenHours } from "@/types";

export function parseTimeRange(timeRange: string): { start: string; end: string } {
  const [start, end] = timeRange.split('-');
  return { start, end };
}

export function generateTimeSlots(start: string, end: string): string[] {
  const slots: string[] = [];
  const startTime = new Date(`1970-01-01T${start}`);
  const endTime = new Date(`1970-01-01T${end}`);

  while (startTime < endTime) {
    slots.push(startTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }));
    startTime.setMinutes(startTime.getMinutes() + 30); // 30-minute increments
  }

  return slots;
}

export function isTimeSlotAvailable(
  date: Date,
  timeSlot: string,
  appointments: Appointment[],
  openHours: OpenHours
): boolean {
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  
  // Check if the studio is open on this day
  if (openHours[dayOfWeek] === 'Closed') return false;
  
  // Check if the time slot is within business hours
  const { start: openTime, end: closeTime } = parseTimeRange(openHours[dayOfWeek]);
  const slotTime = convertTo24Hour(timeSlot);
  const openDateTime = convertTo24Hour(openTime);
  const closeDateTime = convertTo24Hour(closeTime);
  
  if (slotTime < openDateTime || slotTime >= closeDateTime) return false;
  
  // Check if the time slot overlaps with any appointments
  const dateString = date.toISOString().split('T')[0];
  return !appointments.some(apt => 
    apt.date === dateString &&
    slotTime >= convertTo24Hour(apt.startTime) &&
    slotTime < convertTo24Hour(apt.endTime)
  );
}

export function convertTo24Hour(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

