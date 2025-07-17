
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { UserStory } from "./types";

export function useUserStories() {
  const { toast } = useToast();
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<UserStory | null>(null);
  const [isNewStoryDialogOpen, setIsNewStoryDialogOpen] = useState(false);

  // Initial stories data
  const [stories, setStories] = useState<UserStory[]>([
    {
      id: "1",
      title: "Implement location selector on home screen",
      status: "todo",
      description:
        "As a user, I want to select my location on the home screen so that I can see products and deals relevant to my area.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User selects a location from the dropdown\n" +
        "Given: The user is on the home screen\n" +
        "When: The user taps on the location selector and chooses 'New York, USA' from the dropdown menu\n" +
        "Then: The location selector displays 'New York, USA' and the product listings are updated to show items available in that location\n\n" +
        "Scenario 2: User allows automatic location detection\n" +
        "Given: The user is on the home screen with location services enabled on their device\n" +
        "When: The user taps on 'Use my current location' option\n" +
        "Then: The app detects the user's location, updates the location selector display, and refreshes product listings accordingly\n\n" +
        "Scenario 3: User attempts to browse without selecting a location\n" +
        "Given: The user is on the home screen with no location selected\n" +
        "When: The user attempts to browse products or categories\n" +
        "Then: The app prompts the user to select a location before proceeding",
      checklist: [
        {
          id: "1",
          text: "Location selector is prominently displayed on the home screen",
          checked: false,
        },
        {
          id: "2",
          text: "Users can manually select from a list of supported locations",
          checked: false,
        },
        {
          id: "3",
          text: "Current location detection works when permitted by the user",
          checked: false,
        },
        {
          id: "4",
          text: "Selected location is saved for future sessions",
          checked: false,
        },
        {
          id: "5",
          text: "Products and promotions are filtered based on the selected location",
          checked: false,
        },
      ],
    },
    {
      id: "2",
      title: "Create home screen search functionality",
      status: "todo",
      description:
        "As a user, I want to search for products directly from the home screen so that I can quickly find items I'm interested in.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User searches for a product\n" +
        "Given: The user is on the home screen\n" +
        "When: The user taps on the search bar, enters 'brown jacket', and submits the search\n" +
        "Then: The app navigates to the search results screen displaying products matching 'brown jacket'\n\n" +
        "Scenario 2: User taps on search bar without entering text\n" +
        "Given: The user is on the home screen\n" +
        "When: The user taps on the search bar but doesn't enter any text\n" +
        "Then: The app navigates to the search screen showing recent searches if available\n\n" +
        "Scenario 3: User enters invalid search characters\n" +
        "Given: The user is on the home screen\n" +
        "When: The user enters special characters or excessive text in the search bar\n" +
        "Then: The app validates the input and displays an appropriate message if the search criteria is invalid",
      checklist: [
        {
          id: "1",
          text: "Search bar is clearly visible and accessible on the home screen",
          checked: false,
        },
        {
          id: "2",
          text: "Users can enter search terms using the device keyboard",
          checked: false,
        },
        {
          id: "3",
          text: "Search functionality responds quickly to user input",
          checked: false,
        },
        {
          id: "4",
          text: "Search terms are validated before submission",
          checked: false,
        },
        {
          id: "5",
          text: "Search initiates navigation to the appropriate results screen",
          checked: false,
        },
      ],
    },
    {
      id: "3",
      title: "Display product categories on home screen",
      status: "todo",
      description:
        "As a user, I want to see different product categories on the home screen so that I can browse products by category.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views available categories\n" +
        "Given: The user is on the home screen\n" +
        "When: The app loads completely\n" +
        "Then: All available product categories are displayed as clickable icons with labels\n\n" +
        "Scenario 2: User selects a category\n" +
        "Given: The user is on the home screen with categories displayed\n" +
        "When: The user taps on a specific category icon\n" +
        "Then: The app navigates to a screen displaying products from that category\n\n" +
        "Scenario 3: Categories update based on availability\n" +
        "Given: The user has selected a specific location\n" +
        "When: The home screen loads\n" +
        "Then: Only categories available in the selected location are displayed, with region-specific categories highlighted if applicable",
      checklist: [
        {
          id: "1",
          text: "Categories are displayed as visually distinct, tappable elements",
          checked: false,
        },
        {
          id: "2",
          text: "Each category has an appropriate icon and clear label",
          checked: false,
        },
        {
          id: "3",
          text: "Categories are arranged in a user-friendly, scrollable layout",
          checked: false,
        },
        {
          id: "4",
          text: "Categories dynamically update based on location and availability",
          checked: false,
        },
        {
          id: "5",
          text: "Tapping a category navigates to the appropriate product listing",
          checked: false,
        },
      ],
    },
    {
      id: "4",
      title: "Create promotional banner section",
      status: "todo",
      description:
        "As a user, I want to see promotional offers on the home screen so that I can quickly access current deals and discounts.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views promotional banners\n" +
        "Given: The user is on the home screen\n" +
        "When: The app loads completely\n" +
        "Then: The promotional banner section displays current offers with images and text\n\n" +
        "Scenario 2: User interacts with a promotional banner\n" +
        "Given: The user is viewing the promotional banner section\n" +
        "When: The user taps on a specific promotional banner\n" +
        "Then: The app navigates to a detailed page about that promotion or directly to the promoted products\n\n" +
        "Scenario 3: Promotional banners auto-rotate\n" +
        "Given: The user is on the home screen viewing the promotional banner section\n" +
        "When: The user remains on the screen for a defined time period\n" +
        "Then: The banners automatically rotate to display different promotions at regular intervals",
      checklist: [
        {
          id: "1",
          text: "Promotional banners are prominently displayed on the home screen",
          checked: false,
        },
        {
          id: "2",
          text: "Banners include compelling visuals and concise text describing the offer",
          checked: false,
        },
        {
          id: "3",
          text: "Multiple promotions can be viewed through manual swiping or automatic rotation",
          checked: false,
        },
        {
          id: "4",
          text: "Banners are interactive and lead to relevant promotion details",
          checked: false,
        },
        {
          id: "5",
          text: "Content is updated regularly to reflect current marketing campaigns",
          checked: false,
        },
      ],
    },
    {
      id: "5",
      title: "Implement recent searches functionality",
      status: "todo",
      description:
        "As a user, I want to see my recent searches when I access the search screen so that I can easily repeat previous searches.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views recent searches\n" +
        "Given: The user has previously searched for products\n" +
        "When: The user accesses the search screen\n" +
        "Then: A list of recent searches is displayed in chronological order (newest first)\n\n" +
        "Scenario 2: User selects a recent search\n" +
        "Given: The user is on the search screen with recent searches displayed\n" +
        "When: The user taps on a recent search entry\n" +
        "Then: The search is executed with that term and results are displayed\n\n" +
        "Scenario 3: User with no search history\n" +
        "Given: The user has no previous search history or is a new user\n" +
        "When: The user accesses the search screen\n" +
        "Then: No recent searches are displayed and an appropriate message is shown",
      checklist: [
        {
          id: "1",
          text: "Recent searches are stored locally on the device",
          checked: false,
        },
        {
          id: "2",
          text: "Recent searches display in reverse chronological order",
          checked: false,
        },
        {
          id: "3",
          text: "Each search entry is clickable to repeat the search",
          checked: false,
        },
        {
          id: "4",
          text: "Duplicate searches are handled by moving the term to the top of the list",
          checked: false,
        },
        {
          id: "5",
          text: "Search history persists between app sessions unless cleared",
          checked: false,
        },
      ],
    },
    {
      id: "6",
      title: "Add clear search history option",
      status: "todo",
      description:
        "As a user, I want to clear my search history with a single action so that I can maintain my privacy and remove unwanted entries.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User clears all search history\n" +
        "Given: The user is on the search screen with recent searches displayed\n" +
        "When: The user taps on the 'Clear All' option\n" +
        "Then: A confirmation dialog appears, and upon confirmation, all recent searches are removed\n\n" +
        "Scenario 2: User removes a single search entry\n" +
        "Given: The user is on the search screen with recent searches displayed\n" +
        "When: The user taps the 'X' icon next to a specific search entry\n" +
        "Then: That specific search entry is removed from the list\n\n" +
        "Scenario 3: User cancels clearing search history\n" +
        "Given: The user has tapped the 'Clear All' option and a confirmation dialog is displayed\n" +
        "When: The user selects 'Cancel' or dismisses the dialog\n" +
        "Then: The confirmation dialog closes and the recent searches remain unchanged",
      checklist: [
        {
          id: "1",
          text: "'Clear All' option is clearly visible when recent searches are displayed",
          checked: false,
        },
        {
          id: "2",
          text: "Individual search entries have a removal option (X icon)",
          checked: false,
        },
        {
          id: "3",
          text: "Confirmation is required before clearing all search history",
          checked: false,
        },
        {
          id: "4",
          text: "Clearing search history is immediate and visible to the user",
          checked: false,
        },
        {
          id: "5",
          text: "After clearing, the search screen updates to reflect the empty state",
          checked: false,
        },
      ],
    },
    {
      id: "7",
      title: "Develop search results display",
      status: "todo",
      description:
        "As a user, I want to see relevant product listings after performing a search so that I can find what I'm looking for.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views search results\n" +
        "Given: The user has performed a search with the term 'brown jacket'\n" +
        "When: The search results screen loads\n" +
        "Then: Products matching 'brown jacket' are displayed in a grid or list format with product images, names, and prices\n\n" +
        "Scenario 2: User encounters no search results\n" +
        "Given: The user has performed a search with terms that match no products\n" +
        "When: The search results screen loads\n" +
        "Then: A 'No results found' message is displayed with suggestions for alternative searches\n\n" +
        "Scenario 3: User scrolls through multiple search results\n" +
        "Given: The user's search has returned many product matches\n" +
        "When: The user scrolls down the search results list\n" +
        "Then: Additional results load seamlessly (pagination) as the user reaches the bottom of the current results",
      checklist: [
        {
          id: "1",
          text: "Search results display relevant products with clear images and information",
          checked: false,
        },
        {
          id: "2",
          text: "Results are organized in an easy-to-scan grid or list layout",
          checked: false,
        },
        {
          id: "3",
          text: "The number of results found is clearly displayed",
          checked: false,
        },
        {
          id: "4",
          text: "Empty search results provide helpful guidance",
          checked: false,
        },
        {
          id: "5",
          text: "Large result sets load efficiently through pagination or infinite scrolling",
          checked: false,
        },
      ],
    },
    {
      id: "8",
      title: "Add search filtering options",
      status: "todo",
      description:
        "As a user, I want to filter and sort search results by various criteria so that I can narrow down products to my preferences.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User filters search results\n" +
        "Given: The user is viewing search results\n" +
        "When: The user taps on filter options and selects criteria (e.g., 'Sort by Newest')\n" +
        "Then: The search results update to display products matching the selected filters\n\n" +
        "Scenario 2: User applies multiple filters\n" +
        "Given: The user is viewing search results with filtering options available\n" +
        "When: The user selects multiple filter criteria (e.g., price range and color)\n" +
        "Then: The search results update to show only products matching all selected filter criteria\n\n" +
        "Scenario 3: User clears applied filters\n" +
        "Given: The user is viewing filtered search results\n" +
        "When: The user taps on a 'Clear Filters' or 'Reset' option\n" +
        "Then: All filters are removed and the original search results are displayed",
      checklist: [
        {
          id: "1",
          text: "Filter options are accessible from the search results screen",
          checked: false,
        },
        {
          id: "2",
          text: "Multiple filtering criteria are available (e.g., price, rating, color, size)",
          checked: false,
        },
        {
          id: "3",
          text: "Applied filters are visibly indicated to the user",
          checked: false,
        },
        {
          id: "4",
          text: "Results update immediately when filters are applied or removed",
          checked: false,
        },
        {
          id: "5",
          text: "Filter state persists during the current search session",
          checked: false,
        },
      ],
    },
    {
      id: "9",
      title: "Create product details page",
      status: "todo",
      description:
        "As a user, I want to view detailed information about a product so that I can make an informed purchase decision.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views complete product information\n" +
        "Given: The user has selected a product from search results\n" +
        "When: The product details page loads\n" +
        "Then: Complete product information is displayed including images, title, price, description, rating, and customization options\n\n" +
        "Scenario 2: User views multiple product images\n" +
        "Given: The user is on the product details page of a product with multiple images\n" +
        "When: The user swipes on the product image area\n" +
        "Then: Different images of the product are displayed in sequence\n\n" +
        "Scenario 3: User reads full product description\n" +
        "Given: The user is on the product details page with a truncated description\n" +
        "When: The user taps on 'Read More' or a similar option\n" +
        "Then: The complete product description expands for full viewing",
      checklist: [
        {
          id: "1",
          text: "Product details page includes high-quality images that can be enlarged",
          checked: false,
        },
        {
          id: "2",
          text: "Complete product information is organized in a user-friendly layout",
          checked: false,
        },
        {
          id: "3",
          text: "Product ratings and reviews are accessible from the details page",
          checked: false,
        },
        {
          id: "4",
          text: "Product customization options (size, color) are clearly presented",
          checked: false,
        },
        {
          id: "5",
          text: "Add to cart functionality is prominently placed on the page",
          checked: false,
        },
      ],
    },
    {
      id: "10",
      title: "Implement size selection functionality",
      status: "todo",
      description:
        "As a user, I want to select my preferred size when viewing product details so that I can order the correct product variant.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User selects an available size\n" +
        "Given: The user is on the product details page\n" +
        "When: The user taps on an available size option (e.g., 'M' for medium)\n" +
        "Then: The selected size is visually highlighted and saved as part of the product selection\n\n" +
        "Scenario 2: User attempts to select an out-of-stock size\n" +
        "Given: The user is on the product details page\n" +
        "When: The user taps on a size option that is out of stock\n" +
        "Then: The app indicates that the size is unavailable and prevents selection\n\n" +
        "Scenario 3: User proceeds without selecting a size\n" +
        "Given: The user is on the product details page and has not selected a size\n" +
        "When: The user attempts to add the product to cart\n" +
        "Then: The app displays a notification prompting the user to select a size before proceeding",
      checklist: [
        {
          id: "1",
          text: "Size options are clearly displayed on the product details page",
          checked: false,
        },
        {
          id: "2",
          text: "Available sizes are visually distinct from out-of-stock sizes",
          checked: false,
        },
        {
          id: "3",
          text: "Selected size is clearly indicated to the user",
          checked: false,
        },
        {
          id: "4",
          text: "Size selection is required before adding to cart",
          checked: false,
        },
        {
          id: "5",
          text: "Size availability updates in real-time based on inventory",
          checked: false,
        },
      ],
    },
    {
      id: "11",
      title: "Implement color selection functionality",
      status: "todo",
      description:
        "As a user, I want to select my preferred color when viewing product details so that I can order the correct product variant.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User selects an available color\n" +
        "Given: The user is on the product details page\n" +
        "When: The user taps on an available color option\n" +
        "Then: The selected color is visually highlighted, the product image updates to show that color variant, and the selection is saved\n\n" +
        "Scenario 2: User attempts to select an out-of-stock color\n" +
        "Given: The user is on the product details page\n" +
        "When: The user taps on a color option that is out of stock\n" +
        "Then: The app indicates that the color is unavailable and prevents selection\n\n" +
        "Scenario 3: User changes color after selecting size\n" +
        "Given: The user has already selected a size for a product\n" +
        "When: The user selects a different color variant\n" +
        "Then: The app checks if the selected size is available in the new color and provides appropriate feedback",
      checklist: [
        {
          id: "1",
          text: "Color options are visually represented (color swatches) on the product details page",
          checked: false,
        },
        {
          id: "2",
          text: "Available colors are visually distinct from out-of-stock colors",
          checked: false,
        },
        {
          id: "3",
          text: "Selected color is clearly indicated to the user",
          checked: false,
        },
        {
          id: "4",
          text: "Product images update to reflect the selected color",
          checked: false,
        },
        {
          id: "5",
          text: "Color selection is required before adding to cart",
          checked: false,
        },
      ],
    },
    {
      id: "12",
      title: 'Add "Add to Cart" functionality',
      status: "todo",
      description:
        "As a user, I want to add products to my shopping cart so that I can purchase multiple items in a single transaction.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User adds a product to cart\n" +
        "Given: The user is on the product details page and has selected required options (size, color)\n" +
        "When: The user taps the 'Add to Cart' button\n" +
        "Then: The product is added to the cart, a confirmation message appears, and the cart icon updates to show the item count\n\n" +
        "Scenario 2: User adds the same product again\n" +
        "Given: The user has already added a specific product to the cart\n" +
        "When: The user adds the same product with identical options again\n" +
        "Then: The quantity of that product in the cart increases rather than adding a duplicate entry\n\n" +
        "Scenario 3: User adds a product with different options\n" +
        "Given: The user has a product in the cart\n" +
        "When: The user adds the same product but with different options (e.g., different size or color)\n" +
        "Then: A new cart entry is created for the product with the different options",
      checklist: [
        {
          id: "1",
          text: "'Add to Cart' button is prominently displayed on the product details page",
          checked: false,
        },
        {
          id: "2",
          text: "User receives clear feedback when a product is added successfully",
          checked: false,
        },
        {
          id: "3",
          text: "Cart icon updates to reflect the current number of items",
          checked: false,
        },
        {
          id: "4",
          text: "Required product options must be selected before adding to cart",
          checked: false,
        },
        {
          id: "5",
          text: "System correctly handles duplicate products and varying options",
          checked: false,
        },
      ],
    },
    {
      id: "13",
      title: "Create shopping cart review screen",
      status: "todo",
      description:
        "As a user, I want to review all items in my cart before checkout so that I can confirm my selections before purchasing.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views all items in cart\n" +
        "Given: The user has added multiple products to the cart\n" +
        "When: The user navigates to the cart screen\n" +
        "Then: All cart items are displayed with images, names, selected options, quantities, and individual prices\n\n" +
        "Scenario 2: User views empty cart\n" +
        "Given: The user has no items in the cart\n" +
        "When: The user navigates to the cart screen\n" +
        "Then: An empty cart message is displayed with a suggestion to continue shopping\n\n" +
        "Scenario 3: User views cart total calculation\n" +
        "Given: The user has items in the cart\n" +
        "When: The user navigates to the cart screen\n" +
        "Then: A cost summary is displayed showing subtotal, any fees, discounts, and the final total",
      checklist: [
        {
          id: "1",
          text: "Cart screen displays all added items with complete information",
          checked: false,
        },
        {
          id: "2",
          text: "Products are presented with images and selected options (size, color)",
          checked: false,
        },
        {
          id: "3",
          text: "Individual and total costs are clearly displayed",
          checked: false,
        },
        {
          id: "4",
          text: "Empty cart state provides clear guidance",
          checked: false,
        },
        {
          id: "5",
          text: "'Proceed to Checkout' button is available when cart contains items",
          checked: false,
        },
      ],
    },
    {
      id: "14",
      title: "Implement quantity adjustment in cart",
      status: "todo",
      description:
        "As a user, I want to adjust the quantity of items in my cart so that I can purchase the desired amount of each product.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User increases item quantity\n" +
        "Given: The user is viewing the cart with at least one item\n" +
        "When: The user taps the '+' button next to an item\n" +
        "Then: The quantity for that item increases by one, and the cart total updates accordingly\n\n" +
        "Scenario 2: User decreases item quantity\n" +
        "Given: The user is viewing the cart with an item that has quantity greater than one\n" +
        "When: The user taps the '-' button next to the item\n" +
        "Then: The quantity for that item decreases by one, and the cart total updates accordingly\n\n" +
        "Scenario 3: User attempts to decrease quantity below one\n" +
        "Given: The user is viewing the cart with an item that has quantity of one\n" +
        "When: The user taps the '-' button next to the item\n" +
        "Then: The app asks for confirmation to remove the item completely from the cart",
      checklist: [
        {
          id: "1",
          text: "Quantity adjustment controls (+ and -) are available for each cart item",
          checked: false,
        },
        {
          id: "2",
          text: "Quantity changes immediately update the item's subtotal and cart total",
          checked: false,
        },
        {
          id: "3",
          text: "Minimum quantity is one (further reduction requires item removal)",
          checked: false,
        },
        {
          id: "4",
          text: "Maximum quantity is limited by product availability",
          checked: false,
        },
        {
          id: "5",
          text: "Visual feedback is provided when adjustments are made",
          checked: false,
        },
      ],
    },
    {
      id: "15",
      title: "Add remove item functionality in cart",
      status: "todo",
      description:
        "As a user, I want to remove unwanted items from my cart so that I only purchase what I need.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User removes an item from cart\n" +
        "Given: The user is viewing the cart with at least one item\n" +
        "When: The user taps the delete/remove icon next to an item\n" +
        "Then: A confirmation prompt appears, and upon confirmation, the item is removed from the cart and totals are updated\n\n" +
        "Scenario 2: User cancels item removal\n" +
        "Given: The user has tapped the delete/remove icon and a confirmation prompt is displayed\n" +
        "When: The user selects 'Cancel' or dismisses the prompt\n" +
        "Then: The item remains in the cart unchanged\n\n" +
        "Scenario 3: User removes the last item from cart\n" +
        "Given: The user is viewing the cart with only one item\n" +
        "When: The user removes that item\n" +
        "Then: The cart becomes empty, the empty cart message is displayed, and the checkout option is disabled",
      checklist: [
        {
          id: "1",
          text: "Each cart item has a clearly visible remove/delete option",
          checked: false,
        },
        {
          id: "2",
          text: "Confirmation is required before removing an item",
          checked: false,
        },
        {
          id: "3",
          text: "Cart totals immediately update after item removal",
          checked: false,
        },
        {
          id: "4",
          text: "Empty cart state is properly displayed after removing all items",
          checked: false,
        },
        {
          id: "5",
          text: "Removed items can be re-added through normal product selection",
          checked: false,
        },
      ],
    },
    {
      id: "16",
      title: "Implement promo code functionality",
      status: "todo",
      description:
        "As a user, I want to apply promo codes to my order so that I can receive available discounts.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User applies a valid promo code\n" +
        "Given: The user is on the cart screen with items in the cart\n" +
        "When: The user enters a valid promo code and taps 'Apply'\n" +
        "Then: The discount is applied, visibly reflected in the cart total, and a success message is displayed\n\n" +
        "Scenario 2: User enters an invalid promo code\n" +
        "Given: The user is on the cart screen with items in the cart\n" +
        "When: The user enters an invalid or expired promo code and taps 'Apply'\n" +
        "Then: An error message is displayed explaining why the code cannot be applied\n\n" +
        "Scenario 3: User removes a previously applied promo code\n" +
        "Given: The user has previously applied a valid promo code to the cart\n" +
        "When: The user taps on a 'Remove' option next to the applied code\n" +
        "Then: The discount is removed, the cart total is recalculated, and the promo code field is cleared",
      checklist: [
        {
          id: "1",
          text: "Promo code input field is clearly visible on the cart screen",
          checked: false,
        },
        {
          id: "2",
          text: "Applied discounts are itemized in the cost summary",
          checked: false,
        },
        {
          id: "3",
          text: "Error messages for invalid codes are specific and helpful",
          checked: false,
        },
        {
          id: "4",
          text: "Users can remove applied promo codes",
          checked: false,
        },
        {
          id: "5",
          text: "Only one promo code can be applied at a time unless otherwise specified",
          checked: false,
        },
      ],
    },
    {
      id: "17",
      title: "Create checkout shipping details screen",
      status: "todo",
      description:
        "As a user, I want to enter or select my shipping address during checkout so that my order is delivered to the correct location.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User selects an existing shipping address\n" +
        "Given: The user has proceeded to checkout and has saved addresses\n" +
        "When: The user selects one of their saved addresses\n" +
        "Then: The selected address is highlighted and set as the shipping destination\n\n" +
        "Scenario 2: User adds a new shipping address\n" +
        "Given: The user is on the checkout shipping details screen\n" +
        "When: The user selects 'Add New Address' and completes the address form\n" +
        "Then: The new address is saved, selected for the current order, and added to the user's address book\n\n" +
        "Scenario 3: User attempts to proceed with incomplete address\n" +
        "Given: The user is on the checkout shipping details screen\n" +
        "When: The user attempts to proceed without selecting or completing a valid shipping address\n" +
        "Then: The app displays validation errors and prevents progression until a valid address is provided",
      checklist: [
        {
          id: "1",
          text: "Users can select from previously saved addresses",
          checked: false,
        },
        {
          id: "2",
          text: "Interface for adding new addresses is intuitive and validates input",
          checked: false,
        },
        {
          id: "3",
          text: "Required address fields are clearly marked",
          checked: false,
        },
        {
          id: "4",
          text: "Address validation checks for completeness and format",
          checked: false,
        },
        {
          id: "5",
          text: "Selected address is clearly indicated and confirmed before proceeding",
          checked: false,
        },
      ],
    },
    {
      id: "18",
      title: "Implement shipping method selection",
      status: "todo",
      description:
        "As a user, I want to select from different shipping methods so that I can choose between speed and cost based on my preferences.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User selects a shipping method\n" +
        "Given: The user is on the checkout screen with shipping address entered\n" +
        "When: The user selects a shipping method (e.g., 'Economy', 'Express')\n" +
        "Then: The selected method is highlighted, the delivery time estimate is displayed, and the order total updates to include shipping costs\n\n" +
        "Scenario 2: User changes shipping method\n" +
        "Given: The user has already selected a shipping method\n" +
        "When: The user selects a different shipping method\n" +
        "Then: The new method is highlighted, delivery estimates update, and the order total recalculates with the new shipping cost\n\n" +
        "Scenario 3: User views shipping method availability\n" +
        "Given: The user is on the checkout screen with a remote shipping address\n" +
        "When: The shipping methods section loads\n" +
        "Then: Only shipping methods available for the selected address are displayed, with unavailable methods hidden or disabled",
      checklist: [
        {
          id: "1",
          text: "Available shipping methods are clearly displayed with costs and delivery estimates",
          checked: false,
        },
        {
          id: "2",
          text: "Selected shipping method is visually highlighted",
          checked: false,
        },
        {
          id: "3",
          text: "Order total updates to reflect shipping costs",
          checked: false,
        },
        {
          id: "4",
          text: "Shipping method availability is determined by the shipping address",
          checked: false,
        },
        {
          id: "5",
          text: "Default shipping method is pre-selected based on user preferences or most economical option",
          checked: false,
        },
      ],
    },
    {
      id: "19",
      title: "Create payment methods screen",
      status: "todo",
      description:
        "As a user, I want to select from various payment methods so that I can pay using my preferred option.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views available payment options\n" +
        "Given: The user has proceeded to the payment methods screen\n" +
        "When: The screen loads\n" +
        "Then: All available payment methods are displayed, including credit/debit cards and alternative payment options\n\n" +
        "Scenario 2: User selects a payment method\n" +
        "Given: The user is on the payment methods screen\n" +
        "When: The user selects a specific payment method\n" +
        "Then: The selected method is highlighted and set as the payment option for the current order\n\n" +
        "Scenario 3: User attempts to proceed without selecting a payment method\n" +
        "Given: The user is on the payment methods screen\n" +
        "When: The user attempts to proceed without selecting a payment method\n" +
        "Then: The app displays an error message and prevents progression until a payment method is selected",
      checklist: [
        {
          id: "1",
          text: "All supported payment methods are clearly displayed",
          checked: false,
        },
        {
          id: "2",
          text: "Selected payment method is visually highlighted",
          checked: false,
        },
        {
          id: "3",
          text: "Payment method selection is required to proceed",
          checked: false,
        },
        {
          id: "4",
          text: "Previously used payment methods are displayed first (if applicable)",
          checked: false,
        },
        {
          id: "5",
          text: "Interface adapts to show appropriate input fields based on selected payment type",
          checked: false,
        },
      ],
    },
    {
      id: "20",
      title: "Implement credit/debit card payment option",
      status: "todo",
      description:
        "As a user, I want to add and use my credit or debit card for payment so that I can complete my purchase securely.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User adds a new credit/debit card\n" +
        "Given: The user is on the payment methods screen and selects 'Add Card'\n" +
        "When: The user enters valid card details (number, expiry date, CVV, name) and submits\n" +
        "Then: The card is securely saved, masked except for the last four digits, and selected as the payment method\n\n" +
        "Scenario 2: User selects a previously saved card\n" +
        "Given: The user has previously saved card information\n" +
        "When: The user selects one of their saved cards on the payment methods screen\n" +
        "Then: The selected card is highlighted and set as the payment option for the current order\n\n" +
        "Scenario 3: User enters invalid card information\n" +
        "Given: The user is adding a new card on the payment methods screen\n" +
        "When: The user enters invalid card details (e.g., expired date, incorrect format)\n" +
        "Then: The app displays specific validation errors and prevents the card from being added until corrected",
      checklist: [
        {
          id: "1",
          text: "Card input form includes fields for all required information",
          checked: false,
        },
        {
          id: "2",
          text: "Card details are validated for format and basic validity",
          checked: false,
        },
        {
          id: "3",
          text: "Card information is transmitted and stored securely",
          checked: false,
        },
        {
          id: "4",
          text: "Card numbers are masked for security (showing only last 4 digits)",
          checked: false,
        },
        {
          id: "5",
          text: "Users can manage (add/edit/delete) saved cards",
          checked: false,
        },
      ],
    },
    {
      id: "21",
      title: "Add alternative payment methods",
      status: "todo",
      description:
        "As a user, I want to use alternative payment methods like PayPal or Apple Pay so that I have flexibility in how I pay.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User selects PayPal payment\n" +
        "Given: The user is on the payment methods screen\n" +
        "When: The user selects the PayPal option\n" +
        "Then: The user is redirected to authenticate with PayPal, and upon successful authentication, returns to the app with PayPal selected as the payment method\n\n" +
        "Scenario 2: User selects Apple Pay (on iOS)\n" +
        "Given: The user is on an iOS device with Apple Pay configured\n" +
        "When: The user selects the Apple Pay option\n" +
        "Then: The Apple Pay interface is presented for authentication, and upon approval, Apple Pay is set as the payment method\n\n" +
        "Scenario 3: User cancels alternative payment authentication\n" +
        "Given: The user has selected an alternative payment method and is in the authentication process\n" +
        "When: The user cancels or fails to complete the authentication\n" +
        "Then: The user is returned to the payment methods screen with no payment method selected",
      checklist: [
        {
          id: "1",
          text: "Multiple alternative payment options are available (PayPal, Apple Pay, Google Pay, etc.)",
          checked: false,
        },
        {
          id: "2",
          text: "Integration with each payment provider follows their security protocols",
          checked: false,
        },
        {
          id: "3",
          text: "Payment method availability adapts to the device platform (e.g., Apple Pay on iOS)",
          checked: false,
        },
        {
          id: "4",
          text: "Authentication flow is smooth with clear return paths to the app",
          checked: false,
        },
        {
          id: "5",
          text: "User is clearly informed of the selected payment method after authentication",
          checked: false,
        },
      ],
    },
    {
      id: "22",
      title: "Create payment confirmation screen",
      status: "todo",
      description:
        "As a user, I want to see confirmation of my payment so that I know my order has been successfully placed.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views successful payment confirmation\n" +
        "Given: The user has completed the payment process successfully\n" +
        "When: The payment confirmation screen loads\n" +
        "Then: A success message is displayed along with order details and options to view the order or e-receipt\n\n" +
        "Scenario 2: User shares payment confirmation\n" +
        "Given: The user is on the payment confirmation screen\n" +
        "When: The user selects a share option (if available)\n" +
        "Then: The app presents sharing options for the order confirmation or receipt\n\n" +
        "Scenario 3: User navigates from payment confirmation\n" +
        "Given: The user is on the payment confirmation screen\n" +
        "When: The user selects 'Continue Shopping' or a similar option\n" +
        "Then: The app navigates back to the home screen while maintaining the order information in the order history",
      checklist: [
        {
          id: "1",
          text: "Confirmation screen clearly indicates successful payment",
          checked: false,
        },
        {
          id: "2",
          text: "Order summary information is displayed (items, cost, delivery estimate)",
          checked: false,
        },
        {
          id: "3",
          text: "Options to view detailed order information are provided",
          checked: false,
        },
        {
          id: "4",
          text: "Order confirmation details are accessible from the user's account later",
          checked: false,
        },
        {
          id: "5",
          text: "Clear navigation options to continue using the app are available",
          checked: false,
        },
      ],
    },
    {
      id: "23",
      title: "Implement order viewing functionality",
      status: "todo",
      description:
        "As a user, I want to view my order details after purchase so that I can review what I've ordered.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views order details after purchase\n" +
        "Given: The user has completed a purchase and is on the payment confirmation screen\n" +
        "When: The user taps 'View Order'\n" +
        "Then: The order details screen opens showing all items, quantities, costs, shipping details, and tracking information if available\n\n" +
        "Scenario 2: User accesses order history\n" +
        "Given: The user is logged into their account\n" +
        "When: The user navigates to the orders section of their account\n" +
        "Then: A list of all past orders is displayed in chronological order\n\n" +
        "Scenario 3: User views detailed information for a past order\n" +
        "Given: The user is viewing their order history\n" +
        "When: The user selects a specific past order\n" +
        "Then: Complete details for that order are displayed including original order confirmation and current status",
      checklist: [
        {
          id: "1",
          text: "Order details include complete item information, costs, and delivery details",
          checked: false,
        },
        {
          id: "2",
          text: "Orders have a unique identifier for reference",
          checked: false,
        },
        {
          id: "3",
          text: "Order history is accessible from the user's account",
          checked: false,
        },
        {
          id: "4",
          text: "Order status updates are reflected in the order details",
          checked: false,
        },
        {
          id: "5",
          text: "Users can easily navigate between different orders",
          checked: false,
        },
      ],
    },
    {
      id: "24",
      title: "Add e-receipt functionality",
      status: "todo",
      description:
        "As a user, I want to view and save an electronic receipt of my purchase so that I have a record of my transaction.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views e-receipt after purchase\n" +
        "Given: The user has completed a purchase and is on the payment confirmation screen\n" +
        "When: The user taps 'View E-Receipt'\n" +
        "Then: A formatted digital receipt is displayed showing transaction details, payment method, items purchased, and total amount\n\n" +
        "Scenario 2: User downloads e-receipt\n" +
        "Given: The user is viewing an e-receipt\n" +
        "When: The user selects a download or save option\n" +
        "Then: The receipt is saved to the device in PDF format\n\n" +
        "Scenario 3: User shares e-receipt\n" +
        "Given: The user is viewing an e-receipt\n" +
        "When: The user selects a share option\n" +
        "Then: Standard device sharing options appear allowing the user to send the receipt via email, messaging, etc.",
      checklist: [
        {
          id: "1",
          text: "E-receipts include all legally required transaction information",
          checked: false,
        },
        {
          id: "2",
          text: "Receipts are formatted for easy reading on screen and when printed",
          checked: false,
        },
        {
          id: "3",
          text: "Receipts can be downloaded in a standard format (PDF)",
          checked: false,
        },
        {
          id: "4",
          text: "Sharing options allow for easy distribution via multiple channels",
          checked: false,
        },
        {
          id: "5",
          text: "Historical receipts are accessible from the order history",
          checked: false,
        },
      ],
    },
    {
      id: "25",
      title: "Implement favorites functionality",
      status: "todo",
      description:
        "As a user, I want to mark products as favorites so that I can easily find them again later.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User marks a product as favorite\n" +
        "Given: The user is viewing a product's details\n" +
        "When: The user taps the favorite/heart icon\n" +
        "Then: The icon changes state to indicate the product is now favorited and the product is added to the user's favorites list\n\n" +
        "Scenario 2: User removes a product from favorites\n" +
        "Given: The user is viewing a product that is already in their favorites\n" +
        "When: The user taps the filled favorite/heart icon\n" +
        "Then: The icon changes state to indicate the product is no longer favorited and the product is removed from the user's favorites list\n\n" +
        "Scenario 3: User views all favorite products\n" +
        "Given: The user has marked multiple products as favorites\n" +
        "When: The user navigates to the favorites section\n" +
        "Then: All favorited products are displayed in a list or grid format with essential information",
      checklist: [
        {
          id: "1",
          text: "Favorite icon is clearly visible on product listings and details pages",
          checked: false,
        },
        {
          id: "2",
          text: "Favorite status is consistent across all views of the same product",
          checked: false,
        },
        {
          id: "3",
          text: "Favorites list is accessible from the main navigation",
          checked: false,
        },
        {
          id: "4",
          text: "Users can add and remove favorites with a single tap",
          checked: false,
        },
        {
          id: "5",
          text: "Favorited products remain saved across sessions until explicitly removed",
          checked: false,
        },
      ],
    },
    {
      id: "26",
      title: "Create bottom navigation bar",
      status: "todo",
      description:
        "As a user, I want a navigation bar at the bottom of the app so that I can easily access key sections like home, cart, and favorites.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User navigates between main sections\n" +
        "Given: The user is using the app on any screen\n" +
        "When: The user taps on any icon in the bottom navigation bar\n" +
        "Then: The app navigates to the corresponding section (home, cart, favorites, messages, or profile)\n\n" +
        "Scenario 2: User views current section indication\n" +
        "Given: The user is in a specific section of the app\n" +
        "When: The user looks at the bottom navigation bar\n" +
        "Then: The icon for the current section is visually highlighted to indicate the active section\n\n" +
        "Scenario 3: User receives notification indicators\n" +
        "Given: The user has a new message or cart update\n" +
        "When: The bottom navigation bar is visible\n" +
        "Then: A notification indicator (badge) appears on the relevant icon showing the number of new items or updates",
      checklist: [
        {
          id: "1",
          text: "Bottom navigation bar is consistently visible across all main screens",
          checked: false,
        },
        {
          id: "2",
          text: "Icons are intuitive and represent their sections clearly",
          checked: false,
        },
        {
          id: "3",
          text: "Current section is visually indicated",
          checked: false,
        },
        {
          id: "4",
          text: "Navigation between sections is smooth and maintains state",
          checked: false,
        },
        {
          id: "5",
          text: "Notification badges update in real-time to reflect new content",
          checked: false,
        },
      ],
    },
    {
      id: "27",
      title: "Display order cost summary",
      status: "todo",
      description:
        "As a user, I want to see a detailed breakdown of my order costs so that I understand exactly what I'm paying for.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User views cost breakdown in cart\n" +
        "Given: The user has items in their cart\n" +
        "When: The user views the cart screen\n" +
        "Then: A detailed cost summary is displayed showing subtotal, taxes, shipping, discounts, and final total\n\n" +
        "Scenario 2: User views updated costs after changes\n" +
        "Given: The user has modified their cart (changed quantity, applied promo code, etc.)\n" +
        "When: The cost summary section refreshes\n" +
        "Then: All cost components are recalculated and displayed with the changes highlighted or animated\n\n" +
        "Scenario 3: User views cost summary during checkout\n" +
        "Given: The user is in the checkout process\n" +
        "When: The user reviews the order before payment\n" +
        "Then: The complete cost breakdown is displayed with all applicable fees and discounts clearly itemized",
      checklist: [
        {
          id: "1",
          text: "Cost summary includes all components (subtotal, taxes, shipping, discounts, total)",
          checked: false,
        },
        {
          id: "2",
          text: "Each cost component is clearly labeled",
          checked: false,
        },
        {
          id: "3",
          text: "Cost summary updates in real-time when cart contents or options change",
          checked: false,
        },
        {
          id: "4",
          text: "Discounts and promotional savings are highlighted",
          checked: false,
        },
        {
          id: "5",
          text: "Final total is prominently displayed for easy reference",
          checked: false,
        },
      ],
    },
    {
      id: "28",
      title: "Implement notifications system",
      status: "todo",
      description:
        "As a user, I want to receive notifications about my orders and promotions so that I stay informed about important updates.\n\n" +
        "## Acceptance Criteria\n\n" +
        "Scenario 1: User receives order status notification\n" +
        "Given: The user has placed an order that has been shipped\n" +
        "When: The shipping status changes\n" +
        "Then: A push notification is sent to the user's device with the update, and the notification appears in the app's notification center\n\n" +
        "Scenario 2: User receives promotional notification\n" +
        "Given: A new promotion is available that matches the user's interests\n" +
        "When: The promotion goes live\n" +
        "Then: A push notification is sent to the user's device with details about the promotion\n\n" +
        "Scenario 3: User manages notification preferences\n" +
        "Given: The user wants to customize which notifications they receive\n" +
        "When: The user navigates to notification settings in their profile\n" +
        "Then: Options to enable/disable different types of notifications are displayed and can be toggled",
      checklist: [
        {
          id: "1",
          text: "Notifications are delivered for important events (order updates, promotions, etc.)",
          checked: false,
        },
        {
          id: "2",
          text: "Notification icon in the app shows unread notification count",
          checked: false,
        },
        {
          id: "3",
          text: "Notifications center displays all past notifications in chronological order",
          checked: false,
        },
        {
          id: "4",
          text: "Users can customize which types of notifications they receive",
          checked: false,
        },
        {
          id: "5",
          text: "Notifications include relevant information and direct links to related content",
          checked: false,
        },
      ],
    },
  ]);

  const generateStories = () => {
    if (showContent) return;

    setIsLoading(true);
    // Simulate loading time
    setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
      toast({
        title: "User stories generated",
        description: "Your user stories have been successfully generated.",
      });
    }, 2000);
  };

  const handleChecklistItemToggle = (
    storyId: string,
    itemId: string,
    checked: boolean
  ) => {
    setStories(
      stories.map((story) => {
        if (story.id === storyId) {
          return {
            ...story,
            checklist: story.checklist.map((item) =>
              item.id === itemId ? { ...item, checked } : item
            ),
          };
        }
        return story;
      })
    );

    toast({
      title: "Checklist updated",
      description: `Task ${checked ? "completed" : "reopened"}`,
    });
  };

  const handleAddChecklistItem = (storyId: string, text: string) => {
    if (!text.trim()) return;

    setStories(
      stories.map((story) => {
        if (story.id === storyId) {
          return {
            ...story,
            checklist: [
              ...story.checklist,
              {
                id: Math.random().toString(36).substr(2, 9),
                text,
                checked: false,
              },
            ],
          };
        }
        return story;
      })
    );

    // Update selected story if it's the one being modified
    if (selectedStory?.id === storyId) {
      setSelectedStory((prevStory) => {
        if (!prevStory) return null;
        return {
          ...prevStory,
          checklist: [
            ...prevStory.checklist,
            {
              id: Math.random().toString(36).substr(2, 9),
              text,
              checked: false,
            },
          ],
        };
      });
    }
  };

  const handleEditChecklistItem = (
    storyId: string,
    itemId: string,
    text: string
  ) => {
    if (!text.trim()) return;

    setStories(
      stories.map((story) => {
        if (story.id === storyId) {
          return {
            ...story,
            checklist: story.checklist.map((item) =>
              item.id === itemId ? { ...item, text } : item
            ),
          };
        }
        return story;
      })
    );

    // Update selected story if it's the one being modified
    if (selectedStory?.id === storyId) {
      setSelectedStory((prevStory) => {
        if (!prevStory) return null;
        return {
          ...prevStory,
          checklist: prevStory.checklist.map((item) =>
            item.id === itemId ? { ...item, text } : item
          ),
        };
      });
    }
  };

  const handleDeleteChecklistItem = (storyId: string, itemId: string) => {
    setStories(
      stories.map((story) => {
        if (story.id === storyId) {
          return {
            ...story,
            checklist: story.checklist.filter((item) => item.id !== itemId),
          };
        }
        return story;
      })
    );

    // Update selected story if it's the one being modified
    if (selectedStory?.id === storyId) {
      setSelectedStory((prevStory) => {
        if (!prevStory) return null;
        return {
          ...prevStory,
          checklist: prevStory.checklist.filter((item) => item.id !== itemId),
        };
      });
    }
  };

  const handleStatusChange = (
    storyId: string,
    newStatus: "todo" | "in-progress" | "completed"
  ) => {
    setStories(
      stories.map((story) =>
        story.id === storyId ? { ...story, status: newStatus } : story
      )
    );
  };

  const handleDescriptionChange = (newDescription: string) => {
    if (!selectedStory) return;

    setStories(
      stories.map((story) =>
        story.id === selectedStory.id
          ? { ...story, description: newDescription }
          : story
      )
    );

    toast({
      title: "Changes saved",
      description: "Your changes have been saved automatically",
    });
  };

  const handleAssigneeChange = (storyId: string, assignee: string) => {
    setStories(
      stories.map((story) =>
        story.id === storyId ? { ...story, assignee } : story
      )
    );

    toast({
      title: "Assignee updated",
      description: `Story assigned to ${
        stories.find((s) => s.id === storyId)?.assignee
      }`,
    });
  };

  const handleDueDateChange = (storyId: string, date: Date | undefined) => {
    setStories(
      stories.map((story) =>
        story.id === storyId ? { ...story, dueDate: date } : story
      )
    );

    toast({
      title: "Due date updated",
      description: date
        ? `Due date set to ${format(date, "PPP")}`
        : "Due date removed",
    });
  };

  const handleExport = (platform: string) => {
    toast({
      title: `Export to ${platform}`,
      description: `Stories will be exported to ${platform}`,
    });
  };

  const handleStoryPointsChange = (storyId: string, points: string) => {
    const numericPoints = points === "" ? undefined : Number(points);
    if (points !== "" && (isNaN(numericPoints!) || numericPoints! < 0)) return;

    setStories(
      stories.map((story) =>
        story.id === storyId ? { ...story, storyPoints: numericPoints } : story
      )
    );

    if (points !== "") {
      toast({
        title: "Story points updated",
        description: `Estimation set to ${points} points`,
      });
    }
  };

  const handleCreateStory = (title: string, description: string) => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for the user story",
        variant: "destructive",
      });
      return;
    }

    const story: UserStory = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      description,
      status: "todo",
      checklist: [],
    };

    setStories((prev) => [...prev, story]);
    setIsNewStoryDialogOpen(false);

    toast({
      title: "Story created",
      description: "New user story has been added successfully",
    });
  };

  const handleReorderStories = (draggedId: string, targetId: string) => {
    setStories((prevStories) => {
      const newStories = [...prevStories];
      const draggedIndex = newStories.findIndex(
        (story) => story.id === draggedId
      );
      const targetIndex = newStories.findIndex(
        (story) => story.id === targetId
      );

      if (draggedIndex !== -1 && targetIndex !== -1) {
        // Remove the dragged item
        const [draggedStory] = newStories.splice(draggedIndex, 1);
        // Insert at target position
        newStories.splice(targetIndex, 0, draggedStory);

        toast({
          title: "Story reordered",
          description: "User story position updated",
        });
      }

      return newStories;
    });
  };

  return {
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
  };
}
