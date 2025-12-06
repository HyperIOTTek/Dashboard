import { motion } from "framer-motion";
import { TrendingUp, Calendar, ChevronDown } from "lucide-react";
import { useState } from "react";
import React from "react";

const Analytics = () => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedBar, setSelectedBar] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipData, setTooltipData] = useState({ x: 0, y: 0, value: '' });
  const [animationProgress, setAnimationProgress] = useState(0);
  const [chartFilter, setChartFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [showDateDropdown, setShowDateDropdown] = useState(false);

  const dataByRange = {
    '7': {
      usage: '0.8kW', cost: '$12.30', efficiency: '18%', devices: '38',
      deviceData: [160, 150, 130, 115, 105, 100],
      energyData: [140, 120, 160, 110, 130, 100, 150, 115, 105],
      deviceValues: [38, 41, 44, 47, 50, 53],
      energyValues: [4.2, 6.1, 2.8, 7.3, 5.5, 8.2, 3.7, 4.9]
    },
    '30': {
      usage: '1.2kW', cost: '$24.50', efficiency: '15%', devices: '42',
      deviceData: [140, 130, 110, 95, 85, 80],
      energyData: [120, 100, 140, 90, 110, 80, 130, 95, 85],
      deviceValues: [42, 45, 48, 51, 54, 57],
      energyValues: [6.0, 8.0, 4.0, 9.0, 7.0, 10.0, 5.0, 6.5, 8.5]
    },
    '90': {
      usage: '1.8kW', cost: '$67.20', efficiency: '12%', devices: '35',
      deviceData: [120, 110, 90, 75, 65, 60],
      energyData: [100, 80, 120, 70, 90, 60, 110, 75, 65],
      deviceValues: [35, 38, 41, 44, 47, 50],
      energyValues: [8.5, 11.2, 6.8, 12.7, 9.8, 14.1, 7.2, 9.3, 11.6]
    }
  };

  const currentData = dataByRange[dateRange];
  const timeLabels = ['6AM', '9AM', '12PM', '3PM', '6PM', '9PM'];
  const energyLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Today'];

  React.useEffect(() => {
    const timer = setTimeout(() => setAnimationProgress(100), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">
            Insights and usage patterns from your IoT network
          </p>
        </div>
        <div className="relative">
          <button 
            className="flex items-center gap-2 glass-subtle rounded-lg px-3 sm:px-4 py-2 border border-white/10 hover:border-neon-green/30 transition-colors w-full sm:w-auto justify-center sm:justify-start"
            onClick={() => setShowDateDropdown(!showDateDropdown)}
          >
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-foreground whitespace-nowrap">
              Last {dateRange === '7' ? '7 Days' : dateRange === '30' ? '30 Days' : '90 Days'}
            </span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>
          
          {showDateDropdown && (
            <div className="absolute top-full left-0 sm:right-0 sm:left-auto mt-2 glass-card rounded-lg border border-white/20 shadow-xl z-[9999] min-w-[140px] w-full sm:w-auto">
              {[{value: '7', label: 'Last 7 Days'}, {value: '30', label: 'Last 30 Days'}, {value: '90', label: 'Last 90 Days'}].map(option => (
                <button
                  key={option.value}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-white/5 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                    dateRange === option.value ? 'text-neon-green bg-neon-green/10' : 'text-foreground'
                  }`}
                  onClick={() => {
                    setDateRange(option.value);
                    setShowDateDropdown(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Real-time Analytics Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-strong rounded-xl border border-white/10 p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Live Analytics Feed</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">{currentData.usage}</div>
            <p className="text-xs text-muted-foreground">Current Usage</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-soft-coral mb-1">{currentData.cost}</div>
            <p className="text-xs text-muted-foreground">Period Cost</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">{currentData.efficiency}</div>
            <p className="text-xs text-muted-foreground">Efficiency Gain</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">{currentData.devices}</div>
            <p className="text-xs text-muted-foreground">Active Devices</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            className="text-xs bg-neon-green/10 text-neon-green px-3 py-1 rounded-full hover:bg-neon-green/20"
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-neon-green/30 bg-neon-green/10';
              toast.innerHTML = `
                <div class="flex items-center gap-2 mb-2">
                  <div class="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                  <span class="text-sm text-neon-green font-medium">Generating Report...</span>
                </div>
                <div class="text-xs text-muted-foreground">Analytics data for last 30 days</div>
              `;
              document.body.appendChild(toast);
              
              setTimeout(() => {
                // Create sample report content
                const reportContent = `HyperIOTTek Analytics Report - ${new Date().toLocaleDateString()}

=== DEVICE USAGE SUMMARY ===
Total Devices: 42
Active Devices: 39
Offline Devices: 3
Uptime: 99.8%

=== ENERGY CONSUMPTION ===
Total Usage: 1,247 kWh
Daily Average: 41.6 kWh
Cost: $187.05
Savings: 15% vs last month

=== AUTOMATION PERFORMANCE ===
Total Automations: 18
Success Rate: 98.5%
Executions Today: 247
Avg Response Time: 2.3s

=== TOP PERFORMING DEVICES ===
1. Smart Thermostat - 99.9% uptime
2. Security Camera #1 - 99.8% uptime
3. Smart Lock - 98.2% uptime
4. Living Room Light - 100% uptime

=== RECOMMENDATIONS ===
• Smart Plug #1 needs attention (offline)
• Consider upgrading Motion Sensor battery
• Energy optimization available for HVAC

--- Generated by HyperIOTTek Dashboard ---`;

                // Create and download file
                const blob = new Blob([reportContent], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `HyperIOTTek-Analytics-Report-${new Date().toISOString().split('T')[0]}.txt`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);

                toast.innerHTML = `
                  <div class="flex items-center gap-2 mb-2">
                    <div class="w-2 h-2 bg-neon-green rounded-full"></div>
                    <span class="text-sm text-neon-green font-medium">✓ Report Downloaded!</span>
                  </div>
                  <div class="text-xs text-muted-foreground">HyperIOTTek-Analytics-Report-${new Date().toISOString().split('T')[0]}.txt</div>
                `;
                setTimeout(() => toast.remove(), 3000);
              }, 2000);
            }}
          >
            Export Report
          </button>
          <button 
            className="text-xs bg-white/5 text-muted-foreground px-3 py-1 rounded-full hover:bg-white/10"
            onClick={() => {
              const toast = document.createElement('div');
              toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-soft-coral/30 bg-soft-coral/10';
              toast.innerHTML = `
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-2 h-2 bg-soft-coral rounded-full animate-pulse"></div>
                  <span class="text-sm text-soft-coral font-medium">Schedule Report</span>
                </div>
                <div class="space-y-2">
                  <div class="text-xs text-muted-foreground">📅 Weekly on Mondays</div>
                  <div class="text-xs text-muted-foreground">📧 Email: admin@hyperiottek.com</div>
                  <div class="text-xs text-neon-green">✓ Schedule activated</div>
                </div>
              `;
              document.body.appendChild(toast);
              setTimeout(() => toast.remove(), 4000);
            }}
          >
            Schedule Report
          </button>
        </div>
      </motion.div>

      {/* Predictive Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl border border-white/10 p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">AI Predictive Insights</h2>
        <div className="space-y-3">
          <div className="glass-subtle rounded-lg p-4 border-l-4 border-neon-green">
            <h4 className="text-sm font-medium text-neon-green mb-1">Energy Optimization</h4>
            <p className="text-xs text-muted-foreground">Smart Thermostat can save 12% more energy with schedule adjustment</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 border-l-4 border-soft-coral">
            <h4 className="text-sm font-medium text-soft-coral mb-1">Maintenance Alert</h4>
            <p className="text-xs text-muted-foreground">Security Camera #3 may need cleaning in 5 days based on usage patterns</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 border-l-4 border-neon-green">
            <h4 className="text-sm font-medium text-neon-green mb-1">Usage Pattern</h4>
            <p className="text-xs text-muted-foreground">Peak usage detected between 6-8 PM. Consider load balancing</p>
          </div>
        </div>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Device Usage Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Device Usage Trends
            </h3>
            <button className="text-xs bg-neon-green/10 text-neon-green px-2 py-1 rounded hover:bg-neon-green/20">
              View Details
            </button>
          </div>
          <div className="h-64 relative">
            <div className="absolute top-0 right-0 flex gap-1 z-10">
              <button 
                onClick={() => setChartFilter('all')} 
                className={`text-xs px-2 py-1 rounded ${chartFilter === 'all' ? 'bg-neon-green/20 text-neon-green' : 'bg-white/5 text-muted-foreground'}`}
              >
                All
              </button>
              <button 
                onClick={() => setChartFilter('peak')} 
                className={`text-xs px-2 py-1 rounded ${chartFilter === 'peak' ? 'bg-neon-green/20 text-neon-green' : 'bg-white/5 text-muted-foreground'}`}
              >
                Peak
              </button>
            </div>
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(72, 68%, 64%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(72, 68%, 64%)" stopOpacity="0.05" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Grid lines */}
              {[40, 80, 120, 160].map(y => (
                <line key={y} x1="40" y1={y} x2="380" y2={y} stroke="hsl(0, 0%, 20%)" strokeWidth="0.5" opacity="0.3" />
              ))}
              
              {/* Animated path */}
              <path 
                d="M60,140 L120,130 L180,110 L240,95 L300,85 L360,80" 
                stroke="hsl(72, 68%, 64%)" 
                strokeWidth="3" 
                fill="none" 
                filter="url(#glow)"
                strokeDasharray="1000"
                strokeDashoffset={1000 - (animationProgress * 10)}
                className="transition-all duration-2000"
              />
              
              {/* Area fill */}
              <path 
                d="M60,140 L120,130 L180,110 L240,95 L300,85 L360,80 L360,180 L60,180 Z" 
                fill="url(#deviceGradient)"
                opacity={animationProgress / 100}
                className="transition-opacity duration-2000"
              />
              
              {/* Interactive points */}
              {[60, 120, 180, 240, 300, 360].map((x, i) => (
                <g key={i}>
                  <circle 
                    cx={x} 
                    cy={currentData.deviceData[i]} 
                    r={hoveredPoint === i ? "8" : "5"} 
                    fill="hsl(72, 68%, 64%)" 
                    className="cursor-pointer transition-all duration-300" 
                    filter={hoveredPoint === i ? "url(#glow)" : "none"}
                    onMouseEnter={(e) => {
                      setHoveredPoint(i);
                      setShowTooltip(true);
                      setTooltipData({ x: e.clientX, y: e.clientY, value: `${timeLabels[i]}: ${currentData.deviceValues[i]} devices` });
                    }}
                    onMouseLeave={() => {
                      setHoveredPoint(null);
                      setShowTooltip(false);
                    }}
                    onClick={() => alert(`Device details for ${timeLabels[i]}: ${currentData.deviceValues[i]} active devices`)}
                  />
                  {hoveredPoint === i && (
                    <circle cx={x} cy={currentData.deviceData[i]} r="12" fill="none" stroke="hsl(72, 68%, 64%)" strokeWidth="1" opacity="0.5" className="animate-ping" />
                  )}
                </g>
              ))}
              
              {/* Time labels */}
              {timeLabels.map((label, i) => (
                <text key={i} x={[60, 120, 180, 240, 300, 360][i]} y="195" textAnchor="middle" className="text-xs fill-muted-foreground">
                  {label}
                </text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Energy Consumption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Energy Consumption
            </h3>
            <button className="text-xs bg-soft-coral/10 text-soft-coral px-2 py-1 rounded hover:bg-soft-coral/20">
              Optimize
            </button>
          </div>
          <div className="h-64 relative">
            <div className="absolute top-0 right-0 text-xs text-muted-foreground">
              Total: {currentData.energyValues.reduce((a, b) => a + b, 0).toFixed(1)}kWh
            </div>
            <svg className="w-full h-full" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(0, 72%, 77%)" />
                  <stop offset="100%" stopColor="hsl(0, 72%, 67%)" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              {[40, 80, 120, 160].map(y => (
                <line key={y} x1="25" y1={y} x2="375" y2={y} stroke="hsl(0, 0%, 20%)" strokeWidth="0.5" opacity="0.3" />
              ))}
              
              {/* Bars with animation */}
              {[40, 80, 120, 160, 200, 240, 280, 320].map((x, i) => {
                const barHeight = (180 - currentData.energyData[i]) * (animationProgress / 100);
                const isSelected = selectedBar === i;
                return (
                  <g key={i}>
                    <rect 
                      x={x-15} 
                      y={180 - barHeight} 
                      width="30" 
                      height={barHeight} 
                      fill={isSelected ? "url(#barGradient)" : "hsl(0, 72%, 77%, 0.8)"} 
                      className="cursor-pointer transition-all duration-300 hover:opacity-90" 
                      rx="2"
                      onMouseEnter={(e) => {
                        setShowTooltip(true);
                        setTooltipData({ x: e.clientX, y: e.clientY, value: `${energyLabels[i]}: ${currentData.energyValues[i]}kWh` });
                      }}
                      onMouseLeave={() => setShowTooltip(false)}
                      onClick={() => {
                        setSelectedBar(selectedBar === i ? null : i);
                        alert(`Energy details for ${energyLabels[i]}: ${currentData.energyValues[i]}kWh consumed`);
                      }}
                    />
                    {isSelected && (
                      <rect 
                        x={x-17} 
                        y={178 - barHeight} 
                        width="34" 
                        height={barHeight + 4} 
                        fill="none" 
                        stroke="hsl(0, 72%, 77%)" 
                        strokeWidth="2" 
                        rx="3"
                        className="animate-pulse"
                      />
                    )}
                    {/* Value labels */}
                    <text 
                      x={x} 
                      y={175 - barHeight} 
                      textAnchor="middle" 
                      className="text-xs fill-foreground font-medium"
                      opacity={barHeight > 20 ? 1 : 0}
                    >
                      {currentData.energyValues[i]}
                    </text>
                  </g>
                );
              })}
              
              {/* Day labels */}
              {energyLabels.slice(0, 8).map((label, i) => (
                <text key={i} x={[40, 80, 120, 160, 200, 240, 280, 320][i]} y="195" textAnchor="middle" className="text-xs fill-muted-foreground">
                  {label}
                </text>
              ))}
            </svg>
          </div>
        </motion.div>

        {/* Automation Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Automation Performance
            </h3>
            <button className="text-xs bg-neon-green/10 text-neon-green px-2 py-1 rounded hover:bg-neon-green/20">
              Tune AI
            </button>
          </div>
          <div className="h-64 relative flex items-center justify-center">
            <div className="absolute top-0 left-0 grid grid-cols-2 gap-2 text-xs">
              <div className="glass-subtle rounded p-2 text-center">
                <div className="text-neon-green font-bold">247</div>
                <div className="text-muted-foreground">Executions</div>
              </div>
              <div className="glass-subtle rounded p-2 text-center">
                <div className="text-soft-coral font-bold">4</div>
                <div className="text-muted-foreground">Failed</div>
              </div>
            </div>
            <svg className="w-48 h-48 cursor-pointer" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(72, 68%, 64%)" />
                  <stop offset="100%" stopColor="hsl(72, 68%, 54%)" />
                </linearGradient>
              </defs>
              
              {/* Background circle */}
              <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(0, 0%, 15%)" strokeWidth="12" />
              
              {/* Progress circle with animation */}
              <circle 
                cx="100" 
                cy="100" 
                r="80" 
                fill="none" 
                stroke="url(#progressGradient)" 
                strokeWidth="12" 
                strokeDasharray="502" 
                strokeDashoffset={502 - (502 * 0.985 * animationProgress / 100)} 
                className="transition-all duration-2000" 
                transform="rotate(-90 100 100)"
                onMouseEnter={(e) => {
                  setShowTooltip(true);
                  setTooltipData({ x: e.clientX, y: e.clientY, value: 'Success: 247/251 executions (98.5%)' });
                }}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => alert('Automation Performance:\n• Total Executions: 251\n• Successful: 247\n• Failed: 4\n• Success Rate: 98.5%\n• Avg Response Time: 1.2s')}
              />
              
              {/* Center content */}
              <text x="100" y="90" textAnchor="middle" className="text-3xl font-bold fill-neon-green pointer-events-none">98.5%</text>
              <text x="100" y="110" textAnchor="middle" className="text-sm fill-muted-foreground pointer-events-none">Success Rate</text>
              <text x="100" y="125" textAnchor="middle" className="text-xs fill-muted-foreground pointer-events-none">Last 24h</text>
              
              {/* Pulse effect */}
              <circle cx="100" cy="100" r="85" fill="none" stroke="hsl(72, 68%, 64%)" strokeWidth="1" opacity="0.3" className="animate-ping" />
            </svg>
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-card rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Network Health
            </h3>
            <button className="text-xs bg-neon-green/10 text-neon-green px-2 py-1 rounded hover:bg-neon-green/20">
              Run Diagnostics
            </button>
          </div>
          <div className="h-64 relative">
            <svg className="w-full h-full cursor-pointer" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="healthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="hsl(72, 68%, 64%)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="hsl(72, 68%, 64%)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path 
                d="M20,100 Q100,60 200,80 Q300,100 380,70" 
                stroke="hsl(72, 68%, 64%)" 
                strokeWidth="3" 
                fill="none" 
                className="hover:stroke-width-4 transition-all"
                onMouseEnter={(e) => {
                  setShowTooltip(true);
                  setTooltipData({ x: e.clientX, y: e.clientY, value: 'Network uptime: 99.8%' });
                }}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => alert('Network diagnostics: All systems operational')}
              />
              <path d="M20,100 Q100,60 200,80 Q300,100 380,70 L380,180 L20,180 Z" fill="url(#healthGradient)" className="pointer-events-none" />
              <circle cx="200" cy="80" r="6" fill="hsl(72, 68%, 64%)" className="animate-ping pointer-events-none" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Global Tooltip */}
      {showTooltip && (
        <div 
          className="fixed z-[9999] glass-card rounded px-2 py-1 text-xs text-foreground pointer-events-none border border-white/20"
          style={{ left: tooltipData.x - 40, top: tooltipData.y - 40 }}
        >
          {tooltipData.value}
        </div>
      )}
    </div>
  );
};

export default Analytics;