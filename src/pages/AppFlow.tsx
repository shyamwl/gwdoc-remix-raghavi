
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StepperProgress } from "@/components/screens/StepperProgress";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";

// Sample app flow text that will be auto-typed
const sampleAppFlowText = `### **User Flow**

#### **1. Home Screen - Main Shopping Interface**
- The user begins by providing:
  - **Location Selector** (e.g., *New York, USA*)
  - **Search Bar** (e.g., *Search for products*)
- The user clicks **Shop Now** for promotions or selects a category.
- The application displays product listings and categories.

#### **2. Search Screen - Product Search**
- After initiating a search, the user navigates to:
  - Inputs required may include:
    - **Search Bar** (e.g., *Enter product name*)
    - **Recent Searches** (e.g., *Blue Shirt, CosmicChic Jacket*)
- The user clicks **Clear All** to remove recent searches or selects a product.

#### **3. Search Results Screen - Display Search Results**
- This screen provides search results:
  - The user interacts with:
    - **Product Listings** (e.g., *Brown Jacket, Brown Suite*)
    - **Filter Options** (e.g., *Sort by Newest, Popular*)
- Specific actions on this screen lead to product details.

#### **4. Product Details Screen - View Product Information**
- Once a product is selected:
  - Detailed product information is displayed.
  - Interactive elements (e.g., **Select Size**, **Select Color**) allow customization.
  - The user clicks **Add to Cart** to proceed.

#### **5. Cart Screen - Review Cart Items**
- After adding items to the cart:
  - The user reviews selected products.
  - Options to adjust quantity or remove items are available.
  - The user enters a **Promo Code** and clicks **Apply**.
  - The user clicks **Proceed to Checkout**.

#### **6. Checkout Screen - Enter Shipping Details**
- The user provides:
  - **Shipping Address** (e.g., *Home, 1901 Thornridge Cir.*)
  - **Shipping Type** (e.g., *Economy*)
- The user clicks **Continue to Payment**.

#### **7. Payment Methods Screen - Select Payment Option**
- The user selects a payment method:
  - **Credit & Debit Card** (e.g., *Add Card*)
  - **Alternative Payment Options** (e.g., *Paypal, Apple Pay*)
- The user clicks **Confirm Payment**.

#### **8. Payment Confirmation Screen - Payment Success**
- The final screen confirms the successful completion of the process:
  - Provides options to **View Order** or **View E-Receipt**.
  - Displays a confirmation message.

---

### **Features of the Application**

#### **1. Product Search**
- **Description:**  
  - Allows users to search for products using keywords.
- **Inputs/Components:**  
  - **Search Bar**, **Recent Searches**
- **User Benefit:**  
  - Simplifies finding specific products quickly.

#### **2. Product Details View**
- **Description:**  
  - Displays detailed information about a selected product.
- **Inputs/Components:**  
  - **Select Size**, **Select Color**, **Add to Cart**
- **User Benefit:**  
  - Provides comprehensive product information and customization options.

#### **3. Shopping Cart Management**
- **Description:**  
  - Enables users to review and modify their cart before purchase.
- **Inputs/Components:**  
  - **Quantity Adjusters**, **Promo Code Input**
- **User Benefit:**  
  - Facilitates easy management of selected items and application of discounts.

#### **4. Checkout Process**
- **Description:**  
  - Guides users through entering shipping and payment details.
- **Inputs/Components:**  
  - **Shipping Address**, **Shipping Type**, **Payment Methods**
- **User Benefit:**  
  - Streamlines the final steps of purchasing, ensuring a smooth transaction.

#### **5. Payment Confirmation**
- **Description:**  
  - Confirms successful payment and provides order details.
- **Inputs/Components:**  
  - **View Order**, **View E-Receipt**
- **User Benefit:**  
  - Offers reassurance and access to purchase records.

---

### **Key Actions for the User**
1. **Initial Interaction:**  
   - Start by selecting a location and searching for products.
2. **Engaging with Core Features:**  
   - Use the search function, view product details, and add items to the cart.
3. **Customization and Adjustments:**  
   - Modify product selections and apply promo codes in the cart.
4. **Finalization:**  
   - Complete the checkout process and confirm payment to finalize the purchase.
`;

export default function AppFlow() {
  const [markdownContent, setMarkdownContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handle the auto-typing effect
  useEffect(() => {
    if (!isTyping) return;

    if (typewriterIndex < sampleAppFlowText.length) {
      const typingTimer = setTimeout(() => {
        setMarkdownContent(
          (prev) => prev + sampleAppFlowText.charAt(typewriterIndex)
        );
        setTypewriterIndex((prevIndex) => prevIndex + 1);

        // Auto-scroll textarea as text is typed
        if (textareaRef.current) {
          textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
      }, 20); // Speed of typing - adjust as needed

      return () => clearTimeout(typingTimer);
    } else {
      setIsTyping(false);
      toast({
        title: "Auto-typing complete",
        description: "You can now edit the content as needed",
      });
    }
  }, [typewriterIndex, isTyping, toast]);

  const handleRegenerate = () => {
    setIsGenerating(true);
    setIsTyping(true);
    setTypewriterIndex(0);
    setMarkdownContent("");

    // Simulate regeneration
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Success",
        description: "App flow has been regenerated",
      });
    }, 500);
  };

  const goToScreenDocs = () => {
    navigate("/screen-docs");
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <StepperProgress />

      <h1 className="text-2xl font-semibold mb-2">App Features &amp; Flow</h1>
      <p className="text-muted-foreground mb-8">
        Here's your app's user flow &amp; feature list. Please read and make
        sure it's accurate before proceeding with the next steps.
      </p>

      <div className="mb-6">
        <Button
          onClick={handleRegenerate}
          disabled={isGenerating || isTyping}
          variant="outline"
          className="flex items-center gap-2"
        >
          <RefreshCw
            className={`h-4 w-4 ${isGenerating ? "animate-spin" : ""}`}
          />
          {isGenerating
            ? "Regenerating..."
            : isTyping
            ? "Auto-typing in progress..."
            : "Regenerate App Flow"}
        </Button>
      </div>

      <div className="mb-6 border rounded-lg overflow-hidden">
        <Textarea
          ref={textareaRef}
          value={markdownContent}
          onChange={(e) => !isTyping && setMarkdownContent(e.target.value)}
          placeholder={
            isTyping
              ? "Auto-typing in progress..."
              : "Your app flow will appear here..."
          }
          className="min-h-[400px] p-4 resize-y border-0 focus-visible:ring-0"
          readOnly={isTyping}
        />
      </div>

      <FeedbackWidget feedbackType="user flow" />

      <div className="mt-8 flex justify-between">
        <Button variant="outline" onClick={() => navigate("/backend-logics")}>
          Previous Step
        </Button>
        <Button onClick={goToScreenDocs}>Continue to Screen Docs</Button>
      </div>
    </div>
  );
}
