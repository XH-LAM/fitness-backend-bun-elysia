// To include necessary business requirements for checking before creating a new booking

import mongoose from 'mongoose';
import { Booking } from '../models/Booking';

// To check machine available start and end time
export const checkMachineAvailability = async (machineId: mongoose.Types.ObjectId, startTime: Date, endTime: Date): Promise<boolean> => {
    const conflictingBookings = await Booking.find({
      machineId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });
  
    return conflictingBookings.length > 0; // If there's any conflict, return true
  };
  
  // To check instructor available start and end time
  export const checkInstructorAvailability = async (instructorId: mongoose.Types.ObjectId, startTime: Date, endTime: Date): Promise<boolean> => {
    const conflictingBookings = await Booking.find({
      instructorId,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });
  
    return conflictingBookings.length > 0; // If there's any conflict, return true
  };
  
  // To reserve 10 minutes cool down before new booking creation
  export const checkCooldown = async (machineId: mongoose.Types.ObjectId, endTime: Date): Promise<boolean> => {
    const lastBooking = await Booking.findOne({ machineId }).sort({ endTime: -1 });
  
    if (!lastBooking) return false; // No previous booking, no cooldown needed
  
    const cooldownPeriod = 10 * 60 * 1000; // 10 minutes in milliseconds
    const cooldownTime = new Date(lastBooking.endTime).getTime() + cooldownPeriod;
  
    return new Date(endTime).getTime() < cooldownTime; // If the new booking time is before cooldown, return true
  };
  