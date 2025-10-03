import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Zap, 
  TrendingDown, 
  DollarSign, 
  Leaf, 
  Lightbulb, 
  Wind,
  Sun,
  Award,
  Target,
  Users
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const EnergyDashboard = () => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  
  // Mock data - replace with API calls
  const energyData = [
    { name: 'Mon', lighting: 12, appliances: 25, heating: 18, cooling: 15 },
    { name: 'Tue', lighting: 11, appliances: 28, heating: 16, cooling: 14 },
    { name: 'Wed', lighting: 13, appliances: 24, heating: 19, cooling: 16 },
    { name: 'Thu', lighting: 10, appliances: 26, heating: 17, cooling: 15 },
    { name: 'Fri', lighting: 12, appliances: 29, heating: 18, cooling: 17 },
    { name: 'Sat', lighting: 15, appliances: 32, heating: 20, cooling: 19 },
    { name: 'Sun', lighting: 14, appliances: 30, heating: 19, cooling: 18 },
  ];

  const breakdownData = [
    { name: 'Lighting', value: 83, color: '#fbbf24' },
    { name: 'Appliances', value: 194, color: '#3b82f6' },
    { name: 'Heating', value: 127, color: '#ef4444' },
    { name: 'Cooling', value: 114, color: '#10b981' },
  ];

  const totalUsage = breakdownData.reduce((sum, item) => sum + item.value, 0);

  const stats = [
    {
      title: "Total Energy Used",
      value: `${totalUsage} kWh`,
      change: "-12%",
      icon: Zap,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Cost This Month",
      value: "$124.50",
      change: "-8%",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Carbon Footprint",
      value: "245 kg CO₂",
      change: "-15%",
      icon: Leaf,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      title: "Sustainability Score",
      value: "78/100",
      change: "+5",
      icon: Award,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    }
  ];

  const suggestions = [
    {
      title: "Replace Old Bulbs with LEDs",
      description: "Save up to 75% on lighting costs",
      savings: "$15/month",
      priority: "high",
      icon: Lightbulb
    },
    {
      title: "Run Washing Machine Off-Peak",
      description: "Use appliances during 10 PM - 6 AM",
      savings: "$8/month",
      priority: "medium",
      icon: Zap
    },
    {
      title: "Install Smart Thermostat",
      description: "Optimize heating and cooling automatically",
      savings: "$25/month",
      priority: "high",
      icon: Target
    }
  ];

  const badges = [
    { name: "Energy Saver", icon: "⚡", earned: true },
    { name: "Green Warrior", icon: "🌱", earned: true },
    { name: "Carbon Reducer", icon: "🍃", earned: false },
    { name: "Eco Champion", icon: "🏆", earned: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-green-800">Energy Dashboard</h1>
            <p className="text-gray-600 mt-2">Track, optimize, and reduce your energy consumption</p>
          </div>
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
            <TabsList className="bg-white">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 bg-white hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2 text-gray-800">{stat.value}</h3>
                  <p className={`text-sm mt-2 ${stat.change.startsWith('-') || stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                    {stat.change} from last period
                  </p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-full`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy Usage Over Time */}
          <Card className="lg:col-span-2 p-6 bg-white">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Energy Usage Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="lighting" stackId="a" fill="#fbbf24" />
                <Bar dataKey="appliances" stackId="a" fill="#3b82f6" />
                <Bar dataKey="heating" stackId="a" fill="#ef4444" />
                <Bar dataKey="cooling" stackId="a" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie Chart */}
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Usage Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={breakdownData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {breakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* AI Optimization Suggestions */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">AI-Powered Optimization Suggestions</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className={`p-4 rounded-lg border-2 ${
                suggestion.priority === 'high' ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'
              }`}>
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-full">
                    <suggestion.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{suggestion.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-green-600 font-semibold">{suggestion.savings}</span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">Apply</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Gamification & Badges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Your Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <div key={index} className={`p-4 rounded-lg text-center ${
                  badge.earned ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300' : 'bg-gray-100 opacity-50'
                }`}>
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="font-semibold text-gray-800">{badge.name}</p>
                  {!badge.earned && <p className="text-xs text-gray-500 mt-1">Locked</p>}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <h3 className="text-xl font-bold mb-4">Renewable Energy Potential</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Sun className="h-8 w-8" />
                <div>
                  <p className="font-semibold">Solar Panels</p>
                  <p className="text-sm opacity-90">Save $85/month • ROI: 7 years</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Wind className="h-8 w-8" />
                <div>
                  <p className="font-semibold">Wind Energy</p>
                  <p className="text-sm opacity-90">Save $45/month • ROI: 10 years</p>
                </div>
              </div>
              <Button className="w-full mt-4 bg-white text-green-600 hover:bg-gray-100">
                Calculate Your Savings
              </Button>
            </div>
          </Card>
        </div>

        {/* Leaderboard */}
        <Card className="p-6 bg-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Community Leaderboard</h3>
            <Users className="h-6 w-6 text-gray-600" />
          </div>
          <div className="space-y-3">
            {[
              { rank: 1, name: "Sarah Johnson", score: 95, savings: "45%" },
              { rank: 2, name: "You", score: 78, savings: "32%", highlight: true },
              { rank: 3, name: "Mike Chen", score: 72, savings: "28%" },
              { rank: 4, name: "Emma Davis", score: 68, savings: "25%" },
            ].map((user) => (
              <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${
                user.highlight ? 'bg-green-100 border-2 border-green-400' : 'bg-gray-50'
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    user.rank === 2 ? 'bg-gray-300 text-gray-700' :
                    user.rank === 3 ? 'bg-amber-600 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-600">Score: {user.score}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{user.savings}</p>
                  <p className="text-xs text-gray-500">Energy Saved</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnergyDashboard;
