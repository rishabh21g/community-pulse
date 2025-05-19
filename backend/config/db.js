import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "CONNECTION SUCCESSFULL WITH DB: " + connection.connection.host
    );
    // console.log(`MONGO DB URI - ${process.env.MONGODB_URI}`);
  } catch (err) {
    console.log("ERROR WHILE IN CONNECTION THROUGH DB: " + err.message);
    console.log("FULL ERR ! ------" + err);
    // console.log(`MONGO DB URI - ${process.env.MONGODB_URI}`);
    process.exit(1);
  }
};

export default connectDB;
