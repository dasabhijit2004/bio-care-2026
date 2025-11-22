import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    // Admin flag (default false)
    isAdmin: { type: Boolean, default: false },

    // Student approval (pending by default)
    approved: { type: Boolean, default: false },

    // Enrolled courses
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

export default models.User || mongoose.model("User", UserSchema);
