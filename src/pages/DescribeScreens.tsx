
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepperProgress } from "@/components/screens/StepperProgress";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";
import { ScreenDragProvider } from "@/components/screens/ScreenDragProvider";
import { ScreenActions } from "@/components/screens/ScreenActions";
import { ScreensList } from "@/components/screens/ScreensList";
import { ScreensPageHeader } from "@/components/screens/ScreensPageHeader";
import type { ScreenItem } from "@/types/screens";

export default function DescribeScreens() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [screens, setScreens] = useState<ScreenItem[]>([
    {
      id: "1",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_1_the_home_screen_provides_an_overview_of_available_products_and_categories_featuring_a_location_selector_search_bar_notification_icon_promotional_banner_category_icons_flash_sale_section_product_listings_and_a_bottom_navigation_bar.png",
      description:
        "The Home Screen provides an overview of available products and categories, featuring a location selector, search bar, notification icon, promotional banner, category icons, flash sale section, product listings, and a bottom navigation bar.",
      parentId: null,
      isExpanded: true,
    },
    {
      id: "2",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_2_the_search_screen_allows_users_to_search_for_products_and_view_recent_searches_including_a_back_button_search_bar_recent_searches_list_and_clear_all_option.png",
      description:
        "The Search Screen allows users to search for products and view recent searches, including a back button, search bar, recent searches list, and clear all option",
      parentId: null,
      isExpanded: true,
    },
    {
      id: "3",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_3_displays_search_results_based_on_user_input_featuring_a_back_button_search_bar_with_query_product_listings_and_favorite_icons.png",
      description:
        "Displays search results based on user input, featuring a back button, search bar with query, product listings, and favorite icons",
      parentId: null,
      isExpanded: true,
    },
    {
      id: "4",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_4_provides_detailed_information_about_a_selected_product_including_product_images_title_rating_description_size_and_color_selectors_price_and_an_add_to_cart_button.png",
      description:
        "Provides detailed information about a selected product, including product images, title, rating, description, size and color selectors, price, and an add to cart button.",
      parentId: null,
      isExpanded: true,
    },
    {
      id: "5",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_5_allows_users_to_review_selected_products_before_checkout_featuring_a_product_list_with_details_quantity_adjusters_delete_option_promo_code_field_cost_summary_and_proceed_to_checkout_button.png",
      description:
        "Allows users to review selected products before checkout, featuring a product list with details, quantity adjusters, delete option, promo code field, cost summary, and proceed to checkout button.",
      parentId: null,
      isExpanded: true,
    },
    {
      id: "6",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_6_finalizes_shipping_details_before_payment_including_shipping_address_shipping_type_order_list_and_continue_to_payment_button.png",
      description:
        "Finalizes shipping details before payment, including shipping address, shipping type, order list, and continue to payment button.",
      parentId: null,
      isExpanded: true,
    },
    {
      id: "7",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_7_allows_selection_of_a_payment_method_for_the_order_featuring_credit_debit_card_option_alternative_payment_methods_and_confirm_payment_button.png",
      description:
        "Allows selection of a payment method for the order, featuring credit/debit card option, alternative payment methods, and confirm payment button.",
      parentId: null,
      isExpanded: true,
    },
    {
      id: "8",
      image:
        "https://gw-runpod-storyboard.s3.amazonaws.com/main_screen_8_confirms_successful_payment_and_provides_post_purchase_options_including_a_success_message_view_order_button_and_view_e_receipt_button.png",
      description:
        "Confirms successful payment and provides post-purchase options, including a success message, view order button, and view e-receipt button.",
      parentId: null,
      isExpanded: true,
    },
  ]);

  const handleAddImages = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <StepperProgress />

      <ScreensPageHeader onAddImages={handleAddImages} />

      <ScreenActions screens={screens} setScreens={setScreens}>
        {({
          handleToggleExpand,
          handleDescriptionChange,
          handleDeleteScreen,
          handleNewImage,
        }) => (
          <ScreenDragProvider screens={screens} setScreens={setScreens}>
            {({
              dragTarget,
              draggedId,
              handleDragStart,
              handleDragOver,
              handleDragLeave,
              handleDrop,
              handleDragEnd,
            }) => (
              <>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleNewImage}
                  id="add-images"
                />

                <ScreensList
                  screens={screens}
                  dragTarget={dragTarget}
                  draggedId={draggedId}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onDragEnd={handleDragEnd}
                  onToggleExpand={handleToggleExpand}
                  onDescriptionChange={handleDescriptionChange}
                  onDelete={handleDeleteScreen}
                />
              </>
            )}
          </ScreenDragProvider>
        )}
      </ScreenActions>

      <div className="mt-8">
        <FeedbackWidget feedbackType="screen descriptions" />
      </div>

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => navigate("/upload-ui-images")}>
          Previous Step
        </Button>
        <Button onClick={() => navigate("/backend-logics")}>Next Step</Button>
      </div>
    </div>
  );
}
