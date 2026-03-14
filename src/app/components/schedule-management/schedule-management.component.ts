import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScheduleService, TimeSlot, Booking } from '../../services/schedule.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-schedule-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-management.component.html',
  styleUrl: './schedule-management.component.css'
})
export class ScheduleManagementComponent implements OnInit {
  timeSlots: TimeSlot[] = [];
  bookings: Booking[] = [];
  editingSlot: TimeSlot | null = null;
  showSuccessMessage = false;
  successMessage = '';
  activeTab: 'availability' | 'bookings' = 'availability';

  constructor(
    private scheduleService: ScheduleService,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    this.loadAvailability();
    this.loadBookings();
  }

  loadAvailability() {
    this.timeSlots = this.scheduleService.getAvailability();
  }

  loadBookings() {
    this.bookings = this.scheduleService.getBookings()
      .filter(b => b.status === 'scheduled')
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  editSlot(slot: TimeSlot) {
    this.editingSlot = { ...slot };
  }

  saveSlot() {
    if (this.editingSlot) {
      if (this.editingSlot.startHour >= this.editingSlot.endHour) {
        alert('End time must be after start time');
        return;
      }

      const index = this.timeSlots.findIndex(s => s.day === this.editingSlot!.day);
      if (index !== -1) {
        this.timeSlots[index] = this.editingSlot;
      } else {
        this.timeSlots.push(this.editingSlot);
      }

      this.scheduleService.saveAvailability(this.timeSlots);
      this.editingSlot = null;
      this.showSuccess('Availability updated successfully!');
    }
  }

  cancelEdit() {
    this.editingSlot = null;
  }

  removeSlot(day: string) {
    if (confirm(`Remove availability for ${day}?`)) {
      this.timeSlots = this.timeSlots.filter(s => s.day !== day);
      this.scheduleService.saveAvailability(this.timeSlots);
      this.showSuccess('Availability removed!');
    }
  }

  addNewSlot() {
    const newSlot: TimeSlot = {
      day: 'Monday',
      startHour: 9,
      endHour: 17
    };
    this.editingSlot = newSlot;
  }

  cancelBooking(bookingId: string) {
    if (confirm('Are you sure you want to cancel this booking?')) {
      const booking = this.scheduleService.getBookingById(bookingId);

      this.scheduleService.cancelBooking(bookingId);
      this.loadBookings();

      // Send cancellation email to visitor
      if (booking) {
        this.emailService.sendCancellationEmail({
          visitorName: booking.visitorName,
          visitorEmail: booking.visitorEmail,
          date: booking.date,
          time: booking.startTime,
          endTime: booking.endTime,
          purpose: booking.purpose,
          bookingId: booking.id
        }).catch(err => console.error('Failed to send cancellation email:', err));
      }

      this.showSuccess('Booking cancelled!');
    }
  }

  exportBookings() {
    const csv = this.scheduleService.exportBookingsAsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  private showSuccess(message: string) {
    this.successMessage = message;
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  getHourLabel(hour: number): string {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour} ${ampm}`;
  }

  formatDateTime(dateStr: string, timeStr: string): string {
    const date = new Date(dateStr);
    const [hours, minutes] = timeStr.split(':');
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleString();
  }
}
