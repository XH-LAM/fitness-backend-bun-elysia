import * as mongoose from 'mongoose';

import config from '.';

const { dbUsername, dbPassword, dbHost, dbPort, dbName } = config.db;


const connectionString = `mongodb://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;

console.log("connectionString : ",connectionString)

export const connect = async () => {
  try {
    const res = await mongoose.connect("mongodb+srv://blacktrial0315:gZqbgANdEXqA1KSN@cluster0.0hlrt.mongodb.net/aaa", { autoIndex: true });

    console.log('Info: MongoDB connection successful:', res.connection.name);
  } catch (err) {
    console.log('Error: Failed to connect MongoDB:', err);
  }
};
