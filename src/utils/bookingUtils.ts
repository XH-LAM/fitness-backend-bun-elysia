// To include necessary business requirements for checking before creating a new booking

import mongoose from 'mongoose';
import { Booking } from '../models/Booking';

// To check machine available start and end time
export const checkMachineAvailability = async (machineId: mongoose.Types.ObjectId, newStartTime: Date, newEndTime: Date): Promise<boolean> => {
  const conflictingBooking = await Booking.findOne({
    machineId,
    $or: [
      { startTime: { $lt: newEndTime }, endTime: { $gt: newStartTime } } // Check if the time overlaps
    ]
  });

  return !conflictingBooking; // If no conflict, return true (available); otherwise, false
};

// To reserve 10 minutes cool down before new booking creation
export const checkCooldown = async (machineId: mongoose.Types.ObjectId, endTime: Date): Promise<boolean> => {
  const lastBooking = await Booking.findOne({ machineId }).sort({ endTime: -1 });

  if (!lastBooking) return false; // No previous booking, no cooldown needed

  const cooldownPeriod = 10 * 60 * 1000; // 10 minutes in milliseconds
  const cooldownTime = new Date(lastBooking.endTime).getTime() + cooldownPeriod;

  return new Date(endTime).getTime() < cooldownTime; // If the new booking time is before cooldown, return true
};

// To check instructor available start and end time
export const checkInstructorAvailability = async (instructorId: mongoose.Types.ObjectId, startTime: Date, endTime: Date): Promise<boolean> => {
  const conflictingBooking = await Booking.findOne({
    instructorId,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
    ]
  });
  return !conflictingBooking; // If no conflict, return true (available); otherwise, false
};
