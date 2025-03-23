import mongoose, { Schema, Document } from 'mongoose';

// Define the booking schema
const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    machineId: { type: mongoose.Schema.Types.ObjectId, required: true },
    instructorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true }
  },
  { timestamps: true }
);

// Define the Booking interface
export interface Booking extends Document {
  userId: mongoose.Types.ObjectId;
  machineId: mongoose.Types.ObjectId;
  instructorId: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
}

// Create and export the Booking model
export const Booking = mongoose.model<Booking>('Booking', bookingSchema);
