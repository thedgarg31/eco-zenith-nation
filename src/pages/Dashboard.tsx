import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { Target, TrendingUp, Award, Calendar } from "lucide-react";

const Dashboard = () => {
  const currentSavings = 145;
  const targetSavings = 200;
  const progressPercentage = (currentSavings / targetSavings) * 100;
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Impact Dashboard</h1>
          <p className="text-muted-foreground">Track your climate action progress</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          <Button variant="default" size="sm">Personal</Button>
          <Button variant="ghost" size="sm">Organization</Button>
          <Button variant="ghost" size="sm">Global</Button>
        </div>
        
        {/* Main Stats Card */}
        <Card className="mb-8 bg-gradient-to-br from-card to-secondary border-primary/20 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>January 2025 Target</span>
              </div>
              <h2 className="text-2xl font-bold">Save {targetSavings} kg CO₂eq</h2>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Current Progress</div>
              <div className="text-3xl font-bold text-primary">{Math.round(progressPercentage)}%</div>
            </div>
          </div>
          
          {/* Circular Progress Visualization */}
          <div className="relative mx-auto mb-8 h-64 w-64">
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
                strokeDashoffset={2 * Math.PI * 112 * (1 - progressPercentage / 100)}
                className="text-primary transition-all duration-1000"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-primary">{currentSavings}</div>
              <div className="text-sm text-muted-foreground">kg CO₂eq saved</div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground">
              Your CO₂ savings equal what <span className="font-semibold text-primary">7 trees</span> fix in a month 🌳
            </p>
          </div>
          
          <Progress value={progressPercentage} className="mb-4 h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">0 kg</span>
            <span className="text-muted-foreground">{targetSavings} kg</span>
          </div>
        </Card>
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">1,250</div>
                <div className="text-sm text-muted-foreground">Cool Points</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">42</div>
                <div className="text-sm text-muted-foreground">Actions Completed</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">+18%</div>
                <div className="text-sm text-muted-foreground">vs Last Month</div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* CTA Button */}
        <div className="text-center">
          <Button size="lg" className="gap-2 shadow-glow">
            <Target className="h-5 w-5" />
            Let's Start With Action
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
