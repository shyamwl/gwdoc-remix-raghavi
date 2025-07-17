
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mic, MicOff, Video, VideoOff, ArrowLeft, ArrowRight } from "lucide-react";
import { StepperProgress } from "@/components/screens/StepperProgress";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { useToast } from "@/hooks/use-toast";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { ImageSlideshow } from "@/components/screens/ImageSlideshow";

interface UploadedImage {
  id: string;
  preview: string;
  title: string;
}

export default function BackendLogics() {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [backendLogics, setBackendLogics] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [showSlideshow, setShowSlideshow] = useState(false);
  
  // Mock uploaded images (in a real app, this would come from context/state)
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([
    {
      id: "1",
      preview: "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_1_the_home_screen_provides_an_overview_of_available_products_and_categories_featuring_a_location_selector_search_bar_notification_icon_promotional_banner_category_icons_flash_sale_section_product_listings_and_a_bottom_navigation_bar.png",
      title: "Home Screen",
    },
    {
      id: "2",
      preview: "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_2_the_search_screen_allows_users_to_search_for_products_and_view_recent_searches_including_a_back_button_search_bar_recent_searches_list_and_clear_all_option.png",
      title: "Search Screen",
    },
    {
      id: "3",
      preview: "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_3_displays_search_results_based_on_user_input_featuring_a_back_button_search_bar_with_query_product_listings_and_favorite_icons.png",
      title: "Search Results",
    },
    {
      id: "4",
      preview: "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_4_provides_detailed_information_about_a_selected_product_including_product_images_title_rating_description_size_and_color_selectors_price_and_an_add_to_cart_button.png",
      title: "Product Details",
    },
  ]);

  // Handle text input
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBackendLogics(e.target.value);
  };

  // Handle microphone toggle
  const toggleMicrophone = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Handle screen share toggle
  const toggleScreenShare = async () => {
    if (isScreenSharing) {
      stopScreenSharing();
    } else {
      startScreenSharing();
    }
  };

  // Start recording session
  const startRecording = () => {
    setIsRecording(true);
    setShowSlideshow(true);
    toast({
      title: "Recording started",
      description: "Your voice is now being recorded"
    });

    // Start timer
    const id = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    setTimerId(id);
  };

  // Stop recording session
  const stopRecording = () => {
    setIsRecording(false);
    if (!isScreenSharing) {
      setShowSlideshow(false);
    }
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    toast({
      title: "Recording stopped",
      description: `Recording saved (${formatTime(recordingTime)})`
    });

    // Reset timer
    setRecordingTime(0);
  };

  // Start screen sharing
  const startScreenSharing = async () => {
    try {
      await navigator.mediaDevices.getDisplayMedia({
        video: true
      });
      setIsScreenSharing(true);
      setShowSlideshow(true);
      toast({
        title: "Screen sharing started",
        description: "Your screen is now being shared"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start screen sharing",
        variant: "destructive"
      });
    }
  };

  // Stop screen sharing
  const stopScreenSharing = () => {
    setIsScreenSharing(false);
    if (!isRecording) {
      setShowSlideshow(false);
    }
    toast({
      title: "Screen sharing stopped",
      description: "Your screen is no longer being shared"
    });
  };

  // Format time for display (MM:SS)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Handle keyboard navigation for slideshow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showSlideshow) return;
      
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        // These will be handled by the Carousel component
        // The component has built-in keyboard navigation
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showSlideshow]);

  // Navigate to next step
  const handleNext = () => {
    // Stop any active recording before navigating
    if (isRecording) {
      stopRecording();
    }

    // Save backend logics data (would connect to context/state management in a real app)
    toast({
      title: "Backend logics saved",
      description: "Your backend requirements have been saved successfully"
    });
    navigate("/app-flow");
  };

  return <div className="container mx-auto py-8 max-w-5xl">
      <StepperProgress />

      <h1 className="text-2xl font-semibold mb-2">Backend Logics (optional)</h1>
      <p className="text-muted-foreground mb-8">
        Describe any backend requirements for your app that were not visible in the UI screens.
      </p>

      {showSlideshow && (
        <div className="fixed inset-0 bg-background/95 z-50 p-8 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Screen Images</h2>
            <div className="flex items-center gap-4">
              {isRecording && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                  <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
                </div>
              )}
              <Button 
                variant="outline" 
                onClick={() => {
                  if (isRecording) stopRecording();
                  if (isScreenSharing) stopScreenSharing();
                }}
              >
                Close Slideshow
              </Button>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center">
            <Carousel className="w-full max-w-4xl">
              <CarouselContent>
                {uploadedImages.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="p-1">
                      <div className="flex flex-col items-center">
                        <div className="bg-muted/20 rounded-lg p-2 w-full flex items-center justify-center h-[60vh]">
                          <img
                            src={image.preview}
                            alt={image.title}
                            className="max-h-full object-contain"
                          />
                        </div>
                        <h3 className="mt-4 text-lg font-medium">{image.title}</h3>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0 translate-x-0" />
                <CarouselNext className="static translate-y-0 translate-x-0" />
              </div>
            </Carousel>
          </div>
          
          <div className="text-center mt-6 text-sm text-muted-foreground">
            Use arrow keys or buttons to navigate between screens
          </div>
        </div>
      )}

      <Tabs defaultValue="record" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="record">Record Explanation</TabsTrigger>
          <TabsTrigger value="text">Text Input</TabsTrigger>
        </TabsList>
        
        <TabsContent value="record" className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">Record Screen & Voice</h3>
              <div className="text-sm font-mono bg-muted px-2 py-1 rounded">
                {isRecording ? formatTime(recordingTime) : "00:00"}
              </div>
            </div>
            
            <p className="text-muted-foreground mb-4">
              Share your screen and explain the backend logic requirements while recording your voice.
              When recording starts, you'll see a slideshow of your uploaded screens.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant={isScreenSharing ? "destructive" : "outline"} className="flex items-center gap-2" onClick={toggleScreenShare}>
                {isScreenSharing ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                {isScreenSharing ? "Stop Sharing" : "Share Screen"}
              </Button>
              
              <Button variant={isRecording ? "destructive" : "default"} className="flex items-center gap-2" onClick={toggleMicrophone}>
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            </div>
            
            {(isRecording || isScreenSharing) && <div className="mt-4 bg-muted/20 p-4 rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">
                  {isRecording && isScreenSharing ? "Recording and screen sharing are active. Explain your backend requirements clearly." : isRecording ? "Voice recording is active. Explain your backend requirements clearly." : "Screen sharing is active. Start voice recording to explain your backend requirements."}
                </p>
              </div>}
          </div>
        </TabsContent>
        
        <TabsContent value="text" className="space-y-6">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Text Description</h3>
            <p className="text-muted-foreground mb-4">
              Describe any backend logic requirements that weren't visible in your UI images.
              Include details about data structures, APIs, user permissions, and business rules.
            </p>
            
            <Textarea value={backendLogics} onChange={handleTextChange} placeholder="For example: 
- User authentication requires email verification
- Product inventory should be updated in real-time
- Payment processing should integrate with Stripe
- User roles: Admin, Editor, Viewer with different permissions" className="min-h-[200px]" />
          </div>
        </TabsContent>
      </Tabs>

      <FeedbackWidget feedbackType="backend logics" />

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => navigate("/describe-screens")}>
          Previous Step
        </Button>
        <Button onClick={handleNext}>Next Step</Button>
      </div>
    </div>;
}
