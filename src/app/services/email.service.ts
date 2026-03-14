import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface EmailPayload {
  visitorName: string;
  visitorEmail: string;
  date: string;
  time: string;
  endTime: string;
  purpose: string;
  bookingId: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  constructor(private http: HttpClient) {}

  async sendBookingConfirmation(emailData: EmailPayload): Promise<boolean> {
    try {
      const response = await this.http.post('/api/send-booking-email', {
        visitorName: emailData.visitorName,
        visitorEmail: emailData.visitorEmail,
        bookingDate: emailData.date,
        bookingTime: `${emailData.time} - ${emailData.endTime}`,
        meetingPurpose: emailData.purpose,
        bookingId: emailData.bookingId
      }).toPromise();

      console.log('Booking confirmation email sent:', response);
      return true;
    } catch (error) {
      console.error('Failed to send booking confirmation:', error);
      return false;
    }
  }

  async sendCancellationEmail(emailData: EmailPayload): Promise<boolean> {
    try {
      const response = await this.http.post('/api/send-cancellation-email', {
        visitorName: emailData.visitorName,
        visitorEmail: emailData.visitorEmail,
        bookingDate: emailData.date,
        bookingTime: `${emailData.time} - ${emailData.endTime}`,
        meetingPurpose: emailData.purpose,
        bookingId: emailData.bookingId
      }).toPromise();

      console.log('Cancellation email sent:', response);
      return true;
    } catch (error) {
      console.error('Failed to send cancellation email:', error);
      return false;
    }
  }
}
