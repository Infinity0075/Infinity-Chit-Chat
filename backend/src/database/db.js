import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb is connected: ${conn.connection.host} `);
  } catch (error) {
    console.log("error!!! Can't connect to Mongo Db");
    process.exit(1);
  }
};
