import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Target, Trophy, BarChart3, Users, Leaf, Zap, LogIn, UserPlus } from "lucide-react";

const Landing = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(142,76%,36%,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(200,80%,50%,0.15),transparent_50%)]" />
        
        <div className="container relative mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Leaf className="h-4 w-4" />
                Track • Reduce • Offset
              </div>
              
              <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent animate-fade-in">
                Rise for Climate Action
              </h1>
              
              {/* Environmental Slogans */}
              <div className="mb-8 space-y-3 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <p className="text-lg md:text-xl font-semibold text-green-700 italic">
                  "Don't be mean, keep it green."
                </p>
                <p className="text-lg md:text-xl font-semibold text-emerald-700 italic">
                  "Earth is our home, let's keep it clean."
                </p>
                <p className="text-lg md:text-xl font-semibold text-teal-700 italic">
                  "Reduce, Reuse, Recycle – the power is in your cycle."
                </p>
              </div>
              
              <p className="mb-8 text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Track your carbon footprint, take sustainable actions, and join a community committed to cooling the globe.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                {user ? (
                  <Link to="/dashboard">
                    <Button size="lg" className="gap-2 shadow-glow h-12 px-8 text-lg bg-green-600 hover:bg-green-700">
                      <Zap className="h-5 w-5" />
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/login">
                      <Button size="lg" className="gap-2 shadow-glow h-12 px-8 text-lg bg-green-600 hover:bg-green-700">
                        <LogIn className="h-5 w-5" />
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="lg" variant="outline" className="h-12 px-8 text-lg gap-2 border-green-600 text-green-700 hover:bg-green-50">
                        <UserPlus className="h-5 w-5" />
                        Create Account
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-400 via-emerald-400 to-teal-500 min-h-[400px] flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80" 
                  alt="Nurturing the environment - hands watering a tree on earth" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-green-400 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-teal-400 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Card className="bg-white/80 backdrop-blur-sm border-green-200 p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-2 text-4xl font-bold text-green-600">2.4M+</div>
              <div className="text-sm text-gray-600">kg CO₂ Saved</div>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-blue-200 p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-2 text-4xl font-bold text-blue-600">15K+</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm border-amber-200 p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-2 text-4xl font-bold text-amber-600">500K+</div>
              <div className="text-sm text-gray-600">Actions Completed</div>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-green-800">Everything You Need to Make an Impact</h2>
            <p className="text-lg text-gray-600">
              Powerful tools to track, reduce, and offset your carbon footprint
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:scale-105 transition-transform hover:shadow-xl">
              <div className="mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-800">Track Actions</h3>
              <p className="text-sm text-gray-600">
                Log your sustainable actions across travel, energy, food, and more
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:scale-105 transition-transform hover:shadow-xl">
              <div className="mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-800">View Analytics</h3>
              <p className="text-sm text-gray-600">
                Detailed reports and insights into your carbon footprint
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:scale-105 transition-transform hover:shadow-xl">
              <div className="mb-4 h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-amber-800">Join Challenges</h3>
              <p className="text-sm text-gray-600">
                Compete with others and earn rewards for sustainable actions
              </p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200 hover:scale-105 transition-transform hover:shadow-xl">
              <div className="mb-4 h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-800">Build Community</h3>
              <p className="text-sm text-gray-600">
                Connect with like-minded individuals and organizations
              </p>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold mb-6 text-green-800">Ready to Make a Difference?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Join thousands of climate champions tracking and reducing their carbon footprint
            </p>
            {user ? (
              <Link to="/dashboard">
                <Button size="lg" className="gap-2 shadow-glow h-12 px-8 text-lg bg-green-600 hover:bg-green-700">
                  <Zap className="h-5 w-5" />
                  Continue Your Journey
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" className="gap-2 shadow-glow h-12 px-8 text-lg bg-green-600 hover:bg-green-700">
                  <UserPlus className="h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;