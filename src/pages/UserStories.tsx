
import { WelcomeScreen } from "./user-stories/WelcomeScreen";
import { LoadingScreen } from "./user-stories/LoadingScreen";
import { StoriesHeader } from "./user-stories/StoriesHeader";
import { StoriesTable } from "./user-stories/StoriesTable";
import { StoryDetailsSidebar } from "./user-stories/StoryDetailsSidebar";
import { useUserStories } from "./user-stories/useUserStories";

export default function UserStories() {
  const {
    stories,
    selectedStory,
    isNewStoryDialogOpen,
    showContent,
    isLoading,
    setSelectedStory,
    setIsNewStoryDialogOpen,
    generateStories,
    handleChecklistItemToggle,
    handleStatusChange,
    handleDescriptionChange,
    handleAssigneeChange,
    handleDueDateChange,
    handleExport,
    handleStoryPointsChange,
    handleCreateStory,
    handleReorderStories,
    handleAddChecklistItem,
    handleEditChecklistItem,
    handleDeleteChecklistItem,
  } = useUserStories();

  if (!showContent && !isLoading) {
    return <WelcomeScreen onGenerate={generateStories} />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex-1 overflow-hidden">
      <div className="flex flex-col h-full">
        <StoriesHeader 
          isNewStoryDialogOpen={isNewStoryDialogOpen}
          onNewStoryDialogOpenChange={setIsNewStoryDialogOpen}
          onCreateStory={handleCreateStory}
          onExport={handleExport}
        />

        <div className="flex-1 p-6 overflow-auto">
          <StoriesTable 
            stories={stories}
            onSelectStory={setSelectedStory}
            onStatusChange={handleStatusChange}
            onAssigneeChange={handleAssigneeChange}
            onDueDateChange={handleDueDateChange}
            onStoryPointsChange={handleStoryPointsChange}
            onReorderStories={handleReorderStories}
          />
        </div>
      </div>

      <StoryDetailsSidebar 
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onToggleChecklistItem={handleChecklistItemToggle}
        onDescriptionChange={handleDescriptionChange}
        onAddChecklistItem={handleAddChecklistItem}
        onEditChecklistItem={handleEditChecklistItem}
        onDeleteChecklistItem={handleDeleteChecklistItem}
      />
    </div>
  );
}
