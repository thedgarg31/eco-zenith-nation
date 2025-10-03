import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Trophy, Leaf, Zap, Shield, BarChart3, Calculator, Lightbulb, Gamepad2, Newspaper, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Mock data - in a real app this would come from your API
  const weeklyProgress = 75;
  const monthlyGoal = 150;
  const currentPoints = user?.coolPoints || 0;
  
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {user?.fullName || 'User'}!</h1>
        <p className="text-muted-foreground">
          {user?.role === 'admin' 
            ? "Manage the platform and track your team's impact" 
            : "Track your progress and take action for the climate"}
        </p>
      </div>
      
      {user?.role === 'admin' && (
        <div className="mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-primary">Admin Access</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            You have administrative privileges. Manage users and platform settings.
          </p>
          <Link to="/admin">
            <Button variant="outline" size="sm">
              Go to Admin Dashboard
            </Button>
          </Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Level</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.level || 1}</div>
            <p className="text-xs text-muted-foreground">Keep going!</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cool Points</CardTitle>
            <div className="h-4 w-4 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-xs">🪙</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentPoints.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(user?.totalCo2Saved || 0).toFixed(0)} kg</div>
            <p className="text-xs text-muted-foreground">Great job!</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyProgress}%</div>
            <Progress value={weeklyProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Energy Management Features */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-800">Energy Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/energy">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-blue-800">Energy Dashboard</CardTitle>
                    <CardDescription>Track your consumption</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">View detailed energy usage, get AI recommendations, and track savings</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/carbon-calculator">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Calculator className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-green-800">Carbon Calculator</CardTitle>
                    <CardDescription>Calculate your footprint</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Estimate your carbon footprint and discover reduction strategies</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/appliances">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Lightbulb className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-amber-800">Appliance Tracker</CardTitle>
                    <CardDescription>Optimize efficiency</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">Track appliance efficiency and get upgrade recommendations</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Additional Features */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-green-800">More Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link to="/simulator">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Gamepad2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-purple-800 text-sm">Energy Simulator</CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/challenges">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <Trophy className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <CardTitle className="text-amber-800 text-sm">Challenges & Goals</CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/news">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-cyan-100 p-3 rounded-full">
                    <Newspaper className="h-6 w-6 text-cyan-600" />
                  </div>
                  <div>
                    <CardTitle className="text-cyan-800 text-sm">Eco News</CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          <Link to="/community">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="bg-pink-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <CardTitle className="text-pink-800 text-sm">Community Forum</CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Actions</CardTitle>
            <CardDescription>Your latest sustainable activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Action {item}</p>
                    <p className="text-sm text-muted-foreground">Description of the action taken</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">+25 pts</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Goal</CardTitle>
              <CardDescription>Track your progress toward your goal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-center mb-4">{currentPoints}/{monthlyGoal}</div>
              <Progress value={(currentPoints / monthlyGoal) * 100} className="mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                {currentPoints >= monthlyGoal ? 'Goal achieved!' : `${monthlyGoal - currentPoints} points to go`}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Take action now</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/actions">
                <Button className="w-full gap-2">
                  <Target className="h-4 w-4" />
                  Log New Action
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="outline" className="w-full gap-2">
                  <Trophy className="h-4 w-4" />
                  View Leaderboard
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline" className="w-full gap-2">
                  <Leaf className="h-4 w-4" />
                  Detailed Reports
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;