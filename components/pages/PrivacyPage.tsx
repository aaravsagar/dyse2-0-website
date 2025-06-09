'use client';

import { Card } from '@/components/ui/card';
import { 
  Database, 
  Lock, 
  Server, 
  Trash, 
  Globe, 
  Mail,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  {
    icon: Shield,
    title: 'Privacy Policy Overview',
    content: 'This Privacy Policy explains how DYSE 2.0 collects, uses, and protects your information when you use our Discord bot. We are committed to ensuring that your privacy is protected and that you understand how your data is handled.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Database,
    title: 'Data Collection',
    content: (
      <>
        <p className="mb-3">We collect the following information:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Discord User ID and Username</li>
          <li>Server IDs where the bot is used</li>
          <li>Game statistics and currency balances</li>
          <li>Command usage history</li>
          <li>Bot interaction data</li>
        </ul>
      </>
    ),
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Lock,
    title: 'Data Security',
    content: (
      <>
        <p className="mb-3">We implement several security measures to maintain the safety of your personal information:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Secure data encryption in transit and at rest</li>
          <li>Regular security audits and updates</li>
          <li>Limited access to personal information</li>
          <li>Secure database management</li>
        </ul>
      </>
    ),
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: AlertTriangle,
    title: 'Data Usage',
    content: (
      <>
        <p className="mb-3">Your data is used for:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Providing core bot functionality</li>
          <li>Maintaining game progress and statistics</li>
          <li>Improving user experience</li>
          <li>Preventing abuse and ensuring fair play</li>
          <li>Technical support and issue resolution</li>
        </ul>
      </>
    ),
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Server,
    title: 'Data Storage & Retention',
    content: (
      <>
        <p className="mb-3">We store your data securely using Firebase:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Data is stored in secure cloud databases</li>
          <li>Regular backups are maintained</li>
          <li>Inactive user data is archived after 6 months</li>
          <li>Server data is removed 30 days after bot removal</li>
        </ul>
      </>
    ),
    color: 'from-red-500 to-red-600'
  },
  {
    icon: Trash,
    title: 'Your Rights',
    content: (
      <>
        <p className="mb-3">You have the right to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Request access to your personal data</li>
          <li>Request correction of your personal data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request data portability</li>
        </ul>
      </>
    ),
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: Globe,
    title: 'Third-Party Services',
    content: (
      <>
        <p className="mb-3">We use the following third-party services:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Discord API for bot functionality</li>
          <li>Firebase for data storage</li>
          <li>Analytics tools for performance monitoring</li>
        </ul>
      </>
    ),
    color: 'from-teal-500 to-teal-600'
  },
  {
    icon: Mail,
    title: 'Contact Information',
    content: (
      <>
        <p className="mb-3">For any privacy-related questions or concerns, please contact us at:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Discord Support Server: discord.gg/QKfwJNKU66</li>
        </ul>
      </>
    ),
    color: 'from-pink-500 to-pink-600'
  }
];

export function PrivacyPage() {
  return (
    <div className="container px-4 mx-auto py-8 max-w-5xl">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Privacy Policy</h1>
        <p className="text-xl text-gray-400">Learn how we protect and handle your data</p>
      </motion.div>

      <div className="space-y-8">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="enhanced-card p-8 hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${section.color} flex items-center justify-center`}>
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
                  <div className="text-gray-300 leading-relaxed">
                    {typeof section.content === 'string' ? <p>{section.content}</p> : section.content}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}