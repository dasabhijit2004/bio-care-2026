import { connectDB } from "@/lib/db";
import Course from "@/models/Course";

export async function GET(req: Request, { params }: any) {
  try {
    const { courseId, chapterId } = await params;

    await connectDB();
    const course = await Course.findById(courseId).lean();

    if (!course)
      return new Response(
        JSON.stringify({ error: "Course not found" }),
        { status: 404 }
      );

    const chapter = course.chapters.find((ch: any) => ch._id.toString() === chapterId);

    if (!chapter)
      return new Response(
        JSON.stringify({ error: "Chapter not found" }),
        { status: 404 }
      );

    const quizStats = chapter.quizzes.map((quiz: any) => {
      const attempts = quiz.results.length;

      const avgScore =
        attempts > 0
          ? quiz.results.reduce((s: number, r: any) => s + r.score, 0) /
            attempts
          : 0;

      return {
        quizId: quiz._id,
        title: quiz.title,
        attempts,
        averageScore: avgScore,
      };
    });

    return new Response(
      JSON.stringify({
        chapter: {
          title: chapter.title,
          videos: chapter.videos,
          documents: chapter.documents,
        },
        stats: {
          videos: chapter.videos.length,
          documents: chapter.documents.length,
          totalQuizzes: chapter.quizzes.length,
          quizStats,
        },
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to load insights" }), {
      status: 500,
    });
  }
}
