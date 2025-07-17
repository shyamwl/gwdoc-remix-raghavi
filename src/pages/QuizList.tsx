
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, ChartBar, ExternalLink, Pencil } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Quiz {
  id: string;
  title: string;
  focus: string;
  questionCount: number;
  completedCount: number;
}

export default function QuizList() {
  const navigate = useNavigate();
  const [quizFocus, setQuizFocus] = useState("");
  const [quizzes] = useState<Quiz[]>([
    {
      id: "1",
      title: "JavaScript Basics",
      focus: "Basic JavaScript concepts",
      questionCount: 10,
      completedCount: 5,
    },
    {
      id: "2",
      title: "React Fundamentals",
      focus: "React core concepts",
      questionCount: 15,
      completedCount: 3,
    },
  ]);

  const handleGenerateQuiz = () => {
    navigate(`/quiz/editor/new?focus=${encodeURIComponent(quizFocus)}`);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">My Quizzes</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="focus" className="text-sm font-medium">
                  What should the quiz focus on?
                </label>
                <Textarea
                  id="focus"
                  placeholder="Enter the topic or subject matter for your quiz..."
                  value={quizFocus}
                  onChange={(e) => setQuizFocus(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button onClick={handleGenerateQuiz} className="w-full">
                Generate Quiz
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="flex items-center justify-between p-4 border rounded-lg bg-card"
          >
            <div 
              className="space-y-1 cursor-pointer hover:opacity-75"
              onClick={() => navigate(`/quiz/take/${quiz.id}`)}
            >
              <h3 className="font-medium hover:underline">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground">
                {quiz.questionCount} questions • {quiz.completedCount} completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/quiz/editor/${quiz.id}`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/quiz/results/${quiz.id}`)}
              >
                <ChartBar className="mr-2 h-4 w-4" />
                View Results
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${window.location.origin}/quiz/take/${quiz.id}`
                  );
                }}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
