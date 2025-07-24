
import { FileText, Sparkles, Download, Copy } from "lucide-react";
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

const SAMPLE_PRD_CONTENT = `# Product Requirements Document (PRD)

## Executive Summary
This document outlines the requirements for developing a comprehensive e-commerce mobile application that will serve as the primary platform for our online retail business.

## Product Overview
**Product Name:** E-Commerce Mobile App
**Version:** 1.0
**Target Release:** Q2 2024

## Product Vision
To create an intuitive, fast, and secure mobile commerce platform that provides users with a seamless shopping experience while driving business growth through increased conversion rates and customer satisfaction.

## Target Audience
### Primary Users
- Mobile-first shoppers aged 18-45
- Tech-savvy consumers who prefer mobile shopping
- Busy professionals seeking convenient shopping solutions

### Secondary Users
- Occasional online shoppers
- Gift purchasers
- Bargain hunters and deal seekers

## Business Objectives
1. Increase mobile conversion rates by 25%
2. Reduce cart abandonment rate to below 15%
3. Achieve 4.5+ star rating in app stores
4. Reach 100K+ monthly active users within 6 months

## Key Features & Requirements

### Core Features
#### 1. User Authentication & Profile Management
- **Priority:** High
- **Description:** Secure login/registration with profile management
- **Requirements:**
  - Email and social media login options
  - User profile creation and editing
  - Password reset functionality
  - Account verification via email/SMS

#### 2. Product Catalog & Search
- **Priority:** High
- **Description:** Comprehensive product browsing and search functionality
- **Requirements:**
  - Advanced search with filters (price, category, brand, ratings)
  - Product categorization and navigation
  - High-quality product images and descriptions
  - Product recommendations and related items

#### 3. Shopping Cart & Checkout
- **Priority:** High
- **Description:** Streamlined purchasing process
- **Requirements:**
  - Add/remove items from cart
  - Quantity adjustment
  - Guest checkout option
  - Multiple payment methods (credit cards, PayPal, Apple Pay)
  - Order summary and confirmation

#### 4. Order Management
- **Priority:** High
- **Description:** Order tracking and management
- **Requirements:**
  - Order history and status tracking
  - Real-time shipping updates
  - Order cancellation and returns
  - Reorder functionality

### Secondary Features
#### 5. Wishlist & Favorites
- **Priority:** Medium
- **Description:** Save items for future purchase
- **Requirements:**
  - Add/remove items from wishlist
  - Share wishlist with others
  - Price drop notifications
  - Move items from wishlist to cart

#### 6. Reviews & Ratings
- **Priority:** Medium
- **Description:** Customer feedback system
- **Requirements:**
  - Product rating and review system
  - Photo/video reviews
  - Review helpfulness voting
  - Review moderation

#### 7. Push Notifications
- **Priority:** Medium
- **Description:** Engage users with relevant updates
- **Requirements:**
  - Order status updates
  - Price drop alerts
  - New product notifications
  - Promotional offers

## Technical Requirements

### Performance Requirements
- App load time: < 3 seconds
- Search response time: < 2 seconds
- Image loading: Progressive loading with placeholders
- Offline capability: Basic browsing and cart management

### Security Requirements
- SSL/TLS encryption for all data transmission
- PCI DSS compliance for payment processing
- Secure authentication with token-based sessions
- Data encryption at rest

### Platform Requirements
- iOS 14.0+ and Android 8.0+ support
- Responsive design for various screen sizes
- Accessibility compliance (WCAG 2.1 AA)

## User Experience Requirements
- Intuitive navigation with bottom tab bar
- Consistent design language throughout the app
- Touch-friendly interface with appropriate button sizes
- Loading states and error handling
- Smooth animations and transitions

## Success Metrics
### Key Performance Indicators (KPIs)
1. **Conversion Rate:** Target 3.5% (current: 2.8%)
2. **Average Order Value:** Target $85 (current: $75)
3. **User Retention Rate:** Target 60% (30-day retention)
4. **App Store Rating:** Target 4.5+ stars
5. **Cart Abandonment Rate:** Target <15% (current: 22%)

### User Engagement Metrics
- Monthly Active Users (MAU)
- Daily Active Users (DAU)
- Session duration
- Pages per session
- Return user rate

## Dependencies & Assumptions
### Dependencies
- Payment gateway integration (Stripe, PayPal)
- Inventory management system API
- Customer service platform integration
- Analytics and tracking tools

### Assumptions
- Users have reliable internet connectivity
- Backend APIs will be available and performant
- Third-party services will maintain 99.9% uptime
- Marketing team will drive user acquisition

## Risks & Mitigation
### Technical Risks
- **Risk:** Third-party service downtime
- **Mitigation:** Implement fallback mechanisms and service redundancy

### Business Risks
- **Risk:** Low user adoption
- **Mitigation:** Comprehensive user testing and feedback incorporation

## Timeline & Milestones
### Phase 1 (Months 1-2)
- Core authentication and user management
- Basic product catalog and search
- Shopping cart functionality

### Phase 2 (Months 3-4)
- Checkout and payment processing
- Order management system
- Push notifications

### Phase 3 (Months 5-6)
- Advanced features (wishlist, reviews)
- Performance optimization
- Beta testing and refinement

## Approval & Sign-off
This document requires approval from:
- Product Manager
- Engineering Lead
- Design Lead
- Business Stakeholder

---
*Document Version: 1.0*
*Last Updated: ${new Date().toLocaleDateString()}*
*Next Review: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}*`;

export default function PRD() {
  const [content, setContent] = useState(SAMPLE_PRD_CONTENT);
  const { toast } = useToast();

  const handleSave = () => {
    console.log("Saving PRD content:", content);
    toast({
      title: "Document saved",
      description: "Your PRD has been saved successfully.",
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
    doc.text("Product Requirements Document", margin, margin);
    
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
    
    doc.save("PRD.pdf");
    toast({
      title: "PDF exported",
      description: "Your PRD has been exported as PDF.",
    });
  };

  const handleExportDOCX = () => {
    const docContent = `Product Requirements Document\n\n${content}`;
    const blob = new Blob([docContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PRD.docx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "DOCX exported",
      description: "Your PRD has been exported as DOCX.",
    });
  };

  return (
    <div className="container mx-auto max-w-6xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Product Requirements Document (PRD)</h1>
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
        Create and maintain product requirements documentation. Define product vision, target audience, feature requirements, and success metrics.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Document Editor</CardTitle>
          <CardDescription>
            Write your product requirements document here. Include product vision, target audience, feature requirements, and success metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Start writing your Product Requirements Document here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[500px] font-mono text-sm"
          />
        </CardContent>
      </Card>
    </div>
  );
}
