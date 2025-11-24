import { connectDB } from "@/lib/db";
import Course from "@/models/Course";
import User from "@/models/User";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // -------- AUTH (Check Logged In User) --------
    const authRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`, {
      headers: { cookie: req.headers.get("cookie") || "" },
      cache: "no-store",
    });

    const authData = await authRes.json();
    const student = authData.user;
    if (!student) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const studentId = student._id;

    // -------- LOAD COURSES + QUIZZES --------
    const courses = await Course.find().lean();

    let attempts = [];
    let totalCorrect = 0;
    let totalQuestions = 0;
    let progressData = [];
    let topicStatsMap = {};

    courses.forEach((course: any) => {
      course.chapters.forEach((ch: any) => {
        ch.quizzes.forEach((quiz: any) => {
          quiz.results.forEach((res: any) => {
            if (res.studentId.toString() === studentId) {
              const totalQ = quiz.questions.length;
              const correct = res.answers.filter(
                (a: number, idx: number) =>
                  a === quiz.questions[idx].correctAnswer
              ).length;

              // Collect attempt
              attempts.push({
                quizId: quiz._id,
                title: quiz.title,
                date: res.attemptedAt,
                score: res.score,
                total: totalQ,
                accuracy: Math.round((correct / totalQ) * 100),
              });

              // For global stats
              totalCorrect += correct;
              totalQuestions += totalQ;

              // Topic-wise accuracy per quiz
              if (!topicStatsMap[ch.title]) topicStatsMap[ch.title] = [];
              topicStatsMap[ch.title].push(Math.round((correct / totalQ) * 100));

              // Progress (chronological)
              progressData.push({
                label: new Date(res.attemptedAt).toLocaleDateString(),
                score: Math.round((correct / totalQ) * 100),
              });
            }
          });
        });
      });
    });

    attempts.sort((a, b) => new Date(a.date) - new Date(b.date));

    progressData.sort(
      (a, b) => new Date(a.label).getTime() - new Date(b.label).getTime()
    );

    const topicAccuracy = Object.keys(topicStatsMap).map((topic) => ({
      topic,
      accuracy: Math.round(
        topicStatsMap[topic].reduce((a, b) => a + b, 0) /
          topicStatsMap[topic].length
      ),
    }));

    const response = {
      attemptsCount: attempts.length,
      averageAccuracy:
        totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0,
      recent: attempts.slice(-5).reverse(),
      progress: progressData.slice(-10),
      topicAccuracy,
      allAttempts: attempts.reverse(),
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: "Failed" }), { status: 500 });
  }
}
