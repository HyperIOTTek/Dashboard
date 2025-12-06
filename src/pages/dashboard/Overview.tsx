import { motion } from "framer-motion";
import { Cpu, Zap, Activity, TrendingUp } from "lucide-react";

const stats = [
  {
    name: "Total Devices",
    value: "42",
    change: "+12%",
    icon: Cpu,
    color: "neon-green",
  },
  {
    name: "Active Automations",
    value: "18",
    change: "+3",
    icon: Zap,
    color: "soft-coral",
  },
  {
    name: "System Uptime",
    value: "99.8%",
    change: "+0.2%",
    icon: Activity,
    color: "neon-green",
  },
  {
    name: "Energy Saved",
    value: "34kWh",
    change: "+8%",
    icon: TrendingUp,
    color: "neon-green",
  },
];

const recentActivity = [
  { device: "Smart Thermostat", action: "Temperature adjusted", time: "2 min ago", status: "success" },
  { device: "Security Camera #3", action: "Motion detected", time: "5 min ago", status: "warning" },
  { device: "Smart Lock", action: "Door unlocked", time: "12 min ago", status: "success" },
  { device: "Lighting System", action: "Scene changed", time: "18 min ago", status: "success" },
  { device: "Smart Plug #5", action: "Power cycled", time: "22 min ago", status: "info" },
];

const Overview = () => {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground">
          Monitor your IoT ecosystem in real-time
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card rounded-xl p-6 glass-hover hover:border-neon-green/30 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}/10 border border-${stat.color}/30`}>
                <stat.icon className={`h-6 w-6 text-${stat.color}`} />
              </div>
              <span className="text-xs text-neon-green font-semibold">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </h3>
            <p className="text-sm text-muted-foreground">{stat.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-strong rounded-xl border border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-foreground">
            Recent Activity
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Latest device events and automations
          </p>
        </div>

        <div className="divide-y divide-white/10">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="p-4 hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">
                      {activity.device}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activity.status === "success"
                          ? "bg-neon-green"
                          : activity.status === "warning"
                          ? "bg-soft-coral"
                          : "bg-blue-400"
                      } animate-pulse`}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {activity.action}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Automation Builder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-strong rounded-xl border border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-neon-green" />
            AI Automation Builder
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create intelligent automation rules with AI assistance
          </p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-subtle rounded-lg p-4 border border-neon-green/20">
              <h4 className="text-sm font-medium text-neon-green mb-2">Suggested Rule</h4>
              <p className="text-xs text-muted-foreground mb-3">When motion detected → Turn on lights + Adjust thermostat</p>
              <button className="text-xs bg-neon-green/10 text-neon-green px-3 py-1 rounded-full hover:bg-neon-green/20 transition-colors">
                Apply Rule
              </button>
            </div>
            <div className="glass-subtle rounded-lg p-4 border border-soft-coral/20">
              <h4 className="text-sm font-medium text-soft-coral mb-2">Energy Optimization</h4>
              <p className="text-xs text-muted-foreground mb-3">Auto-adjust devices based on usage patterns</p>
              <button className="text-xs bg-soft-coral/10 text-soft-coral px-3 py-1 rounded-full hover:bg-soft-coral/20 transition-colors">
                Enable AI
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Real-time System Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass-card rounded-xl border border-white/10 p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
          <Activity className="h-5 w-5 text-neon-green" />
          System Health Monitor
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div 
            className="text-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neon-green/20 flex items-center justify-center group-hover:bg-neon-green/30 transition-colors">
              <span className="text-lg font-bold text-neon-green">99</span>
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Network Health</p>
          </motion.div>
          <motion.div 
            className="text-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neon-green/20 flex items-center justify-center group-hover:bg-neon-green/30 transition-colors">
              <span className="text-lg font-bold text-neon-green">42</span>
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Active Devices</p>
          </motion.div>
          <motion.div 
            className="text-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-soft-coral/20 flex items-center justify-center group-hover:bg-soft-coral/30 transition-colors">
              <span className="text-lg font-bold text-soft-coral">3</span>
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Alerts</p>
          </motion.div>
          <motion.div 
            className="text-center cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neon-green/20 flex items-center justify-center group-hover:bg-neon-green/30 transition-colors">
              <span className="text-lg font-bold text-neon-green">18</span>
            </div>
            <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">Automations</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-xl border border-white/10 p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-6">Live Data Stream</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">CPU Usage</span>
              <span className="text-sm font-medium text-neon-green">23%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-neon-green to-neon-green/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '23%' }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Memory</span>
              <span className="text-sm font-medium text-soft-coral">67%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-soft-coral to-soft-coral/80 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '67%' }}
                transition={{ duration: 1, delay: 0.7 }}
              />
            </div>
          </div>
          <div className="glass-subtle rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Network Activity</h4>
            <div className="relative h-20 flex items-end">
              <svg className="w-full h-full" viewBox="0 0 200 80">
                <defs>
                  <linearGradient id="networkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#BED754" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#BED754" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,60 Q25,40 50,45 T100,35 Q125,25 150,30 T200,25"
                  fill="none"
                  stroke="#BED754"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
                <motion.path
                  d="M0,60 Q25,40 50,45 T100,35 Q125,25 150,30 T200,25 L200,80 L0,80 Z"
                  fill="url(#networkGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 2 }}
                />
                {/* Data points */}
                {[{x: 0, y: 60}, {x: 50, y: 45}, {x: 100, y: 35}, {x: 150, y: 30}, {x: 200, y: 25}].map((point, i) => (
                  <motion.circle
                    key={i}
                    cx={point.x}
                    cy={point.y}
                    r="3"
                    fill="#BED754"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 2.2 + i * 0.1 }}
                  />
                ))}
              </svg>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground px-1">
                <span>12:00</span>
                <span>12:15</span>
                <span>12:30</span>
                <span>12:45</span>
                <span>Now</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-card rounded-xl p-6 glass-hover hover:border-neon-green/30 cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center group-hover:bg-neon-green/30 transition-colors">
              <Cpu className="h-5 w-5 text-neon-green" />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-neon-green transition-colors">
              Device Discovery
            </h3>
          </div>
          <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Scan and connect new IoT devices automatically
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-card rounded-xl p-6 glass-hover hover:border-neon-green/30 cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-soft-coral/20 flex items-center justify-center group-hover:bg-soft-coral/30 transition-colors">
              <Zap className="h-5 w-5 text-soft-coral" />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-neon-green transition-colors">
              AI Optimization
            </h3>
          </div>
          <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Let AI optimize your device performance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.02, y: -5 }}
          className="glass-card rounded-xl p-6 glass-hover hover:border-neon-green/30 cursor-pointer group"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center group-hover:bg-neon-green/30 transition-colors">
              <TrendingUp className="h-5 w-5 text-neon-green" />
            </div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-neon-green transition-colors">
              Predictive Analytics
            </h3>
          </div>
          <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            View maintenance predictions and insights
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
