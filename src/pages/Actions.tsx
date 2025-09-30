import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Zap, UtensilsCrossed, Trash2, ShoppingBag, ChevronRight } from "lucide-react";

const Actions = () => {
  const categories = [
    {
      icon: Car,
      name: "Travel",
      description: "Track sustainable transportation choices",
      color: "text-primary",
      bgColor: "bg-primary/20"
    },
    {
      icon: Zap,
      name: "Energy",
      description: "Monitor electricity and power usage",
      color: "text-accent",
      bgColor: "bg-accent/20"
    },
    {
      icon: UtensilsCrossed,
      name: "Food",
      description: "Log sustainable eating habits",
      color: "text-primary",
      bgColor: "bg-primary/20"
    },
    {
      icon: Trash2,
      name: "Waste",
      description: "Track recycling and waste reduction",
      color: "text-accent",
      bgColor: "bg-accent/20"
    },
    {
      icon: ShoppingBag,
      name: "Shopping",
      description: "Record sustainable purchases",
      color: "text-primary",
      bgColor: "bg-primary/20"
    }
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Take Climate Action</h1>
          <p className="text-muted-foreground">Choose a category to log your sustainable actions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card 
                key={category.name}
                className="p-6 bg-gradient-to-br from-card to-secondary border-primary/20 hover:scale-105 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-14 w-14 rounded-2xl ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-7 w-7 ${category.color}`} />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </Card>
            );
          })}
        </div>
        
        {/* Action Logging Form Placeholder */}
        <Card className="p-8 bg-gradient-to-br from-card to-secondary border-primary/20">
          <h2 className="text-2xl font-bold mb-6">Log Your Action</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Instead of</label>
              <select className="w-full h-12 rounded-lg bg-background border border-input px-4">
                <option>Select high emission option</option>
                <option>Car (Petrol)</option>
                <option>Car (Diesel)</option>
                <option>Flight</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">I travelled by</label>
              <select className="w-full h-12 rounded-lg bg-background border border-input px-4">
                <option>Select low emission option</option>
                <option>Bicycle</option>
                <option>Public Bus</option>
                <option>Train</option>
                <option>Electric Car</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Distance (km)</label>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon">-</Button>
                <input 
                  type="number" 
                  className="flex-1 h-12 rounded-lg bg-background border border-input px-4 text-center"
                  defaultValue={10}
                />
                <Button variant="outline" size="icon">+</Button>
              </div>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-sm text-muted-foreground mb-1">CO₂ Saved</div>
              <div className="text-3xl font-bold text-primary">1.4 kg CO₂eq</div>
            </div>
            
            <Button size="lg" className="w-full shadow-glow">
              Log Action
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Actions;
