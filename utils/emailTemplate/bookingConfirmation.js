const bookingConfirmation = ({ user, booking, property }) => {
  return `<head>
  <meta charset="UTF-8">
  <title>Booking Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f8f9fa;
      padding: 20px;
      color: #333;
    }
    .email-wrapper {
      background: #ffffff;
      max-width: 600px;
      margin: auto;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    h2 {
      color: #4CAF50;
    }
    .details p {
      margin: 6px 0;
    }
    .footer {
      margin-top: 20px;
      font-size: 0.9em;
      color: #888;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <h2>Booking Confirmed!</h2>

    <p>Dear ${user.name},</p>

    <p>Your booking at <strong>${property.title}</strong> has been successfully confirmed. Here are the details:</p>

    <div class="details">
      <p><strong>Check-in:</strong> ${booking.checkIn}</p>
      <p><strong>Check-out:</strong> ${booking.checkOut}</p>
      <p><strong>Total Amount:</strong> $${booking.amount}</p>
    </div>

    <p>We look forward to hosting you. Thank you for choosing us!</p>

    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Shukriya Stays. All rights reserved.</p>
    </div>
  </div>
</body>`;
};

module.exports = bookingConfirmation;
