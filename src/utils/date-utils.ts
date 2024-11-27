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
    startTime.setMinutes(startTime.getMinutes() + 30);
  }

  return slots;
}

export function isTimeSlotAvailable(
  date: Date,
  timeSlot: string,
  appointments: Appointment[],
  openHours: OpenHours
): boolean {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  
  if (openHours[dayOfWeek] === 'Closed') return false;
  
  const { start: openTime, end: closeTime } = parseTimeRange(openHours[dayOfWeek]);
  const slotTime = convertTo24Hour(timeSlot);
  const openDateTime = convertTo24Hour(openTime);
  const closeDateTime = convertTo24Hour(closeTime);
  
  return slotTime >= openDateTime && slotTime < closeDateTime;
}

export function isTimeSlotBooked(
  date: Date,
  timeSlot: string,
  appointments: Appointment[]
): boolean {
  const dateString = date.toISOString().split('T')[0];
  const slotTime = convertTo24Hour(timeSlot);
  
  return appointments.some(apt => 
    apt.date === dateString &&
    slotTime >= convertTo24Hour(apt.startTime) &&
    slotTime < convertTo24Hour(apt.endTime)
  );
}

export function convertTo24Hour(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function isDayFullyBooked(
  date: Date,
  appointments: Appointment[],
  openHours: OpenHours
): boolean {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
  if (openHours[dayOfWeek] === 'Closed') return true;

  const { start, end } = parseTimeRange(openHours[dayOfWeek]);
  const timeSlots = generateTimeSlots(start, end);

  return timeSlots.every(slot => isTimeSlotBooked(date, slot, appointments));
}