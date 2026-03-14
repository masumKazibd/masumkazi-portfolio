import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Create transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
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

    // Email to visitor
    const visitorEmailContent = `
      <h2>Your Call Booking Confirmation</h2>
      <p>Hello ${visitorName},</p>
      <p>Thank you for scheduling a call with me! Here are your booking details:</p>
      
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${bookingDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Time</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${bookingTime}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Purpose</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${meetingPurpose}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Booking ID</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${bookingId}</td>
        </tr>
      </table>
      
      <p>I look forward to speaking with you!</p>
      <p>Best regards,<br>Masum Kazi</p>
      <hr style="margin-top: 40px; border: none; border-top: 1px solid #ddd;">
      <p style="color: #666; font-size: 12px;">This is an automated message. Please do not reply to this email.</p>
    `;

    // Send email to visitor
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: visitorEmail,
      subject: `Your Call Booking Confirmation - ${bookingDate}`,
      html: visitorEmailContent
    });

    // Email to you (admin)
    const adminEmailContent = `
      <h2>New Booking Received!</h2>
      <p>You have a new call booking:</p>
      
      <table style="border-collapse: collapse; width: 100%; margin: 20px 0;">
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Visitor Name</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${visitorName}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${visitorEmail}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Date & Time</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${bookingDate} ${bookingTime}</td>
        </tr>
        <tr>
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Purpose</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${meetingPurpose}</td>
        </tr>
        <tr style="background-color: #f5f5f5;">
          <td style="padding: 10px; border: 1px solid #ddd;"><strong>Booking ID</strong></td>
          <td style="padding: 10px; border: 1px solid #ddd;">${bookingId}</td>
        </tr>
      </table>
      
      <p><a href="${process.env.SITE_URL}/schedule-management">View all bookings</a></p>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to yourself
      subject: `New Booking: ${visitorName} - ${bookingDate}`,
      html: adminEmailContent
    });

    res.status(200).json({
      success: true,
      message: 'Emails sent successfully',
      bookingId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
