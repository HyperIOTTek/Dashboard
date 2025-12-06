import { motion } from "framer-motion";
import { Wifi, WifiOff, Plus, Power, Zap, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const devices = [
  { id: 1, name: "Smart Thermostat", type: "Climate", status: "online", battery: 85 },
  { id: 2, name: "Security Camera #1", type: "Security", status: "online", battery: null },
  { id: 3, name: "Smart Lock", type: "Security", status: "online", battery: 72 },
  { id: 4, name: "Living Room Light", type: "Lighting", status: "online", battery: null },
  { id: 5, name: "Smart Plug #1", type: "Power", status: "offline", battery: null },
  { id: 6, name: "Motion Sensor", type: "Security", status: "online", battery: 45 },
  { id: 7, name: "Door Sensor", type: "Security", status: "online", battery: 90 },
  { id: 8, name: "Smart Speaker", type: "Audio", status: "online", battery: null },
];

const Devices = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [deviceStates, setDeviceStates] = useState(devices.reduce((acc, device) => ({ ...acc, [device.id]: device.status === 'online' }), {}));
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [scanResults, setScanResults] = useState([]);
  const [showAddDevice, setShowAddDevice] = useState(false);
  const [showDeviceControl, setShowDeviceControl] = useState(false);
  const [showDeviceSettings, setShowDeviceSettings] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [selectedDeviceType, setSelectedDeviceType] = useState(null);

  const handleScanNetwork = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResults(['Smart Bulb #4', 'Motion Sensor #2', 'Smart Plug #6']);
      setModalContent({ 
        title: 'Network Scan Complete', 
        content: 'Found 3 new devices ready for setup' 
      });
      setShowModal(true);
    }, 2000);
  };

  const toggleDevice = (deviceId) => {
    setDeviceStates(prev => ({ ...prev, [deviceId]: !prev[deviceId] }));
    const device = devices.find(d => d.id === deviceId);
    setModalContent({ 
      title: 'Device Status Changed', 
      content: `${device.name} ${deviceStates[deviceId] ? 'turned OFF' : 'turned ON'}` 
    });
    setShowModal(true);
  };

  const handleDeviceControl = (device) => {
    setSelectedDevice(device);
    setShowDeviceControl(true);
  };

  const handleDeviceSettings = (device) => {
    setSelectedDevice(device);
    setShowDeviceSettings(true);
  };

  const setupDevice = (deviceType) => {
    setSelectedDeviceType(deviceType);
    setShowAddDevice(false);
    setModalContent({ 
      title: `Setting up ${deviceType}`, 
      content: `${deviceType} setup initiated. Follow the device instructions.` 
    });
    setShowModal(true);
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Devices</h1>
          <p className="text-muted-foreground">
            Manage your connected IoT devices
          </p>
        </div>
        <Button 
          className="bg-neon-green text-carbon-black hover:bg-neon-green/90 shadow-lg shadow-neon-green/20"
          onClick={() => setShowAddDevice(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Device
        </Button>
      </div>

      {/* Device Discovery Scanner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-strong rounded-xl border border-white/10 p-6 mb-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Device Discovery</h2>
          <Button 
            className={`${isScanning ? 'bg-soft-coral/10 text-soft-coral' : 'bg-neon-green/10 text-neon-green hover:bg-neon-green/20'} border border-neon-green/30`}
            onClick={handleScanNetwork}
            disabled={isScanning}
          >
            {isScanning ? 'Scanning...' : 'Scan Network'}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-neon-green/20 flex items-center justify-center">
              <span className="text-sm font-bold text-neon-green">5</span>
            </div>
            <p className="text-xs text-muted-foreground">New Devices Found</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-soft-coral/20 flex items-center justify-center">
              <span className="text-sm font-bold text-soft-coral">2</span>
            </div>
            <p className="text-xs text-muted-foreground">Pending Setup</p>
          </div>
          <div className="glass-subtle rounded-lg p-4 text-center">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-neon-green/20 flex items-center justify-center">
              <span className="text-sm font-bold text-neon-green">42</span>
            </div>
            <p className="text-xs text-muted-foreground">Total Connected</p>
          </div>
        </div>
      </motion.div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {devices.map((device, index) => (
          <motion.div
            key={device.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card rounded-xl p-6 glass-hover hover:border-neon-green/30 group cursor-pointer"
          >
            {/* Status Indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {device.status === "online" ? (
                  <Wifi className="h-4 w-4 text-neon-green" />
                ) : (
                  <WifiOff className="h-4 w-4 text-deep-red" />
                )}
                <span
                  className={`text-xs font-medium ${
                    device.status === "online" ? "text-neon-green" : "text-deep-red"
                  }`}
                >
                  {device.status}
                </span>
              </div>
              <Power 
                className={`h-4 w-4 cursor-pointer transition-colors ${
                  deviceStates[device.id] ? 'text-neon-green' : 'text-muted-foreground'
                } group-hover:text-neon-green`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDevice(device.id);
                }}
              />
            </div>

            {/* Device Info */}
            <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-neon-green transition-colors">
              {device.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{device.type}</p>

            {/* Battery Level */}
            {device.battery !== null && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Battery</span>
                  <span className="text-foreground font-medium">
                    {device.battery}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      device.battery > 60
                        ? "bg-neon-green"
                        : device.battery > 30
                        ? "bg-soft-coral"
                        : "bg-deep-red"
                    }`}
                    style={{ width: `${device.battery}%` }}
                  />
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                className="text-xs bg-neon-green/10 text-neon-green px-2 py-1 rounded hover:bg-neon-green/20"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeviceControl(device);
                }}
              >
                Control
              </button>
              <button 
                className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeviceSettings(device);
                }}
              >
                Settings
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Device Categories Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-xl border border-white/10 p-6 mt-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Device Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Security", "Lighting", "Climate", "Power"].map((category) => {
            const deviceCount = category === "Security" ? 4 : 1;
            const isSelected = selectedCategory === category;
            return (
              <div 
                key={category} 
                className={`glass-subtle rounded-lg p-4 text-center cursor-pointer transition-colors ${
                  isSelected ? 'border-neon-green/50 bg-neon-green/10' : 'hover:border-neon-green/30'
                }`}
                onClick={() => {
                  setSelectedCategory(isSelected ? null : category);
                  setModalContent({ 
                    title: 'Category Filter', 
                    content: `${isSelected ? 'Cleared filter' : `Filtering by ${category} devices`}` 
                  });
                  setShowModal(true);
                }}
              >
                <h4 className={`text-sm font-medium mb-1 ${
                  isSelected ? 'text-neon-green' : 'text-foreground'
                }`}>{category}</h4>
                <p className="text-xs text-muted-foreground">
                  {deviceCount} device{deviceCount > 1 ? 's' : ''}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Device Health Monitor */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="glass-card rounded-xl border border-white/10 p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Device Health Monitor</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-subtle rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Battery Status</h3>
            <div className="space-y-2">
              {devices.filter(d => d.battery).map(device => (
                <div key={device.id} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground truncate">{device.name}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          device.battery > 60 ? 'bg-neon-green' : 
                          device.battery > 30 ? 'bg-soft-coral' : 'bg-deep-red'
                        }`}
                        style={{ width: `${device.battery}%` }}
                      />
                    </div>
                    <span className="text-foreground font-medium w-8">{device.battery}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-subtle rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Connection Quality</h3>
            <div className="space-y-3">
              {['Excellent', 'Good', 'Fair'].map((quality, i) => {
                const count = i === 0 ? 6 : i === 1 ? 2 : 0;
                const color = i === 0 ? 'neon-green' : i === 1 ? 'soft-coral' : 'deep-red';
                return (
                  <div key={quality} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-${color}`} />
                      <span className="text-xs text-muted-foreground">{quality}</span>
                    </div>
                    <span className="text-xs font-medium text-foreground">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="glass-subtle rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">System Alerts</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-soft-coral animate-pulse" />
                <span className="text-xs text-muted-foreground">Low battery warnings</span>
                <span className="text-xs font-medium text-soft-coral ml-auto">2</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green" />
                <span className="text-xs text-muted-foreground">Devices online</span>
                <span className="text-xs font-medium text-neon-green ml-auto">7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-deep-red" />
                <span className="text-xs text-muted-foreground">Offline devices</span>
                <span className="text-xs font-medium text-deep-red ml-auto">1</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Device Automation Rules */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="glass-card rounded-xl border border-white/10 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Automation Rules</h2>
          <Button className="bg-neon-green/10 text-neon-green hover:bg-neon-green/20 border border-neon-green/30">
            Create Rule
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { trigger: 'Motion Detected', action: 'Turn on lights', status: 'active', executions: 24 },
            { trigger: 'Temperature > 75°F', action: 'Adjust thermostat', status: 'active', executions: 12 },
            { trigger: 'Door unlocked', action: 'Disable security', status: 'paused', executions: 8 },
            { trigger: 'Low battery < 20%', action: 'Send notification', status: 'active', executions: 3 }
          ].map((rule, i) => (
            <div key={i} className="glass-subtle rounded-lg p-4 hover:border-neon-green/30 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  rule.status === 'active' ? 'bg-neon-green animate-pulse' : 'bg-soft-coral'
                }`} />
                <span className="text-xs text-muted-foreground">{rule.executions} times</span>
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">{rule.trigger}</h4>
              <p className="text-xs text-muted-foreground mb-2">→ {rule.action}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  rule.status === 'active' 
                    ? 'bg-neon-green/10 text-neon-green' 
                    : 'bg-soft-coral/10 text-soft-coral'
                }`}>
                  {rule.status}
                </span>
                <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Device Energy Usage */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="glass-card rounded-xl border border-white/10 p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Energy Usage Analytics</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Top Energy Consumers</h3>
            <div className="space-y-3">
              {[
                { device: 'Smart Thermostat', usage: 45, cost: '$12.30' },
                { device: 'Security Camera #1', usage: 32, cost: '$8.75' },
                { device: 'Living Room Light', usage: 18, cost: '$4.90' },
                { device: 'Smart Speaker', usage: 12, cost: '$3.25' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{item.device}</span>
                      <span className="text-xs text-muted-foreground">{item.cost}</span>
                    </div>
                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-neon-green to-soft-coral rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.usage}%` }}
                        transition={{ duration: 1, delay: i * 0.1 + 1.2 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-subtle rounded-lg p-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Monthly Summary</h3>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-green mb-1">$28.20</div>
                <div className="text-xs text-muted-foreground">Total Cost This Month</div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-foreground">342</div>
                  <div className="text-xs text-muted-foreground">kWh Used</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-soft-coral">-12%</div>
                  <div className="text-xs text-muted-foreground">vs Last Month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass-frosted rounded-2xl p-8 max-w-md w-full mx-4 border border-white/30 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <h3 className="text-xl font-bold text-foreground">{modalContent.title}</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">{modalContent.content}</p>
            {scanResults.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-neon-green mb-3 flex items-center gap-2">
                  <div className="w-1 h-1 bg-neon-green rounded-full"></div>
                  New Devices Found:
                </h4>
                <div className="space-y-2">
                  {scanResults.map((device, i) => (
                    <div key={i} className="glass-card rounded-lg p-3 text-sm text-foreground flex items-center justify-between hover:border-neon-green/30 transition-colors">
                      <span>{device}</span>
                      <button className="text-xs bg-neon-green/20 text-neon-green px-2 py-1 rounded-full hover:bg-neon-green/30 transition-colors">
                        Setup
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button 
              className="bg-gradient-to-r from-neon-green to-neon-green/80 text-carbon-black px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 w-full font-medium"
              onClick={() => {
                setShowModal(false);
                setScanResults([]);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Device Modal */}
      {showAddDevice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass-frosted rounded-2xl p-8 max-w-2xl w-full mx-4 border border-white/30 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-bold text-foreground">Add New Device</h3>
              </div>
              <button 
                onClick={() => setShowAddDevice(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-soft-coral rounded-full"></div>
                  Setup Process
                </h4>
                <div className="space-y-3">
                  {[
                    { step: 1, text: 'Select device type', icon: '📱' },
                    { step: 2, text: 'Follow setup instructions', icon: '📋' },
                    { step: 3, text: 'Connect to network', icon: '🌐' }
                  ].map(item => (
                    <div key={item.step} className="glass-card rounded-lg p-4 flex items-center gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <span className="text-neon-green font-bold text-sm">Step {item.step}</span>
                        <p className="text-sm text-foreground">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-neon-green rounded-full"></div>
                  Device Types
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: 'Smart Light', icon: '💡', desc: 'LED & Smart Bulbs' },
                    { type: 'Security Camera', icon: '📹', desc: 'Indoor & Outdoor' },
                    { type: 'Smart Lock', icon: '🔒', desc: 'Door & Gate Locks' },
                    { type: 'Sensor', icon: '🌡️', desc: 'Motion & Temperature' }
                  ].map(item => (
                    <button 
                      key={item.type}
                      className="glass-card rounded-lg p-4 text-left hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-300 group"
                      onClick={() => setupDevice(item.type)}
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">{item.icon}</div>
                      <h5 className="text-sm font-semibold text-foreground mb-1">{item.type}</h5>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                className="bg-gradient-to-r from-neon-green to-neon-green/80 text-carbon-black px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 font-medium flex-1"
                onClick={() => {
                  setShowAddDevice(false);
                  setModalContent({ 
                    title: 'Manual Setup', 
                    content: 'Enter device details manually or scan QR code.' 
                  });
                  setShowModal(true);
                }}
              >
                Manual Setup
              </button>
              <button 
                className="glass-card px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
                onClick={() => setShowAddDevice(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Device Control Modal */}
      {showDeviceControl && selectedDevice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass-frosted rounded-2xl p-8 max-w-lg w-full mx-4 border border-white/30 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full animate-pulse ${
                  deviceStates[selectedDevice.id] ? 'bg-neon-green' : 'bg-soft-coral'
                }`}></div>
                <h3 className="text-xl font-bold text-foreground">Control {selectedDevice.name}</h3>
              </div>
              <button 
                onClick={() => setShowDeviceControl(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">⚡</div>
                    <span className="text-lg font-semibold text-foreground">Power Control</span>
                  </div>
                  <button 
                    className={`w-16 h-8 rounded-full transition-all duration-300 ${
                      deviceStates[selectedDevice.id] 
                        ? 'bg-gradient-to-r from-neon-green to-neon-green/80 shadow-lg shadow-neon-green/30' 
                        : 'bg-white/20'
                    } relative`}
                    onClick={() => toggleDevice(selectedDevice.id)}
                  >
                    <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform duration-300 ${
                      deviceStates[selectedDevice.id] ? 'translate-x-9' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Device is currently {deviceStates[selectedDevice.id] ? 'ON' : 'OFF'}
                </p>
              </div>
              
              {selectedDevice.type === 'Lighting' && (
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">💡</div>
                    <span className="text-lg font-semibold text-foreground">Brightness</span>
                  </div>
                  <input 
                    type="range" 
                    className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider" 
                    min="0" 
                    max="100" 
                    defaultValue="75" 
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0%</span>
                    <span>75%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}
              
              {selectedDevice.type === 'Climate' && (
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">🌡️</div>
                    <span className="text-lg font-semibold text-foreground">Temperature</span>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-xl font-bold transition-colors">
                      -
                    </button>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-neon-green">72°F</div>
                      <div className="text-xs text-muted-foreground">Target Temperature</div>
                    </div>
                    <button className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-xl font-bold transition-colors">
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button 
              className="bg-gradient-to-r from-neon-green to-neon-green/80 text-carbon-black px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 mt-6 w-full font-medium"
              onClick={() => setShowDeviceControl(false)}
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Device Settings Modal */}
      {showDeviceSettings && selectedDevice && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass-frosted rounded-2xl p-8 max-w-lg w-full mx-4 border border-white/30 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-soft-coral rounded-full animate-pulse"></div>
                <h3 className="text-xl font-bold text-foreground">Settings - {selectedDevice.name}</h3>
              </div>
              <button 
                onClick={() => setShowDeviceSettings(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">📝</div>
                  <label className="text-lg font-semibold text-foreground">Device Name</label>
                </div>
                <input 
                  type="text" 
                  defaultValue={selectedDevice.name}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-foreground focus:border-neon-green/50 focus:outline-none transition-colors"
                  placeholder="Enter device name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🔄</div>
                      <div>
                        <div className="font-semibold text-foreground">Auto-Update</div>
                        <div className="text-xs text-muted-foreground">Automatic firmware updates</div>
                      </div>
                    </div>
                    <button className="w-14 h-7 bg-gradient-to-r from-neon-green to-neon-green/80 rounded-full relative shadow-lg shadow-neon-green/30">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-1 right-1 transition-transform" />
                    </button>
                  </div>
                </div>
                
                <div className="glass-card rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🔔</div>
                      <div>
                        <div className="font-semibold text-foreground">Notifications</div>
                        <div className="text-xs text-muted-foreground">Push notifications</div>
                      </div>
                    </div>
                    <button className="w-14 h-7 bg-gradient-to-r from-neon-green to-neon-green/80 rounded-full relative shadow-lg shadow-neon-green/30">
                      <div className="w-5 h-5 bg-white rounded-full absolute top-1 right-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">📊</div>
                  <span className="text-lg font-semibold text-foreground">Device Info</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="text-foreground ml-2">{selectedDevice.type}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`ml-2 ${selectedDevice.status === 'online' ? 'text-neon-green' : 'text-deep-red'}`}>
                      {selectedDevice.status}
                    </span>
                  </div>
                  {selectedDevice.battery && (
                    <div>
                      <span className="text-muted-foreground">Battery:</span>
                      <span className="text-foreground ml-2">{selectedDevice.battery}%</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">ID:</span>
                    <span className="text-foreground ml-2">#{selectedDevice.id}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button className="bg-gradient-to-r from-neon-green to-neon-green/80 text-carbon-black px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/20 transition-all duration-300 font-medium flex-1">
                Save Changes
              </button>
              <button 
                className="glass-card px-6 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
                onClick={() => setShowDeviceSettings(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;