import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Trophy, 
  Calendar,
  TrendingDown,
  Zap,
  Plus,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  targetValue: number;
  currentProgress: number;
  rewardPoints: number;
  participants: number;
  status: 'active' | 'completed' | 'upcoming';
}

interface Goal {
  id: string;
  title: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  category: string;
}

const ChallengesGoals = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: "1",
      title: "Reduce Energy by 10%",
      description: "Cut your weekly energy consumption by 10% compared to last month",
      category: "Energy",
      startDate: "2025-09-25",
      endDate: "2025-10-25",
      targetValue: 10,
      currentProgress: 6.5,
      rewardPoints: 500,
      participants: 1247,
      status: 'active'
    },
    {
      id: "2",
      title: "Zero Waste Week",
      description: "Produce zero waste for 7 consecutive days",
      category: "Waste",
      startDate: "2025-10-01",
      endDate: "2025-10-07",
      targetValue: 7,
      currentProgress: 3,
      rewardPoints: 750,
      participants: 892,
      status: 'active'
    },
    {
      id: "3",
      title: "Plant 50 Trees",
      description: "Community goal: Plant 50 trees in your neighborhood",
      category: "Environment",
      startDate: "2025-10-05",
      endDate: "2025-10-31",
      targetValue: 50,
      currentProgress: 0,
      rewardPoints: 1000,
      participants: 2341,
      status: 'upcoming'
    },
    {
      id: "4",
      title: "Carpool Champion",
      description: "Use carpool or public transport for all commutes this month",
      category: "Transportation",
      startDate: "2025-09-01",
      endDate: "2025-09-30",
      targetValue: 100,
      currentProgress: 100,
      rewardPoints: 600,
      participants: 567,
      status: 'completed'
    }
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Monthly Energy Reduction",
      targetValue: 15,
      currentValue: 8.5,
      unit: "%",
      deadline: "2025-10-31",
      category: "Energy"
    },
    {
      id: "2",
      title: "Carbon Footprint Target",
      targetValue: 200,
      currentValue: 245,
      unit: "kg CO₂",
      deadline: "2025-12-31",
      category: "Carbon"
    },
    {
      id: "3",
      title: "Renewable Energy Usage",
      targetValue: 50,
      currentValue: 25,
      unit: "%",
      deadline: "2025-11-30",
      category: "Renewable"
    }
  ]);

  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    targetValue: "",
    unit: "%",
    deadline: "",
    category: "Energy"
  });

  const addGoal = () => {
    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      targetValue: parseFloat(newGoal.targetValue),
      currentValue: 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      category: newGoal.category
    };
    setGoals([...goals, goal]);
    setIsAddGoalOpen(false);
    setNewGoal({ title: "", targetValue: "", unit: "%", deadline: "", category: "Energy" });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Energy: "bg-blue-100 text-blue-800 border-blue-300",
      Waste: "bg-green-100 text-green-800 border-green-300",
      Environment: "bg-emerald-100 text-emerald-800 border-emerald-300",
      Transportation: "bg-purple-100 text-purple-800 border-purple-300",
      Carbon: "bg-orange-100 text-orange-800 border-orange-300",
      Renewable: "bg-yellow-100 text-yellow-800 border-yellow-300"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status: string) => {
    const styles: { [key: string]: string } = {
      active: "bg-green-500 text-white",
      completed: "bg-blue-500 text-white",
      upcoming: "bg-amber-500 text-white"
    };
    return styles[status] || "bg-gray-500 text-white";
  };

  const daysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Challenges & Goals</h1>
          <p className="text-gray-600">Track your progress and compete with the community</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Trophy className="h-8 w-8 mb-2" />
            <h3 className="text-2xl font-bold">4</h3>
            <p className="text-sm opacity-90">Active Challenges</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <Target className="h-8 w-8 mb-2" />
            <h3 className="text-2xl font-bold">3</h3>
            <p className="text-sm opacity-90">Personal Goals</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CheckCircle2 className="h-8 w-8 mb-2" />
            <h3 className="text-2xl font-bold">1</h3>
            <p className="text-sm opacity-90">Completed</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <Zap className="h-8 w-8 mb-2" />
            <h3 className="text-2xl font-bold">1850</h3>
            <p className="text-sm opacity-90">Points Earned</p>
          </Card>
        </div>

        {/* Active Challenges */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Community Challenges</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id} className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{challenge.title}</h3>
                      <Badge className={getStatusBadge(challenge.status)}>
                        {challenge.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
                    <Badge className={`${getCategoryColor(challenge.category)} border`}>
                      {challenge.category}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {challenge.currentProgress}/{challenge.targetValue}
                      </span>
                    </div>
                    <Progress 
                      value={(challenge.currentProgress / challenge.targetValue) * 100} 
                      className="h-2"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{daysRemaining(challenge.endDate)} days left</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Trophy className="h-4 w-4" />
                      <span>{challenge.rewardPoints} points</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-sm text-gray-600">
                      {challenge.participants.toLocaleString()} participants
                    </span>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      {challenge.status === 'completed' ? 'View Results' : 
                       challenge.status === 'upcoming' ? 'Join Challenge' : 
                       'Update Progress'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Personal Goals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">My Personal Goals</h2>
            <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 gap-2">
                  <Plus className="h-5 w-5" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Goal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Goal Title</Label>
                    <Input
                      placeholder="e.g., Reduce energy by 20%"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Target Value</Label>
                      <Input
                        type="number"
                        placeholder="20"
                        value={newGoal.targetValue}
                        onChange={(e) => setNewGoal({...newGoal, targetValue: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Input
                        placeholder="%, kg, kWh"
                        value={newGoal.unit}
                        onChange={(e) => setNewGoal({...newGoal, unit: e.target.value})}
                        className="mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Deadline</Label>
                    <Input
                      type="date"
                      value={newGoal.deadline}
                      onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                      className="mt-2"
                    />
                  </div>
                  <Button onClick={addGoal} className="w-full bg-green-600 hover:bg-green-700">
                    Create Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {goals.map((goal) => {
              const progress = (goal.currentValue / goal.targetValue) * 100;
              const isReverse = goal.category === "Carbon"; // Lower is better for carbon
              const displayProgress = isReverse ? 100 - progress : progress;
              
              return (
                <Card key={goal.id} className="p-6 bg-white">
                  <div className="flex items-start justify-between mb-4">
                    <Target className="h-8 w-8 text-green-600" />
                    <Badge className={getCategoryColor(goal.category)}>
                      {goal.category}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-gray-800 mb-2">{goal.title}</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold text-gray-800">
                        {goal.currentValue}{goal.unit}
                      </span>
                      <span className="text-sm text-gray-600">
                        Target: {goal.targetValue}{goal.unit}
                      </span>
                    </div>
                    <Progress value={Math.min(displayProgress, 100)} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {new Date(goal.deadline).toLocaleDateString()}</span>
                  </div>

                  <Button className="w-full mt-4" variant="outline" size="sm">
                    Update Progress
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
          <h3 className="text-xl font-bold mb-4 text-amber-800">🏆 Recent Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 p-4 rounded-lg flex items-center gap-3">
              <div className="text-3xl">⚡</div>
              <div>
                <h4 className="font-semibold text-gray-800">Energy Saver</h4>
                <p className="text-sm text-gray-600">Reduced energy by 10%</p>
              </div>
            </div>
            <div className="bg-white/70 p-4 rounded-lg flex items-center gap-3">
              <div className="text-3xl">🌱</div>
              <div>
                <h4 className="font-semibold text-gray-800">Green Warrior</h4>
                <p className="text-sm text-gray-600">Completed 5 challenges</p>
              </div>
            </div>
            <div className="bg-white/70 p-4 rounded-lg flex items-center gap-3">
              <div className="text-3xl">🎯</div>
              <div>
                <h4 className="font-semibold text-gray-800">Goal Crusher</h4>
                <p className="text-sm text-gray-600">Achieved 3 personal goals</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChallengesGoals;
