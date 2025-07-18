
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { StepperProgress } from "@/components/screens/StepperProgress";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { Textarea } from "@/components/ui/textarea";
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
  Upload,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DocumentGenerationDialog } from "@/components/screens/DocumentGenerationDialog";
import { Lightbox } from "@/components/screens/Lightbox";
import type { ScreenItem } from "@/types/screens";

type GenerationStatus = "pending" | "in-progress" | "completed";

interface EnhancedScreenItem extends ScreenItem {
  generationStatus?: GenerationStatus;
  fullDocumentation?: string;
  displayedDocumentation?: string;
}

export default function ScreenDocs() {
  const navigate = useNavigate();

  // Sample screens data with generation status
  const [screens, setScreens] = useState<EnhancedScreenItem[]>([
    {
      id: "1",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_1_the_home_screen_provides_an_overview_of_available_products_and_categories_featuring_a_location_selector_search_bar_notification_icon_promotional_banner_category_icons_flash_sale_section_product_listings_and_a_bottom_navigation_bar.png",
      description: "Home Screen",
      parentId: null,
      isExpanded: true,
      generationStatus: "in-progress",
      fullDocumentation: `# Home Screen
  
  **Screen Title:** Home Screen
  
  **Components:**
  
  1. **Location Selector**
     - Description: Displays the current user location.
     - Functionality: Allows users to set or change their location.
     - Data Source: User input or device location services.
  
  2. **Search Bar**
     - Description: Enables users to search for products.
     - Functionality: Opens the search screen for input when clicked.
     - Data Source: User input.
  
  3. **Notification Icon**
     - Description: Indicates new notifications or messages.
     - Functionality: Opens the notifications screen.
     - Data Source: Application server notifications.
  
  4. **Promotional Banner**
     - Description: Displays promotional offers.
     - Functionality: Redirects to a promotion page when clicked.
     - Data Source: Marketing content database.
  
  5. **Category Icons**
     - Description: Icons representing different product categories.
     - Functionality: Loads product listings for the selected category.
     - Data Source: Product categories database.
  
  6. **Flash Sale Section**
     - Description: Displays items on flash sale with a countdown timer.
     - Functionality: Adds urgency, redirects to product details when clicked.
     - Data Source: Special offers database.
  
  7. **Product Listings**
     - Description: Displays a list of suggested or trending products.
     - Functionality: Showcases individual products; redirects to product details on selection.
     - Data Source: Product inventory database.
  
  8. **Bottom Navigation Bar**
     - Description: Provides quick navigation to other sections of the app.
     - Functionality: Directs to home, cart, favorites, messages, or profile pages.
     - Data Source: Internal app navigation structure.
  
  **Page Flow:**
  - Previous Page: Entry point or previous session state.
  - Next Page: Search Screen, Notifications, Promotion Details, Category Product Listings, Product Details.
  
  **Business Logic:**
  - Promotional offers and flash sales depend on the current date and time.
  - Location data is updated based on user interaction or device settings.
  
  **Additional Notes:**
  - Ensure the promotional content is updated regularly to reflect current offers.
  - Consider adding user preferences to display personalized product suggestions.
  `,
      displayedDocumentation: "",
    },
    {
      id: "2",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_2_the_search_screen_allows_users_to_search_for_products_and_view_recent_searches_including_a_back_button_search_bar_recent_searches_list_and_clear_all_option.png",
      description: "Search Screen",
      parentId: null,
      isExpanded: false,
      generationStatus: "in-progress",
      fullDocumentation: `# Search Screen
  
  **Screen Title:** Search Screen
  
  **Components:**
  
  1. **Back Button**
     - Description: Allows users to return to the previous screen.
     - Functionality: Navigates back to the Home Screen.
     - Data Source: Navigation history.
  
  2. **Search Bar**
     - Description: Input field for users to search for products.
     - Functionality: Initiates a product search based on user input.
     - Data Source: User input.
  
  3. **Recent Searches List**
     - Description: Displays a list of recent search queries.
     - Functionality: Click on an item to reinitiate the search.
     - Data Source: User search history.
  
  4. **Clear All Option**
     - Description: Removes all recent search entries.
     - Functionality: Clears the recent searches list.
     - Data Source: User search history.
  
  5. **Individual Remove Button (X)**
     - Description: Allows users to remove individual search entries.
     - Functionality: Deletes the selected search entry from history.
     - Data Source: User search history.
  
  **Page Flow:**
  - Previous Page: Home Screen.
  - Next Page: Search Results Screen (after user submits a search query).
  
  **Business Logic:**
  - Recent searches are stored locally and can be cleared by the user.
  - Search suggestions or auto-completion can be implemented based on user data.
  
  **Additional Notes:**
  - Consider adding predictive text to the search bar for a better user experience.
  - Offer search filters to refine results based on categories or price range.
  `,
      displayedDocumentation: "",
    },
    {
      id: "3",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_3_displays_search_results_based_on_user_input_featuring_a_back_button_search_bar_with_query_product_listings_and_favorite_icons.png",
      description: "Search Results",
      parentId: null,
      isExpanded: false,
      generationStatus: "pending",
      fullDocumentation: `# Search Results
  
  **Screen Title:** Search Results
  
  **Components:**
  
  1. **Back Button**
     - Description: Allows users to navigate back to the previous screen.
     - Functionality: Returns to the Search Screen.
     - Data Source: Navigation history.
  
  2. **Search Bar with Query**
     - Description: Displays the current search term.
     - Functionality: Users can modify the search query or initiate a new search.
     - Data Source: User input.
  
  3. **Product Listings**
     - Description: Shows products matching the search query.
     - Functionality: Clicking on a product redirects to its details page.
     - Data Source: Product database.
  
  4. **Favorite Icons**
     - Description: Allows users to save products to a favorites list.
     - Functionality: Toggles the product's favorite status.
     - Data Source: User account preferences.
  
  5. **Search Result Count**
     - Description: Displays the number of products found.
     - Functionality: Dynamically updates based on search filters or changes.
     - Data Source: Product database.
  
  **Page Flow:**
  - Previous Page: Search Screen.
  - Next Page: Product Details Screen (when a product is selected).
  
  **Business Logic:**
  - Results are filtered and ranked based on relevance to the search query.
  - User interaction with favorite icons updates personal user data.
  
  **Additional Notes:**
  - Consider adding sorting options (e.g., price, popularity) to enhance user experience.
  - Implement pagination for better performance with large result sets.
  `,
      displayedDocumentation: "",
    },
    {
      id: "4",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_4_provides_detailed_information_about_a_selected_product_including_product_images_title_rating_description_size_and_color_selectors_price_and_an_add_to_cart_button.png",
      description: "Product Details",
      parentId: null,
      isExpanded: false,
      generationStatus: "pending",
      fullDocumentation: `# Product Details
  
  **Screen Title:** Product Details
  
  **Components:**
  
  1. **Back Button**
     - Description: Allows users to return to the previous screen.
     - Functionality: Navigates back to the Search Results.
     - Data Source: Navigation history.
  
  2. **Product Images**
     - Description: Displays images of the selected product.
     - Functionality: Users can swipe to view more images.
     - Data Source: Product database.
  
  3. **Product Title**
     - Description: Displays the product's name.
     - Functionality: Provides product identification.
     - Data Source: Product database.
  
  4. **Rating Display**
     - Description: Shows the product's rating.
     - Functionality: Visual representation of customer reviews.
     - Data Source: Reviews database.
  
  5. **Product Description**
     - Description: Provides detailed information about the product.
     - Functionality: Users can read more by clicking a link to expand.
     - Data Source: Product database.
  
  6. **Size Selector**
     - Description: Allows users to select the desired size.
     - Functionality: Updates the selected size for purchase.
     - Data Source: Product inventory.
  
  7. **Color Selector**
     - Description: Enables color selection for the product.
     - Functionality: Updates the product's appearance to show the selected color.
     - Data Source: Product variants database.
  
  8. **Total Price Display**
     - Description: Shows the final price of the selected product.
     - Functionality: Automatically adjusts based on selections.
     - Data Source: Product pricing database.
  
  9. **Add to Cart Button**
     - Description: Adds the selected product to the shopping cart.
     - Functionality: Confirms product selection and redirects to the Cart Screen.
     - Data Source: User shopping cart data.
  
  10. **Favorite Icon**
      - Description: Adds the product to the user's favorite list.
      - Functionality: Toggles favorite status for the product.
      - Data Source: User account preferences.
  
  **Page Flow:**
  - Previous Page: Search Results Screen.
  - Next Page: Cart Screen (after adding to cart).
  
  **Business Logic:**
  - Size and color availability may vary based on inventory.
  - Product price is dynamically calculated based on selected options.
  
  **Additional Notes:**
  - Consider user reviews and ratings integration for enhanced decision-making.
  - Ensure size and color options are clearly visible and updated in real-time.
  `,
      displayedDocumentation: "",
    },
    {
      id: "5",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_5_allows_users_to_review_selected_products_before_checkout_featuring_a_product_list_with_details_quantity_adjusters_delete_option_promo_code_field_cost_summary_and_proceed_to_checkout_button.png",
      description: "Cart",
      parentId: null,
      isExpanded: false,
      generationStatus: "pending",
      fullDocumentation: `# Cart
  
  **Screen Title:** Cart
  
  **Components:**
  
  1. **Back Button**
     - Description: Allows users to return to the previous screen.
     - Functionality: Navigates back to the Product Details Screen.
     - Data Source: Navigation history.
  
  2. **Product List with Details**
     - Description: Displays products added to the cart with details (name, size, price).
     - Functionality: Each item shows basic information, and users can select items for quantity adjustments or removal.
     - Data Source: User's shopping cart.
  
  3. **Quantity Adjusters**
     - Description: Allows users to modify the quantity of each product.
     - Functionality: Increases or decreases the quantity, updating the total price.
     - Data Source: User input.
  
  4. **Delete Option**
     - Description: Allows users to remove a product from the cart.
     - Functionality: Deletes the selected product from the cart.
     - Data Source: User's shopping cart.
  
  5. **Promo Code Field**
     - Description: Input field for entering discount codes.
     - Functionality: Updates the total cost after the promo code is applied.
     - Data Source: Promotions database.
     - Validation Rules: Checks for valid promo codes before applying discounts.
  
  6. **Cost Summary**
     - Description: Displays breakdown of costs (subtotal, delivery fee, discount, total).
     - Functionality: Automatically updates as quantities change or promo codes are applied.
     - Data Source: User's cart and promotions database.
  
  7. **Proceed to Checkout Button**
     - Description: Initiates the checkout process.
     - Functionality: Redirects to the Checkout Screen.
     - Data Source: Navigation actions.
  
  **Page Flow:**
  - Previous Page: Product Details Screen.
  - Next Page: Checkout Screen.
  
  **Business Logic:**
  - Promo code validation rules must be enforced to ensure correct application of discounts.
  - The total cost must dynamically adjust to reflect any changes in cart content or promotional discounts.
  
  **Additional Notes:**
  - Consider adding an option to save the cart for later.
  - Ensure promotional discounts comply with current marketing strategies.
  `,
      displayedDocumentation: "",
    },
    {
      id: "6",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_6_finalizes_shipping_details_before_payment_including_shipping_address_shipping_type_order_list_and_continue_to_payment_button.png",
      description: "Checkout",
      parentId: null,
      isExpanded: false,
      generationStatus: "pending",
      fullDocumentation: `# Checkout
  
  **Screen Title:** Checkout
  
  **Components:**
  
  1. **Back Button**
     - Description: Allows users to return to the previous screen.
     - Functionality: Navigates back to the Cart Screen.
     - Data Source: Navigation history.
  
  2. **Shipping Address**
     - Description: Displays the selected shipping address.
     - Functionality: Users can change the address by selecting the change option.
     - Data Source: User profile and address book.
  
  3. **Shipping Type**
     - Description: Shows the selected shipping method and estimated arrival.
     - Functionality: Users can change the shipping type by selecting the change option.
     - Data Source: Shipping options database.
  
  4. **Order List**
     - Description: Displays a list of products included in the order.
     - Functionality: Provides a summary view of items being purchased.
     - Data Source: User's shopping cart.
  
  5. **Continue to Payment Button**
     - Description: Proceeds to the payment methods screen.
     - Functionality: Initiates the payment process.
     - Data Source: Navigation actions.
  
  **Page Flow:**
  - Previous Page: Cart Screen.
  - Next Page: Payment Methods Screen.
  
  **Business Logic:**
  - Validates shipping address and type selection before proceeding.
  - Updates estimated delivery dates based on the selected shipping type.
  
  **Additional Notes:**
  - Consider offering shipping insurance or gift wrapping options.
  - Ensure that the address and shipping type are verified for accuracy.
  `,
      displayedDocumentation: "",
    },
    {
      id: "7",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_7_allows_selection_of_a_payment_method_for_the_order_featuring_credit_debit_card_option_alternative_payment_methods_and_confirm_payment_button.png",
      description: "Payment Methods",
      parentId: null,
      isExpanded: false,
      generationStatus: "pending",
      fullDocumentation: `# Payment Methods
  
  **Screen Title:** Payment Methods
  
  **Components:**
  
  1. **Back Button**
     - Description: Allows users to return to the previous screen.
     - Functionality: Navigates back to the Checkout Screen.
     - Data Source: Navigation history.
  
  2. **Credit & Debit Card Option**
     - Description: Allows users to add or select a credit/debit card for payment.
     - Functionality: Opens a form to enter card details when "Add Card" is selected.
     - Data Source: User account and payment information.
  
  3. **Alternative Payment Methods**
     - Description: Displays options like PayPal, Apple Pay, and Google Pay.
     - Functionality: Users select a preferred payment method by tapping on the option.
     - Data Source: Linked third-party payment services.
  
  4. **Confirm Payment Button**
     - Description: Finalizes the payment selection and proceeds with the order.
     - Functionality: Confirms the chosen payment method and processes the transaction.
     - Data Source: Payment gateway and user account.
  
  **Page Flow:**
  - Previous Page: Checkout Screen.
  - Next Page: Payment Confirmation Screen.
  
  **Business Logic:**
  - Ensures that a valid payment method is selected before confirmation.
  - Integrates with secure payment gateways for transaction processing.
  
  **Additional Notes:**
  - Consider adding support for more international payment options.
  - Ensure compliance with security standards for payment processing.
  `,
      displayedDocumentation: "",
    },
    {
      id: "8",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_8_confirms_successful_payment_and_provides_post_purchase_options_including_a_success_message_view_order_button_and_view_e_receipt_button.png",
      description: "Payment Confirmation",
      parentId: null,
      isExpanded: false,
      generationStatus: "pending",
      fullDocumentation: `# Payment Confirmation
  
  **Screen Title:** Payment Confirmation
  
  **Components:**
  
  1. **Back Button**
     - Description: Allows users to return to the previous screen.
     - Functionality: Navigates back to the Payment Methods Screen.
     - Data Source: Navigation history.
  
  2. **Success Message**
     - Description: Confirms successful payment.
     - Functionality: Displays a thank you note to the user.
     - Data Source: Transaction confirmation.
  
  3. **View Order Button**
     - Description: Provides access to view order details.
     - Functionality: Redirects to the order details page.
     - Data Source: Order history database.
  
  4. **View E-Receipt Button**
     - Description: Allows users to view the electronic receipt.
     - Functionality: Displays the e-receipt for the completed transaction.
     - Data Source: Transaction records.
  
  **Page Flow:**
  - Previous Page: Payment Methods Screen.
  - Next Page: User can choose to view either the Order Details or E-Receipt as next steps.
  
  **Business Logic:**
  - Generates a confirmation receipt upon successful transaction.
  - Updates order history and sends confirmation to user's email.
  
  **Additional Notes:**
  - Consider providing sharing options for the e-receipt via email or messaging apps.
  - Ensure secure access to order and transaction information.
  `,
      displayedDocumentation: "",
    },
    {
      id: "9",
      image: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=300&h=200",
      description: "Home Screen - Search Modal",
      parentId: "1",
      isExpanded: false,
      generationStatus: "pending",
      fullDocumentation: "Sub-screen documentation for Home Search Modal",
      displayedDocumentation: "",
    },
    {
      id: "10", 
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=300&h=200",
      description: "Product Details - Size Guide",
      parentId: "4",
      isExpanded: false,
      generationStatus: "pending", 
      fullDocumentation: "Sub-screen documentation for Product Size Guide",
      displayedDocumentation: "",
    },
  ]);

  const [selectedScreen, setSelectedScreen] = useState<string>("1");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingScreen, setEditingScreen] = useState<EnhancedScreenItem | null>(
    null
  );
  const [addScreenOpen, setAddScreenOpen] = useState(false);
  const [newScreenImage, setNewScreenImage] = useState<string | null>(null);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
  const [docGenDialogOpen, setDocGenDialogOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string>("");

  // Fix: use proper typing for refs and state
  const typingTimers = useRef<Record<string, NodeJS.Timeout>>({});
  const typingIndices = useRef<Record<string, number>>({});
  const [isTyping, setIsTyping] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initialTypingState: Record<string, boolean> = {};
    screens.forEach((screen) => {
      if (screen.parentId === null && screen.fullDocumentation) {
        initialTypingState[screen.id] = true;
        typingIndices.current[screen.id] = 0;
      }
    });
    setIsTyping(initialTypingState);
  }, []);

  useEffect(() => {
    const mainScreensInOrder = screens
      .filter((screen) => screen.parentId === null)
      .sort((a, b) => {
        if (a.generationStatus === "in-progress") return -1;
        if (b.generationStatus === "in-progress") return 1;
        return 0;
      });

    // Fix: properly clear all timeouts
    Object.values(typingTimers.current).forEach((timer) => clearTimeout(timer));
    typingTimers.current = {};

    mainScreensInOrder
      .filter(
        (screen) =>
          screen.generationStatus === "in-progress" && screen.fullDocumentation
      )
      .forEach((screen) => {
        startTypingForScreen(screen.id);
      });

    return () => {
      // Fix: properly clear all timeouts on unmount
      Object.values(typingTimers.current).forEach((timer) =>
        clearTimeout(timer)
      );
    };
  }, [screens]);

  const startTypingForScreen = (screenId: string) => {
    const screen = screens.find((s) => s.id === screenId);
    if (!screen || !screen.fullDocumentation) return;

    if (typingIndices.current[screenId] === undefined) {
      typingIndices.current[screenId] = 0;
    }

    const typeNextChar = () => {
      const screen = screens.find((s) => s.id === screenId);
      if (!screen || !screen.fullDocumentation) return;

      if (typingIndices.current[screenId] < screen.fullDocumentation.length) {
        setScreens((prevScreens) =>
          prevScreens.map((s) =>
            s.id === screenId
              ? {
                  ...s,
                  displayedDocumentation: (s.fullDocumentation || "").substring(
                    0,
                    typingIndices.current[screenId] + 1
                  ),
                }
              : s
          )
        );

        typingIndices.current[screenId]++;

        // Fix: properly type the timeout
        typingTimers.current[screenId] = setTimeout(typeNextChar, 10);
      } else {
        setIsTyping((prev) => ({ ...prev, [screenId]: false }));
        setScreens((prevScreens) =>
          prevScreens.map((s) =>
            s.id === screenId ? { ...s, generationStatus: "completed" } : s
          )
        );

        const nextPendingScreen = screens.find(
          (s) =>
            s.parentId === null &&
            s.generationStatus === "pending" &&
            s.fullDocumentation
        );

        if (nextPendingScreen) {
          setTimeout(() => {
            setScreens((prevScreens) =>
              prevScreens.map((s) =>
                s.id === nextPendingScreen.id
                  ? { ...s, generationStatus: "in-progress" }
                  : s
              )
            );
            startTypingForScreen(nextPendingScreen.id);
          }, 500);
        }
      }
    };

    setIsTyping((prev) => ({ ...prev, [screenId]: true }));
    // Fix: properly type the timeout
    typingTimers.current[screenId] = setTimeout(typeNextChar, 10);
  };

  const getGenerationBadge = (screen: EnhancedScreenItem) => {
    if (!screen.generationStatus) return null;

    switch (screen.generationStatus) {
      case "in-progress":
        return (
          <Badge variant="secondary" className="ml-2 animate-pulse">
            In Progress
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="default" className="ml-2">
            Completed
          </Badge>
        );
      default:
        return null;
    }
  };

  const toggleExpand = (id: string) => {
    setScreens(
      screens.map((screen) =>
        screen.id === id
          ? { ...screen, isExpanded: !screen.isExpanded }
          : screen
      )
    );
  };

  const handleEditClick = (screen: EnhancedScreenItem) => {
    setEditingScreen(screen);
    setEditDialogOpen(true);
  };

  const handleSaveDescription = () => {
    if (editingScreen) {
      setScreens(
        screens.map((screen) =>
          screen.id === editingScreen.id
            ? { ...screen, description: editingScreen.description }
            : screen
        )
      );
      setEditDialogOpen(false);
    }
  };

  const handleAddScreen = () => {
    setNewScreenImage(
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=200"
    );
    setAddScreenOpen(false);
    setShowGenerateButton(true);

    const newScreen: EnhancedScreenItem = {
      id: (screens.length + 1).toString(),
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=300&h=200",
      description: "New Screen",
      parentId: null,
      isExpanded: false,
      generationStatus: "pending",
      fullDocumentation:
        "# New Screen\n\n## Purpose\nDescribe the main purpose of this screen.\n\n## Components\n- List main UI components\n- Describe their functionality\n\n## User Flow\n1. Describe how users interact with this screen\n2. What actions can they take?\n3. What are the outcomes?",
    };

    setScreens([...screens, newScreen]);
    setSelectedScreen(newScreen.id);
  };

  const handleGenerateDocumentation = () => {
    const screen = screens.find((s) => s.id === selectedScreen);
    if (!screen) return;

    setScreens((prevScreens) =>
      prevScreens.map((s) =>
        s.id === selectedScreen ? { ...s, generationStatus: "in-progress" } : s
      )
    );

    typingIndices.current[selectedScreen] = 0;
    startTypingForScreen(selectedScreen);
    setShowGenerateButton(false);
  };

  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl);
    setLightboxOpen(true);
  };

  const mainScreens = screens.filter((screen) => !screen.parentId);

  const getScreenDocumentation = (screenId: string) => {
    const screen = screens.find((s) => s.id === screenId);
    if (!screen) return "No documentation available for this screen.";

    if (screen.displayedDocumentation !== undefined) {
      return screen.displayedDocumentation;
    }

    return (
      screen.fullDocumentation || "No documentation available for this screen."
    );
  };

  return (
    <div className="container mx-auto py-8 max-w-7xl">
      <StepperProgress />

      <h1 className="text-2xl font-semibold mb-2">Screen Documentation</h1>
      <p className="text-muted-foreground mb-8">
        This page provides detailed documentation for each screen in your
        application.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">UI Screens</h2>
            <Button
              onClick={() => setAddScreenOpen(true)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Main Screen
            </Button>
          </div>

          <div className="space-y-4 overflow-auto max-h-[70vh]">
            {mainScreens.map((screen) => (
              <div
                key={screen.id}
                className="border rounded-lg overflow-hidden"
              >
                <div
                  className={`p-4 ${
                    selectedScreen === screen.id ? "bg-muted" : "bg-background"
                  }`}
                  onClick={() => setSelectedScreen(screen.id)}
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={screen.image}
                      alt={`Screen ${screen.id}`}
                      className="w-40 h-[8rem] object-contain rounded border cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLightbox(screen.image);
                      }}
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {screens.some((s) => s.parentId === screen.id) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleExpand(screen.id);
                              }}
                              className="p-1"
                            >
                              {screen.isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                          )}
                          <span>{screen.description}</span>
                          {getGenerationBadge(screen)}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditClick(screen);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Delete functionality would go here
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {screen.isExpanded && (
                  <div className="border-t">
                    {screens
                      .filter((s) => s.parentId === screen.id)
                      .map((subScreen) => (
                        <div
                          key={subScreen.id}
                          className={`p-4 border-b last:border-b-0 bg-blue-50 ${
                            selectedScreen === subScreen.id
                              ? "bg-blue-100"
                              : ""
                          }`}
                          style={{ marginLeft: "12px" }}
                          onClick={() => setSelectedScreen(subScreen.id)}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">subscreen</span>
                          </div>
                          <div className="flex items-start gap-4">
                            <img
                              src={subScreen.image}
                              alt={`Screen ${subScreen.id}`}
                              className="w-40 h-[8rem] object-contain rounded border cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                openLightbox(subScreen.image);
                              }}
                            />

                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className="mt-1 text-sm">
                                  {subScreen.description}
                                </p>

                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditClick(subScreen);
                                    }}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-destructive hover:text-destructive"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Delete functionality would go here
                                    }}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-medium mb-4">Screen Documentation</h2>

          {showGenerateButton && selectedScreen ? (
            <div className="border rounded-lg p-12 text-center">
              <Button onClick={handleGenerateDocumentation} className="px-8">
                Generate Screen Documentation
              </Button>
            </div>
          ) : (
            <Textarea
              className="w-full h-[70vh] font-mono text-sm"
              value={getScreenDocumentation(selectedScreen)}
              onChange={(e) => {
                const screen = screens.find((s) => s.id === selectedScreen);
                if (screen && !isTyping[screen.id]) {
                  setScreens((prevScreens) =>
                    prevScreens.map((s) =>
                      s.id === selectedScreen
                        ? {
                            ...s,
                            fullDocumentation: e.target.value,
                            displayedDocumentation: e.target.value,
                          }
                        : s
                    )
                  );
                }
              }}
              readOnly={
                selectedScreen ? isTyping[selectedScreen] || false : false
              }
            />
          )}
        </div>
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Screen Description</DialogTitle>
          </DialogHeader>

          {editingScreen && (
            <div className="space-y-4 py-4">
              <div className="flex justify-center mb-4">
                <img
                  src={editingScreen.image}
                  alt="Screen preview"
                  className="w-64 h-[13rem] object-contain rounded border cursor-pointer"
                  onClick={() => openLightbox(editingScreen.image)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingScreen.description}
                  onChange={(e) =>
                    setEditingScreen({
                      ...editingScreen,
                      description: e.target.value,
                    })
                  }
                  className="min-h-[100px]"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveDescription}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={addScreenOpen} onOpenChange={setAddScreenOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Main Screen</SheetTitle>
          </SheetHeader>

          <div className="py-6 space-y-4">
            <div className="border border-dashed rounded-lg p-10 text-center">
              <div className="flex flex-col items-center gap-4">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Drag & drop an image, or click to browse
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="screen-upload"
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById("screen-upload")?.click()
                  }
                >
                  Select Image
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="screen-description">Screen Description</Label>
              <Textarea
                id="screen-description"
                placeholder="Enter a brief description of this screen..."
                className="min-h-[100px]"
              />
            </div>
          </div>

          <SheetFooter>
            <Button variant="outline" onClick={() => setAddScreenOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddScreen}>Add Screen</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <DocumentGenerationDialog
        open={docGenDialogOpen}
        onOpenChange={setDocGenDialogOpen}
      />

      <Lightbox
        image={lightboxImage}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      <div className="mt-8">
        <FeedbackWidget feedbackType="screen documentation" />
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => navigate("/app-flow")}>
          Back to App Flow
        </Button>
        <Button onClick={() => setDocGenDialogOpen(true)}>Finish</Button>
      </div>
    </div>
  );
}
