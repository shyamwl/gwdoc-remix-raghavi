
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Save, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  type: "multiple-choice" | "true-false";
}

export default function QuizEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const quizFocus = searchParams.get("focus") || "";
  
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "What is your question?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
      type: "multiple-choice",
    },
  ]);

  const handleAddQuestion = (type: "multiple-choice" | "true-false") => {
    const newQuestion: Question = {
      id: (questions.length + 1).toString(),
      text: "",
      options: type === "multiple-choice" 
        ? ["", "", "", ""]
        : ["True", "False"],
      correctAnswer: 0,
      type,
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleSaveQuiz = () => {
    // Save quiz logic here
    navigate("/quiz/list");
  };

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="quizName" className="text-sm font-medium">
            Quiz Name
          </label>
          <Input
            id="quizName"
            placeholder="Enter quiz name..."
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Quiz Focus</label>
          <p className="text-sm text-muted-foreground">{quizFocus}</p>
        </div>

        <div className="space-y-8">
          {questions.map((question, qIndex) => (
            <div key={question.id} className="space-y-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Question {qIndex + 1}
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {question.type === "multiple-choice" ? "Multiple Choice" : "True/False"}
                  </span>
                </div>
                <Input
                  value={question.text}
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[qIndex].text = e.target.value;
                    setQuestions(newQuestions);
                  }}
                  placeholder="Enter your question..."
                />
              </div>

              <RadioGroup
                value={question.correctAnswer.toString()}
                onValueChange={(value) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].correctAnswer = parseInt(value);
                  setQuestions(newQuestions);
                }}
              >
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center space-x-2">
                      <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} />
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[qIndex].options[oIndex] = e.target.value;
                          setQuestions(newQuestions);
                        }}
                        placeholder={`Option ${oIndex + 1}`}
                        className="flex-1"
                        disabled={question.type === "true-false"} // Disable editing for True/False options
                      />
                      {question.correctAnswer === oIndex && (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleAddQuestion("multiple-choice")}>
                Multiple Choice Question
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddQuestion("true-false")}>
                True/False Question
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button onClick={handleSaveQuiz} className="w-full">
            <Save className="mr-2 h-4 w-4" />
            Save Quiz
          </Button>
        </div>
      </div>
    </div>
  );
}
