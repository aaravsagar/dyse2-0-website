'use client';

import { Card } from '@/components/ui/card';
import {
  Book,
  Users,
  Info,
  CheckCircle,
  Gavel,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  {
    icon: Book,
    title: 'Introduction',
    content: 'Welcome to DYSE 2.0! These Terms of Service govern your use of our Discord bot. By accessing or using DYSE 2.0, you agree to be bound by these terms. If you do not agree with any of them, you should not use our bot.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    title: 'Eligibility',
    content: 'You must be at least 13 years old to use DYSE 2.0. If you are under 18, parental or guardian consent is required. The bot contains simulated gambling-like features with in-game virtual currency only, with no link to real-world money.',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: CheckCircle,
    title: 'Rules and Behavior',
    content: (
      <>
        <p className="mb-3">By using DYSE 2.0, you agree to follow these rules:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>No exploiting bugs, glitches, or design flaws</li>
          <li>No use of automated systems such as macros or self-bots</li>
          <li>No harassment or abuse toward other users or developers</li>
          <li>No tampering with or manipulating the economy system</li>
          <li>All bugs or issues must be reported via official channels</li>
        </ul>
      </>
    ),
    color: 'from-purple-500 to-purple-600'
  },
  {
    icon: Info,
    title: 'Virtual Currency',
    content: 'DYSE 2.0 operates a virtual economy which holds no monetary or real-world value. The currency cannot be traded, sold, or redeemed for real assets. We reserve the right to reset, balance, or remove virtual currency at any time.',
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    icon: Gavel,
    title: 'Moderator Rights',
    content: 'Our moderators and administrators have the authority to restrict or revoke your access to DYSE 2.0 if you violate these terms or disrupt community standards. Decisions made by moderators are final but may be appealed via the support server.',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: ShieldAlert,
    title: 'Liability',
    content: 'DYSE 2.0 is provided "as is" without warranties of any kind. We are not responsible for any losses, damages, or negative consequences caused by the use or inability to use the bot. Features may change or be removed without notice.',
    color: 'from-orange-500 to-orange-600'
  },
  {
    icon: ShieldCheck,
    title: 'Reports, Access Revocation & Investigations',
    content: (
      <>
        <p className="mb-3">
          We reserve the right to revoke access to DYSE 2.0 from any user or server upon receiving a valid or credible report regarding misconduct, rule violation, or abuse.
        </p>
        <p className="mb-3">
          If a report is submitted — whether it concerns a bug, exploit, or a user/server issue — we hold full rights to investigate the matter thoroughly. This includes monitoring server activity or user behavior to determine if action is needed.
        </p>
        <p>
          All reports will be handled confidentially. We will never disclose the identity or Discord ID of the reporting party to the subject of the investigation.
        </p>
      </>
    ),
    color: 'from-teal-500 to-teal-600'
  }
];

export function TermsPage() {
  return (
    <div className="container px-4 mx-auto py-8 max-w-5xl">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Terms & Conditions</h1>
        <p className="text-xl text-gray-400">Please read these terms carefully before using DYSE</p>
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