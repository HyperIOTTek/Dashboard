import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Save, Download, Upload, Trash2, Key, Globe, Database, Wifi } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const settingsSections = [
  {
    title: "Profile",
    description: "Manage your account information",
    icon: User,
  },
  {
    title: "Notifications",
    description: "Configure alert preferences",
    icon: Bell,
  },
  {
    title: "Security",
    description: "Password and authentication settings",
    icon: Shield,
  },
  {
    title: "Appearance",
    description: "Customize dashboard theme",
    icon: Palette,
  },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [settings, setSettings] = useState({
    profile: { name: 'John Doe', email: 'john@hyperiottek.com', role: 'Administrator' },
    notifications: { email: true, push: true, sms: false, alerts: true },
    security: { twoFactor: true, sessionTimeout: '30', loginAlerts: true },
    appearance: { theme: 'dark', language: 'en', timezone: 'UTC-5', animations: true, compactMode: false, glassEffect: true },
    network: { autoConnect: true, protocol: 'https', port: '8080', timeout: '30', retryAttempts: '3' }
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const updateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
    toast.innerHTML = `<div class="text-sm text-neon-green">✓ Settings updated</div>`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
      toast.innerHTML = `<div class="text-sm text-neon-green">✓ Connection test successful</div>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (error) {
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-deep-red/30 bg-deep-red/10';
      toast.innerHTML = `<div class="text-sm text-deep-red">✗ Connection test failed</div>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } finally {
      setIsTestingConnection(false);
    }
  };

  const runDiagnostics = async () => {
    setIsDiagnosing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const diagnostics = {
        dns: 'OK',
        ping: '12ms',
        bandwidth: '100 Mbps',
        packetLoss: '0%'
      };
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-neon-green/30 bg-neon-green/10 max-w-sm';
      toast.innerHTML = `
        <div class="text-sm text-neon-green mb-2">✓ Network Diagnostics Complete</div>
        <div class="text-xs text-foreground space-y-1">
          <div>DNS: ${diagnostics.dns}</div>
          <div>Ping: ${diagnostics.ping}</div>
          <div>Bandwidth: ${diagnostics.bandwidth}</div>
          <div>Packet Loss: ${diagnostics.packetLoss}</div>
        </div>
      `;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 5000);
    } catch (error) {
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-deep-red/30 bg-deep-red/10';
      toast.innerHTML = `<div class="text-sm text-deep-red">✗ Diagnostics failed</div>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const exportData = async () => {
    setIsExporting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const data = { settings, devices: [], analytics: [] };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `hyperiot-data-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
      toast.innerHTML = `<div class="text-sm text-neon-green">✓ Data exported successfully</div>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (error) {
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-deep-red/30 bg-deep-red/10';
      toast.innerHTML = `<div class="text-sm text-deep-red">✗ Export failed</div>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const importData = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      setIsImporting(true);
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (data.settings) {
          setSettings(data.settings);
        }
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
        toast.innerHTML = `<div class="text-sm text-neon-green">✓ Data imported successfully</div>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      } catch (error) {
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-deep-red/30 bg-deep-red/10';
        toast.innerHTML = `<div class="text-sm text-deep-red">✗ Import failed - Invalid file</div>`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
      } finally {
        setIsImporting(false);
      }
    };
    input.click();
  };

  const clearData = async () => {
    if (!confirm('Are you sure you want to clear all data? This action cannot be undone.')) return;
    setIsClearing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      localStorage.clear();
      sessionStorage.clear();
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
      toast.innerHTML = `<div class="text-sm text-neon-green">✓ Data cleared successfully</div>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } catch (error) {
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-deep-red/30 bg-deep-red/10';
      toast.innerHTML = `<div class="text-sm text-deep-red">✗ Clear operation failed</div>`;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="glass-card rounded-xl border border-white/10 p-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Settings</h3>
            <nav className="space-y-2">
              {[
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'notifications', label: 'Notifications', icon: Bell },
                { id: 'security', label: 'Security', icon: Shield },
                { id: 'appearance', label: 'Appearance', icon: Palette },
                { id: 'system', label: 'System', icon: Database },
                { id: 'network', label: 'Network', icon: Wifi }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === item.id 
                      ? 'bg-neon-green/10 text-neon-green border border-neon-green/30' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeSection === 'profile' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-strong rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Profile Settings</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      value={settings.profile.name}
                      onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                      className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                    <input 
                      type="email" 
                      value={settings.profile.email}
                      onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                      className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Role</label>
                  <select 
                    value={settings.profile.role}
                    onChange={(e) => updateSetting('profile', 'role', e.target.value)}
                    className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                  >
                    <option value="Administrator">Administrator</option>
                    <option value="User">User</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <Button className="bg-neon-green text-carbon-black hover:bg-neon-green/90">
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </Button>
                  <Button variant="outline" className="glass border-white/20">
                    <Upload className="h-4 w-4 mr-2" /> Upload Avatar
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeSection === 'notifications' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-strong rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Notification Preferences</h2>
              <div className="space-y-6">
                {[
                  { key: 'email', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'push', label: 'Push Notifications', desc: 'Browser push notifications' },
                  { key: 'sms', label: 'SMS Alerts', desc: 'Critical alerts via SMS' },
                  { key: 'alerts', label: 'System Alerts', desc: 'Device and system notifications' }
                ].map(item => (
                  <div key={item.key} className="glass-card rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{item.label}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                    <button 
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.notifications[item.key] ? 'bg-neon-green' : 'bg-white/20'
                      } relative`}
                      onClick={() => updateSetting('notifications', item.key, !settings.notifications[item.key])}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        settings.notifications[item.key] ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeSection === 'security' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-strong rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Security Settings</h2>
              <div className="space-y-6">
                <div className="glass-card rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Two-Factor Authentication</h4>
                      <p className="text-xs text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <button 
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.security.twoFactor ? 'bg-neon-green' : 'bg-white/20'
                      } relative`}
                      onClick={() => updateSetting('security', 'twoFactor', !settings.security.twoFactor)}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        settings.security.twoFactor ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">Session Timeout (minutes)</label>
                  <select 
                    value={settings.security.sessionTimeout}
                    onChange={(e) => updateSetting('security', 'sessionTimeout', e.target.value)}
                    className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                  >
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-neon-green text-carbon-black hover:bg-neon-green/90">
                    <Key className="h-4 w-4 mr-2" /> Change Password
                  </Button>
                  <Button variant="outline" className="glass border-white/20">
                    <Download className="h-4 w-4 mr-2" /> Download Backup Codes
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* System Settings */}
          {activeSection === 'system' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-strong rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">System Settings</h2>
              <div className="space-y-6">
                <div className="glass-card rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-4">Data Management</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Button 
                      onClick={exportData}
                      disabled={isExporting}
                      variant="outline" 
                      className="glass border-white/20 disabled:opacity-50"
                    >
                      <Download className={`h-4 w-4 mr-2 ${isExporting ? 'animate-spin' : ''}`} /> 
                      {isExporting ? 'Exporting...' : 'Export Data'}
                    </Button>
                    <Button 
                      onClick={importData}
                      disabled={isImporting}
                      variant="outline" 
                      className="glass border-white/20 disabled:opacity-50"
                    >
                      <Upload className={`h-4 w-4 mr-2 ${isImporting ? 'animate-spin' : ''}`} /> 
                      {isImporting ? 'Importing...' : 'Import Data'}
                    </Button>
                    <Button 
                      onClick={clearData}
                      disabled={isClearing}
                      variant="outline" 
                      className="glass border-deep-red/20 text-deep-red hover:bg-deep-red/10 disabled:opacity-50"
                    >
                      <Trash2 className={`h-4 w-4 mr-2 ${isClearing ? 'animate-spin' : ''}`} /> 
                      {isClearing ? 'Clearing...' : 'Clear Data'}
                    </Button>
                  </div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">System Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Version:</span> <span className="text-foreground">v2.1.0</span></div>
                    <div><span className="text-muted-foreground">Build:</span> <span className="text-foreground">#2024.12.15</span></div>
                    <div><span className="text-muted-foreground">Uptime:</span> <span className="text-foreground">7 days</span></div>
                    <div><span className="text-muted-foreground">Storage:</span> <span className="text-foreground">2.4GB / 10GB</span></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Appearance Settings */}
          {activeSection === 'appearance' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-strong rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Appearance Settings</h2>
              <div className="space-y-6">
                <div className="glass-card rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-4">Theme</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {['dark', 'light', 'auto'].map(theme => (
                      <button
                        key={theme}
                        onClick={() => updateSetting('appearance', 'theme', theme)}
                        className={`p-3 rounded-lg border transition-all ${
                          settings.appearance.theme === theme
                            ? 'border-neon-green bg-neon-green/10 text-neon-green'
                            : 'border-white/20 bg-white/5 text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        <div className="text-xs font-medium capitalize">{theme}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">Language</label>
                  <select 
                    value={settings.appearance.language}
                    onChange={(e) => updateSetting('appearance', 'language', e.target.value)}
                    className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <label className="text-sm font-medium text-foreground mb-2 block">Timezone</label>
                  <select 
                    value={settings.appearance.timezone}
                    onChange={(e) => updateSetting('appearance', 'timezone', e.target.value)}
                    className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                  >
                    <option value="UTC-12">UTC-12 (Baker Island)</option>
                    <option value="UTC-8">UTC-8 (PST)</option>
                    <option value="UTC-5">UTC-5 (EST)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC+1">UTC+1 (CET)</option>
                    <option value="UTC+8">UTC+8 (CST)</option>
                    <option value="UTC+9">UTC+9 (JST)</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {[
                    { key: 'animations', label: 'Enable Animations', desc: 'Smooth transitions and effects' },
                    { key: 'compactMode', label: 'Compact Mode', desc: 'Reduce spacing and padding' },
                    { key: 'glassEffect', label: 'Glass Effect', desc: 'Glassmorphism UI elements' }
                  ].map(item => (
                    <div key={item.key} className="glass-card rounded-lg p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-foreground">{item.label}</h4>
                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                      </div>
                      <button 
                        className={`w-12 h-6 rounded-full transition-colors ${
                          settings.appearance[item.key] ? 'bg-neon-green' : 'bg-white/20'
                        } relative`}
                        onClick={() => updateSetting('appearance', item.key, !settings.appearance[item.key])}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                          settings.appearance[item.key] ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Network Settings */}
          {activeSection === 'network' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-strong rounded-xl border border-white/10 p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">Network Settings</h2>
              <div className="space-y-6">
                <div className="glass-card rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-foreground">Auto Connect</h4>
                      <p className="text-xs text-muted-foreground">Automatically connect to available networks</p>
                    </div>
                    <button 
                      className={`w-12 h-6 rounded-full transition-colors ${
                        settings.network.autoConnect ? 'bg-neon-green' : 'bg-white/20'
                      } relative`}
                      onClick={() => updateSetting('network', 'autoConnect', !settings.network.autoConnect)}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                        settings.network.autoConnect ? 'translate-x-7' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card rounded-lg p-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">Protocol</label>
                    <select 
                      value={settings.network.protocol}
                      onChange={(e) => updateSetting('network', 'protocol', e.target.value)}
                      className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                    >
                      <option value="https">HTTPS</option>
                      <option value="http">HTTP</option>
                      <option value="mqtt">MQTT</option>
                      <option value="websocket">WebSocket</option>
                    </select>
                  </div>
                  <div className="glass-card rounded-lg p-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">Port</label>
                    <input 
                      type="number" 
                      value={settings.network.port}
                      onChange={(e) => updateSetting('network', 'port', e.target.value)}
                      className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                      placeholder="8080"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="glass-card rounded-lg p-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">Connection Timeout (seconds)</label>
                    <select 
                      value={settings.network.timeout}
                      onChange={(e) => updateSetting('network', 'timeout', e.target.value)}
                      className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                    >
                      <option value="10">10 seconds</option>
                      <option value="30">30 seconds</option>
                      <option value="60">1 minute</option>
                      <option value="120">2 minutes</option>
                    </select>
                  </div>
                  <div className="glass-card rounded-lg p-4">
                    <label className="text-sm font-medium text-foreground mb-2 block">Retry Attempts</label>
                    <select 
                      value={settings.network.retryAttempts}
                      onChange={(e) => updateSetting('network', 'retryAttempts', e.target.value)}
                      className="w-full glass border-white/10 rounded-lg px-4 py-3 text-foreground focus:border-neon-green focus:ring-neon-green/50 focus:outline-none transition-all"
                    >
                      <option value="1">1 attempt</option>
                      <option value="3">3 attempts</option>
                      <option value="5">5 attempts</option>
                      <option value="10">10 attempts</option>
                    </select>
                  </div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <h4 className="text-sm font-medium text-foreground mb-4">Network Status</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Status:</span> <span className="text-neon-green">Connected</span></div>
                    <div><span className="text-muted-foreground">Latency:</span> <span className="text-foreground">12ms</span></div>
                    <div><span className="text-muted-foreground">Bandwidth:</span> <span className="text-foreground">100 Mbps</span></div>
                    <div><span className="text-muted-foreground">Uptime:</span> <span className="text-foreground">99.9%</span></div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={testConnection}
                    disabled={isTestingConnection}
                    className="bg-neon-green text-carbon-black hover:bg-neon-green/90 disabled:opacity-50"
                  >
                    <Globe className={`h-4 w-4 mr-2 ${isTestingConnection ? 'animate-spin' : ''}`} /> 
                    {isTestingConnection ? 'Testing...' : 'Test Connection'}
                  </Button>
                  <Button 
                    onClick={runDiagnostics}
                    disabled={isDiagnosing}
                    variant="outline" 
                    className="glass border-white/20 disabled:opacity-50"
                  >
                    <Download className={`h-4 w-4 mr-2 ${isDiagnosing ? 'animate-spin' : ''}`} /> 
                    {isDiagnosing ? 'Running...' : 'Network Diagnostics'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
