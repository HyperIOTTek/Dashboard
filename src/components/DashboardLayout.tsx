import { ReactNode, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import {
  LayoutDashboard,
  Cpu,
  Zap,
  BarChart3,
  Activity,
  GitBranch,
  Settings,
  HelpCircle,
  Menu,
  X,
  Bell,
  Search,
  User,
  AlertTriangle,
  CheckCircle,
  Info,
  Trash2,
  LogOut,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { name: "Overview", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Devices", icon: Cpu, path: "/dashboard/devices" },
  { name: "Automation", icon: Zap, path: "/dashboard/automation" },
  { name: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
  { name: "Monitoring", icon: Activity, path: "/dashboard/monitoring" },
  { name: "Workflows", icon: GitBranch, path: "/dashboard/workflows" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  { name: "Support", icon: HelpCircle, path: "/dashboard/support" },
];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  useScrollToTop();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  
  // Get user data from localStorage
  const getUserData = () => {
    const stored = localStorage.getItem('userData');
    return stored ? JSON.parse(stored) : { name: 'User', email: 'user@example.com' };
  };
  const currentUser = getUserData();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High Temperature Alert',
      message: 'Sensor TH-001 reading 85°C',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'success',
      title: 'Device Connected',
      message: 'New IoT device successfully added',
      time: '15 min ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'Dashboard updated to v2.1.0',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'warning',
      title: 'Low Battery',
      message: 'Device BAT-003 battery at 15%',
      time: '2 hours ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return Info;
      default: return Bell;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-neon-green';
      case 'info': return 'text-blue-400';
      default: return 'text-muted-foreground';
    }
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.clear();
    // Navigate to login page
    navigate('/');
  };
  
  const searchableItems = [
    { name: 'Smart Thermostat', type: 'device', path: '/dashboard/devices' },
    { name: 'Security Camera #1', type: 'device', path: '/dashboard/devices' },
    { name: 'Smart Lock', type: 'device', path: '/dashboard/devices' },
    { name: 'Living Room Light', type: 'device', path: '/dashboard/devices' },
    { name: 'Motion Sensor', type: 'device', path: '/dashboard/devices' },
    { name: 'Overview', type: 'page', path: '/dashboard' },
    { name: 'Devices', type: 'page', path: '/dashboard/devices' },
    { name: 'Analytics', type: 'page', path: '/dashboard/analytics' },
    { name: 'Automation', type: 'page', path: '/dashboard/automation' },
    { name: 'Settings', type: 'page', path: '/dashboard/settings' }
  ];
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = searchableItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  
  const handleSearchSelect = (item: any) => {
    navigate(item.path);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  return (
    <div className="min-h-screen bg-carbon-black flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 glass-frosted border-r border-white/15 fixed h-full z-40">
        <div className="border-b border-white/10">
          <img src="/assets/1.svg" alt="HyperIOTTek" className="w-full h-24" />
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all mb-1 group"
                activeClassName="text-neon-green bg-neon-green/10 border border-neon-green/30 shadow-lg shadow-neon-green/10"
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>
        
        {/* Logout Button */}
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-deep-red hover:text-white hover:bg-deep-red/20 transition-all w-full group"
          >
            <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 h-full w-64 glass-frosted border-r border-white/15 z-50 lg:hidden"
            >
              <div className="border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src="/assets/1.svg" alt="HyperIOTTek" className="h-24 w-full" />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="hover:bg-white/5"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="py-4 px-3 overflow-y-auto h-[calc(100%-140px)]">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    end={item.path === "/dashboard"}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all mb-1 group"
                    activeClassName="text-neon-green bg-neon-green/10 border border-neon-green/30 shadow-lg shadow-neon-green/10"
                  >
                    <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ))}
              </nav>
              
              {/* Mobile Logout Button */}
              <div className="p-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-deep-red hover:text-white hover:bg-deep-red/20 transition-all w-full group"
                >
                  <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <header className="glass-strong border-b border-white/15 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden hover:bg-white/5"
              >
                <Menu className="h-5 w-5" />
              </Button>

              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10 w-64 glass-subtle border-white/10 focus:border-neon-green/50"
                />
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-12 left-0 w-full bg-gray-900 border-2 border-gray-600 rounded-lg shadow-2xl z-50 max-h-64 overflow-y-auto">
                    {searchResults.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => handleSearchSelect(item)}
                        className="p-3 hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-600 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            item.type === 'device' ? 'bg-green-400' : 'bg-orange-400'
                          }`} />
                          <div>
                            <div className="text-sm font-semibold text-white">{item.name}</div>
                            <div className="text-xs text-gray-200 capitalize">{item.type}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {showSearchResults && searchResults.length === 0 && searchQuery.trim() && (
                  <div className="absolute top-12 left-0 w-full bg-gray-900 border-2 border-gray-600 rounded-lg shadow-2xl z-50">
                    <div className="p-4 text-center text-white text-sm font-medium">
                      No results found for "{searchQuery}"
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Real-time Clock */}
              <div className="hidden sm:block text-sm font-medium" style={{ color: '#BED754', fontFamily: 'Roboto Mono, monospace' }}>
                {currentTime.toLocaleTimeString()}
              </div>
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative hover:bg-white/5"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-deep-red rounded-full flex items-center justify-center text-xs font-medium text-white">
                      {unreadCount}
                    </span>
                  )}
                </Button>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsNotificationsOpen(false)}
                        className="fixed inset-0 z-40"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-12 w-80 glass-card border border-white/15 rounded-xl shadow-2xl z-50"
                      >
                        <div className="p-4 border-b border-white/10">
                          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
                          <p className="text-sm text-muted-foreground">{unreadCount} unread</p>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.length === 0 ? (
                            <div className="p-4 text-center text-muted-foreground">
                              No notifications
                            </div>
                          ) : (
                            notifications.map((notification) => {
                              const IconComponent = getNotificationIcon(notification.type);
                              return (
                                <div
                                  key={notification.id}
                                  className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                                    !notification.read ? 'bg-neon-green/5' : ''
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`p-1 rounded-full ${getNotificationColor(notification.type)}`}>
                                      <IconComponent className="h-4 w-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <h4 className={`text-sm font-medium ${
                                          !notification.read ? 'text-foreground' : 'text-muted-foreground'
                                        }`}>
                                          {notification.title}
                                        </h4>
                                        <button
                                          onClick={() => clearNotification(notification.id)}
                                          className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                          <Trash2 className="h-3 w-3" />
                                        </button>
                                      </div>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {notification.message}
                                      </p>
                                      <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-muted-foreground">
                                          {notification.time}
                                        </span>
                                        {!notification.read && (
                                          <button
                                            onClick={() => markAsRead(notification.id)}
                                            className="text-xs text-neon-green hover:underline"
                                          >
                                            Mark as read
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                        {notifications.length > 0 && (
                          <div className="p-3 border-t border-white/10">
                            <button
                              onClick={() => setNotifications([])}
                              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                              Clear all notifications
                            </button>
                          </div>
                        )}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-white/5"
                  >
                    <div className="w-8 h-8 rounded-full bg-neon-green/20 border border-neon-green/50 flex items-center justify-center">
                      <User className="h-4 w-4 text-neon-green" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="glass-card border-white/15 w-56"
                >
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                  </div>
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="hover:bg-white/5 text-deep-red cursor-pointer flex items-center gap-2 mt-1"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
