import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2,
  Plus,
  Search,
  TrendingUp,
  Users,
  Leaf
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Post {
  id: string;
  author: string;
  authorAvatar: string;
  title: string;
  content: string;
  category: string;
  likes: number;
  comments: number;
  timestamp: string;
  tags: string[];
}

const CommunityForum = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Sarah Green",
      authorAvatar: "",
      title: "Just installed solar panels - sharing my experience!",
      content: "After 6 months of research, I finally installed solar panels on my roof. The installation took 2 days and I'm already seeing a 40% reduction in my electricity bill. Happy to answer any questions!",
      category: "Success Story",
      likes: 124,
      comments: 23,
      timestamp: "2 hours ago",
      tags: ["solar", "renewable", "savings"]
    },
    {
      id: "2",
      author: "Mike Chen",
      authorAvatar: "",
      title: "Best LED bulbs for home use?",
      content: "Looking to replace all bulbs in my house with LEDs. What brands do you recommend? Budget is around $200 for the whole house.",
      category: "Question",
      likes: 45,
      comments: 18,
      timestamp: "5 hours ago",
      tags: ["lighting", "LED", "energy-saving"]
    },
    {
      id: "3",
      author: "Emma Davis",
      authorAvatar: "",
      title: "DIY composting guide for beginners",
      content: "I've been composting for 2 years now and wanted to share my setup and tips. It's easier than you think and reduces waste by 30%! Here's what you need to get started...",
      category: "Tip",
      likes: 89,
      comments: 12,
      timestamp: "1 day ago",
      tags: ["composting", "waste-reduction", "DIY"]
    },
    {
      id: "4",
      author: "Alex Kumar",
      authorAvatar: "",
      title: "Carpool group for downtown area",
      content: "Looking to start a carpool group for people commuting to downtown. Currently 3 people interested. Join us to save money and reduce emissions!",
      category: "Community",
      likes: 67,
      comments: 31,
      timestamp: "2 days ago",
      tags: ["carpool", "transportation", "community"]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "Question",
    tags: ""
  });

  const createPost = () => {
    const post: Post = {
      id: Date.now().toString(),
      author: "You",
      authorAvatar: "",
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      likes: 0,
      comments: 0,
      timestamp: "Just now",
      tags: newPost.tags.split(",").map(t => t.trim())
    };
    setPosts([post, ...posts]);
    setIsNewPostOpen(false);
    setNewPost({ title: "", content: "", category: "Question", tags: "" });
  };

  const likePost = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Success Story": "bg-green-100 text-green-800 border-green-300",
      "Question": "bg-blue-100 text-blue-800 border-blue-300",
      "Tip": "bg-purple-100 text-purple-800 border-purple-300",
      "Community": "bg-amber-100 text-amber-800 border-amber-300",
      "Achievement": "bg-pink-100 text-pink-800 border-pink-300"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Community Forum</h1>
          <p className="text-gray-600">Share tips, ask questions, and connect with eco-warriors</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">2.4K</h3>
                <p className="text-sm text-gray-600">Members</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">1.2K</h3>
                <p className="text-sm text-gray-600">Discussions</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">342</h3>
                <p className="text-sm text-gray-600">Active Today</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-3 rounded-full">
                <Leaf className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">5.6K</h3>
                <p className="text-sm text-gray-600">Tips Shared</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Create */}
        <Card className="p-6 bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search discussions, tips, or questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 gap-2">
                  <Plus className="h-5 w-5" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Input
                      placeholder="Post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Share your thoughts, tips, or questions..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      rows={6}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={newPost.category}
                        onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      >
                        <option>Question</option>
                        <option>Tip</option>
                        <option>Success Story</option>
                        <option>Community</option>
                        <option>Achievement</option>
                      </select>
                    </div>
                    <div>
                      <Input
                        placeholder="Tags (comma separated)"
                        value={newPost.tags}
                        onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={createPost} className="w-full bg-green-600 hover:bg-green-700">
                    Post to Community
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        {/* Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="p-6 bg-white hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={post.authorAvatar} />
                    <AvatarFallback className="bg-green-100 text-green-700">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{post.author}</h3>
                        <p className="text-sm text-gray-500">{post.timestamp}</p>
                      </div>
                      <Badge className={`${getCategoryColor(post.category)} border`}>
                        {post.category}
                      </Badge>
                    </div>

                    <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
                    <p className="text-gray-600 mb-3">{post.content}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <button 
                        onClick={() => likePost(post.id)}
                        className="flex items-center gap-2 hover:text-green-600 transition-colors"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-blue-600 transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center gap-2 hover:text-purple-600 transition-colors">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="p-6 bg-white">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Trending Topics
              </h3>
              <div className="space-y-3">
                {["#solar-energy", "#composting", "#zero-waste", "#electric-vehicles", "#green-living"].map((topic, index) => (
                  <button key={index} className="w-full text-left p-3 rounded-lg hover:bg-green-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-green-700">{topic}</span>
                      <span className="text-sm text-gray-500">{Math.floor(Math.random() * 100) + 20} posts</span>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Top Contributors */}
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <h3 className="font-bold text-green-800 mb-4">🏆 Top Contributors</h3>
              <div className="space-y-3">
                {[
                  { name: "Sarah Green", posts: 45, points: 1250 },
                  { name: "Mike Chen", posts: 38, points: 980 },
                  { name: "Emma Davis", posts: 32, points: 850 }
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white/70 p-3 rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      'bg-amber-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.posts} posts • {user.points} points</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Community Guidelines */}
            <Card className="p-6 bg-blue-50 border-blue-200">
              <h3 className="font-bold text-blue-800 mb-3">📋 Community Guidelines</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Be respectful and supportive</li>
                <li>• Share verified information</li>
                <li>• Stay on topic</li>
                <li>• No spam or self-promotion</li>
                <li>• Help others learn and grow</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
