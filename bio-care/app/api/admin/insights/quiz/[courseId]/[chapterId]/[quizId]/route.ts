import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req: Request, { params }: any) {
  try {
    const { courseId, chapterId, quizId } = await params;

    await connectDB();

    const course = await Course.findById(courseId)
      .populate("chapters.quizzes.results.studentId")
      .lean();

    const chapter = course.chapters.find(
      (ch: any) => ch._id.toString() === chapterId
    );

    const quiz = chapter.quizzes.find(
      (q: any) => q._id.toString() === quizId
    );

    const results = quiz.results;

    // Summary
    const attempts = results.length;
    const totalQuestions = quiz.questions.length;

    const totalScore = results.reduce((sum: number, r: any) => sum + r.score, 0);
    const averageScore = attempts > 0 ? totalScore / attempts : 0;

    // Correct/incorrect overall
    let totalCorrect = 0,
      totalIncorrect = 0;

    results.forEach((r: any) => {
      r.answers.forEach((ans: number, i: number) => {
        if (ans === quiz.questions[i].correctAnswer) totalCorrect++;
        else totalIncorrect++;
      });
    });

    // Score distribution
    const buckets = [
      { range: "0-25%", count: 0 },
      { range: "26-50%", count: 0 },
      { range: "51-75%", count: 0 },
      { range: "76-100%", count: 0 },
    ];

    results.forEach((r: any) => {
      const percent = (r.score / totalQuestions) * 100;
      if (percent <= 25) buckets[0].count++;
      else if (percent <= 50) buckets[1].count++;
      else if (percent <= 75) buckets[2].count++;
      else buckets[3].count++;
    });

    // Timeline chart (date grouped)
    const timelineMap: any = {};

    results.forEach((r: any) => {
      const date = new Date(r.attemptedAt).toLocaleDateString();
      if (!timelineMap[date]) timelineMap[date] = 0;
      timelineMap[date]++;
    });

    const timeline = Object.keys(timelineMap).map((date) => ({
      date,
      count: timelineMap[date],
    }));

    // Student accuracy
    const enrichedResults = results.map((r: any) => {
      const correct = r.answers.filter(
        (a: number, i: number) => a === quiz.questions[i].correctAnswer
      ).length;

      return {
        ...r,
        accuracy: (correct / totalQuestions) * 100,
      };
    });

    return new Response(
      JSON.stringify({
        quiz,
        attempts,
        averageScore,
        accuracy:
          attempts > 0
            ? (totalCorrect / (totalCorrect + totalIncorrect)) * 100
            : 0,
        totalCorrect,
        totalIncorrect,
        scoreDistribution: buckets,
        timeline,
        results: enrichedResults,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to load quiz insights" }), {
      status: 500,
    });
  }
}
