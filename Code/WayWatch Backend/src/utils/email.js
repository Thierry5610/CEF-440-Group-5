import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const sendVerificationEmail = async (email, otp) => {
  try {
    const verifyUrl = `${process.env.API_BASE_URL}/api/verify-email?email=${encodeURIComponent(email)}&otp=${otp}`;

    const templatePath = path.join(__dirname, '../templates/verifyEmail.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    html = html.replace('{{VERIFY_URL}}', verifyUrl).replace('{{OTP_CODE}}', otp);

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,  // taudit098@gmail.com
        pass: process.env.EMAIL_PASS   // app password
      }
    });

    const info = await transporter.sendMail({
      from: `"T-Audit Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Verify your T-Audit email address',
      html,
      headers: {
        'X-Mailer': 'NodeMailer',
      }
    });

    console.log(`Email sent to ${email}. Message ID: ${info.messageId}`);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email sending failed');
  }
};
