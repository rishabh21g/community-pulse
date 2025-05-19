import mongoose from "mongoose";

const IntrestSchema = new mongoose.Schema(
  {
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    numberOfPeople: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Intrest = mongoose.model("Interest" , IntrestSchema)
