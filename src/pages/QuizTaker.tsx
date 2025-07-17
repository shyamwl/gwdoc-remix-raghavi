
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

interface Answer {
  questionId: string;
  selectedOption: number;
  isCorrect: boolean;
}

export default function QuizTaker() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  
  const [questions] = useState<Question[]>([
    {
      id: "1",
      text: "Sample question 1?",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
    },
    {
      id: "2",
      text: "Sample question 2?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 2,
    },
  ]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) {
      toast({
        title: "Please select an answer",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: selectedAnswer,
      isCorrect,
    };

    setUserAnswers([...userAnswers, answer]);
    setHasSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // Navigate to personal results page with answers
      navigate(`/quiz/my-results/${id}`, { 
        state: { 
          answers: userAnswers,
          questions,
          score: Math.round((userAnswers.filter(a => a.isCorrect).length / questions.length) * 100)
        }
      });
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setHasSubmitted(false);
    }
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

        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Sample Quiz Title</h1>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>

        <div className="space-y-6 p-6 border rounded-lg bg-card">
          <h2 className="text-lg font-medium">
            {currentQuestion.text}
          </h2>
          
          <RadioGroup
            value={selectedAnswer?.toString()}
            onValueChange={(value) => !hasSubmitted && setSelectedAnswer(parseInt(value))}
            className="space-y-3"
          >
            {currentQuestion.options.map((option, optionIndex) => (
              <div 
                key={optionIndex} 
                className={`flex items-center space-x-2 p-3 rounded-lg border ${
                  hasSubmitted && optionIndex === currentQuestion.correctAnswer
                    ? "bg-green-50 border-green-200"
                    : hasSubmitted && optionIndex === selectedAnswer
                    ? "bg-red-50 border-red-200"
                    : "hover:bg-muted/50"
                }`}
              >
                <RadioGroupItem
                  value={optionIndex.toString()}
                  id={`q${currentQuestion.id}-o${optionIndex}`}
                  disabled={hasSubmitted}
                />
                <Label 
                  htmlFor={`q${currentQuestion.id}-o${optionIndex}`}
                  className="flex-grow"
                >
                  {option}
                </Label>
                {hasSubmitted && optionIndex === currentQuestion.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {hasSubmitted && optionIndex === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            ))}
          </RadioGroup>

          {!hasSubmitted ? (
            <Button 
              onClick={handleSubmitAnswer} 
              className="w-full"
            >
              Submit Answer
            </Button>
          ) : (
            <Button 
              onClick={handleNextQuestion} 
              className="w-full"
            >
              {isLastQuestion ? "View Results" : "Next Question"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
