import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car, Home, Utensils, ShoppingBag, Plane, Leaf } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CarbonCalculator = () => {
  const [activeTab, setActiveTab] = useState("transportation");
  const [results, setResults] = useState<any>(null);

  // Transportation
  const [carMiles, setCarMiles] = useState("");
  const [publicTransit, setPublicTransit] = useState("");
  const [flights, setFlights] = useState("");

  // Home Energy
  const [electricity, setElectricity] = useState("");
  const [naturalGas, setNaturalGas] = useState("");
  const [heating, setHeating] = useState("");

  // Food & Lifestyle
  const [meatConsumption, setMeatConsumption] = useState("");
  const [localFood, setLocalFood] = useState("");
  const [shopping, setShopping] = useState("");

  const calculateFootprint = () => {
    // Simple calculation (replace with actual formulas)
    const transportCO2 = (parseFloat(carMiles) || 0) * 0.404 + 
                         (parseFloat(publicTransit) || 0) * 0.089 +
                         (parseFloat(flights) || 0) * 0.257;
    
    const homeCO2 = (parseFloat(electricity) || 0) * 0.92 +
                    (parseFloat(naturalGas) || 0) * 5.3 +
                    (parseFloat(heating) || 0) * 2.3;
    
    const lifestyleCO2 = (parseFloat(meatConsumption) || 0) * 6.61 +
                         (parseFloat(shopping) || 0) * 0.5;
    
    const total = transportCO2 + homeCO2 + lifestyleCO2;
    const average = 16000; // Average US carbon footprint in kg/year
    
    setResults({
      total: total.toFixed(2),
      transportation: transportCO2.toFixed(2),
      home: homeCO2.toFixed(2),
      lifestyle: lifestyleCO2.toFixed(2),
      comparison: ((total / average) * 100).toFixed(0),
      trees: Math.ceil(total / 21.77) // Trees needed to offset
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Carbon Footprint Calculator</h1>
          <p className="text-gray-600">Calculate your environmental impact and discover ways to reduce it</p>
        </div>

        {/* Calculator Card */}
        <Card className="p-6 bg-white">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="transportation" className="gap-2">
                <Car className="h-4 w-4" />
                Transportation
              </TabsTrigger>
              <TabsTrigger value="home" className="gap-2">
                <Home className="h-4 w-4" />
                Home Energy
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="gap-2">
                <Utensils className="h-4 w-4" />
                Lifestyle
              </TabsTrigger>
            </TabsList>

            {/* Transportation Tab */}
            <TabsContent value="transportation" className="space-y-4">
              <div>
                <Label htmlFor="carMiles">Car Miles per Week</Label>
                <Input
                  id="carMiles"
                  type="number"
                  placeholder="e.g., 100"
                  value={carMiles}
                  onChange={(e) => setCarMiles(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Average: 200 miles/week</p>
              </div>

              <div>
                <Label htmlFor="publicTransit">Public Transit Miles per Week</Label>
                <Input
                  id="publicTransit"
                  type="number"
                  placeholder="e.g., 50"
                  value={publicTransit}
                  onChange={(e) => setPublicTransit(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="flights">Flight Hours per Year</Label>
                <Input
                  id="flights"
                  type="number"
                  placeholder="e.g., 10"
                  value={flights}
                  onChange={(e) => setFlights(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">1 hour ≈ 90 kg CO₂</p>
              </div>
            </TabsContent>

            {/* Home Energy Tab */}
            <TabsContent value="home" className="space-y-4">
              <div>
                <Label htmlFor="electricity">Monthly Electricity Usage (kWh)</Label>
                <Input
                  id="electricity"
                  type="number"
                  placeholder="e.g., 900"
                  value={electricity}
                  onChange={(e) => setElectricity(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Average US household: 877 kWh/month</p>
              </div>

              <div>
                <Label htmlFor="naturalGas">Monthly Natural Gas (therms)</Label>
                <Input
                  id="naturalGas"
                  type="number"
                  placeholder="e.g., 40"
                  value={naturalGas}
                  onChange={(e) => setNaturalGas(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="heating">Heating Oil (gallons/year)</Label>
                <Input
                  id="heating"
                  type="number"
                  placeholder="e.g., 500"
                  value={heating}
                  onChange={(e) => setHeating(e.target.value)}
                  className="mt-2"
                />
              </div>
            </TabsContent>

            {/* Lifestyle Tab */}
            <TabsContent value="lifestyle" className="space-y-4">
              <div>
                <Label htmlFor="meatConsumption">Meat Consumption (servings/week)</Label>
                <Input
                  id="meatConsumption"
                  type="number"
                  placeholder="e.g., 7"
                  value={meatConsumption}
                  onChange={(e) => setMeatConsumption(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">Reducing meat can significantly lower your footprint</p>
              </div>

              <div>
                <Label htmlFor="localFood">Local/Organic Food (%)</Label>
                <Input
                  id="localFood"
                  type="number"
                  placeholder="e.g., 30"
                  value={localFood}
                  onChange={(e) => setLocalFood(e.target.value)}
                  className="mt-2"
                  max="100"
                />
              </div>

              <div>
                <Label htmlFor="shopping">Monthly Shopping Spend ($)</Label>
                <Input
                  id="shopping"
                  type="number"
                  placeholder="e.g., 500"
                  value={shopping}
                  onChange={(e) => setShopping(e.target.value)}
                  className="mt-2"
                />
              </div>
            </TabsContent>
          </Tabs>

          <Button 
            onClick={calculateFootprint}
            className="w-full mt-6 bg-green-600 hover:bg-green-700"
            size="lg"
          >
            Calculate My Carbon Footprint
          </Button>
        </Card>

        {/* Results */}
        {results && (
          <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <h2 className="text-2xl font-bold mb-6">Your Carbon Footprint Results</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90">Annual Carbon Footprint</p>
                <p className="text-4xl font-bold mt-2">{results.total} kg</p>
                <p className="text-sm mt-2">CO₂ equivalent per year</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm opacity-90">Comparison to Average</p>
                <p className="text-4xl font-bold mt-2">{results.comparison}%</p>
                <Progress value={parseInt(results.comparison)} className="mt-2" />
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  <span>Transportation</span>
                </div>
                <span className="font-bold">{results.transportation} kg</span>
              </div>

              <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  <span>Home Energy</span>
                </div>
                <span className="font-bold">{results.home} kg</span>
              </div>

              <div className="flex justify-between items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Lifestyle</span>
                </div>
                <span className="font-bold">{results.lifestyle} kg</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <Leaf className="h-6 w-6" />
                <h3 className="text-lg font-semibold">Offset Recommendation</h3>
              </div>
              <p className="text-sm opacity-90">
                Plant <span className="font-bold text-xl">{results.trees} trees</span> to offset your annual carbon footprint
              </p>
              <Button className="mt-4 bg-white text-green-600 hover:bg-gray-100">
                Find Tree Planting Programs
              </Button>
            </div>
          </Card>
        )}

        {/* Tips */}
        <Card className="p-6 bg-white">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Quick Tips to Reduce Your Footprint</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: Car, tip: "Use public transport or carpool 2-3 times a week", impact: "Save 1,000 kg CO₂/year" },
              { icon: Home, tip: "Switch to LED bulbs throughout your home", impact: "Save 300 kg CO₂/year" },
              { icon: Utensils, tip: "Reduce meat consumption to 3 times a week", impact: "Save 500 kg CO₂/year" },
              { icon: ShoppingBag, tip: "Buy local and seasonal produce", impact: "Save 200 kg CO₂/year" }
            ].map((item, index) => (
              <div key={index} className="flex gap-3 p-4 bg-green-50 rounded-lg">
                <div className="bg-green-100 p-2 rounded-full h-fit">
                  <item.icon className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.tip}</p>
                  <p className="text-sm text-green-600 mt-1">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CarbonCalculator;
