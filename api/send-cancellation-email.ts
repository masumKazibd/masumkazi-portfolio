import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env['GMAIL_USER'],
    pass: process.env['GMAIL_APP_PASSWORD']
  }
});

export default async (req: VercelRequest, res: VercelResponse) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { visitorName, visitorEmail, bookingDate, bookingTime, meetingPurpose, bookingId } = req.body;

    // Validate required fields
    if (!visitorName || !visitorEmail || !bookingDate || !bookingTime || !meetingPurpose || !bookingId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email to visitor about cancellation
    const visitorEmailContent = `
      <h2>Your Call Booking Has Been Cancelled</h2>
      <p>Hello ${visitorName},</p>
      <p>Your scheduled call has been cancelled. Here are the details:</p>
      
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="background-color: #fdf3cd;">
          <td style="padding: 10px; border: 1px solid #ffc69b;"><strong>Date</strong></td>
          <td style="padding: 10px; border: 1px solid #ffc69b;">${bookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ffc69b;"><strong>Time</strong></td>
          <td style="padding: 10px; border: 1px solid #ffc69b;">${bookingTime}</td>
        </tr>
        <tr style="background-color: #fdf3cd;">
          <td style="padding: 10px; border: 1px solid #ffc69b;"><strong>Booking ID</strong></td>
          <td style="padding: 10px; border: 1px solid #ffc69b;">${bookingId}</td>
        </tr>
      </table>
      
      <p style="color: #dc3545;">Status: <strong>CANCELLED</strong></p>
      
      <p>If you have any questions or would like to reschedule, please visit our scheduling page.</p>
      
      <p>Best regards,<br>Masum Kazi</p>
      <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;">
      <p style="color: #666; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
    `;

    // Send email to visitor
    await transporter.sendMail({
      from: process.env['GMAIL_USER'],
      to: visitorEmail,
      subject: `Booking Cancellation - ${bookingDate}`,
      html: visitorEmailContent
    });

    // Email to admin about cancellation
    const adminEmailContent = `
      <h2>Booking Cancelled</h2>
      <p>A scheduled call has been cancelled:</p>
      
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="background-color: #fdf3cd;">
          <td style="padding: 10px; border: 1px solid #ffc69b;"><strong>Visitor Name</strong></td>
          <td style="padding: 10px; border: 1px solid #ffc69b;">${visitorName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ffc69b;"><strong>Email</strong></td>
          <td style="padding: 10px; border: 1px solid #ffc69b;">${visitorEmail}</td>
        </tr>
        <tr style="background-color: #fdf3cd;">
          <td style="padding: 10px; border: 1px solid #ffc69b;"><strong>Date & Time</strong></td>
          <td style="padding: 10px; border: 1px solid #ffc69b;">${bookingDate} ${bookingTime}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ffc69b;"><strong>Booking ID</strong></td>
          <td style="padding: 10px; border: 1px solid #ffc69b;">${bookingId}</td>
        </tr>
      </table>
      
      <p style="color: #dc3545;">Status: <strong>CANCELLED</strong></p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env['GMAIL_USER'],
      to: process.env['GMAIL_USER'],
      subject: `Booking Cancelled: ${visitorName} - ${bookingDate}`,
      html: adminEmailContent
    });

    res.status(200).json({
      success: true,
      message: 'Cancellation emails sent successfully',
      bookingId
    });
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send cancellation email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
