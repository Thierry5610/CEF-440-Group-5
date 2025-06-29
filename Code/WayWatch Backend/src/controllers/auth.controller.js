import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../models/user.model.js';
import { sendVerificationEmail } from '../utils/email.js';
import redisClient from '../config/redis.js';

const otpStore = {
  set: async (email, otp) => {
    const key = `otp:${email}`;
    // Temporarily increasing expiry to 1 hour (3600 seconds) for debugging
    const expiry = 3600;
    console.log(`[OTP Store] SETTING key: ${key}, value: ${otp}, EX: ${expiry} seconds`);
    return redisClient.set(key, otp, { EX: expiry });
  },
  get: async (email) => {
    const key = `otp:${email}`;
    console.log(`[OTP Store] GETTING key: ${key}`);
    const value = await redisClient.get(key);
    console.log(`[OTP Store] GETTING result for key ${key}:`, value); // Log what was actually retrieved
    return value;
  },
  delete: async (email) => {
    const key = `otp:${email}`;
    console.log(`[OTP Store] DELETING key: ${key}`);
    return redisClient.del(key);
  }
};

// Register User & send OTP email
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashed = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP in Redis
    await otpStore.set(email, otp);

    const user = await User.create({
      username,
      email,
      password: hashed,
      isVerified: false
    });

    // Construct the verification URL (ensure process.env.BASE_URL is set correctly)
    const verifyUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${otp}?email=${encodeURIComponent(email)}`;
    await sendVerificationEmail(email, otp, verifyUrl); // Send email

    res.status(201).json({ message: 'User registered. OTP sent to email.' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// Resend OTP email
export const resendOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await otpStore.set(email, otp); // Store new OTP

    const verifyUrl = `${process.env.BASE_URL}/api/v1/auth/verify/${otp}?email=${encodeURIComponent(email)}`;
    await sendVerificationEmail(email, otp, verifyUrl); // Send new email

    console.log(`OTP resent to ${email}`);
    res.json({ message: 'OTP resent successfully to your email.' });
  } catch (err) {
    console.error('Resend OTP error:', err);
    res.status(500).json({ message: 'Failed to resend OTP', error: err.message });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const method = req.method;
  let { email, otp } = method === 'GET' ? req.query : req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  // Ensure OTP is a string and trim whitespace
  otp = otp.toString().trim();

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isVerified) {
      if (method === 'GET') return res.redirect(`${process.env.CLIENT_URL}/already-verified`);
      return res.status(400).json({ message: 'Already verified' });
    }

    const storedOtp = await otpStore.get(email); // This will now log the actual value from Redis

    // --- OTP Verification Deep Debug (KEEP THESE!) ---
    console.log('--- OTP Verification Deep Debug ---');
    console.log('Verifying OTP for email:', email);
    console.log('OTP received in request (after trim):', otp);
    console.log('  Received OTP Length:', otp ? otp.length : 'N/A');
    console.log('  Received OTP Char Codes:', otp ? Array.from(otp).map(char => char.charCodeAt(0)) : 'N/A');

    console.log('OTP retrieved from Redis (storedOtp):', storedOtp); // This will now show 'null' if not found
    console.log('  Stored OTP Length:', storedOtp ? storedOtp.length : 'N/A');
    console.log('  Stored OTP Char Codes:', storedOtp ? Array.from(storedOtp).map(char => char.charCodeAt(0)) : 'N/A');

    console.log('Are received and stored OTPs equal (===)?', storedOtp === otp);
    console.log('--- End OTP Verification Deep Debug ---');

    if (!storedOtp || storedOtp !== otp) {
      if (method === 'GET') return res.redirect(`${process.env.CLIENT_URL}/invalid-otp`);
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    await user.save();
    await otpStore.delete(email); // Delete OTP after successful verification

    console.log(`User verified: ${email}`);

    if (method === 'GET') return res.redirect(`${process.env.CLIENT_URL}/email-verified-success`);
    return res.json({ message: 'Verification successful. You can now login.' });

  } catch (err) {
    console.error('OTP verification error:', err);
    return res.status(500).json({ message: 'Verification failed', error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (!user.isVerified) return res.status(403).json({ message: 'Email not verified' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    console.log(`${user.email} logged in`);
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

// Request Password reset
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.verificationToken = resetToken; // reuse field
    await user.save();

    const resetUrl = `${process.env.BASE_URL}/api/v1/auth/reset-password/${resetToken}`;
    console.log(`Password reset URL: ${resetUrl}`);

    res.status(200).json({
      message: 'Password reset link generated.',
      resetUrl
    });
  } catch (err) {
    console.error('Password reset request error:', err);
    res.status(500).json({ message: 'Failed to generate reset link', error: err.message });
  }
};

// Reset password
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;
  try {
    const user = await User.findOne({ verificationToken: token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.verificationToken = undefined;
    await user.save();

    console.log(`Password reset for ${user.email}`);
    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ message: 'Password reset failed', error: err.message });
  }
};

// Logout function
export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Set the token in Redis with expiry (same as JWT expiry)
    // This is a common way to blacklist tokens for logout
    await redisClient.set(token, "blacklisted", {
      EX: 60 * 60 * 24, // expire after 1 day (adjust to match your JWT expiry)
    });
    console.log("Logged out successfully");

    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({ message: "Server error during logout" });
  }
};

// Update users profile
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const allowedUpdates = ['firstName', 'lastName', 'email', 'phone'];
    const filteredUpdates = {};
    for (const key of allowedUpdates) {
      if (updates[key] !== undefined) filteredUpdates[key] = updates[key];
    }

    // Find user by id and update
    const user = await User.findByIdAndUpdate(userId, filteredUpdates, { new: true, runValidators: true });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};