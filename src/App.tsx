
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chat from "./pages/Chat";
import UserStories from "./pages/UserStories";
import QuizList from "./pages/QuizList";
import QuizEditor from "./pages/QuizEditor";
import QuizTaker from "./pages/QuizTaker";
import QuizResults from "./pages/QuizResults";
import QuizMyResults from "./pages/QuizMyResults";
import ProjectLibrary from "./pages/ProjectLibrary";
import UploadUIImages from "./pages/UploadUIImages";
import DescribeScreens from "./pages/DescribeScreens";
import BackendLogics from "./pages/BackendLogics";
import AppFlow from "./pages/AppFlow";
import ScreenDocs from "./pages/ScreenDocs";
import ApiDocs from "./pages/ApiDocs";
import DatabaseSchema from "./pages/DatabaseSchema";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/project-library" replace />} />
            <Route path="/index" element={<Index />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/user-stories" element={<UserStories />} />
            <Route path="/quiz/list" element={<QuizList />} />
            <Route path="/quiz/editor/:id" element={<QuizEditor />} />
            <Route path="/quiz/take/:id" element={<QuizTaker />} />
            <Route path="/quiz/results/:id" element={<QuizResults />} />
            <Route path="/quiz/my-results/:id" element={<QuizMyResults />} />
            <Route path="/project-library" element={<ProjectLibrary />} />
            <Route path="/upload-ui-images" element={<UploadUIImages />} />
            <Route path="/describe-screens" element={<DescribeScreens />} />
            <Route path="/backend-logics" element={<BackendLogics />} />
            <Route path="/app-flow" element={<AppFlow />} />
            <Route path="/screen-docs" element={<ScreenDocs />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/database-schema" element={<DatabaseSchema />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
