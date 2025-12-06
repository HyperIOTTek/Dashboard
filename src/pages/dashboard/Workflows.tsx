import { motion } from "framer-motion";
import { GitBranch, Plus, Play, Pause, Edit, Trash2, Copy, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const workflows = [
  { id: 1, name: "Morning Routine", status: "active", triggers: 2, actions: 5, lastRun: "2 hours ago", success: "98%" },
  { id: 2, name: "Security Protocol", status: "active", triggers: 3, actions: 8, lastRun: "5 min ago", success: "100%" },
  { id: 3, name: "Energy Saver", status: "paused", triggers: 1, actions: 3, lastRun: "1 day ago", success: "95%" },
  { id: 4, name: "Welcome Home", status: "draft", triggers: 2, actions: 6, lastRun: "Never", success: "N/A" }
];

const Workflows = () => {
  const [workflowList, setWorkflowList] = useState(workflows);
  const [workflowStates, setWorkflowStates] = useState(
    workflows.reduce((acc, wf) => ({ ...acc, [wf.id]: wf.status }), {})
  );
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedTriggers, setSelectedTriggers] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [selectedActions, setSelectedActions] = useState([]);
  const [workflowName, setWorkflowName] = useState('');
  const [editingWorkflow, setEditingWorkflow] = useState(null);

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Workflows</h1>
          <p className="text-muted-foreground">
            Visual automation flow builder
          </p>
        </div>
        <Button 
          className="bg-neon-green text-carbon-black hover:bg-neon-green/90 shadow-lg shadow-neon-green/20"
          onClick={() => setShowBuilder(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Workflow
        </Button>
      </div>

      {/* Workflow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-6">
          <div className="text-2xl font-bold text-neon-green mb-1">{workflowList.length}</div>
          <p className="text-xs text-muted-foreground">Total Workflows</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-6">
          <div className="text-2xl font-bold text-neon-green mb-1">{workflowList.filter(w => workflowStates[w.id] === 'active').length}</div>
          <p className="text-xs text-muted-foreground">Active</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-6">
          <div className="text-2xl font-bold text-soft-coral mb-1">97%</div>
          <p className="text-xs text-muted-foreground">Success Rate</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-xl p-6">
          <div className="text-2xl font-bold text-neon-green mb-1">156</div>
          <p className="text-xs text-muted-foreground">Executions Today</p>
        </motion.div>
      </div>

      {/* Workflow List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-strong rounded-xl border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold text-foreground">My Workflows</h2>
        </div>
        <div className="divide-y divide-white/10">
          {workflowList.map((workflow, index) => (
            <div key={workflow.id} className="p-6 hover:bg-white/5 transition-colors group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-foreground">{workflow.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      workflowStates[workflow.id] === 'active' ? 'bg-neon-green/20 text-neon-green' :
                      workflowStates[workflow.id] === 'paused' ? 'bg-soft-coral/20 text-soft-coral' :
                      'bg-white/10 text-muted-foreground'
                    }`}>
                      {workflowStates[workflow.id]}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Triggers:</span> <span className="text-foreground">{workflow.triggers}</span></div>
                    <div><span className="text-muted-foreground">Actions:</span> <span className="text-foreground">{workflow.actions}</span></div>
                    <div><span className="text-muted-foreground">Last Run:</span> <span className="text-foreground">{workflow.lastRun}</span></div>
                    <div><span className="text-muted-foreground">Success:</span> <span className="text-foreground">{workflow.success}</span></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    className={`p-2 rounded-lg transition-colors ${
                      workflowStates[workflow.id] === 'active' ? 'bg-soft-coral/10 text-soft-coral hover:bg-soft-coral/20' : 'bg-neon-green/10 text-neon-green hover:bg-neon-green/20'
                    }`}
                    onClick={() => {
                      const newState = workflowStates[workflow.id] === 'active' ? 'paused' : 'active';
                      setWorkflowStates(prev => ({ ...prev, [workflow.id]: newState }));
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                      toast.innerHTML = `<div class="text-sm text-neon-green">${workflow.name} ${newState}</div>`;
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 2000);
                    }}
                  >
                    {workflowStates[workflow.id] === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:bg-white/10 transition-colors" onClick={() => {
                    setEditingWorkflow(workflow);
                    setWorkflowName(workflow.name);
                    setSelectedTriggers(['Time Schedule']);
                    setSelectedConditions(['If/Then Logic']);
                    setSelectedActions(['Control Device', 'Send Notification']);
                    setShowBuilder(true);
                  }}>
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:bg-white/10 transition-colors" onClick={() => {
                    const toast = document.createElement('div');
                    toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-soft-coral/30 bg-soft-coral/10';
                    toast.innerHTML = `<div class="text-sm text-soft-coral">Duplicated: ${workflow.name} Copy</div>`;
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 2000);
                  }}>
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Workflow Templates */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card rounded-xl border border-white/10 p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Workflow Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Smart Home Arrival", desc: "Lights, temperature, music", icon: "🏠" },
            { name: "Security Alert", desc: "Motion detection response", icon: "🚨" },
            { name: "Energy Optimization", desc: "Automated power management", icon: "⚡" }
          ].map((template, i) => (
            <div key={i} className="glass-subtle rounded-lg p-4 cursor-pointer hover:border-neon-green/30 transition-colors" onClick={() => setShowBuilder(true)}>
              <div className="text-2xl mb-2">{template.icon}</div>
              <h4 className="text-sm font-medium text-foreground mb-1">{template.name}</h4>
              <p className="text-xs text-muted-foreground">{template.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Workflow Builder Modal */}
      {showBuilder && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="glass-frosted rounded-2xl p-8 max-w-4xl w-full mx-4 border border-white/30 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">
                {editingWorkflow ? `Edit ${editingWorkflow.name}` : 'Workflow Builder'}
              </h3>
              <button onClick={() => {
                setShowBuilder(false);
                setEditingWorkflow(null);
                setWorkflowName('');
                setSelectedTriggers([]);
                setSelectedConditions([]);
                setSelectedActions([]);
              }} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
            
            <div className="mb-6">
              <label className="text-sm font-medium text-foreground mb-2 block">Workflow Name</label>
              <input 
                type="text" 
                value={workflowName}
                onChange={(e) => setWorkflowName(e.target.value)}
                placeholder="Enter workflow name..."
                className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-foreground focus:border-neon-green/50 focus:outline-none"
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-neon-green" /> Triggers
                </h4>
                <div className="space-y-2">
                  {['Time Schedule', 'Device Status', 'Motion Detected', 'Weather Change'].map(trigger => (
                    <div 
                      key={trigger} 
                      className={`glass-subtle rounded p-3 cursor-pointer transition-colors ${
                        selectedTriggers.includes(trigger) ? 'border-neon-green/50 bg-neon-green/10' : 'hover:border-neon-green/30'
                      }`}
                      onClick={() => {
                        setSelectedTriggers(prev => 
                          prev.includes(trigger) ? prev.filter(t => t !== trigger) : [...prev, trigger]
                        );
                      }}
                    >
                      <div className="text-sm text-foreground">{trigger}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-soft-coral" /> Conditions
                </h4>
                <div className="space-y-2">
                  {['If/Then Logic', 'Time Range', 'Device State', 'User Present'].map(condition => (
                    <div 
                      key={condition} 
                      className={`glass-subtle rounded p-3 cursor-pointer transition-colors ${
                        selectedConditions.includes(condition) ? 'border-soft-coral/50 bg-soft-coral/10' : 'hover:border-soft-coral/30'
                      }`}
                      onClick={() => {
                        setSelectedConditions(prev => 
                          prev.includes(condition) ? prev.filter(c => c !== condition) : [...prev, condition]
                        );
                      }}
                    >
                      <div className="text-sm text-foreground">{condition}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass-card rounded-xl p-4">
                <h4 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-neon-green" /> Actions
                </h4>
                <div className="space-y-2">
                  {['Control Device', 'Send Notification', 'Run Automation', 'Log Event'].map(action => (
                    <div 
                      key={action} 
                      className={`glass-subtle rounded p-3 cursor-pointer transition-colors ${
                        selectedActions.includes(action) ? 'border-neon-green/50 bg-neon-green/10' : 'hover:border-neon-green/30'
                      }`}
                      onClick={() => {
                        setSelectedActions(prev => 
                          prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]
                        );
                      }}
                    >
                      <div className="text-sm text-foreground">{action}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button 
                className={`px-6 py-3 rounded-lg transition-all flex-1 ${
                  workflowName && selectedTriggers.length && selectedActions.length
                    ? 'bg-gradient-to-r from-neon-green to-neon-green/80 text-carbon-black hover:shadow-lg hover:shadow-neon-green/20'
                    : 'bg-white/10 text-muted-foreground cursor-not-allowed'
                }`}
                disabled={!workflowName || !selectedTriggers.length || !selectedActions.length}
                onClick={() => {
                  if (workflowName && selectedTriggers.length && selectedActions.length) {
                    if (editingWorkflow) {
                      setWorkflowList(prev => prev.map(w => 
                        w.id === editingWorkflow.id 
                          ? { ...w, name: workflowName, triggers: selectedTriggers.length, actions: selectedActions.length }
                          : w
                      ));
                      
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                      toast.innerHTML = `<div class="text-sm text-neon-green">✓ "${workflowName}" updated!</div>`;
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 2500);
                    } else {
                      const newWorkflow = {
                        id: Date.now(),
                        name: workflowName,
                        status: 'draft',
                        triggers: selectedTriggers.length,
                        actions: selectedActions.length,
                        lastRun: 'Never',
                        success: 'N/A'
                      };
                      
                      setWorkflowList(prev => [...prev, newWorkflow]);
                      setWorkflowStates(prev => ({ ...prev, [newWorkflow.id]: 'draft' }));
                      
                      const toast = document.createElement('div');
                      toast.className = 'fixed top-4 right-4 z-[9999] glass-card rounded-lg p-3 border border-neon-green/30 bg-neon-green/10';
                      toast.innerHTML = `<div class="text-sm text-neon-green">✓ "${newWorkflow.name}" created!</div>`;
                      document.body.appendChild(toast);
                      setTimeout(() => toast.remove(), 2500);
                    }
                    
                    setShowBuilder(false);
                    setEditingWorkflow(null);
                    setWorkflowName('');
                    setSelectedTriggers([]);
                    setSelectedConditions([]);
                    setSelectedActions([]);
                  }
                }}
              >
                {editingWorkflow ? 'Update Workflow' : 'Save Workflow'}
              </button>
              <button className="glass-card px-6 py-3 rounded-lg hover:bg-white/10 transition-colors" onClick={() => setShowBuilder(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workflows;
