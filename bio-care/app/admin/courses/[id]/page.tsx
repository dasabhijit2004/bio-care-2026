"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditCourse() {
  const { id } = useParams();

  const [course, setCourse] = useState<any>(null);

  const [openChapter, setOpenChapter] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openPdf, setOpenPdf] = useState(false);
  const [openQuiz, setOpenQuiz] = useState(false);

  const [newChapter, setNewChapter] = useState({ title: "" });
  const [newVideo, setNewVideo] = useState({ chapterId: "", title: "", url: "" });
  const [newPdf, setNewPdf] = useState({ chapterId: "", title: "", url: "" });
  const [newQuiz, setNewQuiz] = useState({
    chapterId: "",
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  // Load the course
  const loadCourse = async () => {
    const res = await fetch(`/api/course/${id}`);
    const data = await res.json();
    setCourse(data.course);
  };

  useEffect(() => {
    loadCourse();
  }, [id]);

  // ======================= CRUD ACTIONS =======================

  const addChapter = async () => {
    await fetch(`/api/admin/add-chapter`, {
      method: "POST",
      body: JSON.stringify({
        courseId: id,
        title: newChapter.title,
      }),
    });

    setOpenChapter(false);
    loadCourse();
  };

  const deleteChapter = async (chapterId: string) => {
    await fetch(`/api/admin/delete-chapter`, {
      method: "POST",
      body: JSON.stringify({ courseId: id, chapterId }),
    });

    loadCourse();
  };

  const addVideo = async () => {
    await fetch(`/api/admin/add-video`, {
      method: "POST",
      body: JSON.stringify({
        courseId: id,
        chapterId: newVideo.chapterId,
        title: newVideo.title,
        url: newVideo.url,
      }),
    });

    setOpenVideo(false);
    loadCourse();
  };

  const deleteVideo = async (chapterId: string, videoId: string) => {
    await fetch(`/api/admin/delete-video`, {
      method: "POST",
      body: JSON.stringify({ courseId: id, chapterId, videoId }),
    });

    loadCourse();
  };

  const addPdf = async () => {
    await fetch(`/api/admin/add-pdf`, {
      method: "POST",
      body: JSON.stringify({
        courseId: id,
        chapterId: newPdf.chapterId,
        title: newPdf.title,
        url: newPdf.url,
      }),
    });

    setOpenPdf(false);
    loadCourse();
  };

  const deletePdf = async (chapterId: string, documentId: string) => {
    await fetch(`/api/admin/delete-pdf`, {
      method: "POST",
      body: JSON.stringify({ courseId: id, chapterId, documentId }),
    });

    loadCourse();
  };

  const addQuiz = async () => {
    await fetch(`/api/admin/add-quiz`, {
      method: "POST",
      body: JSON.stringify({
        courseId: id,
        chapterId: newQuiz.chapterId,
        question: newQuiz.question,
        options: newQuiz.options,
        correctAnswer: Number(newQuiz.correctAnswer),
      }),
    });

    setOpenQuiz(false);
    loadCourse();
  };

  const deleteQuiz = async (chapterId: string, quizId: string) => {
    await fetch(`/api/admin/delete-quiz`, {
      method: "POST",
      body: JSON.stringify({ courseId: id, chapterId, quizId }),
    });

    loadCourse();
  };

  if (!course) return <p className="p-6">Loading...</p>;

  // ======================= UI =======================

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-6">
      <h1 className="text-3xl font-bold text-[#1717a6]">Edit Course: {course.title}</h1>

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-4">
        <Button className="bg-[#1717a6] text-white" onClick={() => setOpenChapter(true)}>
          + Add Chapter
        </Button>

        <Button
          variant="outline"
          className="border-[#1717a6] text-[#1717a6]"
          onClick={() => setOpenVideo(true)}
        >
          + Add Video
        </Button>

        <Button
          variant="outline"
          className="border-[#1717a6] text-[#1717a6]"
          onClick={() => setOpenPdf(true)}
        >
          + Add PDF
        </Button>

        <Button
          variant="outline"
          className="border-[#1717a6] text-[#1717a6]"
          onClick={() => setOpenQuiz(true)}
        >
          + Add Quiz
        </Button>
      </div>

      {/* CHAPTERS */}
      <div className="space-y-6">
        {course.chapters.map((ch: any) => (
          <Card key={ch._id} className="shadow rounded-xl p-4">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle className="text-lg text-[#1717a6]">{ch.title}</CardTitle>

              <Button
                variant="destructive"
                onClick={() => deleteChapter(ch._id)}
                className="rounded-full"
              >
                Delete Chapter
              </Button>
            </CardHeader>

            <CardContent className="space-y-6">

              {/* VIDEOS */}
              <div>
                <h3 className="font-semibold mb-2 text-[#1717a6]">Videos</h3>
                {ch.videos.map((v: any) => (
                  <div key={v._id} className="flex justify-between p-2 border rounded mb-2">
                    <span>{v.title}</span>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteVideo(ch._id, v._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>

              {/* PDFs */}
              <div>
                <h3 className="font-semibold mb-2 text-[#1717a6]">PDF Documents</h3>
                {ch.documents.map((d: any) => (
                  <div key={d._id} className="flex justify-between p-2 border rounded mb-2">
                    <span>{d.title}</span>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePdf(ch._id, d._id)}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>

              {/* QUIZZES */}
              <div>
                <h3 className="font-semibold mb-2 text-[#1717a6]">Quizzes</h3>

                {ch.quizzes?.map((quiz: any) => (
                  <div key={quiz._id} className="p-4 border rounded-xl mb-4 bg-gray-50">

                    {/* QUIZ TITLE */}
                    <h4 className="text-lg font-bold text-[#1717a6]">{quiz.title}</h4>

                    {/* QUESTIONS LIST */}
                    {(quiz.questions ?? []).map((q: any, qIndex: number) => (
                      <div key={qIndex} className="mt-3 p-3 bg-white rounded border">

                        <p className="font-medium">
                          Q{qIndex + 1}. {q.question || "Untitled Question"}
                        </p>

                        {/* OPTIONS */}
                        <ol className="list-decimal ml-5 mt-1">
                          {(q.options ?? []).map((opt: string, optIndex: number) => (
                            <li
                              key={optIndex}
                              className={`${optIndex === q.correctAnswer
                                ? "text-green-600 font-bold"
                                : "text-gray-700"
                                }`}
                            >
                              {opt || "Empty option"}
                            </li>
                          ))}
                        </ol>

                      </div>
                    ))}

                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-4"
                      onClick={() => deleteQuiz(ch._id, quiz._id)}
                    >
                      Delete Quiz
                    </Button>
                  </div>
                ))}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* ------------------- MODALS ------------------- */}

      {/* Add Chapter */}
      <Dialog open={openChapter} onOpenChange={setOpenChapter}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Chapter</DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Chapter Title"
            onChange={(e) => setNewChapter({ title: e.target.value })}
          />

          <Button
            className="bg-[#1717a6] text-white mt-4"
            onClick={addChapter}
          >
            Add Chapter
          </Button>
        </DialogContent>
      </Dialog>

      {/* Add Video */}
      <Dialog open={openVideo} onOpenChange={setOpenVideo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Video</DialogTitle>
          </DialogHeader>

          <select
            className="border p-2 rounded w-full"
            onChange={(e) =>
              setNewVideo({ ...newVideo, chapterId: e.target.value })
            }
          >
            <option>Select Chapter</option>
            {course.chapters.map((ch: any) => (
              <option key={ch._id} value={ch._id}>
                {ch.title}
              </option>
            ))}
          </select>

          <Input
            placeholder="Video Title"
            className="mt-3"
            onChange={(e) =>
              setNewVideo({ ...newVideo, title: e.target.value })
            }
          />

          <Input
            placeholder="Video URL"
            className="mt-3"
            onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
          />

          <Button className="bg-[#1717a6] text-white mt-4" onClick={addVideo}>
            Add Video
          </Button>
        </DialogContent>
      </Dialog>

      {/* Add PDF */}
      <Dialog open={openPdf} onOpenChange={setOpenPdf}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload PDF Document</DialogTitle>
          </DialogHeader>

          <select
            className="border p-2 rounded w-full"
            onChange={(e) => setNewPdf({ ...newPdf, chapterId: e.target.value })}
          >
            <option>Select Chapter</option>
            {course.chapters.map((ch: any) => (
              <option key={ch._id} value={ch._id}>{ch.title}</option>
            ))}
          </select>

          <Input
            placeholder="Document Title"
            className="mt-3"
            onChange={(e) => setNewPdf({ ...newPdf, title: e.target.value })}
          />

          <input
            type="file"
            accept="application/pdf"
            className="mt-3"
            onChange={(e) => setNewPdf({ ...newPdf, file: e.target.files?.[0] })}
          />

          <Button
            className="bg-[#1717a6] text-white mt-4"
            onClick={async () => {
              const fd = new FormData();
              fd.append("pdf", newPdf.file);

              const uploadRes = await fetch("/api/admin/upload-pdf", {
                method: "POST",
                body: fd,
              });

              const { url } = await uploadRes.json();

              await fetch(`/api/admin/add-pdf`, {
                method: "POST",
                body: JSON.stringify({
                  courseId: id,
                  chapterId: newPdf.chapterId,
                  title: newPdf.title,
                  url,
                }),
              });

              setOpenPdf(false);
              loadCourse();
            }}
          >
            Upload & Add
          </Button>
        </DialogContent>
      </Dialog>

      {/* Add Quiz */}
      <Dialog open={openQuiz} onOpenChange={setOpenQuiz}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Quiz</DialogTitle>
          </DialogHeader>

          {/* Select Chapter */}
          <select
            className="border p-2 rounded w-full"
            onChange={(e) => setNewQuiz({ ...newQuiz, chapterId: e.target.value })}
          >
            <option>Select Chapter</option>
            {course.chapters.map((ch: any) => (
              <option key={ch._id} value={ch._id}>
                {ch.title}
              </option>
            ))}
          </select>

          {/* QUIZ TITLE */}
          <Input
            placeholder="Quiz Title"
            className="mt-4"
            onChange={(e) =>
              setNewQuiz({ ...newQuiz, title: e.target.value })
            }
          />

          {/* NUMBER OF QUESTIONS */}
          <div className="mt-4">
            <label>No of Questions</label>
            <Input
              type="number"
              min={1}
              max={20}
              className="mt-2"
              onChange={(e) => {
                const count = Number(e.target.value);
                const questions = Array.from({ length: count }, () => ({
                  question: "",
                  options: ["", "", "", ""],
                  correctAnswer: 0,
                }));
                setNewQuiz({ ...newQuiz, questions });
              }}
            />
          </div>

          {/* Render Dynamic Questions */}
          {newQuiz.questions?.map((q: any, qIndex: number) => (
            <div key={qIndex} className="border p-3 rounded mt-3 bg-gray-50">
              <h3 className="font-medium text-[#1717a6]">
                Question {qIndex + 1}
              </h3>

              <Textarea
                placeholder="Question text"
                className="mt-2"
                onChange={(e) => {
                  const updated = [...newQuiz.questions];
                  updated[qIndex].question = e.target.value;
                  setNewQuiz({ ...newQuiz, questions: updated });
                }}
              />

              <div className="mt-2 space-y-2">
                {q.options.map((opt: string, optIndex: number) => (
                  <Input
                    key={optIndex}
                    placeholder={`Option ${optIndex + 1}`}
                    onChange={(e) => {
                      const updated = [...newQuiz.questions];
                      updated[qIndex].options[optIndex] = e.target.value;
                      setNewQuiz({ ...newQuiz, questions: updated });
                    }}
                  />
                ))}
              </div>

              <select
                className="border p-2 rounded w-full mt-2"
                onChange={(e) => {
                  const updated = [...newQuiz.questions];
                  updated[qIndex].correctAnswer = Number(e.target.value);
                  setNewQuiz({ ...newQuiz, questions: updated });
                }}
              >
                <option>Select Correct Answer</option>
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
                <option value={3}>Option 4</option>
              </select>
            </div>
          ))}

          {/* SUBMIT */}
          <Button
            className="bg-[#1717a6] text-white mt-4"
            onClick={async () => {
              await fetch("/api/admin/add-quiz", {
                method: "POST",
                body: JSON.stringify({
                  courseId: id,
                  chapterId: newQuiz.chapterId,
                  title: newQuiz.title, // <-- NEW FIELD
                  questions: newQuiz.questions,
                }),
              });

              setOpenQuiz(false);
              loadCourse();
            }}
          >
            Save Quiz
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
