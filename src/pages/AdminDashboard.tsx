import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Target, BarChart3, Shield, User, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface User {
  id: string;
  email: string;
  fullName: string;
  level: number;
  coolPoints: number;
  totalCo2Saved: number;
  role: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from your backend API
    // For demonstration, we'll use mock data
    const fetchUsers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockUsers: User[] = [
          {
            id: "1",
            email: "admin@example.com",
            fullName: "Admin User",
            level: 10,
            coolPoints: 5000,
            totalCo2Saved: 1200,
            role: "admin",
            createdAt: "2023-01-15T10:30:00Z"
          },
          {
            id: "2",
            email: "user1@example.com",
            fullName: "John Doe",
            level: 5,
            coolPoints: 1250,
            totalCo2Saved: 145,
            role: "user",
            createdAt: "2023-03-22T14:15:00Z"
          },
          {
            id: "3",
            email: "user2@example.com",
            fullName: "Jane Smith",
            level: 3,
            coolPoints: 875,
            totalCo2Saved: 92,
            role: "user",
            createdAt: "2023-05-10T09:45:00Z"
          },
          {
            id: "4",
            email: "user3@example.com",
            fullName: "Bob Johnson",
            level: 7,
            coolPoints: 2100,
            totalCo2Saved: 320,
            role: "user",
            createdAt: "2023-07-18T16:20:00Z"
          }
        ];
        
        setUsers(mockUsers);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const handleDeleteUser = (userId: string) => {
    // In a real app, you would make an API call to delete the user
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleMakeAdmin = (userId: string) => {
    // In a real app, you would make an API call to update the user's role
    setUsers(users.map(u => 
      u.id === userId ? { ...u, role: 'admin' } : u
    ));
  };

  if (user?.role !== 'admin') {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users, challenges, and platform settings</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Challenges</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">3 ending soon</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Actions</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52,389</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CO₂ Saved</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4M kg</div>
            <p className="text-xs text-muted-foreground">+22% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>View and manage all users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-4">Loading users...</div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{user.fullName}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                      {user.role !== 'admin' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleMakeAdmin(user.id)}
                        >
                          Make Admin
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Platform Management</CardTitle>
            <CardDescription>Manage platform settings and configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">User Management</h3>
                <p className="text-sm text-muted-foreground">View and manage all users</p>
              </div>
              <Button>Manage</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Challenge Management</h3>
                <p className="text-sm text-muted-foreground">Create and edit challenges</p>
              </div>
              <Button>Manage</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Action Categories</h3>
                <p className="text-sm text-muted-foreground">Manage action types and CO₂ calculations</p>
              </div>
              <Button>Manage</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div>
                <h3 className="font-medium">Platform Reports</h3>
                <p className="text-sm text-muted-foreground">Generate and export platform analytics</p>
              </div>
              <Button>View</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;