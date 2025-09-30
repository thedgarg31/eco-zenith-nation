import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Target, Trophy, BarChart3, Users, Leaf, Zap } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(168,100%,43%,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(258,90%,66%,0.1),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Leaf className="h-4 w-4" />
              Track • Reduce • Offset
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in">
              Rise for Climate Action
            </h1>
            
            <p className="mb-8 text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Track your carbon footprint, take sustainable actions, and join a community committed to cooling the globe.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 shadow-glow h-12 px-8 text-lg">
                  <Zap className="h-5 w-5" />
                  Start Tracking
                </Button>
              </Link>
              <Link to="/actions">
                <Button size="lg" variant="outline" className="h-12 px-8 text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-primary">2.4M+</div>
              <div className="text-sm text-muted-foreground">kg CO₂ Saved</div>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-accent/20 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-accent">15K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </Card>
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20 p-6 text-center">
              <div className="mb-2 text-4xl font-bold text-primary">500K+</div>
              <div className="text-sm text-muted-foreground">Actions Completed</div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Make an Impact</h2>
            <p className="text-lg text-muted-foreground">
              Powerful tools to track, reduce, and offset your carbon footprint
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-card to-secondary border-primary/20 hover:scale-105 transition-transform">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Actions</h3>
              <p className="text-sm text-muted-foreground">
                Log your sustainable actions across travel, energy, food, and more
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card to-secondary border-accent/20 hover:scale-105 transition-transform">
              <div className="mb-4 h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">View Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Detailed reports and insights into your carbon footprint
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card to-secondary border-primary/20 hover:scale-105 transition-transform">
              <div className="mb-4 h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join Challenges</h3>
              <p className="text-sm text-muted-foreground">
                Compete with others and earn rewards for sustainable actions
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-card to-secondary border-accent/20 hover:scale-105 transition-transform">
              <div className="mb-4 h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Build Community</h3>
              <p className="text-sm text-muted-foreground">
                Connect with like-minded individuals and organizations
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of climate champions tracking and reducing their carbon footprint
            </p>
            <Link to="/dashboard">
              <Button size="lg" className="gap-2 shadow-glow h-12 px-8 text-lg">
                <Zap className="h-5 w-5" />
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
