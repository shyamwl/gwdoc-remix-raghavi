import React, { useState } from 'react';
import { Check, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Pricing = () => {
  const [teamSize, setTeamSize] = useState("1");

  const freeFeatures = [
    "Perfect for beginners",
    "1 Epic",
    "UnLimited Seats",
    "1 Project",
    "Limited features",
    "Cannot regenerate",
    "Regular support"
  ];

  const proFeatures = [
    "Perfect for advanced users",
    "5 Epics/month per seat",
    "Billed per seat",
    "Unlimited Projects",
    "All features and tools unlocked",
    "Allowed (up to 3 times per item)",
    "Premium Support"
  ];

  const enterpriseFeatures = [
     "For large-scale teams & organizations",
    "Unlimited Epics",
    "Custom Seat Package",
    "Unlimited Projects",
    "All features and tools unlocked",
    "Unlimited Regeneration",
    "Priority Support"
  ];

  const calculateProPrice = (members: string) => {
    const memberCount = parseInt(members);
    return memberCount * 20;
  };

  const isEnterprise = parseInt(teamSize) >= 30;

  return (
    <div className="min-h-screen bg-background overflow-visible">
      <div className="max-w-7xl mx-auto p-6 overflow-visible">
        {/* Header Section with higher z-index */}
        <div className="text-center mb-20 relative z-[100] overflow-visible">
          <h1 className="text-4xl font-bold text-foreground mb-8">Choose a plan</h1>
          
          <div className="flex items-center justify-center gap-2 mb-16 relative overflow-visible">
            <span className="text-muted-foreground">Team size</span>
            <div className="relative overflow-visible">
              <Select value={teamSize} onValueChange={setTeamSize}>
                <SelectTrigger className="w-40 bg-background border shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent 
                  className="z-[999] bg-background border shadow-2xl rounded-lg overflow-visible animate-in fade-in-0 zoom-in-95" 
                  sideOffset={8}
                  align="center"
                >
                  {[1,2,3,4,5,10,15,20,30,50].map(num => (
                    <SelectItem 
                      key={num} 
                      value={num.toString()}
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      {num} {num === 1 ? 'member' : 'members'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Pricing Cards with lower z-index */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12 relative z-10">
          {/* Free Plan */}
          <Card className="relative border-border bg-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-card-foreground">Free</CardTitle>
              <div className="mt-4">
                <div className="text-4xl font-bold text-card-foreground">$0</div>
                <div className="text-muted-foreground">/month for 1 member</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button variant="outline" className="w-full">
                Choose Free
              </Button>
              
              <div className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-card-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="relative border-primary bg-card shadow-lg scale-105">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
              <Star className="h-3 w-3 mr-1" />
              Most Popular
            </Badge>
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-card-foreground">Pro</CardTitle>
              <div className="mt-4">
                <div className="text-4xl font-bold text-card-foreground">
                  ${isEnterprise ? 'Custom' : calculateProPrice(teamSize)}
                </div>
                <div className="text-muted-foreground">
                  {isEnterprise ? 'Contact sales' : `/month for ${teamSize} ${teamSize === "1" ? "member" : "members"}`}
                </div>
                {!isEnterprise && parseInt(teamSize) > 1 && (
                  <div className="text-sm text-muted-foreground mt-1">
                    $20 per seat
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                {isEnterprise ? 'Contact Sales' : 'Upgrade to Pro'}
              </Button>
              
              <div className="space-y-3">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className={`text-sm text-card-foreground ${index === 0 ? 'font-medium' : ''}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enterprise Plan */}
          <Card className="relative border-border bg-card">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-card-foreground">Enterprise</CardTitle>
              <div className="mt-4">
                <div className="text-4xl font-bold text-card-foreground">Custom</div>
                <div className="text-muted-foreground">Starting at 30 seats</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
              
              <div className="space-y-3">
                {enterpriseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className={`text-sm text-card-foreground ${index === 0 ? 'font-medium' : ''}`}>
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
            Current billing cycle: July 16 – Aug 16
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
