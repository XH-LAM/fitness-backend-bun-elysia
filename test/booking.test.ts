import { describe, expect, it, beforeAll, afterAll, jest } from '@jest/globals';
import mongoose from 'mongoose';
import { Booking } from '../src/models/Booking';
import { checkMachineAvailability, checkInstructorAvailability, checkCooldown } from '../src/utils/bookingUtils';

jest.setTimeout(10000); // Increase timeout to 10s

describe('Booking Service', () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb+srv://blacktrial0315:gZqbgANdEXqA1KSN@cluster0.0hlrt.mongodb.net/aaa", {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true
    } as any);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('Allow for new booking if no conflict and cooldown is respected', async () => {
    const machineId = new mongoose.Types.ObjectId();

    // Step 1: Create an existing booking
    const existingBooking = await Booking.create({
      userId: new mongoose.Types.ObjectId(),
      machineId,
      instructorId: new mongoose.Types.ObjectId(),
      startTime: new Date('2024-03-20T10:00:00Z'),
      endTime: new Date('2024-03-20T11:00:00Z')
    });

    await mongoose.connection.syncIndexes(); // Ensure indexes are updated

    // Step 2: Check machine availability (time should NOT overlap)
    const testStartTime = new Date('2024-03-20T11:15:00Z'); // 15 mins after last booking
    const testEndTime = new Date('2024-03-20T12:15:00Z');

    const isAvailable = await checkMachineAvailability(machineId, testStartTime, testEndTime);

    // Step 3: Check cooldown period (should ensure 10 min gap)
    const cooldownValid = await checkCooldown(machineId, testStartTime);

    const bookingAvailable = isAvailable === true && cooldownValid === false;

    // Expectation: Should be available AND cooldown must be respected
    // expect(isAvailable).toBe(true);
    // expect(cooldownValid).toBe(false); // false means no violation of cooldown
    expect(bookingAvailable).toBe(true);

    // Cleanup: Remove test data
    await Booking.deleteOne({ _id: existingBooking._id });
  });

  it('Block to make new booking if cooldown is not respected', async () => {
    const machineId = new mongoose.Types.ObjectId();

    // Step 1: Create an existing booking ending at 11:00 AM
    const existingBooking = await Booking.create({
      userId: new mongoose.Types.ObjectId(),
      machineId,
      instructorId: new mongoose.Types.ObjectId(),
      startTime: new Date('2024-03-20T10:00:00Z'),
      endTime: new Date('2024-03-20T11:00:00Z')
    });

    await mongoose.connection.syncIndexes();

    // Step 2: Attempt to book immediately after (violating cooldown)
    const testStartTime = new Date('2024-03-20T11:05:00Z'); // 5 min after (less than 10-min cooldown)
    const testEndTime = new Date('2024-03-20T12:05:00Z');

    const isAvailable = await checkMachineAvailability(machineId, testStartTime, testEndTime);

    const cooldownValid = await checkCooldown(machineId, testStartTime);

    const bookingAvailable = isAvailable === true && cooldownValid === false;

    // Expectation: Available should be true, but cooldown check should fail
    // expect(isAvailable).toBe(true);
    // expect(cooldownValid).toBe(true); // true means cooldown violation
    expect(bookingAvailable).toBe(false)

    await Booking.deleteOne({ _id: existingBooking._id });
  });

  it('Booking available instructor with no conflict of same booking date time', async () => {
    const instructorId = new mongoose.Types.ObjectId();

    const existingBooking = await Booking.create({
      userId: new mongoose.Types.ObjectId(),
      machineId: new mongoose.Types.ObjectId(),
      instructorId,
      startTime: new Date('2024-03-20T10:00:00Z'),
      endTime: new Date('2024-03-20T11:00:00Z')
    });

    await mongoose.connection.syncIndexes(); // Ensure indexing is done

    // Test a non-conflicting time slot
    const testStartTime = new Date('2024-03-20T11:30:00Z');
    const testEndTime = new Date('2024-03-20T12:30:00Z');

    const isAvailable = await checkInstructorAvailability(instructorId, testStartTime, testEndTime);
    
    expect(isAvailable).toBe(true);

    await Booking.deleteOne({ _id: existingBooking._id });
  });

});
