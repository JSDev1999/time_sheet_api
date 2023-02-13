import mongoose, { ObjectId } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      minlength: 4,
    },
    userName: {
      type: String,
      required: true,
      minlength: 4,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
    },
    tasks: [
      {
        type: ObjectId,
        // unique: true,
        ref: "tasks",
      },
    ],
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
