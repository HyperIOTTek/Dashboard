import { motion } from "framer-motion";
import { HelpCircle, Book, MessageCircle, Mail, Building, Calendar, MapPin, Phone, Globe, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

const supportOptions = [
  {
    title: "Contact Support",
    description: "Get help from our team",
    icon: Mail,
  },
  {
    title: "FAQ",
    description: "Common questions answered",
    icon: HelpCircle,
  },
  {
    title: "Documentation",
    description: "Browse guides and tutorials",
    icon: Book,
  },
  {
    title: "Community Forum",
    description: "Connect with other users",
    icon: MessageCircle,
  },
];

const Support = () => {
  const [activeTab, setActiveTab] = useState('contactsupport');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      question: "How do I connect my IoT devices to the dashboard?",
      answer: "You can connect devices through the Devices page by clicking 'Add Device' and following the setup wizard. We support MQTT, HTTP, and WebSocket protocols."
    },
    {
      question: "What types of sensors are supported?",
      answer: "HyperIOTTek supports temperature, humidity, pressure, motion, light, and custom sensors. Our platform is designed to work with most IoT devices."
    },
    {
      question: "How can I set up automated alerts?",
      answer: "Navigate to the Automation page, create a new rule, set your conditions and thresholds, then configure your preferred notification method (email, SMS, or push)."
    },
    {
      question: "Is my data secure and encrypted?",
      answer: "Yes, all data is encrypted in transit using TLS 1.3 and at rest using AES-256. We follow industry-standard security practices and comply with data protection regulations."
    }
  ];

  const documentationSections = [
    { title: "Getting Started Guide", desc: "Learn the basics of HyperIOTTek" },
    { title: "Device Integration", desc: "Connect and manage your IoT devices" },
    { title: "API Documentation", desc: "Integrate with our REST and WebSocket APIs" },
    { title: "Troubleshooting", desc: "Common issues and solutions" }
  ];

  return (
    <div className="p-4 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Support</h1>
        <p className="text-muted-foreground">
          Get help and learn about HyperIOTTek
        </p>
      </div>

      {/* Support Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {supportOptions.map((option, index) => {
          const tabKey = option.title.toLowerCase().replace(' ', '');
          return (
            <motion.button
              key={option.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveTab(tabKey)}
              className={`glass rounded-xl p-4 border transition-all ${
                activeTab === tabKey
                  ? 'border-neon-green bg-neon-green/10'
                  : 'border-white/10 hover:border-neon-green/30'
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <div className={`p-2 rounded-lg border transition-colors ${
                  activeTab === tabKey
                    ? 'bg-neon-green/20 border-neon-green/50'
                    : 'bg-neon-green/10 border-neon-green/30'
                }`}>
                  <option.icon className="h-5 w-5 text-neon-green" />
                </div>
                <div className="text-center">
                  <h3 className={`text-sm font-medium transition-colors ${
                    activeTab === tabKey ? 'text-neon-green' : 'text-foreground'
                  }`}>
                    {option.title}
                  </h3>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-xl p-6 border border-white/10"
      >
        {/* Contact Support */}
        {activeTab === 'contactsupport' && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-neon-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="text-foreground font-medium">HyperIoT Cloud</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-neon-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <p className="text-foreground font-medium">April 12, 2023</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-neon-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground font-medium">0788324981</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-neon-green mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-foreground font-medium">59 Ananda Coomaraswamy Mawatha<br />Colombo 00300</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-neon-green" />
                  <div>
                    <p className="text-sm text-muted-foreground">Website</p>
                    <a href="https://hyperiottek.com/" target="_blank" rel="noopener noreferrer" className="text-neon-green font-medium hover:underline">
                      hyperiottek.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="glass-card rounded-lg border border-white/10">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <h3 className="text-foreground font-medium">{faq.question}</h3>
                    {expandedFaq === index ? (
                      <ChevronDown className="h-4 w-4 text-neon-green" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground text-sm">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Documentation */}
        {activeTab === 'documentation' && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Documentation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documentationSections.map((section, index) => (
                <div key={index} className="glass-card rounded-lg p-4 border border-white/10 hover:border-neon-green/30 transition-all cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <Book className="h-5 w-5 text-neon-green mt-1" />
                    <div>
                      <h3 className="text-foreground font-medium group-hover:text-neon-green transition-colors">{section.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{section.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Forum */}
        {activeTab === 'communityforum' && (
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">Community Forum</h2>
            <div className="space-y-4">
              <div className="glass-card rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="h-5 w-5 text-neon-green" />
                  <h3 className="text-foreground font-medium">Join Our Community</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Connect with other HyperIOTTek users, share experiences, and get help from the community.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card rounded-lg p-3 border border-white/10">
                    <h4 className="text-foreground font-medium text-sm mb-1">General Discussion</h4>
                    <p className="text-muted-foreground text-xs">Share ideas and general questions</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 border border-white/10">
                    <h4 className="text-foreground font-medium text-sm mb-1">Technical Support</h4>
                    <p className="text-muted-foreground text-xs">Get help with technical issues</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 border border-white/10">
                    <h4 className="text-foreground font-medium text-sm mb-1">Feature Requests</h4>
                    <p className="text-muted-foreground text-xs">Suggest new features and improvements</p>
                  </div>
                  <div className="glass-card rounded-lg p-3 border border-white/10">
                    <h4 className="text-foreground font-medium text-sm mb-1">Showcase</h4>
                    <p className="text-muted-foreground text-xs">Share your IoT projects and solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Support;