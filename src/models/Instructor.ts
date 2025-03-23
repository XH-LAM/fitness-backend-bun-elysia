import mongoose, { Schema, Document } from 'mongoose';

// Define the instructor schema
const instructorSchema = new Schema(
  {
    name: { type: String, required: true }, // 'name' is mandatory
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], // Optional email validation regex
    },
    phoneNumber: {
      type: String,
      required: true,
      match: [/^(?:\+60|0)[1-9][0-9]{7,8}$/, 'Please enter a valid phone number'], // Optional phone number validation
    },
    ratePerHour: {
      type: Number,
      required: true,
      min: 0, // Ensures rate is a positive number
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Define the Instructor interface
export interface Instructor extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  ratePerHour: number;
}

// Create and export the Instructor model
export const Instructor = mongoose.model<Instructor>('Instructor', instructorSchema);
