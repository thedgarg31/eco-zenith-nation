import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Refrigerator, 
  Fan, 
  Tv, 
  Laptop, 
  Lightbulb,
  Wind,
  Zap,
  DollarSign,
  Leaf
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Appliance {
  id: string;
  name: string;
  icon: any;
  wattage: number;
  hoursPerDay: number;
  enabled: boolean;
  color: string;
}

const EnergySimulator = () => {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: "1", name: "Refrigerator", icon: Refrigerator, wattage: 150, hoursPerDay: 24, enabled: true, color: "blue" },
    { id: "2", name: "Air Conditioner", icon: Wind, wattage: 3500, hoursPerDay: 8, enabled: true, color: "cyan" },
    { id: "3", name: "Television", icon: Tv, wattage: 100, hoursPerDay: 5, enabled: true, color: "purple" },
    { id: "4", name: "Ceiling Fan", icon: Fan, wattage: 75, hoursPerDay: 12, enabled: true, color: "green" },
    { id: "5", name: "LED Lights (10)", icon: Lightbulb, wattage: 100, hoursPerDay: 6, enabled: true, color: "yellow" },
    { id: "6", name: "Laptop", icon: Laptop, wattage: 65, hoursPerDay: 8, enabled: true, color: "gray" },
  ]);

  const [electricityRate, setElectricityRate] = useState(0.13); // $ per kWh

  const toggleAppliance = (id: string) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, enabled: !app.enabled } : app
    ));
  };

  const updateHours = (id: string, hours: number[]) => {
    setAppliances(appliances.map(app => 
      app.id === id ? { ...app, hoursPerDay: hours[0] } : app
    ));
  };

  const calculateConsumption = () => {
    const dailyKWh = appliances
      .filter(app => app.enabled)
      .reduce((sum, app) => sum + (app.wattage * app.hoursPerDay) / 1000, 0);
    
    const monthlyKWh = dailyKWh * 30;
    const yearlyKWh = dailyKWh * 365;
    const monthlyCost = monthlyKWh * electricityRate;
    const yearlyCost = yearlyKWh * electricityRate;
    const carbonFootprint = monthlyKWh * 0.92; // kg CO2 per kWh

    return {
      dailyKWh: dailyKWh.toFixed(2),
      monthlyKWh: monthlyKWh.toFixed(2),
      yearlyKWh: yearlyKWh.toFixed(2),
      monthlyCost: monthlyCost.toFixed(2),
      yearlyCost: yearlyCost.toFixed(2),
      carbonFootprint: carbonFootprint.toFixed(2)
    };
  };

  const results = calculateConsumption();

  // Calculate optimal scenario (all efficient settings)
  const calculateOptimal = () => {
    const optimizedAppliances = appliances.map(app => ({
      ...app,
      hoursPerDay: app.name === "Refrigerator" ? 24 : 
                   app.name === "Air Conditioner" ? 4 : 
                   app.name === "Television" ? 3 :
                   app.name === "Ceiling Fan" ? 6 :
                   app.name === "LED Lights (10)" ? 4 :
                   app.name === "Laptop" ? 6 : app.hoursPerDay
    }));

    const optimalDaily = optimizedAppliances
      .filter(app => app.enabled)
      .reduce((sum, app) => sum + (app.wattage * app.hoursPerDay) / 1000, 0);
    
    return {
      monthlyKWh: (optimalDaily * 30).toFixed(2),
      monthlyCost: (optimalDaily * 30 * electricityRate).toFixed(2)
    };
  };

  const optimal = calculateOptimal();
  const potentialSavings = (parseFloat(results.monthlyCost) - parseFloat(optimal.monthlyCost)).toFixed(2);
  const savingsPercentage = ((parseFloat(potentialSavings) / parseFloat(results.monthlyCost)) * 100).toFixed(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Energy Consumption Simulator</h1>
          <p className="text-gray-600">Simulate your home's energy usage and discover optimization opportunities</p>
        </div>

        {/* Results Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-start justify-between mb-2">
              <Zap className="h-8 w-8" />
              <span className="text-sm opacity-90">Monthly</span>
            </div>
            <h3 className="text-3xl font-bold">{results.monthlyKWh}</h3>
            <p className="text-sm opacity-90">kWh consumed</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-start justify-between mb-2">
              <DollarSign className="h-8 w-8" />
              <span className="text-sm opacity-90">Monthly</span>
            </div>
            <h3 className="text-3xl font-bold">${results.monthlyCost}</h3>
            <p className="text-sm opacity-90">electricity cost</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-amber-500 to-orange-600 text-white">
            <div className="flex items-start justify-between mb-2">
              <Leaf className="h-8 w-8" />
              <span className="text-sm opacity-90">Monthly</span>
            </div>
            <h3 className="text-3xl font-bold">{results.carbonFootprint}</h3>
            <p className="text-sm opacity-90">kg CO₂ emissions</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-start justify-between mb-2">
              <DollarSign className="h-8 w-8" />
              <span className="text-sm opacity-90">Yearly</span>
            </div>
            <h3 className="text-3xl font-bold">${results.yearlyCost}</h3>
            <p className="text-sm opacity-90">annual cost</p>
          </Card>
        </div>

        {/* Optimization Potential */}
        {parseFloat(potentialSavings) > 0 && (
          <Card className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-green-800 mb-2">💡 Optimization Potential</h3>
                <p className="text-gray-700">
                  You could save <span className="font-bold text-green-600">${potentialSavings}/month</span> ({savingsPercentage}%) by optimizing your usage!
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Optimal monthly cost: ${optimal.monthlyCost} ({optimal.monthlyKWh} kWh)
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">{savingsPercentage}%</div>
                <p className="text-sm text-gray-600">Savings</p>
              </div>
            </div>
          </Card>
        )}

        {/* Appliance Controls */}
        <Card className="p-6 bg-white">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Configure Your Appliances</h2>
          <div className="space-y-6">
            {appliances.map((appliance) => (
              <div key={appliance.id} className={`p-4 rounded-lg border-2 ${
                appliance.enabled ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    appliance.enabled ? 'bg-green-100' : 'bg-gray-200'
                  }`}>
                    <appliance.icon className={`h-6 w-6 ${
                      appliance.enabled ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-800">{appliance.name}</h3>
                        <p className="text-sm text-gray-600">{appliance.wattage}W</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`switch-${appliance.id}`} className="text-sm">
                          {appliance.enabled ? 'On' : 'Off'}
                        </Label>
                        <Switch
                          id={`switch-${appliance.id}`}
                          checked={appliance.enabled}
                          onCheckedChange={() => toggleAppliance(appliance.id)}
                        />
                      </div>
                    </div>

                    {appliance.enabled && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm text-gray-600">Hours per day: {appliance.hoursPerDay}h</Label>
                          <span className="text-sm font-semibold text-gray-800">
                            {((appliance.wattage * appliance.hoursPerDay * 30) / 1000).toFixed(1)} kWh/month
                          </span>
                        </div>
                        <Slider
                          value={[appliance.hoursPerDay]}
                          onValueChange={(value) => updateHours(appliance.id, value)}
                          max={24}
                          min={0}
                          step={0.5}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Electricity Rate */}
        <Card className="p-6 bg-white">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Electricity Rate</h3>
          <div className="flex items-center gap-4">
            <Label className="text-gray-600">Rate per kWh: ${electricityRate.toFixed(3)}</Label>
            <Input
              type="number"
              value={electricityRate}
              onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0.13)}
              step="0.01"
              min="0"
              className="w-32"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Average US rate: $0.13/kWh</p>
        </Card>

        {/* Energy Breakdown */}
        <Card className="p-6 bg-white">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Energy Consumption Breakdown</h3>
          <div className="space-y-3">
            {appliances.filter(app => app.enabled).map((appliance) => {
              const monthlyKWh = (appliance.wattage * appliance.hoursPerDay * 30) / 1000;
              const percentage = (monthlyKWh / parseFloat(results.monthlyKWh)) * 100;
              
              return (
                <div key={appliance.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{appliance.name}</span>
                    <span className="text-sm text-gray-600">{monthlyKWh.toFixed(1)} kWh ({percentage.toFixed(0)}%)</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-blue-800">💡 Smart Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Reduce AC Usage</h4>
              <p className="text-sm text-gray-600">Set AC to 24°C instead of 20°C to save up to 30% energy</p>
            </div>
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Switch to LED</h4>
              <p className="text-sm text-gray-600">LED bulbs use 75% less energy than traditional bulbs</p>
            </div>
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Unplug Devices</h4>
              <p className="text-sm text-gray-600">Phantom power can add 10% to your electricity bill</p>
            </div>
            <div className="bg-white/70 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Use Fans Wisely</h4>
              <p className="text-sm text-gray-600">Ceiling fans use 98% less energy than AC units</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnergySimulator;
