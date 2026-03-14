import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ScheduleService, Booking } from '../../services/schedule.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-schedule-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './schedule-booking.component.html',
  styleUrl: './schedule-booking.component.css'
})
export class ScheduleBookingComponent implements OnInit {
  step: 'date' | 'time' | 'details' | 'confirmation' = 'date';
  selectedDate: string = '';
  selectedTime: string = '';
  availableSlots: string[] = [];
  minDate: string = '';
  maxDate: string = '';

  visitorName: string = '';
  visitorEmail: string = '';
  visitorPhone: string = '';
  purpose: string = '';
  meetingLink: string = 'https://meet.google.com'; // default

  bookedSlot: Booking | null = null;
  showError: string = '';
  isSubmitting = false;
  emailSendingStatus: 'pending' | 'sent' | 'failed' = 'pending';

  constructor(
    private scheduleService: ScheduleService,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    this.setDateRange();
  }

  setDateRange() {
    const today = new Date();
    const maxDateObj = new Date(today);
    maxDateObj.setDate(today.getDate() + 30); // 30 days in advance

    this.minDate = this.formatDateForInput(today);
    this.maxDate = this.formatDateForInput(maxDateObj);
    this.selectedDate = this.minDate;
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onDateSelected() {
    const selectedDateObj = new Date(this.selectedDate);
    this.availableSlots = this.scheduleService.getAvailableSlots(selectedDateObj);
    this.selectedTime = '';
    this.showError = '';

    if (this.availableSlots.length === 0) {
      this.showError = 'No available slots for this date. Please choose another date.';
    }
  }

  goToTimeStep() {
    if (!this.selectedDate) {
      this.showError = 'Please select a date';
      return;
    }
    if (this.availableSlots.length === 0) {
      this.showError = 'No available slots for this date';
      return;
    }
    this.showError = '';
    this.step = 'time';
  }

  onTimeSelected() {
    this.showError = '';
  }

  goToDetailsStep() {
    if (!this.selectedTime) {
      this.showError = 'Please select a time';
      return;
    }
    this.showError = '';
    this.step = 'details';
  }

  goBackToDate() {
    this.step = 'date';
    this.showError = '';
  }

  goBackToTime() {
    this.step = 'time';
    this.showError = '';
  }

  async submitBooking() {
    if (!this.validateDetails()) {
      return;
    }

    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.emailSendingStatus = 'pending';

    const endTime = this.calculateEndTime(this.selectedTime);
    const booking: Omit<Booking, 'id' | 'bookedAt'> = {
      visitorName: this.visitorName.trim(),
      visitorEmail: this.visitorEmail.trim(),
      visitorPhone: this.visitorPhone.trim(),
      date: this.selectedDate,
      startTime: this.selectedTime,
      endTime: endTime,
      duration: 30,
      purpose: this.purpose.trim(),
      meetingLink: this.meetingLink.trim() || undefined,
      status: 'scheduled'
    };

    try {
      this.bookedSlot = this.scheduleService.createBooking(booking);

      // Send confirmation email
      const emailSent = await this.emailService.sendBookingConfirmation({
        visitorName: this.visitorName.trim(),
        visitorEmail: this.visitorEmail.trim(),
        date: this.selectedDate,
        time: this.selectedTime,
        endTime: endTime,
        purpose: this.purpose.trim(),
        bookingId: this.bookedSlot.id
      });

      this.emailSendingStatus = emailSent ? 'sent' : 'failed';
      this.step = 'confirmation';
      this.showError = '';
    } catch (error) {
      this.showError = 'Error creating booking. Please try again.';
      this.emailSendingStatus = 'failed';
    } finally {
      this.isSubmitting = false;
    }
  }

  private validateDetails(): boolean {
    if (!this.visitorName.trim()) {
      this.showError = 'Please enter your name';
      return false;
    }
    if (!this.visitorEmail.trim() || !this.isValidEmail(this.visitorEmail)) {
      this.showError = 'Please enter a valid email address';
      return false;
    }
    if (!this.visitorPhone.trim()) {
      this.showError = 'Please enter your phone number';
      return false;
    }
    if (!this.purpose.trim()) {
      this.showError = 'Please enter the purpose of the call';
      return false;
    }
    this.showError = '';
    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private calculateEndTime(startTime: string): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const endMinutes = minutes + 30;
    const endHours = hours + Math.floor(endMinutes / 60);
    const endMins = endMinutes % 60;

    return `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
  }

  resetBooking() {
    this.step = 'date';
    this.selectedDate = this.minDate;
    this.selectedTime = '';
    this.visitorName = '';
    this.visitorEmail = '';
    this.visitorPhone = '';
    this.purpose = '';
    this.meetingLink = 'https://meet.google.com';
    this.bookedSlot = null;
    this.showError = '';
    this.availableSlots = [];
  }

  getDisplayDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getDisplayTime(timeStr: string): string {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  }
}
