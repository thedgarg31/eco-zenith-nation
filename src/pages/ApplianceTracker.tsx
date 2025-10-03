import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, TrendingUp, DollarSign, Zap, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Appliance {
  id: string;
  name: string;
  category: string;
  wattage: number;
  hoursPerDay: number;
  efficiencyRating: string;
  yearPurchased: number;
  monthlyCost: number;
  suggestion: string;
}

const ApplianceTracker = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([
    {
      id: "1",
      name: "Refrigerator",
      category: "refrigerator",
      wattage: 150,
      hoursPerDay: 24,
      efficiencyRating: "B",
      yearPurchased: 2015,
      monthlyCost: 32.4,
      suggestion: "Consider upgrading to an Energy Star rated model to save $15/month"
    },
    {
      id: "2",
      name: "Washing Machine",
      category: "washing_machine",
      wattage: 500,
      hoursPerDay: 1,
      efficiencyRating: "A",
      yearPurchased: 2020,
      monthlyCost: 13.5,
      suggestion: "Good efficiency! Run during off-peak hours to save more"
    },
    {
      id: "3",
      name: "Air Conditioner",
      category: "ac",
      wattage: 3500,
      hoursPerDay: 8,
      efficiencyRating: "C",
      yearPurchased: 2012,
      monthlyCost: 252,
      suggestion: "Old and inefficient. Upgrade to save up to $120/month"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppliance, setNewAppliance] = useState({
    name: "",
    category: "",
    wattage: "",
    hoursPerDay: "",
    efficiencyRating: "",
    yearPurchased: ""
  });

  const calculateMonthlyCost = (wattage: number, hoursPerDay: number) => {
    const kWhPerDay = (wattage * hoursPerDay) / 1000;
    const kWhPerMonth = kWhPerDay * 30;
    const costPerKWh = 0.13; // Average US rate
    return (kWhPerMonth * costPerKWh).toFixed(2);
  };

  const getEfficiencyColor = (rating: string) => {
    const colors: { [key: string]: string } = {
      "A+": "bg-green-100 text-green-800 border-green-300",
      "A": "bg-green-100 text-green-700 border-green-200",
      "B": "bg-yellow-100 text-yellow-800 border-yellow-300",
      "C": "bg-orange-100 text-orange-800 border-orange-300",
      "D": "bg-red-100 text-red-800 border-red-300"
    };
    return colors[rating] || "bg-gray-100 text-gray-800";
  };

  const getPriorityColor = (suggestion: string) => {
    if (suggestion.includes("save up to")) return "border-red-300 bg-red-50";
    if (suggestion.includes("Consider")) return "border-yellow-300 bg-yellow-50";
    return "border-green-300 bg-green-50";
  };

  const addAppliance = () => {
    const wattage = parseFloat(newAppliance.wattage);
    const hoursPerDay = parseFloat(newAppliance.hoursPerDay);
    const monthlyCost = parseFloat(calculateMonthlyCost(wattage, hoursPerDay));
    
    const appliance: Appliance = {
      id: Date.now().toString(),
      name: newAppliance.name,
      category: newAppliance.category,
      wattage,
      hoursPerDay,
      efficiencyRating: newAppliance.efficiencyRating,
      yearPurchased: parseInt(newAppliance.yearPurchased),
      monthlyCost,
      suggestion: "Monitor usage for personalized recommendations"
    };

    setAppliances([...appliances, appliance]);
    setIsAddDialogOpen(false);
    setNewAppliance({
      name: "",
      category: "",
      wattage: "",
      hoursPerDay: "",
      efficiencyRating: "",
      yearPurchased: ""
    });
  };

  const deleteAppliance = (id: string) => {
    setAppliances(appliances.filter(a => a.id !== id));
  };

  const totalMonthlyCost = appliances.reduce((sum, a) => sum + a.monthlyCost, 0);
  const totalWattage = appliances.reduce((sum, a) => sum + (a.wattage * a.hoursPerDay), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-green-800">Appliance Efficiency Tracker</h1>
            <p className="text-gray-600 mt-2">Monitor and optimize your appliance energy usage</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 gap-2">
                <Plus className="h-5 w-5" />
                Add Appliance
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Appliance</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Appliance Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Kitchen Refrigerator"
                    value={newAppliance.name}
                    onChange={(e) => setNewAppliance({...newAppliance, name: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newAppliance.category} onValueChange={(v) => setNewAppliance({...newAppliance, category: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="refrigerator">Refrigerator</SelectItem>
                      <SelectItem value="washing_machine">Washing Machine</SelectItem>
                      <SelectItem value="dryer">Dryer</SelectItem>
                      <SelectItem value="ac">Air Conditioner</SelectItem>
                      <SelectItem value="heater">Heater</SelectItem>
                      <SelectItem value="tv">Television</SelectItem>
                      <SelectItem value="computer">Computer</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="wattage">Wattage (W)</Label>
                  <Input
                    id="wattage"
                    type="number"
                    placeholder="e.g., 150"
                    value={newAppliance.wattage}
                    onChange={(e) => setNewAppliance({...newAppliance, wattage: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="hoursPerDay">Hours Used Per Day</Label>
                  <Input
                    id="hoursPerDay"
                    type="number"
                    placeholder="e.g., 8"
                    value={newAppliance.hoursPerDay}
                    onChange={(e) => setNewAppliance({...newAppliance, hoursPerDay: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="efficiency">Efficiency Rating</Label>
                  <Select value={newAppliance.efficiencyRating} onValueChange={(v) => setNewAppliance({...newAppliance, efficiencyRating: v})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+ (Most Efficient)</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D (Least Efficient)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="year">Year Purchased</Label>
                  <Input
                    id="year"
                    type="number"
                    placeholder="e.g., 2020"
                    value={newAppliance.yearPurchased}
                    onChange={(e) => setNewAppliance({...newAppliance, yearPurchased: e.target.value})}
                    className="mt-2"
                  />
                </div>

                <Button onClick={addAppliance} className="w-full bg-green-600 hover:bg-green-700">
                  Add Appliance
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Monthly Cost</p>
                <h3 className="text-3xl font-bold mt-2 text-gray-800">${totalMonthlyCost.toFixed(2)}</h3>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appliances</p>
                <h3 className="text-3xl font-bold mt-2 text-gray-800">{appliances.length}</h3>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600">Potential Savings</p>
                <h3 className="text-3xl font-bold mt-2 text-green-600">$135/mo</h3>
              </div>
              <div className="bg-amber-50 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Appliances List */}
        <div className="space-y-4">
          {appliances.map((appliance) => (
            <Card key={appliance.id} className={`p-6 border-2 ${getPriorityColor(appliance.suggestion)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-800">{appliance.name}</h3>
                    <Badge className={`${getEfficiencyColor(appliance.efficiencyRating)} border`}>
                      {appliance.efficiencyRating}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {appliance.category.replace('_', ' ')} • {appliance.yearPurchased}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Power</p>
                      <p className="font-semibold text-gray-800">{appliance.wattage}W</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Daily Usage</p>
                      <p className="font-semibold text-gray-800">{appliance.hoursPerDay}h</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly Cost</p>
                      <p className="font-semibold text-gray-800">${appliance.monthlyCost.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Age</p>
                      <p className="font-semibold text-gray-800">{new Date().getFullYear() - appliance.yearPurchased} years</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 bg-white/50 p-3 rounded-lg">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">AI Recommendation</p>
                      <p className="text-sm text-gray-700 mt-1">{appliance.suggestion}</p>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteAppliance(appliance.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Energy Saving Tips */}
        <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <h3 className="text-xl font-bold mb-4">Energy Saving Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">🔌 Unplug When Not in Use</h4>
              <p className="text-sm opacity-90">Phantom power can account for 5-10% of your energy bill</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">❄️ Maintain Your Appliances</h4>
              <p className="text-sm opacity-90">Regular maintenance can improve efficiency by 15-20%</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">⏰ Use Off-Peak Hours</h4>
              <p className="text-sm opacity-90">Run heavy appliances during off-peak times to save money</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold mb-2">⭐ Upgrade to Energy Star</h4>
              <p className="text-sm opacity-90">Energy Star appliances use 10-50% less energy</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApplianceTracker;
