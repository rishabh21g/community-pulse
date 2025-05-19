import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Garage Sale",
        "Sports Match",
        "Community Class",
        "Volunteer Opportunity",
        "Exhibition",
        "Small Festival",
      ],
      required: true,
    },
    photos: [{ type: String }],
    registrationStartDate: {
      type: Date,
      required: true,
    },
    registrationEndDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    organizerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
EventSchema.index({ "location.coordinates": "2dsphere" });
const Event = mongoose.model("Event", EventSchema);

export default Event;
