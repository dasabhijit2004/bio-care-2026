import mongoose, { Schema, models } from "mongoose";

const ResultSchema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    score: Number,
    total: Number,

    answers: [Number], // index values

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default models.Result || mongoose.model("Result", ResultSchema);
