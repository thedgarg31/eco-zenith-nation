import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share2, Settings, Trophy } from "lucide-react";

const Reports = () => {
  const categoryData = [
    { name: "Travel", percentage: 45, color: "bg-primary" },
    { name: "Energy", percentage: 25, color: "bg-accent" },
    { name: "Food", percentage: 20, color: "bg-primary" },
    { name: "Waste", percentage: 10, color: "bg-accent" },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8 p-6 bg-gradient-to-br from-card to-secondary border-primary/20">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 ring-4 ring-primary">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold mb-1">Climate Champion</h2>
                <p className="text-muted-foreground">champion@email.com</p>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1">
                  <Trophy className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Level 5</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">145</div>
              <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">1,250</div>
              <div className="text-sm text-muted-foreground">Cool Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">42</div>
              <div className="text-sm text-muted-foreground">Actions</div>
            </div>
          </div>
        </Card>
        
        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <Button variant="ghost" size="sm">Achievements</Button>
          <Button variant="default" size="sm">Reports</Button>
          <Button variant="ghost" size="sm">Footprint</Button>
        </div>
        
        {/* Year Selector */}
        <div className="mb-6">
          <select className="h-10 rounded-lg bg-card border border-input px-4">
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
        
        {/* Total Savings Gauge */}
        <Card className="mb-8 p-8 bg-gradient-to-br from-card to-secondary border-primary/20">
          <h3 className="text-xl font-bold mb-6 text-center">Total CO₂ Savings</h3>
          
          <div className="relative mx-auto h-64 w-64 mb-6">
            <svg className="h-full w-full -rotate-90 transform">
              <circle
                cx="128"
                cy="128"
                r="112"
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="128"
                cy="128"
                r="112"
                stroke="currentColor"
                strokeWidth="16"
                fill="none"
                strokeDasharray={2 * Math.PI * 112}
                strokeDashoffset={2 * Math.PI * 112 * 0.27}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-primary">145</div>
              <div className="text-sm text-muted-foreground">kg CO₂eq</div>
              <div className="text-xs text-muted-foreground mt-2">of 200 kg goal</div>
            </div>
          </div>
        </Card>
        
        {/* Category Breakdown */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-6">Category Breakdown</h3>
          
          <div className="space-y-6">
            {categoryData.map((category) => (
              <div key={category.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm text-muted-foreground">{category.percentage}%</span>
                </div>
                <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                  <div 
                    className={`h-full ${category.color} transition-all duration-1000`}
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
