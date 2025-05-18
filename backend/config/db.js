import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      "CONNECTION SUCCESSFULL WITH DB: " + connection.connection.host
    );
  } catch (err) {
    console.log("ERROR WHILE IN CONNECTION THROUGH DB: " + err.message);
    process.exit(1);
  }
};

export default connectDB;
