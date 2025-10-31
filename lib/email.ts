const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendNotificationEmail(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@medflow.ai',
    to,
    subject,
    text,
  });
}
