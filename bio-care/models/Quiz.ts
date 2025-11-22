import mongoose, { Schema, models } from "mongoose";

const QuizSchema = new Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },

    chapter: String,

    questions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctIndex: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default models.Quiz || mongoose.model("Quiz", QuizSchema);
