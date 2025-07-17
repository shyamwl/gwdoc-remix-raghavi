
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackWidgetProps {
  feedbackType?: string;
}

export function FeedbackWidget({ feedbackType = "user flow" }: FeedbackWidgetProps) {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [hasRated, setHasRated] = useState(false);
  const { toast } = useToast();

  const handleThumbsUp = () => {
    setHasRated(true);
    toast({
      title: "Thank you!",
      description: `Your positive feedback has been recorded`
    });
  };

  const handleThumbsDown = () => {
    setShowFeedbackForm(true);
  };

  const handleSubmitFeedback = () => {
    setHasRated(true);
    setShowFeedbackForm(false);
    toast({
      title: "Feedback submitted",
      description: "Your feedback has been recorded. Thank you!"
    });
  };

  if (hasRated) {
    return null;
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <p className="text-sm font-medium mb-3">Are you satisfied with this {feedbackType}?</p>
      
      {!showFeedbackForm ? (
        <div className="flex gap-4">
          <Button variant="outline" size="sm" onClick={handleThumbsUp} className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" /> Yes, it's good
          </Button>
          <Button variant="outline" size="sm" onClick={handleThumbsDown} className="flex items-center gap-2">
            <ThumbsDown className="h-4 w-4" /> No, needs improvement
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          <Textarea 
            value={feedbackText} 
            onChange={e => setFeedbackText(e.target.value)} 
            placeholder="Please tell us how we can improve..." 
            className="w-full h-24" 
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSubmitFeedback} disabled={!feedbackText.trim()}>
              Submit Feedback
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowFeedbackForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
