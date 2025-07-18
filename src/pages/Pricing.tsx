import React, { useState } from 'react';
import { Check, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Pricing = () => {
  const [teamSize, setTeamSize] = useState("1");

  const freeFeatures = [
    "Create unlimited boards",
    "Share public links", 
    "Export to PDF",
    "Basic Chat & Collaboration",
    "Upload and tag screens"
  ];

  const proFeatures = [
    "Everything in Free Plan, plus:",
    "Version history",
    "Private boards", 
    "Advanced AI (User stories, test cases, API docs)",
    "Chat with AI + Voice input",
    "Sub-screen grouping & validation logic"
  ];

  const calculateProPrice = (members: string) => {
    const memberCount = parseInt(members);
    return memberCount === 1 ? 12 : memberCount * 12;
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-6">Choose a plan</h1>
          
          <div className="flex items-center justify-center gap-2 mb-8">
            <span className="text-muted-foreground">Team size</span>
            <Select value={teamSize} onValueChange={setTeamSize}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1,2,3,4,5,10,15,20,50].map(num => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'member' : 'members'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Free Plan */}
          <Card className="relative border-border bg-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-card-foreground">Free</CardTitle>
              <div className="mt-4">
                <div className="text-4xl font-bold text-card-foreground">$0</div>
                <div className="text-muted-foreground">/month for {teamSize} {teamSize === "1" ? "member" : "members"}</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button variant="outline" className="w-full">
                Choose Free
              </Button>
              
              <div className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-card-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-primary bg-card shadow-lg">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
              <Star className="h-3 w-3 mr-1" />
              Most Popular
            </Badge>
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-card-foreground">Pro</CardTitle>
              <div className="mt-4">
                <div className="text-4xl font-bold text-card-foreground">
                  ${calculateProPrice(teamSize)}
                </div>
                <div className="text-muted-foreground">
                  /month for {teamSize} {teamSize === "1" ? "member" : "members"}
                </div>
                {parseInt(teamSize) > 1 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-sm text-muted-foreground flex items-center justify-center gap-1 mt-1">
                          Custom billing for 2+ members (per seat)
                          <Info className="h-3 w-3" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>$12 per member for teams of 2 or more</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Choose Pro
              </Button>
              
              <div className="space-y-3">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className={`text-card-foreground ${index === 0 ? 'font-medium' : ''}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Billing Info Section */}
        <div className="text-center bg-muted/30 rounded-lg p-6 max-w-2xl mx-auto">
          <div className="text-sm text-muted-foreground mb-3">
            Current billing cycle: Jul 16 – Aug 16
          </div>
          <Button variant="outline" size="sm">
            Change Subscription
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;