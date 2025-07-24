import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StepperProgress } from "@/components/screens/StepperProgress";
//import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Edit,
  Trash2,
  ChevronDown,
  ChevronRight,
  Plus,
  Code,
  Copy,
  CheckCircle,
  Wand2,
  Eye,
  FileCode,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Lightbox } from "@/components/screens/Lightbox";
import { toast } from "@/hooks/use-toast";
import type { ScreenItem } from "@/types/screens";

interface EnhancedScreenItem extends ScreenItem {
  frontendPrompt?: string;
  generatedPrompt?: string;
  techStack?: string[];
}

export default function Frontend() {
  const [screens, setScreens] = useState<EnhancedScreenItem[]>([
    {
      id: "1",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_1_the_home_screen_provides_an_overview_of_available_products_and_categories_featuring_a_location_selector_search_bar_notification_icon_promotional_banner_category_icons_flash_sale_section_product_listings_and_a_bottom_navigation_bar.png",
      description: "Home Screen",
      parentId: null,
      isExpanded: true,
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      frontendPrompt: `Create a modern e-commerce home screen with the following components:

**Header Section:**
- Location selector dropdown with current location display
- Search bar with placeholder "Search products..."
- Notification bell icon with badge indicator

**Main Content:**
- Hero promotional banner with image and call-to-action
- Category grid (6 categories) with icons and labels
- Flash sale section with countdown timer and product cards
- Product grid with favorite buttons, ratings, and pricing

**Bottom Navigation:**
- 5-tab navigation: Home, Categories, Cart, Favorites, Profile
- Active state highlighting for current tab

**Technical Requirements:**
- Responsive design for mobile and desktop
- Smooth animations for interactions
- Loading states for dynamic content
- Accessibility compliance (ARIA labels, keyboard navigation)

**Styling:**
- Modern card-based layout
- Consistent spacing and typography
- Primary color scheme with accent colors
- Hover effects and micro-interactions`,
      generatedPrompt: "",
    },
    {
      id: "2",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_2_the_search_screen_allows_users_to_search_for_products_and_view_recent_searches_including_a_back_button_search_bar_recent_searches_list_and_clear_all_option.png",
      description: "Search Screen",
      parentId: null,
      isExpanded: false,
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      frontendPrompt: `Build a search interface with the following features:

**Header:**
- Back button with proper navigation
- Prominent search input with auto-focus
- Search suggestions dropdown

**Recent Searches:**
- List of recent search queries
- Individual delete buttons (X icon)
- "Clear All" button for bulk deletion
- Empty state when no recent searches

**Search Results (when applicable):**
- Real-time search suggestions
- Category filters
- Sort options (relevance, price, rating)

**Technical Implementation:**
- Debounced search input to prevent excessive API calls
- Local storage for recent searches persistence
- Keyboard shortcuts (Enter to search, Escape to clear)
- Search history management with timestamp

**UX Considerations:**
- Smooth transitions between states
- Loading spinners for search operations
- Error handling for failed searches
- Voice search integration (optional)`,
      generatedPrompt: "",
    },
    {
      id: "3",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_3_displays_search_results_based_on_user_input_featuring_a_back_button_search_bar_with_query_product_listings_and_favorite_icons.png",
      description: "Search Results",
      parentId: null,
      isExpanded: false,
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      frontendPrompt: `Create a comprehensive search results page:

**Search Header:**
- Back navigation to previous screen
- Search bar displaying current query with edit capability
- Result count display
- Filter and sort controls

**Product Grid:**
- Responsive grid layout (2 columns mobile, 4+ desktop)
- Product cards with image, title, price, rating
- Heart icon for favorites with toggle animation
- Quick view option on hover

**Filtering & Sorting:**
- Category filters sidebar
- Price range slider
- Brand checkboxes
- Sort dropdown (price, popularity, newest, rating)

**Pagination:**
- Load more button or infinite scroll
- Page numbers for large result sets
- Results per page selector

**Features:**
- Image lazy loading for performance
- Skeleton loaders while fetching
- No results state with suggestions
- Recently viewed products section`,
      generatedPrompt: "",
    },
    {
      id: "4",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_4_provides_detailed_information_about_a_selected_product_including_product_images_title_rating_description_size_and_color_selectors_price_and_an_add_to_cart_button.png",
      description: "Product Details",
      parentId: null,
      isExpanded: false,
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      frontendPrompt: `Build a detailed product view with rich interactions:

**Image Gallery:**
- Main product image with zoom capability
- Thumbnail carousel below main image
- Fullscreen lightbox for image viewing
- 360-degree view option (if available)

**Product Information:**
- Product title and brand
- Star rating with review count
- Price display with discounts
- Stock availability indicator
- Product description with expandable "Read More"

**Variant Selectors:**
- Size selector with availability indicators
- Color picker with swatch preview
- Quantity selector with min/max validation
- SKU and model number display

**Action Buttons:**
- Primary "Add to Cart" button
- Secondary "Buy Now" option
- Wishlist heart icon toggle
- Share product functionality

**Additional Sections:**
- Customer reviews and ratings
- Product specifications table
- Related products carousel
- Recently viewed items`,
      generatedPrompt: "",
    },
    {
      id: "5",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_5_allows_users_to_review_selected_products_before_checkout_featuring_a_product_list_with_details_quantity_adjusters_delete_option_promo_code_field_cost_summary_and_proceed_to_checkout_button.png",
      description: "Shopping Cart",
      parentId: null,
      isExpanded: false,
      techStack: ["React", "TypeScript", "Tailwind CSS"],
      frontendPrompt: `Design a comprehensive shopping cart experience:

**Cart Header:**
- Back navigation button
- Cart item count indicator
- "Continue Shopping" link

**Product List:**
- Product cards with image, title, size, color
- Quantity selectors with +/- buttons
- Delete/Remove button for each item
- Save for later option
- Stock warnings for low inventory

**Pricing Section:**
- Subtotal calculation
- Shipping cost estimation
- Tax calculation
- Promo code input field with validation
- Grand total with prominent display

**Promo Code Feature:**
- Input field with apply button
- Valid/invalid feedback messages
- Applied discount display
- Remove applied code option

**Checkout Actions:**
- Primary "Proceed to Checkout" button
- Estimated delivery date
- Secure checkout badges
- Guest checkout option`,
      generatedPrompt: "",
    },
  ]);

  const [selectedScreen, setSelectedScreen] = useState<EnhancedScreenItem | null>(screens[0]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPromptSheetOpen, setIsPromptSheetOpen] = useState(false);
  const [editingScreen, setEditingScreen] = useState<EnhancedScreenItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [showDeveloperPrompt, setShowDeveloperPrompt] = useState(false);

  useEffect(() => {
    if (screens.length > 0 && !selectedScreen) {
      setSelectedScreen(screens[0]);
    }
  }, [screens, selectedScreen]);

  const handleScreenSelect = (screen: EnhancedScreenItem) => {
    setSelectedScreen(screen);
    setShowDeveloperPrompt(false); // Reset to preview when selecting new screen
  };

  const handleEditScreen = (screen: EnhancedScreenItem) => {
    setEditingScreen({ ...screen });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editingScreen) {
      setScreens(prev => prev.map(screen => 
        screen.id === editingScreen.id ? editingScreen : screen
      ));
      
      if (selectedScreen?.id === editingScreen.id) {
        setSelectedScreen(editingScreen);
      }
    }
    setIsEditDialogOpen(false);
    setEditingScreen(null);
  };

  const handleDeleteScreen = (screenId: string) => {
    setScreens(prev => prev.filter(screen => screen.id !== screenId));
    
    if (selectedScreen?.id === screenId) {
      const remaining = screens.filter(s => s.id !== screenId);
      setSelectedScreen(remaining.length > 0 ? remaining[0] : null);
    }
  };

  const copyPromptToClipboard = async (prompt: string, screenId: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedPrompt(screenId);
      toast({
        title: "Prompt copied!",
        description: "Frontend prompt has been copied to your clipboard.",
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopiedPrompt(null), 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy prompt to clipboard.",
        variant: "destructive",
      });
    }
  };

  const generateCustomPrompt = (screen: EnhancedScreenItem) => {
    const customPrompt = `## Frontend Development Prompt for ${screen.description}

**Technology Stack:** ${screen.techStack?.join(", ") || "React, TypeScript, Tailwind CSS"}

**Screen Overview:**
${screen.frontendPrompt}

**Development Guidelines:**
- Use modern React functional components with hooks
- Implement TypeScript for type safety
- Follow responsive design principles
- Ensure accessibility (WCAG 2.1 AA compliance)
- Optimize for performance (lazy loading, memoization)
- Include proper error handling and loading states

**File Structure Suggestion:**
\`\`\`
components/
  ${screen.description.replace(/\s+/g, '')}Screen/
    index.tsx
    components/
    hooks/
    types.ts
    styles.module.css (if needed)
\`\`\`

**Testing Requirements:**
- Unit tests for all components
- Integration tests for user interactions
- Accessibility testing
- Cross-browser compatibility testing

Ready to implement this screen? Copy this prompt and use it with your preferred AI coding assistant!`;

    return customPrompt;
  };

  const openPromptSheet = (screen: EnhancedScreenItem) => {
    setSelectedScreen(screen);
    setIsPromptSheetOpen(true);
  };

  const handleGenerateDeveloperPrompt = () => {
    setShowDeveloperPrompt(true);
  };

  return (
    <div className="h-full flex bg-background">
      {/* Left Panel - Screens List */}
      <div className="w-80 border-r bg-background overflow-y-auto">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-4">
            <Code className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">Frontend Development</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            AI prompts for generating frontend code for each screen
          </p>
        </div>

        <div className="p-4">
          {screens.map((screen) => (
            <div
              key={screen.id}
              className={`group relative border rounded-lg p-4 mb-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedScreen?.id === screen.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => handleScreenSelect(screen)}
            >
              <div className="flex items-start gap-3">
                <img
                  src={screen.image}
                  alt={screen.description}
                  className="w-16 h-16 object-cover rounded border cursor-pointer hover:opacity-80"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(screen.image);
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 truncate">
                    {screen.description}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {screen.techStack?.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {screen.frontendPrompt?.substring(0, 100)}...
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditScreen(screen);
                  }}
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-destructive hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteScreen(screen.id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Selected Screen Details */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedScreen ? (
          <>
            {/* Header */}
            <div className="border-b p-6 bg-background">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{selectedScreen.description}</h2>
                  <p className="text-muted-foreground">Frontend development prompt</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedScreen.techStack?.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden">
              {!showDeveloperPrompt ? (
                /* Initial View - Screen Preview with Centered Generate Button */
                <div className="flex-1 overflow-auto p-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="relative">
                      <div className="border rounded-lg overflow-hidden">
                        <img
                          src={selectedScreen.image}
                          alt={selectedScreen.description}
                          className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                          onClick={() => setLightboxImage(selectedScreen.image)}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Click on the image to view in fullscreen
                    </p>
                    
                    {/* Centered Generate Developer Prompt Button */}
                    <div className="flex justify-center mt-8">
                      <Button
                        onClick={handleGenerateDeveloperPrompt}
                        className="gap-2"
                        size="lg"
                      >
                        <FileCode className="h-4 w-4" />
                        Generate Developer Prompt
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Developer Prompt View - Show only the prompt */
                <div className="flex-1 overflow-auto p-6">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Developer Prompt</h3>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => openPromptSheet(selectedScreen)}
                          size="sm"
                          className="gap-2"
                        >
                          <Wand2 className="h-4 w-4" />
                          Enhanced
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            // Regenerate prompt logic can be added here
                            toast({
                              title: "Prompt regenerated!",
                              description: "Developer prompt has been regenerated.",
                            });
                          }}
                          size="sm"
                          className="gap-2"
                        >
                          <Wand2 className="h-4 w-4" />
                          Regenerate
                        </Button>
                        <Button
                          onClick={() => copyPromptToClipboard(selectedScreen.frontendPrompt || "", selectedScreen.id)}
                          size="sm"
                          className="gap-2"
                        >
                          {copiedPrompt === selectedScreen.id ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                          {copiedPrompt === selectedScreen.id ? "Copied!" : "Copy"}
                        </Button>
                      </div>
                    </div>
                    <div className="bg-muted rounded-lg p-6">
                      <pre className="whitespace-pre-wrap text-sm font-mono leading-relaxed">
                        {generateCustomPrompt(selectedScreen)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Code className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a Screen</h3>
              <p className="text-muted-foreground">
                Choose a screen from the left panel to view its frontend development prompt
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Screen</DialogTitle>
          </DialogHeader>
          {editingScreen && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Screen Name</Label>
                <Input
                  id="description"
                  value={editingScreen.description}
                  onChange={(e) => setEditingScreen({
                    ...editingScreen,
                    description: e.target.value
                  })}
                />
              </div>
              <div>
                <Label htmlFor="prompt">Frontend Prompt</Label>
                <Textarea
                  id="prompt"
                  value={editingScreen.frontendPrompt || ""}
                  onChange={(e) => setEditingScreen({
                    ...editingScreen,
                    frontendPrompt: e.target.value
                  })}
                  rows={10}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enhanced Prompt Sheet */}
      <Sheet open={isPromptSheetOpen} onOpenChange={setIsPromptSheetOpen}>
        <SheetContent className="w-[600px] sm:w-[800px]">
          <SheetHeader>
            <SheetTitle>Generated Frontend Prompt</SheetTitle>
          </SheetHeader>
          {selectedScreen && (
            <div className="mt-4 space-y-4">
              <div className="bg-muted rounded-lg p-4 max-h-[500px] overflow-auto">
                <pre className="whitespace-pre-wrap text-sm">
                  {generateCustomPrompt(selectedScreen)}
                </pre>
              </div>
              <SheetFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsPromptSheetOpen(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    copyPromptToClipboard(generateCustomPrompt(selectedScreen), selectedScreen.id);
                    setIsPromptSheetOpen(false);
                  }}
                  className="gap-2"
                >
                  <Copy className="h-4 w-4" />
                  Copy Enhanced Prompt
                </Button>
              </SheetFooter>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Lightbox */}
      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
