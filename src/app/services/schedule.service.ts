import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TimeSlot {
  day: string;
  startHour: number;
  endHour: number;
}

export interface Booking {
  id: string;
  visitorName: string;
  visitorEmail: string;
  visitorPhone: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  purpose: string;
  meetingLink?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  bookedAt: string;
}

export interface ScheduleAvailability {
  timeSlots: TimeSlot[];
  lastUpdated: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private readonly AVAILABILITY_KEY = 'schedule_availability';
  private readonly BOOKINGS_KEY = 'schedule_bookings';
  private readonly SLOT_DURATION = 30; // minutes

  private availabilitySubject = new BehaviorSubject<TimeSlot[]>(this.loadAvailability());
  private bookingsSubject = new BehaviorSubject<Booking[]>(this.loadBookings());

  availability$ = this.availabilitySubject.asObservable();
  bookings$ = this.bookingsSubject.asObservable();

  constructor() {}

  // Load availability from localStorage
  private loadAvailability(): TimeSlot[] {
    const stored = localStorage.getItem(this.AVAILABILITY_KEY);
    return stored ? JSON.parse(stored) : this.getDefaultAvailability();
  }

  // Load bookings from localStorage
  private loadBookings(): Booking[] {
    const stored = localStorage.getItem(this.BOOKINGS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  // Get default availability (example: 9 AM to 5 PM, weekdays only)
  private getDefaultAvailability(): TimeSlot[] {
    return [
      { day: 'Monday', startHour: 9, endHour: 17 },
      { day: 'Tuesday', startHour: 9, endHour: 17 },
      { day: 'Wednesday', startHour: 9, endHour: 17 },
      { day: 'Thursday', startHour: 9, endHour: 17 },
      { day: 'Friday', startHour: 9, endHour: 17 }
    ];
  }

  // Save availability
  saveAvailability(timeSlots: TimeSlot[]): void {
    localStorage.setItem(this.AVAILABILITY_KEY, JSON.stringify(timeSlots));
    this.availabilitySubject.next(timeSlots);
  }

  // Get current availability
  getAvailability(): TimeSlot[] {
    return this.availabilitySubject.value;
  }

  // Get available time slots for a specific date
  getAvailableSlots(date: Date): string[] {
    const dayName = this.getDayName(date);
    const availability = this.getAvailability();
    const slot = availability.find(s => s.day === dayName);
    
    if (!slot) return [];

    const slots: string[] = [];
    const bookings = this.getBookingsForDate(date);
    
    for (let hour = slot.startHour; hour < slot.endHour; hour++) {
      for (let minute = 0; minute < 60; minute += this.SLOT_DURATION) {
        const timeStr = this.formatTime(hour, minute);
        const isBooked = bookings.some(b => b.startTime === timeStr);
        if (!isBooked) {
          slots.push(timeStr);
        }
      }
    }
    
    return slots;
  }

  // Get bookings for a specific date
  private getBookingsForDate(date: Date): Booking[] {
    const dateStr = this.formatDate(date);
    return this.getBookings().filter(b => b.date === dateStr && b.status === 'scheduled');
  }

  // Create a new booking
  createBooking(booking: Omit<Booking, 'id' | 'bookedAt'>): Booking {
    const newBooking: Booking = {
      ...booking,
      id: this.generateId(),
      bookedAt: new Date().toISOString()
    };
    
    const bookings = this.getBookings();
    bookings.push(newBooking);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
    this.bookingsSubject.next(bookings);
    
    return newBooking;
  }

  // Get all bookings
  getBookings(): Booking[] {
    return this.bookingsSubject.value;
  }

  // Get booking by ID
  getBookingById(id: string): Booking | undefined {
    return this.getBookings().find(b => b.id === id);
  }

  // Cancel booking
  cancelBooking(id: string): boolean {
    const bookings = this.getBookings();
    const booking = bookings.find(b => b.id === id);
    
    if (booking) {
      booking.status = 'cancelled';
      localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));
      this.bookingsSubject.next(bookings);
      return true;
    }
    
    return false;
  }

  // Get upcoming bookings
  getUpcomingBookings(): Booking[] {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return this.getBookings()
      .filter(b => b.status === 'scheduled' && new Date(b.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  // Utility functions
  private getDayName(date: Date): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private formatTime(hour: number, minute: number): string {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  }

  private generateId(): string {
    return `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Export bookings as CSV
  exportBookingsAsCSV(): string {
    const bookings = this.getBookings();
    const headers = ['ID', 'Visitor Name', 'Email', 'Phone', 'Date', 'Time', 'Duration (min)', 'Purpose', 'Status', 'Booked At'];
    
    const rows = bookings.map(b => [
      b.id,
      b.visitorName,
      b.visitorEmail,
      b.visitorPhone,
      b.date,
      `${b.startTime} - ${b.endTime}`,
      b.duration,
      b.purpose,
      b.status,
      new Date(b.bookedAt).toLocaleString()
    ]);

    const csv = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return csv;
  }
}
