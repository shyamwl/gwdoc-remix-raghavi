import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, GripVertical } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { StepperProgress } from "@/components/screens/StepperProgress";
import { AnalyzingImagesLoader } from "@/components/screens/AnalyzingImagesLoader";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  title: string;
}

export default function UploadUIImages() {
  const navigate = useNavigate();
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    if (uploadedImages.length + imageFiles.length > 20) {
      toast({
        title: "Error",
        description: "You can only upload up to 20 images",
        variant: "destructive",
      });
      return;
    }
    const newImages: UploadedImage[] = imageFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""),
    }));
    setUploadedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...uploadedImages];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setUploadedImages(newImages);
  };

  const handleNextStep = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    navigate("/describe-screens");
  };

  return (
    <>
      <div className="container mx-auto py-8 max-w-5xl">
        <StepperProgress />

        <h1 className="text-2xl font-semibold mb-2">Upload UI Screens</h1>
        <p className="text-muted-foreground mb-8">
          Upload up to 20 screenshots of your application's UI screens
        </p>

        {/* Image Upload Area */}
        <div
          className={`border border-dashed rounded-lg p-12 text-center ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/20"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-4">
            <Upload className="h-12 w-12 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">
                Drag & drop files here, or click to select files
              </p>
              <p className="text-sm text-muted-foreground/80 mt-1">
                PNG, JPG, GIF up to 10MB each
              </p>
            </div>
            <Input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleFileSelect}
              id="image-upload"
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              Browse Files
            </Button>
          </div>
        </div>

        {/* Image Previews */}
        {uploadedImages.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            {uploadedImages.map((image, index) => (
              <Card
                key={image.id}
                className="relative group overflow-hidden"
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", index.toString());
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add("border-primary");
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove("border-primary");
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove("border-primary");
                  const fromIndex = parseInt(
                    e.dataTransfer.getData("text/plain")
                  );
                  moveImage(fromIndex, index);
                }}
              >
                <CardContent className="p-0 h-[200px] flex items-center justify-center bg-muted/20">
                  <div className="w-full h-full flex items-center justify-center overflow-hidden">
                    <img
                      src={image.preview}
                      alt={image.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </CardContent>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-background/90 p-2">
                  <p className="text-sm truncate">{image.title}</p>
                </div>
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                  <GripVertical className="h-4 w-4 text-foreground" />
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Navigation Button */}
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleNextStep}
            disabled={uploadedImages.length === 0}
            className="px-8"
          >
            Next Step
          </Button>
        </div>
      </div>

      {isAnalyzing && (
        <AnalyzingImagesLoader onComplete={handleAnalysisComplete} />
      )}
    </>
  );
}
