
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface Answer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
}

export default function QuizMyResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const { answers, questions, score } = location.state as {
    answers: Answer[];
    questions: Question[];
    score: number;
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/quiz/list')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Quiz List
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Your Quiz Results</h1>
            <div className="text-lg font-semibold">
              Score: {score}%
            </div>
          </div>

          <div className="grid gap-6">
            {questions.map((question, index) => {
              const answer = answers.find(a => a.questionId === question.id);
              return (
                <div key={question.id} className="p-6 border rounded-lg bg-card">
                  <div className="space-y-4">
                    <h3 className="font-medium">
                      Question {index + 1}: {question.text}
                    </h3>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`p-3 rounded-lg border ${
                            optionIndex === question.correctAnswer
                              ? "bg-green-50 border-green-200"
                              : optionIndex === answer?.selectedOption && !answer?.isCorrect
                              ? "bg-red-50 border-red-200"
                              : ""
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {optionIndex === question.correctAnswer && (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            )}
                            {optionIndex === answer?.selectedOption && !answer?.isCorrect && (
                              <XCircle className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
