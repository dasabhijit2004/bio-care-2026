"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function StudentQuizPage() {
  const params = useParams();

  const courseId = params?.courseId as string;
  const chapterId = params?.chapterId as string;
  const quizId = params?.quizId as string;

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [timer, setTimer] = useState<number | null>(null);

  // Load quiz AFTER params exist
  useEffect(() => {
    if (!courseId || !chapterId || !quizId) return;

    const loadQuiz = async () => {
      const res = await fetch(`/api/student/quiz/${courseId}/${chapterId}/${quizId}`);
      const data = await res.json();

      if (!data.quiz) return;

      setQuiz(data.quiz);
      setAnswers(Array(data.quiz.questions.length).fill(null));

      if (data.quiz.settings?.timer > 0) {
        setTimer(data.quiz.settings.timer);
      }
    };

    loadQuiz();
  }, [courseId, chapterId, quizId]);

  // Timer logic
  useEffect(() => {
    if (timer === null || submitted) return;
    if (timer <= 0) handleSubmit();

    const interval = setInterval(() => setTimer((t) => t! - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, submitted]);

  const handleSubmit = async () => {
    const res = await fetch(`/api/student/submit-quiz`, {
      method: "POST",
      body: JSON.stringify({
        courseId,
        chapterId,
        quizId,
        answers,
      }),
    });

    const data = await res.json();
    setScore(data.score);
    setSubmitted(true);
  };

  if (!quiz) return <p className="p-6">Loading quiz…</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-[#1717a6]">{quiz.title}</h1>

      {quiz.settings.timer > 0 && !submitted && (
        <p className="text-red-600 font-semibold text-lg">⏳ {timer}s Left</p>
      )}

      {quiz.questions.map((q: any, idx: number) => (
        <Card key={idx} className="p-4 space-y-3">
          <p className="font-medium text-[#1717a6]">
            {idx + 1}. {q.question}
          </p>

          <RadioGroup
            onValueChange={(val) => {
              const updated = [...answers];
              updated[idx] = Number(val);
              setAnswers(updated);
            }}
          >
            {q.options.map((opt: string, i: number) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={i.toString()} id={`${idx}-${i}`} />
                <label htmlFor={`${idx}-${i}`}>{opt}</label>
              </div>
            ))}
          </RadioGroup>
        </Card>
      ))}

      {!submitted ? (
        <Button className="bg-[#1717a6] text-white" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      ) : (
        <Card className="p-4 bg-green-100 border border-green-500">
          <p className="text-xl font-bold text-green-700">
            Your Score: {score}/{quiz.questions.length}
          </p>
        </Card>
      )}
    </div>
  );
}
