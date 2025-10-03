const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
  // For development with Mailtrap or similar
  // host: 'smtp.mailtrap.io',
  // port: 2525,
  // auth: {
  //   user: 'your_mailtrap_user',
  //   pass: 'your_mailtrap_pass'
  // }
});

// In production, use SendGrid
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
  // 1) Define the email options
  const mailOptions = {
    from: `EcoZenith <${process.env.EMAIL_FROM || 'noreply@ecozenith.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html, // For HTML emails
  };

  // 2) Create a transport and send email
  if (process.env.NODE_ENV === 'production') {
    // In production, use SendGrid
    // await sgMail.send(mailOptions);
  } else {
    // In development, use the transporter (like Mailtrap)
    await transporter.sendMail(mailOptions);
  }
};

module.exports = sendEmail;
