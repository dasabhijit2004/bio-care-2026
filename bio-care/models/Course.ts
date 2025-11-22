import mongoose, { Schema, models } from "mongoose";

const CourseSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    thumbnail: String,
    price: { type: Number, required: true },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    chapters: [
      {
        title: String,
        videos: [String], // video URLs
        notes: [String],  // pdf/doc URLs
        quizzes: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz",
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export default models.Course || mongoose.model("Course", CourseSchema);
