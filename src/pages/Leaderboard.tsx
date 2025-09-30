import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

const Leaderboard = () => {
  const topUsers = [
    { rank: 1, name: "Sarah Green", co2: 342, avatar: "seed1" },
    { rank: 2, name: "John Climate", co2: 298, avatar: "seed2" },
    { rank: 3, name: "Emma Earth", co2: 276, avatar: "seed3" },
  ];
  
  const otherUsers = [
    { rank: 4, name: "Michael Sustain", co2: 245, avatar: "seed4" },
    { rank: 5, name: "Lisa Nature", co2: 223, avatar: "seed5" },
    { rank: 6, name: "David Carbon", co2: 198, avatar: "seed6" },
    { rank: 7, name: "Sophie Planet", co2: 187, avatar: "seed7" },
    { rank: 8, name: "James Eco", co2: 165, avatar: "seed8" },
  ];
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">See how you rank among climate champions</p>
        </div>
        
        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button variant="default" size="sm">Global</Button>
          <Button variant="ghost" size="sm">Country</Button>
          <Button variant="ghost" size="sm">City</Button>
          <Button variant="ghost" size="sm">Friends</Button>
        </div>
        
        {/* Podium */}
        <div className="mb-12 flex items-end justify-center gap-4">
          {/* 2nd Place */}
          <Card className="w-40 p-6 bg-gradient-to-br from-card to-secondary border-accent/20 text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-4 ring-accent">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topUsers[1].avatar}`} />
                  <AvatarFallback>{topUsers[1].name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <Medal className="h-5 w-5 text-accent-foreground" />
                </div>
              </div>
            </div>
            <div className="font-semibold mb-1">{topUsers[1].name}</div>
            <div className="text-2xl font-bold text-accent">{topUsers[1].co2}</div>
            <div className="text-xs text-muted-foreground">kg CO₂eq</div>
          </Card>
          
          {/* 1st Place */}
          <Card className="w-40 p-6 bg-gradient-to-br from-primary/20 to-secondary border-primary text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 ring-4 ring-primary">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topUsers[0].avatar}`} />
                  <AvatarFallback>{topUsers[0].name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-glow">
                  <Trophy className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
            </div>
            <div className="font-semibold mb-1">{topUsers[0].name}</div>
            <div className="text-3xl font-bold text-primary">{topUsers[0].co2}</div>
            <div className="text-xs text-muted-foreground">kg CO₂eq</div>
          </Card>
          
          {/* 3rd Place */}
          <Card className="w-40 p-6 bg-gradient-to-br from-card to-secondary border-accent/20 text-center">
            <div className="mb-4 flex justify-center">
              <div className="relative">
                <Avatar className="h-20 w-20 ring-4 ring-accent">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topUsers[2].avatar}`} />
                  <AvatarFallback>{topUsers[2].name[0]}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                  <Award className="h-5 w-5 text-accent-foreground" />
                </div>
              </div>
            </div>
            <div className="font-semibold mb-1">{topUsers[2].name}</div>
            <div className="text-2xl font-bold text-accent">{topUsers[2].co2}</div>
            <div className="text-xs text-muted-foreground">kg CO₂eq</div>
          </Card>
        </div>
        
        {/* Ranked List */}
        <Card className="p-6 bg-card/50 backdrop-blur-sm">
          <div className="space-y-4">
            {otherUsers.map((user) => (
              <div 
                key={user.rank}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 text-center font-bold text-muted-foreground">
                    #{user.rank}
                  </div>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.avatar}`} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="font-semibold">{user.name}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary">{user.co2}</div>
                  <div className="text-xs text-muted-foreground">kg CO₂eq</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
