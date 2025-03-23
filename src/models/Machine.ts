import mongoose, { Schema, Document } from 'mongoose';

// Define the machine schema
const machineSchema = new Schema(
  {
    machineType: {
      type: String,
      required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        // required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);


// Define the Machine interface
export interface Machine extends Document {
  machineType: string;
  location: string;
  description: string;
}

// Create and export the Machine model
export const Machine = mongoose.model<Machine>('Machine', machineSchema);
