import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Newspaper, 
  TrendingUp, 
  Leaf, 
  Sun,
  Wind,
  Droplet,
  Search,
  ExternalLink,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: string;
  source: string;
  category: string;
}

const EcoNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Mock news data (in production, replace with actual API call)
  const mockNews: NewsArticle[] = [
    {
      id: "1",
      title: "Global Renewable Energy Capacity Hits Record High in 2025",
      description: "Solar and wind power installations reached unprecedented levels, marking a significant milestone in the transition to clean energy.",
      url: "#",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
      publishedAt: "2025-09-29",
      source: "Green Energy Today",
      category: "renewable"
    },
    {
      id: "2",
      title: "New Carbon Capture Technology Shows 95% Efficiency",
      description: "Scientists develop breakthrough carbon capture system that could revolutionize industrial emissions reduction.",
      url: "#",
      image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=400",
      publishedAt: "2025-09-28",
      source: "Climate Science Weekly",
      category: "technology"
    },
    {
      id: "3",
      title: "Electric Vehicle Sales Surge 40% Globally",
      description: "EV adoption accelerates as prices drop and charging infrastructure expands across major cities worldwide.",
      url: "#",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400",
      publishedAt: "2025-09-27",
      source: "Auto Green",
      category: "transportation"
    },
    {
      id: "4",
      title: "Ocean Cleanup Project Removes 100,000 Tons of Plastic",
      description: "Major milestone achieved in the fight against ocean pollution as innovative cleanup systems prove effective.",
      url: "#",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
      publishedAt: "2025-09-26",
      source: "Ocean Conservation",
      category: "conservation"
    },
    {
      id: "5",
      title: "Smart Cities Reduce Energy Consumption by 30%",
      description: "AI-powered energy management systems help urban areas dramatically cut electricity usage and costs.",
      url: "#",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400",
      publishedAt: "2025-09-25",
      source: "Urban Sustainability",
      category: "technology"
    },
    {
      id: "6",
      title: "Reforestation Initiative Plants 1 Billion Trees",
      description: "Global campaign reaches ambitious goal, creating new forests across six continents to combat climate change.",
      url: "#",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400",
      publishedAt: "2025-09-24",
      source: "Forest Alliance",
      category: "conservation"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setNews(mockNews);
      setLoading(false);
    }, 500);
  }, []);

  const filteredNews = news.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || article.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      renewable: Sun,
      technology: TrendingUp,
      transportation: Wind,
      conservation: Leaf,
      policy: Newspaper
    };
    return icons[category] || Newspaper;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      renewable: "bg-yellow-100 text-yellow-800 border-yellow-300",
      technology: "bg-blue-100 text-blue-800 border-blue-300",
      transportation: "bg-purple-100 text-purple-800 border-purple-300",
      conservation: "bg-green-100 text-green-800 border-green-300",
      policy: "bg-gray-100 text-gray-800 border-gray-300"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Eco News & Updates</h1>
          <p className="text-gray-600">Stay informed about the latest in sustainability and green technology</p>
        </div>

        {/* Search and Filter */}
        <Card className="p-6 bg-white">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search news articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
              <TabsList className="grid grid-cols-3 md:grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="renewable">Renewable</TabsTrigger>
                <TabsTrigger value="technology">Tech</TabsTrigger>
                <TabsTrigger value="transportation">Transport</TabsTrigger>
                <TabsTrigger value="conservation">Conservation</TabsTrigger>
                <TabsTrigger value="policy">Policy</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </Card>

        {/* Featured Article */}
        {filteredNews.length > 0 && (
          <Card className="overflow-hidden bg-white hover:shadow-xl transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img 
                  src={filteredNews[0].image} 
                  alt={filteredNews[0].title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-green-600 text-white">
                  Featured
                </Badge>
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${getCategoryColor(filteredNews[0].category)} border`}>
                      {filteredNews[0].category}
                    </Badge>
                    <span className="text-sm text-gray-500">{filteredNews[0].source}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    {filteredNews[0].title}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {filteredNews[0].description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(filteredNews[0].publishedAt)}</span>
                  </div>
                  <Button className="bg-green-600 hover:bg-green-700 gap-2">
                    Read More
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.slice(1).map((article) => {
            const CategoryIcon = getCategoryIcon(article.category);
            
            return (
              <Card key={article.id} className="overflow-hidden bg-white hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full">
                      <CategoryIcon className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${getCategoryColor(article.category)} border text-xs`}>
                      {article.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.source}</span>
                    <Button size="sm" variant="ghost" className="gap-2 text-green-600 hover:text-green-700">
                      Read
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* No Results */}
        {filteredNews.length === 0 && !loading && (
          <Card className="p-12 bg-white text-center">
            <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </Card>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Quick Links */}
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <h3 className="text-xl font-bold mb-4 text-blue-800">📚 Recommended Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a href="#" className="bg-white/70 p-4 rounded-lg hover:bg-white transition-colors">
              <h4 className="font-semibold text-gray-800 mb-1">Climate Action Tracker</h4>
              <p className="text-sm text-gray-600">Track global climate commitments and progress</p>
            </a>
            <a href="#" className="bg-white/70 p-4 rounded-lg hover:bg-white transition-colors">
              <h4 className="font-semibold text-gray-800 mb-1">Green Tech Directory</h4>
              <p className="text-sm text-gray-600">Discover innovative environmental solutions</p>
            </a>
            <a href="#" className="bg-white/70 p-4 rounded-lg hover:bg-white transition-colors">
              <h4 className="font-semibold text-gray-800 mb-1">Sustainability Guides</h4>
              <p className="text-sm text-gray-600">Learn practical tips for eco-friendly living</p>
            </a>
            <a href="#" className="bg-white/70 p-4 rounded-lg hover:bg-white transition-colors">
              <h4 className="font-semibold text-gray-800 mb-1">Policy Updates</h4>
              <p className="text-sm text-gray-600">Stay informed about environmental regulations</p>
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EcoNews;
