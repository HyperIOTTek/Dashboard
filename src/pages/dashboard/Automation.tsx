import { motion } from "framer-motion";
import { Zap, Clock, Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const automations = [
  {
    id: 1,
    name: "Good Morning Routine",
    trigger: "7:00 AM Weekdays",
    actions: "Turn on lights, Adjust thermostat",
    active: true,
  },
  {
    id: 2,
    name: "Security Mode",
    trigger: "When everyone leaves",
    actions: "Lock doors, Enable cameras, Arm system",
    active: true,
  },
  {
    id: 3,
    name: "Energy Saver",
    trigger: "No motion for 30 min",
    actions: "Turn off lights, Reduce HVAC",
    active: true,
  },
  {
    id: 4,
    name: "Movie Time",
    trigger: "Manual trigger",
    actions: "Dim lights, Close blinds, Turn on TV",
    active: false,
  },
];

const Automation = () => {
  const [selectedTrigger, setSelectedTrigger] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [automationStates, setAutomationStates] = useState(
    automations.reduce((acc, automation) => ({ ...acc, [automation.id]: automation.active }), {})
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAutomation, setEditingAutomation] = useState(null);
  const [automationData, setAutomationData] = useState(automations);
  const [editForm, setEditForm] = useState({ name: '', trigger: '', actions: '' });

  const triggerOptions = {
    'Time-based': ['Daily at 7:00 AM', 'Weekly on Monday', 'Every 30 minutes'],
    'Motion detected': ['Living Room', 'Kitchen', 'Bedroom', 'Hallway'],
    'Device status': ['Device goes offline', 'Battery low', 'Temperature change'],
    'Weather condition': ['Sunny', 'Rainy', 'Temperature above 75°F']
  };

  const deviceOptions = {
    'Smart Lights': ['Living Room Light', 'Bedroom Light', 'Kitchen Light'],
    'Thermostat': ['Main Thermostat', 'Bedroom AC'],
    'Security System': ['Door Lock', 'Security Camera', 'Motion Sensor'],
    'Smart Lock': ['Front Door', 'Back Door', 'Garage Door']
  };

  const actionOptions = {
    'Smart Lights': ['Turn On', 'Turn Off', 'Dim to 50%', 'Set Color'],
    'Thermostat': ['Set to 72°F', 'Increase by 2°F', 'Decrease by 2°F', 'Auto Mode'],
    'Security System': ['Arm System', 'Disarm System', 'Send Alert', 'Record Video'],
    'Smart Lock': ['Lock', 'Unlock', 'Auto-lock in 5 min']
  };

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Automation
          </h1>
          <p className="text-muted-foreground">
            Smart rules and AI-powered routines
          </p>
        </div>
        <Button 
          className="bg-neon-green text-carbon-black hover:bg-neon-green/90 shadow-lg shadow-neon-green/20"
          onClick={() => {
            const newAutomation = {
              id: Date.now(),
              name: "New Automation",
              trigger: "Manual trigger",
              actions: "Custom action",
              active: false
            };
            setAutomationData(prev => [...prev, newAutomation]);
            setAutomationStates(prev => ({ ...prev, [newAutomation.id]: false }));
            
            const toast = document.createElement('div');
            toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
            toast.innerHTML = `<span class="text-sm text-neon-green">✓ New automation created!</span>`;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 2500);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Rule
        </Button>
      </div>

      {/* Automation Builder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-xl border border-white/10 p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Automation Builder</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div className="glass-card rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <h4 className="text-sm font-semibold text-foreground">Trigger</h4>
            </div>
            <div className="relative">
              <select 
                className="w-full glass-subtle border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground appearance-none cursor-pointer focus:border-neon-green/50 focus:outline-none transition-colors"
                value={selectedTrigger}
                onChange={(e) => {
                  setSelectedTrigger(e.target.value);
                  setSelectedDevice('');
                  setSelectedAction('');
                }}
              >
                <option value="" className="bg-carbon-black">Select trigger...</option>
                {Object.keys(triggerOptions).map(trigger => (
                  <option key={trigger} value={trigger} className="bg-carbon-black text-foreground">{trigger}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {selectedTrigger && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-neon-green font-medium">Options:</p>
                {triggerOptions[selectedTrigger].map((option, i) => (
                  <div key={i} className="text-xs text-muted-foreground bg-white/5 rounded px-2 py-1">
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="glass-card rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-soft-coral rounded-full animate-pulse"></div>
              <h4 className="text-sm font-semibold text-foreground">Device</h4>
            </div>
            <div className="relative">
              <select 
                className="w-full glass-subtle border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground appearance-none cursor-pointer focus:border-neon-green/50 focus:outline-none transition-colors"
                value={selectedDevice}
                onChange={(e) => {
                  setSelectedDevice(e.target.value);
                  setSelectedAction('');
                }}
                disabled={!selectedTrigger}
              >
                <option value="" className="bg-carbon-black">Select device...</option>
                {Object.keys(deviceOptions).map(device => (
                  <option key={device} value={device} className="bg-carbon-black text-foreground">{device}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {selectedDevice && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-soft-coral font-medium">Available:</p>
                {deviceOptions[selectedDevice].map((option, i) => (
                  <div key={i} className="text-xs text-muted-foreground bg-white/5 rounded px-2 py-1">
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="glass-card rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <h4 className="text-sm font-semibold text-foreground">Action</h4>
            </div>
            <div className="relative">
              <select 
                className="w-full glass-subtle border border-white/20 rounded-lg px-4 py-3 text-sm text-foreground appearance-none cursor-pointer focus:border-neon-green/50 focus:outline-none transition-colors"
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                disabled={!selectedDevice}
              >
                <option value="" className="bg-carbon-black">Select action...</option>
                {selectedDevice && actionOptions[selectedDevice] && actionOptions[selectedDevice].map(action => (
                  <option key={action} value={action} className="bg-carbon-black text-foreground">{action}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
            {selectedAction && (
              <div className="mt-3">
                <div className="text-xs text-neon-green font-medium mb-1">Selected:</div>
                <div className="text-xs text-foreground bg-neon-green/10 border border-neon-green/30 rounded px-2 py-1">
                  {selectedAction}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className={`transition-all duration-300 ${
              selectedTrigger && selectedDevice && selectedAction
                ? 'bg-gradient-to-r from-neon-green to-neon-green/80 text-carbon-black hover:shadow-lg hover:shadow-neon-green/20'
                : 'bg-white/10 text-muted-foreground cursor-not-allowed'
            }`}
            disabled={!selectedTrigger || !selectedDevice || !selectedAction}
onClick={() => {
              if (selectedTrigger && selectedDevice && selectedAction) {
                // Show success in UI instead of alert
                const successDiv = document.createElement('div');
                successDiv.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-neon-green/30 bg-neon-green/10 animate-in slide-in-from-right duration-300';
                successDiv.innerHTML = `
                  <div class="flex items-center gap-2">
                    <div class="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                    <span class="text-sm font-medium text-neon-green">Automation Created Successfully!</span>
                  </div>
                  <div class="text-xs text-muted-foreground mt-1">${selectedTrigger} → ${selectedDevice} → ${selectedAction}</div>
                `;
                document.body.appendChild(successDiv);
                setTimeout(() => successDiv.remove(), 3000);
                
                // Reset form
                setSelectedTrigger('');
                setSelectedDevice('');
                setSelectedAction('');
              }
            }}
          >
            <Zap className="h-4 w-4 mr-2" />
            Create Rule
          </Button>
          <Button 
            variant="outline" 
            className="glass-card border-white/20 hover:border-neon-green/50 hover:bg-neon-green/5 transition-all duration-300"
            onClick={() => {
              setSelectedTrigger('Motion detected');
              setTimeout(() => setSelectedDevice('Smart Lights'), 100);
              setTimeout(() => setSelectedAction('Turn On'), 200);
            }}
          >
            <span className="text-sm mr-2">🤖</span>
            AI Assistant
          </Button>
          <Button 
            variant="outline" 
            className="glass-card border-white/20 hover:border-soft-coral/50 hover:bg-soft-coral/5 transition-all"
            onClick={() => {
              setSelectedTrigger('');
              setSelectedDevice('');
              setSelectedAction('');
            }}
          >
            Clear
          </Button>
        </div>
        
        {selectedTrigger && selectedDevice && selectedAction && (
          <div className="mt-4 glass-card rounded-xl p-4 border border-neon-green/30 bg-neon-green/5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
              <h5 className="text-sm font-semibold text-neon-green">Preview Automation</h5>
            </div>
            <p className="text-sm text-foreground">
              When <span className="text-neon-green font-medium">{selectedTrigger}</span> → 
              Control <span className="text-soft-coral font-medium">{selectedDevice}</span> → 
              Execute <span className="text-neon-green font-medium">{selectedAction}</span>
            </p>
          </div>
        )}
      </motion.div>

      {/* AI Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-xl p-6 border border-neon-green/30 bg-neon-green/5"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-neon-green/20 border border-neon-green/40">
            <Zap className="h-6 w-6 text-neon-green" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              AI Smart Suggestions
            </h3>
            <div className="space-y-3">
              <div className="glass-subtle rounded-lg p-3 border border-neon-green/20">
                <p className="text-sm text-muted-foreground mb-2">
                  "Bedtime Routine" - Turn off lights and lock doors at 11 PM
                </p>
                <button className="text-xs bg-neon-green/10 text-neon-green px-2 py-1 rounded hover:bg-neon-green/20">
                  Apply
                </button>
              </div>
              <div className="glass-subtle rounded-lg p-3 border border-soft-coral/20">
                <p className="text-sm text-muted-foreground mb-2">
                  "Energy Optimizer" - Reduce HVAC when no one's home
                </p>
                <button className="text-xs bg-soft-coral/10 text-soft-coral px-2 py-1 rounded hover:bg-soft-coral/20">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Automation Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl border border-white/10 p-6 mb-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Automation Performance</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">98.5%</div>
            <p className="text-xs text-muted-foreground">Success Rate</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">247</div>
            <p className="text-xs text-muted-foreground">Executions Today</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-soft-coral mb-1">2.3s</div>
            <p className="text-xs text-muted-foreground">Avg Response</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neon-green mb-1">$12.40</div>
            <p className="text-xs text-muted-foreground">Energy Saved</p>
          </div>
        </div>
      </motion.div>

      {/* Automations List */}
      <div className="space-y-4">
        {automationData.map((automation, index) => (
          <motion.div
            key={automation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="glass-card rounded-xl p-6 border border-white/10 glass-hover hover:border-neon-green/30 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-neon-green transition-colors">
                    {automation.name}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
                      automation.active
                        ? "bg-neon-green/20 text-neon-green border border-neon-green/40"
                        : "bg-white/5 text-muted-foreground border border-white/10"
                    }`}
                  >
                    {automation.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Trigger:</span>
                    <span className="text-foreground">{automation.trigger}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Actions:</span>
                    <span className="text-foreground">{automation.actions}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="text-xs bg-neon-green/10 text-neon-green px-2 py-1 rounded hover:bg-neon-green/20"
                    onClick={() => {
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                      toast.innerHTML = `<span class="text-sm text-neon-green">Testing ${automation.name}...</span>`;
                      document.body.appendChild(toast);
                      setTimeout(() => {
                        toast.innerHTML = `<span class="text-sm text-neon-green">✓ Test completed successfully!</span>`;
                        setTimeout(() => toast.remove(), 2000);
                      }, 1500);
                    }}
                  >
                    Test Run
                  </button>
                  <button 
                    className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded hover:bg-white/10"
                    onClick={() => {
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-4 border border-white/20';
                      toast.innerHTML = `
                        <div class="text-sm text-foreground mb-2">${automation.name} Logs</div>
                        <div class="text-xs text-muted-foreground space-y-1">
                          <div>✓ Last run: 2 hours ago</div>
                          <div>✓ Success rate: 98.5%</div>
                          <div>✓ Total executions: 247</div>
                        </div>
                      `;
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 4000);
                    }}
                  >
                    View Logs
                  </button>
                  <button 
                    className="text-xs bg-white/5 text-muted-foreground px-2 py-1 rounded hover:bg-white/10"
                    onClick={() => {
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-soft-coral/30 bg-soft-coral/10';
                      toast.innerHTML = `<span class="text-sm text-soft-coral">✓ Duplicated: ${automation.name} Copy</span>`;
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 2500);
                    }}
                  >
                    Duplicate
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="glass border-white/10 hover:border-neon-green/50"
                  onClick={() => {
                    setEditingAutomation(automation);
                    setEditForm({
                      name: automation.name,
                      trigger: automation.trigger,
                      actions: automation.actions
                    });
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </Button>
                <button 
                  className={`w-12 h-6 rounded-full transition-colors ${
                    automationStates[automation.id] ? 'bg-neon-green' : 'bg-white/20'
                  } relative`}
                  onClick={() => {
                    setAutomationStates(prev => ({
                      ...prev,
                      [automation.id]: !prev[automation.id]
                    }));
                    
                    const toast = document.createElement('div');
                    toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                    toast.innerHTML = `
                      <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                        <span class="text-sm text-neon-green">${automation.name} ${automationStates[automation.id] ? 'disabled' : 'enabled'}</span>
                      </div>
                    `;
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 2000);
                  }}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    automationStates[automation.id] ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Automation Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-xl border border-white/10 p-6"
      >
        <h2 className="text-xl font-semibold text-foreground mb-4">Popular Templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {["Welcome Home", "Vacation Mode", "Party Scene"].map((template) => (
            <div key={template} className="glass-subtle rounded-lg p-4 cursor-pointer hover:border-neon-green/30 transition-colors">
              <h4 className="text-sm font-medium text-foreground mb-2">{template}</h4>
              <p className="text-xs text-muted-foreground mb-3">
                Pre-configured automation for {template.toLowerCase()}
              </p>
              <button className="text-xs bg-neon-green/10 text-neon-green px-2 py-1 rounded hover:bg-neon-green/20">
                Use Template
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Edit Automation Modal */}
      {showEditModal && editingAutomation && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="glass-frosted rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-white/30 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Edit Automation</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="glass-card rounded-lg p-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
                <input 
                  type="text" 
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-foreground focus:border-neon-green/50 focus:outline-none"
                />
              </div>
              
              <div className="glass-card rounded-lg p-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Trigger</label>
                <input 
                  type="text" 
                  value={editForm.trigger}
                  onChange={(e) => setEditForm(prev => ({ ...prev, trigger: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-foreground focus:border-neon-green/50 focus:outline-none"
                />
              </div>
              
              <div className="glass-card rounded-lg p-4">
                <label className="text-sm font-medium text-foreground mb-2 block">Actions</label>
                <textarea 
                  value={editForm.actions}
                  onChange={(e) => setEditForm(prev => ({ ...prev, actions: e.target.value }))}
                  className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-foreground focus:border-neon-green/50 focus:outline-none h-20 resize-none"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button 
                className="bg-gradient-to-r from-neon-green to-neon-green/80 text-carbon-black px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-neon-green/20 transition-all flex-1"
                onClick={() => {
                  setAutomationData(prev => prev.map(auto => 
                    auto.id === editingAutomation.id 
                      ? { ...auto, name: editForm.name, trigger: editForm.trigger, actions: editForm.actions }
                      : auto
                  ));
                  setShowEditModal(false);
                  const toast = document.createElement('div');
                  toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                  toast.innerHTML = `<span class="text-sm text-neon-green">✓ Automation updated successfully!</span>`;
                  document.body.appendChild(toast);
                  setTimeout(() => toast.remove(), 2500);
                }}
              >
                Save Changes
              </button>
              <button 
                className="glass-card px-6 py-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setShowEditModal(false)}
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

export default Automation;
