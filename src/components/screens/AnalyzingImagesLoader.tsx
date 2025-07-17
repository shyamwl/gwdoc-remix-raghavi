import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

interface AnalyzingImagesLoaderProps {
  onComplete: () => void;
}

const loadingMessages = [
  "Analyzing the UI Images",
  "Understanding the flow",
  "Detecting the key pages & sub-pages",
  "Arranging the images in the right order",
  "Checking for duplicate screens",
  "Writing the description for each screen",
];

const scratchpadThoughts = [
  "  Hmm, The Home Screen provides an overview of available products...",
  " The Search Screen allows users to search for products and view recent searches...",
  " Provides detailed information about a selected product, including product images...",
  " Allows users to review selected products before checkout...",
  " Found several related screens forming a checkout flow...",
  " Finalizes shipping details before payment...",
  " The color scheme suggests a consistent design system...",
  " Allows selection of a payment method for the order...",
  " Confirms successful payment and provides post-purchase options...",
  " Screen resolution analysis complete, optimizing for responsive layout...",
  " Recognizing common UI patterns across multiple screens...",
  " Identifying primary user flows based on screen transitions...",
  " Almost done processing all the uploaded images!",
];

export function AnalyzingImagesLoader({
  onComplete,
}: AnalyzingImagesLoaderProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [scratchpadText, setScratchpadText] = useState("");
  const [progress, setProgress] = useState(0);
  const [messageVisible, setMessageVisible] = useState(true);
  const [animationDirection, setAnimationDirection] = useState("down"); // To control the animation direction
  const scratchpadRef = useRef<HTMLTextAreaElement>(null);

  // Simulate loading progress
  useEffect(() => {
    const totalDuration = 40000; // 40 seconds total loading time
    const interval = 1000; // Update every 1000ms
    const incrementPerStep = 100 / (totalDuration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + incrementPerStep, 100);
        if (newProgress >= 100) {
          clearInterval(timer);
          // Wait a moment at 100% before completing
          setTimeout(onComplete, 500);
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Rotate through loading messages with animation
  useEffect(() => {
    const messageInterval = setInterval(() => {
      // Start exit animation (current text slides down and fades out)
      setAnimationDirection("down");
      setMessageVisible(false);

      // After animation completes, change the message and start entrance animation
      setTimeout(() => {
        setCurrentMessageIndex((prev) =>
          // Loop back to beginning if we reached the end
          prev < loadingMessages.length - 1 ? prev + 1 : 0
        );
        // New text comes in from the top
        setAnimationDirection("up");
        setMessageVisible(true);
      }, 300); // This should match the CSS transition duration
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  // Simulate AI thinking in the scratchpad - FIXED to prevent undefined
  useEffect(() => {
    let currentThoughtIndex = 0;
    let currentCharIndex = 0;
    let currentThought = scratchpadThoughts[0];

    const typingInterval = setInterval(() => {
      if (currentCharIndex < currentThought.length) {
        // Still typing the current thought - fixed to avoid undefined
        setScratchpadText(
          (prev) => prev + currentThought.charAt(currentCharIndex)
        );
        currentCharIndex++;
      } else {
        // Finished current thought, add a new line and move to next thought
        currentThoughtIndex++;
        if (currentThoughtIndex < scratchpadThoughts.length) {
          setScratchpadText((prev) => prev + "\n\n");
          currentThought = scratchpadThoughts[currentThoughtIndex];
          currentCharIndex = 0;
        } else {
          clearInterval(typingInterval);
        }
      }

      // Auto-scroll the textarea
      if (scratchpadRef.current) {
        scratchpadRef.current.scrollTop = scratchpadRef.current.scrollHeight;
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl flex flex-col items-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-6" />

        <div className="h-10 mb-2 overflow-hidden">
          <h2
            className={`text-2xl font-semibold transition-all duration-300 ease-in-out transform ${
              messageVisible
                ? "translate-y-0 opacity-100"
                : animationDirection === "down"
                ? "translate-y-8 opacity-0"
                : "-translate-y-8 opacity-0"
            }`}
          >
            {loadingMessages[currentMessageIndex]}
          </h2>
        </div>

        <div className="w-full bg-muted h-2 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-200 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="w-full mb-4">
          <h3 className="text-sm font-medium mb-2">AI Scratchpad</h3>
          <Textarea
            ref={scratchpadRef}
            value={scratchpadText}
            readOnly
            className="h-48 font-mono text-sm opacity-80 resize-none"
          />
        </div>

        <div className="flex gap-2 mt-4">
          <Skeleton className="h-2 w-12 rounded-full" />
          <Skeleton className="h-2 w-12 rounded-full" />
          <Skeleton className="h-2 w-12 rounded-full" />
        </div>
      </div>
    </div>
  );
}
