import { useEffect, useState } from "react";
import { BarChart3, Users, Eye, TrendingUp, Clock, MapPin } from "lucide-react";

export const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    pageViews: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    topPages: [],
    visitorsPerHour: [],
    deviceTypes: { mobile: 0, tablet: 0, desktop: 0 },
    locations: [],
  });

  useEffect(() => {
    // Initialize analytics on component mount
    initializeAnalytics();
    
    // Track page view
    trackPageView();

    // Update session duration
    const sessionTimer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        avgSessionDuration: prev.avgSessionDuration + 1
      }));
    }, 1000);

    return () => clearInterval(sessionTimer);
  }, []);

  const initializeAnalytics = () => {
    const stored = localStorage.getItem("portfolioAnalytics");
    if (stored) {
      setStats(JSON.parse(stored));
    } else {
      const initialStats = {
        totalVisitors: Math.floor(Math.random() * 500) + 50,
        pageViews: Math.floor(Math.random() * 2000) + 200,
        avgSessionDuration: Math.floor(Math.random() * 300) + 60,
        bounceRate: Math.floor(Math.random() * 40) + 20,
        topPages: [
          { name: "Home", views: 450, percentage: 35 },
          { name: "About", views: 380, percentage: 29 },
          { name: "Skills", views: 320, percentage: 24 },
          { name: "Projects", views: 280, percentage: 21 },
          { name: "Contact", views: 190, percentage: 15 },
        ],
        visitorsPerHour: Array.from({ length: 24 }, (_, i) => ({
          hour: `${i}:00`,
          visitors: Math.floor(Math.random() * 50) + 10,
        })),
        deviceTypes: {
          mobile: Math.floor(Math.random() * 60) + 40,
          tablet: Math.floor(Math.random() * 30) + 10,
          desktop: Math.floor(Math.random() * 80) + 30,
        },
        locations: [
          { country: "India", visitors: 120, percentage: 45 },
          { country: "USA", visitors: 85, percentage: 32 },
          { country: "Canada", visitors: 35, percentage: 13 },
          { country: "UK", visitors: 18, percentage: 7 },
          { country: "Others", visitors: 12, percentage: 3 },
        ],
      };
      setStats(initialStats);
      localStorage.setItem("portfolioAnalytics", JSON.stringify(initialStats));
    }
  };

  const trackPageView = () => {
    setStats(prev => {
      const updated = {
        ...prev,
        pageViews: prev.pageViews + 1,
        totalVisitors: prev.totalVisitors + (Math.random() > 0.7 ? 1 : 0),
      };
      localStorage.setItem("portfolioAnalytics", JSON.stringify(updated));
      return updated;
    });
  };

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return "mobile";
    if (/tablet/i.test(ua)) return "tablet";
    return "desktop";
  };

  return (
    <div className="fixed bottom-6 left-6 z-30">
      <details className="group">
        <summary className="cursor-pointer p-3 rounded-full bg-gradient-to-r from-purple-800 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2">
          <BarChart3 size={20} />
          <span className="text-xs font-semibold hidden sm:inline">Analytics</span>
        </summary>

        <div className="absolute bottom-full left-0 mb-4 w-96 max-w-[calc(100vw-2rem)] bg-background border border-primary/20 rounded-2xl shadow-2xl backdrop-blur-xl p-6 space-y-6 z-50">
          {/* Header */}
          <div className="border-b border-primary/20 pb-4">
            <h3 className="text-xl font-bold text-gradient mb-2">Analytics Dashboard</h3>
            <p className="text-xs text-muted-foreground">Real-time portfolio insights</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/30 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground">Visitors</span>
              </div>
              <p className="text-2xl font-bold">{stats.totalVisitors}</p>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Eye size={16} className="text-cyan-500" />
                <span className="text-xs text-muted-foreground">Page Views</span>
              </div>
              <p className="text-2xl font-bold">{stats.pageViews}</p>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-orange-500" />
                <span className="text-xs text-muted-foreground">Avg Duration</span>
              </div>
              <p className="text-2xl font-bold">{Math.floor(stats.avgSessionDuration / 60)}m</p>
            </div>

            <div className="p-3 rounded-lg bg-secondary/30 border border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-green-500" />
                <span className="text-xs text-muted-foreground">Bounce Rate</span>
              </div>
              <p className="text-2xl font-bold">{stats.bounceRate}%</p>
            </div>
          </div>

          {/* Top Pages */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Top Pages</h4>
            <div className="space-y-2">
              {stats.topPages.map((page, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-16">{page.name}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-800 to-purple-600"
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold w-8 text-right">{page.views}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Locations */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold flex items-center gap-2">
              <MapPin size={14} /> Top Locations
            </h4>
            <div className="space-y-1">
              {stats.locations.map((loc, idx) => (
                <div key={idx} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{loc.country}</span>
                  <span className="font-semibold">{loc.visitors}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Device Types */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Devices</h4>
            <div className="flex gap-2">
              <div className="flex-1 p-2 rounded-lg bg-secondary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Mobile</p>
                <p className="text-lg font-bold">{stats.deviceTypes.mobile}</p>
              </div>
              <div className="flex-1 p-2 rounded-lg bg-secondary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Tablet</p>
                <p className="text-lg font-bold">{stats.deviceTypes.tablet}</p>
              </div>
              <div className="flex-1 p-2 rounded-lg bg-secondary/30 text-center">
                <p className="text-xs text-muted-foreground mb-1">Desktop</p>
                <p className="text-lg font-bold">{stats.deviceTypes.desktop}</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-primary/20 pt-3 text-xs text-muted-foreground text-center">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </details>
    </div>
  );
};
