import { useParams, useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";

const data = [
  { name: "90-100%", count: 5 },
  { name: "80-89%", count: 8 },
  { name: "70-79%", count: 12 },
  { name: "60-69%", count: 7 },
  { name: "< 60%", count: 3 },
];

interface Participant {
  id: string;
  name: string;
  score: number;
  answers: {
    question: string;
    correct: boolean;
    answer: string;
    correctAnswer: string;
  }[];
}

// Sample participant data
const participants: Participant[] = [
  {
    id: "1",
    name: "John Doe",
    score: 85,
    answers: [
      {
        question: "What is React?",
        correct: true,
        answer: "A JavaScript library for building user interfaces",
        correctAnswer: "A JavaScript library for building user interfaces",
      },
      {
        question: "What is JSX?",
        correct: false,
        answer: "A database query language",
        correctAnswer: "A syntax extension for JavaScript",
      },
    ],
  },
  {
    id: "2",
    name: "Jane Smith",
    score: 92,
    answers: [
      {
        question: "What is React?",
        correct: true,
        answer: "A JavaScript library for building user interfaces",
        correctAnswer: "A JavaScript library for building user interfaces",
      },
      {
        question: "What is JSX?",
        correct: true,
        answer: "A syntax extension for JavaScript",
        correctAnswer: "A syntax extension for JavaScript",
      },
    ],
  },
];

export default function QuizResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);

  return (
    <div className="container mx-auto py-8">
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

        <div className="space-y-8">
          <div className="p-4 border rounded-lg bg-card">
            <h2 className="text-lg font-medium mb-4">Score Distribution</h2>
            <div className="w-full overflow-x-auto">
              <BarChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-card">
            <h2 className="text-lg font-medium mb-4">Summary</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold">35</div>
                <div className="text-sm text-muted-foreground">Total Attempts</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold">78%</div>
                <div className="text-sm text-muted-foreground">Average Score</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">Highest Score</div>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <div className="text-2xl font-bold">55%</div>
                <div className="text-sm text-muted-foreground">Lowest Score</div>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Participant Details</h2>
            </div>

            {!selectedParticipant ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Questions Correct</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {participants.map((participant) => (
                    <TableRow
                      key={participant.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setSelectedParticipant(participant)}
                    >
                      <TableCell>{participant.name}</TableCell>
                      <TableCell>{participant.score}%</TableCell>
                      <TableCell>
                        {participant.answers.filter((a) => a.correct).length} /{" "}
                        {participant.answers.length}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedParticipant(null)}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        {selectedParticipant.name}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {participants.map((participant) => (
                        <DropdownMenuItem
                          key={participant.id}
                          onClick={() => setSelectedParticipant(participant)}
                        >
                          {participant.name} - {participant.score}%
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{selectedParticipant.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Overall Score: {selectedParticipant.score}%
                    </p>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Answer</TableHead>
                      <TableHead>Correct Answer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedParticipant.answers.map((answer, index) => (
                      <TableRow key={index}>
                        <TableCell>{answer.question}</TableCell>
                        <TableCell>
                          {answer.correct ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500" />
                          )}
                        </TableCell>
                        <TableCell>{answer.answer}</TableCell>
                        <TableCell>{answer.correctAnswer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
