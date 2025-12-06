import { motion } from "framer-motion";
import { Activity, AlertTriangle, CheckCircle } from "lucide-react";

const healthChecks = [
  { device: "Smart Thermostat", status: "healthy", uptime: "99.9%", lastCheck: "1 min ago" },
  { device: "Security Camera #1", status: "healthy", uptime: "99.8%", lastCheck: "2 min ago" },
  { device: "Smart Lock", status: "warning", uptime: "98.2%", lastCheck: "3 min ago" },
  { device: "Living Room Light", status: "healthy", uptime: "100%", lastCheck: "1 min ago" },
  { device: "Smart Plug #1", status: "critical", uptime: "87.5%", lastCheck: "15 min ago" },
];

const Monitoring = () => {
  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Monitoring</h1>
        <p className="text-muted-foreground">
          Real-time device health and predictive maintenance
        </p>
      </div>

      {/* Real-time Network Monitor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-xl border border-white/10 p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Network Health Dashboard</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">99.8%</div>
            <p className="text-xs text-muted-foreground">Network Uptime</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">42ms</div>
            <p className="text-xs text-muted-foreground">Avg Latency</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-soft-coral mb-1">2.4GB</div>
            <p className="text-xs text-muted-foreground">Data Today</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">42</div>
            <p className="text-xs text-muted-foreground">Connected</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            className="text-xs bg-neon-green/10 text-neon-green px-3 py-1 rounded-full hover:bg-neon-green/20"
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-neon-green/30 bg-neon-green/10';
              toast.innerHTML = `
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span class="text-sm text-neon-green font-medium">Running Diagnostics...</span>
                </div>
                <div class="text-xs text-muted-foreground">Checking all 42 devices</div>
              `;
              document.body.appendChild(toast);
              
              setTimeout(() => {
                toast.innerHTML = `
                  <div class="text-sm text-neon-green font-medium mb-2">✓ Diagnostics Complete</div>
                  <div class="text-xs text-muted-foreground space-y-1">
                    <div>• Network: Healthy</div>
                    <div>• Latency: 42ms avg</div>
                    <div>• 1 device needs attention</div>
                  </div>
                `;
                setTimeout(() => toast.remove(), 4000);
              }, 2500);
            }}
          >
            Run Diagnostics
          </button>
          <button 
            className="text-xs bg-white/5 text-muted-foreground px-3 py-1 rounded-full hover:bg-white/10"
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-white/20';
              toast.innerHTML = `
                <div class="text-sm text-foreground mb-2">Network Topology</div>
                <div class="text-xs text-muted-foreground space-y-1">
                  <div>🏠 Hub: 192.168.1.1</div>
                  <div>📱 Connected: 42 devices</div>
                  <div>🌐 Subnets: 3 active</div>
                </div>
              `;
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 4000);
            }}
          >
            Network Map
          </button>
        </div>
      </motion.div>

      {/* System Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6 border border-neon-green/30 bg-neon-green/5 cursor-pointer hover:bg-neon-green/10 transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5 text-neon-green" />
            <h3 className="text-lg font-semibold text-foreground">Healthy</h3>
          </div>
          <p className="text-3xl font-bold text-neon-green">32</p>
          <p className="text-sm text-muted-foreground mt-1">devices online</p>
          <button 
            className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded mt-2 hover:bg-neon-green/30"
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-neon-green/30 bg-neon-green/10';
              toast.innerHTML = `
                <div class="text-sm text-neon-green font-medium mb-2">Healthy Devices (32)</div>
                <div class="text-xs text-muted-foreground space-y-1">
                  <div>• Smart Thermostat - 99.9%</div>
                  <div>• Security Camera #1 - 99.8%</div>
                  <div>• Smart Lock - 98.2%</div>
                  <div>• + 29 more devices...</div>
                </div>
              `;
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 5000);
            }}
          >
            View Details
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl p-6 border border-soft-coral/30 bg-soft-coral/5 cursor-pointer hover:bg-soft-coral/10 transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-5 w-5 text-soft-coral" />
            <h3 className="text-lg font-semibold text-foreground">Warning</h3>
          </div>
          <p className="text-3xl font-bold text-soft-coral">3</p>
          <p className="text-sm text-muted-foreground mt-1">need attention</p>
          <button 
            className="text-xs bg-soft-coral/20 text-soft-coral px-2 py-1 rounded mt-2 hover:bg-soft-coral/30"
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-soft-coral/30 bg-soft-coral/10';
              toast.innerHTML = `
                <div class="text-sm text-soft-coral font-medium mb-2">Auto-Fix Initiated</div>
                <div class="text-xs text-muted-foreground space-y-1">
                  <div>🔧 Restarting devices...</div>
                  <div>🔋 Checking connections...</div>
                </div>
              `;
              document.body.appendChild(toast);
              
              setTimeout(() => {
                toast.innerHTML = `<div class="text-sm text-neon-green font-medium">✓ Issues Resolved</div>`;
                setTimeout(() => toast.remove(), 2000);
              }, 3000);
            }}
          >
            Fix Issues
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-xl p-6 border border-deep-red/30 bg-deep-red/5 cursor-pointer hover:bg-deep-red/10 transition-colors"
        >
          <div className="flex items-center gap-3 mb-2">
            <Activity className="h-5 w-5 text-deep-red" />
            <h3 className="text-lg font-semibold text-foreground">Critical</h3>
          </div>
          <p className="text-3xl font-bold text-deep-red">1</p>
          <p className="text-sm text-muted-foreground mt-1">requires action</p>
          <button 
            className="text-xs bg-deep-red/20 text-deep-red px-2 py-1 rounded mt-2 hover:bg-deep-red/30"
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-deep-red/30 bg-deep-red/10';
              toast.innerHTML = `
                <div class="text-sm text-deep-red font-medium mb-2">🚨 Critical Fix</div>
                <div class="text-xs text-muted-foreground space-y-1">
                  <div>⚡ Emergency restart</div>
                  <div>📞 Technician notified</div>
                </div>
              `;
              document.body.appendChild(toast);
              
              setTimeout(() => {
                toast.innerHTML = `<div class="text-sm text-neon-green font-medium">✓ Critical Issue Resolved</div>`;
                setTimeout(() => toast.remove(), 2000);
              }, 4000);
            }}
          >
            Urgent Fix
          </button>
        </motion.div>
      </div>

      {/* Predictive Maintenance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-xl border border-white/10 p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">AI Predictive Maintenance</h2>
        <div className="space-y-3">
          <div className="glass-subtle rounded-lg p-4 border-l-4 border-soft-coral">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-soft-coral mb-1">Smart Thermostat</h4>
                <p className="text-xs text-muted-foreground">Filter replacement recommended in 7 days</p>
              </div>
              <button className="text-xs bg-soft-coral/10 text-soft-coral px-2 py-1 rounded hover:bg-soft-coral/20">
                Schedule
              </button>
            </div>
          </div>
          <div className="glass-subtle rounded-lg p-4 border-l-4 border-neon-green">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-neon-green mb-1">Security Camera #3</h4>
                <p className="text-xs text-muted-foreground">Lens cleaning suggested based on image quality</p>
              </div>
              <button className="text-xs bg-neon-green/10 text-neon-green px-2 py-1 rounded hover:bg-neon-green/20">
                Remind Me
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Device Health List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-strong rounded-xl border border-white/10 overflow-hidden"
      >
        <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-foreground">
            Device Health Monitor
          </h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              className="text-xs bg-neon-green/10 text-neon-green px-3 py-1 rounded-full hover:bg-neon-green/20"
              onClick={() => {
                const toast = document.createElement('div');
                toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                toast.innerHTML = `<div class="text-sm text-neon-green">✓ All devices refreshed!</div>`;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
              }}
            >
              Refresh All
            </button>
            <button 
              className="text-xs bg-white/5 text-muted-foreground px-3 py-1 rounded-full hover:bg-white/10"
              onClick={() => {
                const reportContent = `HyperIOTTek Monitoring Report\n\nHealthy: 32 devices\nWarning: 3 devices\nCritical: 1 device\nUptime: 99.8%`;
                const blob = new Blob([reportContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `Monitoring-Report-${new Date().toISOString().split('T')[0]}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                const toast = document.createElement('div');
                toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                toast.innerHTML = `<div class="text-sm text-neon-green">✓ Report downloaded!</div>`;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 2000);
              }}
            >
              Export Report
            </button>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          {healthChecks.map((check, index) => (
            <div
              key={index}
              className="p-4 hover:bg-white/5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between group gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className={`w-3 h-3 rounded-full ${
                    check.status === "healthy"
                      ? "bg-neon-green animate-pulse"
                      : check.status === "warning"
                      ? "bg-soft-coral animate-pulse"
                      : "bg-deep-red animate-pulse"
                  }`}
                />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-foreground">
                    {check.device}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Last checked: {check.lastCheck}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <div className="text-left sm:text-right">
                  <p className="text-sm font-medium text-foreground">
                    {check.uptime}
                  </p>
                  <p className="text-xs text-muted-foreground">uptime</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                    check.status === "healthy"
                      ? "bg-neon-green/20 text-neon-green border border-neon-green/40"
                      : check.status === "warning"
                      ? "bg-soft-coral/20 text-soft-coral border border-soft-coral/40"
                      : "bg-deep-red/20 text-deep-red border border-deep-red/40"
                  }`}
                >
                  {check.status}
                </span>
                <div className="opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button 
                    className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded hover:bg-white/10"
                    onClick={() => {
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-white/20';
                      toast.innerHTML = `
                        <div class="text-sm text-foreground mb-2">${check.device}</div>
                        <div class="text-xs text-muted-foreground space-y-1">
                          <div>Status: ${check.status}</div>
                          <div>Uptime: ${check.uptime}</div>
                          <div>IP: 192.168.1.${10 + index}</div>
                        </div>
                      `;
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 4000);
                    }}
                  >
                    Details
                  </button>
                  <button 
                    className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded hover:bg-white/10"
                    onClick={() => {
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                      toast.innerHTML = `<div class="text-sm text-neon-green">✓ ${check.device} fixed!</div>`;
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 2000);
                    }}
                  >
                    Fix
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Alert Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card rounded-xl border border-white/10 p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Alert Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="glass-subtle rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Critical Alerts</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Instant notifications</span>
              <button className="w-8 h-4 bg-neon-green rounded-full relative">
                <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5" />
              </button>
            </div>
          </div>
          <div className="glass-subtle rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Maintenance Reminders</h4>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Weekly digest</span>
              <button className="w-8 h-4 bg-neon-green rounded-full relative">
                <div className="w-3 h-3 bg-white rounded-full absolute top-0.5 right-0.5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Monitoring;
