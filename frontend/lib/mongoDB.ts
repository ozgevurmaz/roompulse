
import mongoose from "mongoose";
import './models/message'
import './models/room'
import './models/userProfile'
import './models/userSetting'

const uri = process.env.MONGODB_URI!
const dbName = process.env.DB_NAME!

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

export const connectToDatabase = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

 if (mongoose.connection.readyState === 1) {
    return
  }

  try {
    await mongoose.connect(uri, {
      dbName: dbName,
    });


  } catch (error) {
    console.log(error);
  }
};

