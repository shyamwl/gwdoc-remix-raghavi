import { FileCheck, Sparkles, Download, Copy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import jsPDF from 'jspdf';

const SAMPLE_FRD_CONTENT = `# Functional Requirements Document (FRD)

## Document Information
**Project:** E-Commerce Mobile Application
**Version:** 1.0
**Date:** ${new Date().toLocaleDateString()}
**Author:** Product Development Team

## Introduction
This Functional Requirements Document (FRD) describes the functional requirements for the e-commerce mobile application. It defines the system's behavior, user interactions, and technical specifications required to implement the product successfully.

## Scope
This document covers the functional requirements for:
- User authentication and authorization
- Product catalog management
- Shopping cart and checkout process
- Order management system
- User profile management
- Search and filtering functionality

## System Overview
The e-commerce mobile application is a cross-platform mobile solution that enables users to browse, search, and purchase products through their mobile devices. The system integrates with backend APIs for data management and third-party services for payment processing.

## Functional Requirements

### 1. User Authentication Module

#### FR-001: User Registration
**Priority:** High
**Description:** Users must be able to create new accounts using email or social media credentials.

**Functional Requirements:**
- System shall provide email registration with password
- System shall support social media login (Google, Facebook, Apple)
- System shall validate email format and password strength
- System shall send verification email upon registration
- System shall prevent duplicate account creation with same email
- System shall store user credentials securely

**Input:** Email, password, confirm password, optional social media token
**Output:** User account creation confirmation, verification email sent
**Preconditions:** Valid email address, strong password
**Postconditions:** User account created, verification email sent

#### FR-002: User Login
**Priority:** High
**Description:** Registered users must be able to authenticate and access their accounts.

**Functional Requirements:**
- System shall authenticate users with email/password combination
- System shall support biometric authentication (fingerprint, face ID)
- System shall provide "Remember Me" functionality
- System shall implement account lockout after failed attempts
- System shall provide password reset functionality
- System shall maintain user session across app restarts

**Input:** Email/username, password, or biometric data
**Output:** Authentication success/failure, user session token
**Preconditions:** Valid user account exists
**Postconditions:** User authenticated, session established

### 2. Product Catalog Module

#### FR-003: Product Browsing
**Priority:** High
**Description:** Users must be able to browse products by categories and view product details.

**Functional Requirements:**
- System shall display products in categorized lists
- System shall show product images, titles, prices, and ratings
- System shall support infinite scrolling for product lists
- System shall display product details including descriptions, specifications
- System shall show product availability status
- System shall display customer reviews and ratings

**Input:** Category selection, product ID
**Output:** Product listings, product detail information
**Preconditions:** Products available in database
**Postconditions:** Products displayed to user

#### FR-004: Product Search
**Priority:** High
**Description:** Users must be able to search for products using keywords and filters.

**Functional Requirements:**
- System shall provide text-based search functionality
- System shall support search filters (price range, brand, category, ratings)
- System shall display search suggestions as user types
- System shall show search results with relevance ranking
- System shall store recent searches for quick access
- System shall handle empty search results gracefully

**Input:** Search query, filter criteria
**Output:** Filtered product results, search suggestions
**Preconditions:** Product database available
**Postconditions:** Relevant products displayed

### 3. Shopping Cart Module

#### FR-005: Cart Management
**Priority:** High
**Description:** Users must be able to add, remove, and modify items in their shopping cart.

**Functional Requirements:**
- System shall allow users to add products to cart
- System shall display cart contents with item details
- System shall allow quantity modification for cart items
- System shall allow item removal from cart
- System shall calculate and display cart total
- System shall persist cart contents across sessions
- System shall handle out-of-stock scenarios

**Input:** Product ID, quantity, user action (add/remove/update)
**Output:** Updated cart contents, total price calculation
**Preconditions:** User authenticated, product available
**Postconditions:** Cart updated, totals recalculated

#### FR-006: Checkout Process
**Priority:** High
**Description:** Users must be able to complete purchases through a streamlined checkout process.

**Functional Requirements:**
- System shall collect shipping address information
- System shall calculate shipping costs and taxes
- System shall support multiple payment methods
- System shall process payment transactions securely
- System shall generate order confirmation
- System shall send order confirmation email
- System shall support guest checkout option

**Input:** Shipping address, payment information, order details
**Output:** Order confirmation, payment receipt
**Preconditions:** Items in cart, valid payment method
**Postconditions:** Order placed, payment processed

### 4. Order Management Module

#### FR-007: Order Tracking
**Priority:** High
**Description:** Users must be able to view and track their order history and current order status.

**Functional Requirements:**
- System shall display order history with order details
- System shall show real-time order status updates
- System shall provide order tracking information
- System shall allow order cancellation within specified timeframe
- System shall support order returns and refunds
- System shall send notifications for order status changes

**Input:** Order ID, user ID
**Output:** Order details, tracking information, status updates
**Preconditions:** Order exists in system
**Postconditions:** Order information displayed

### 5. User Profile Module

#### FR-008: Profile Management
**Priority:** Medium
**Description:** Users must be able to manage their personal information and preferences.

**Functional Requirements:**
- System shall allow users to update personal information
- System shall store multiple shipping addresses
- System shall manage payment method preferences
- System shall track order history and preferences
- System shall provide account settings management
- System shall support account deletion

**Input:** User information updates
**Output:** Profile update confirmation
**Preconditions:** User authenticated
**Postconditions:** Profile information updated

### 6. Notification Module

#### FR-009: Push Notifications
**Priority:** Medium
**Description:** System must send relevant notifications to users about orders, offers, and updates.

**Functional Requirements:**
- System shall send order status notifications
- System shall notify users about price drops on wishlist items
- System shall send promotional offers and discounts
- System shall allow users to manage notification preferences
- System shall respect user's notification settings
- System shall handle notification delivery failures

**Input:** Notification trigger events, user preferences
**Output:** Push notifications, in-app notifications
**Preconditions:** User opted-in for notifications
**Postconditions:** Notifications delivered

## Non-Functional Requirements

### Performance Requirements
- App startup time: < 3 seconds
- Search response time: < 2 seconds
- Page load time: < 2 seconds
- Image loading: Progressive with placeholders
- Support for 10,000 concurrent users

### Security Requirements
- All data transmission encrypted with TLS 1.3
- User passwords hashed with bcrypt
- Payment information PCI DSS compliant
- Session tokens expire after 24 hours
- Input validation on all user inputs

### Usability Requirements
- Intuitive navigation with < 3 taps to any function
- Responsive design for all screen sizes
- Accessibility compliance (WCAG 2.1 AA)
- Support for multiple languages
- Offline capability for browsing

### Compatibility Requirements
- iOS 14.0+ support
- Android 8.0+ support
- Support for latest device orientations
- Backward compatibility for 2 major versions

## Data Requirements
- User data encrypted at rest
- Regular data backups every 24 hours
- Data retention policy: 7 years
- GDPR compliance for EU users
- Data synchronization across devices

## Integration Requirements
- RESTful API integration with backend services
- Payment gateway integration (Stripe, PayPal)
- Social media login integration
- Analytics platform integration
- Customer support system integration

## Error Handling
- Graceful degradation for network failures
- User-friendly error messages
- Automatic retry mechanisms for failed operations
- Logging of all errors for debugging
- Fallback mechanisms for critical functions

## Testing Requirements
- Unit testing coverage: > 80%
- Integration testing for all API endpoints
- Performance testing under load
- Security testing for vulnerabilities
- Usability testing with target users

## Assumptions and Dependencies
### Assumptions
- Users have stable internet connection
- Backend APIs are available and responsive
- Third-party services maintain 99.9% uptime
- Users have devices with sufficient storage

### Dependencies
- Backend API development completion
- Payment gateway setup and approval
- App store approval process
- SSL certificates and security setup

## Acceptance Criteria
Each functional requirement must meet the following criteria:
- All specified inputs produce expected outputs
- Error conditions are handled appropriately
- Performance meets specified requirements
- Security requirements are implemented
- User experience is intuitive and accessible

---
*Document Version: 1.0*
*Last Updated: ${new Date().toLocaleDateString()}*
*Next Review: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}*`;

export default function FRD() {
  const [content, setContent] = useState(SAMPLE_FRD_CONTENT);
  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving FRD content:", content);
    toast({
      title: "Document saved",
      description: "Your FRD has been saved successfully.",
    });
  };

  const handleRegenerate = () => {
    setContent(SAMPLE_FRD_CONTENT);
    toast({
      title: "FRD Regenerated",
      description: "Your Functional Requirements Document has been regenerated.",
    });
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Text copied",
        description: "Document content has been copied to clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy text to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    const lineHeight = 10;
    
    // Add title
    doc.setFontSize(20);
    doc.text("Functional Requirements Document", margin, margin);
    
    // Add content
    doc.setFontSize(12);
    const lines = doc.splitTextToSize(content || "No content to export", doc.internal.pageSize.width - 2 * margin);
    
    let y = margin + 20;
    lines.forEach((line: string) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    });
    
    doc.save("FRD.pdf");
    toast({
      title: "PDF exported",
      description: "Your FRD has been exported as PDF.",
    });
  };

  const handleExportDOCX = () => {
    const docContent = `Functional Requirements Document\n\n${content}`;
    const blob = new Blob([docContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'FRD.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "DOCX exported",
      description: "Your FRD has been exported as DOCX.",
    });
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Functional Requirements Document (FRD)</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleCopyText} variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy Text
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleExportPDF}>
                Export as PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportDOCX}>
                Export as DOCX
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={handleSave}>
            Save Document
          </Button>
        </div>
      </div>
      
      <p className="text-muted-foreground max-w-4xl">
        Create and maintain functional requirements documentation. Define system behavior, user interactions, and technical specifications for your project.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Document Editor</CardTitle>
          <CardDescription>
            Write your functional requirements document here. Include system behavior, user workflows, and technical specifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <Textarea
            placeholder="Start writing your Functional Requirements Document here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] font-mono text-sm"
          />
          <div className="flex justify-end mt-4">
            <Button onClick={handleRegenerate} variant="outline">
              <Sparkles className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
