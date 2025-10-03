import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Target, Trophy, BarChart3, Zap, LogIn, LogOut, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

export const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent">
            <Zap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Cool The Globe
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button 
                  variant={isActive("/dashboard") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link to="/actions">
                <Button 
                  variant={isActive("/actions") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Target className="h-4 w-4" />
                  Take Action
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button 
                  variant={isActive("/leaderboard") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </Button>
              </Link>
              <Link to="/reports">
                <Button 
                  variant={isActive("/reports") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <BarChart3 className="h-4 w-4" />
                  Reports
                </Button>
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin">
                  <Button 
                    variant={isActive("/admin") ? "default" : "ghost"}
                    className="gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Button>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/actions">
                <Button 
                  variant={isActive("/actions") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Target className="h-4 w-4" />
                  Actions
                </Button>
              </Link>
              <Link to="/leaderboard">
                <Button 
                  variant={isActive("/leaderboard") ? "default" : "ghost"}
                  className="gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Leaderboard
                </Button>
              </Link>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs">🪙</span>
                </div>
                <span className="font-semibold text-foreground">{user.coolPoints.toLocaleString()}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xs">🌱</span>
                </div>
                <span className="font-semibold text-foreground">{user.totalCo2Saved.toFixed(0)} kg</span>
              </div>
              <Avatar className="h-10 w-10 ring-2 ring-primary">
                <AvatarImage src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} />
                <AvatarFallback>{user.fullName?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="default" className="gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};