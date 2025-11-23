import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    class: { type: String, required: true },

    isAdmin: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },

    // FIX: add default: []
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [], 
      },
    ],
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
