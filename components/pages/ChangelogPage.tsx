'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, BadgeHelp, Landmark, Coins, Banknote, Gamepad2 } from 'lucide-react';
import { motion } from 'framer-motion';

const versionUpdates = [
  {
    version: "2.8.1",
    title: "Gameplay Enhancements & New Features",
    date: "2024-12-20",
    type: "major",
    description: (
      <>
        <ul className="list-disc list-inside text-[#B9BBBE] mt-2 space-y-2">
          <li><strong>🌟 Leaderboard:</strong> Compete with others and track your rank.</li>
          <li><strong>🎲 Dice Roll Game:</strong> A quick, fun dice-based betting game.</li>
          <li><strong>🎰 Slots:</strong> Classic slot machine gameplay with payouts based on center-line matches.</li>
          <li><strong>🃏 High-Low Game:</strong> Predict if the next card will be higher or lower than the current one.</li>
          <li><strong>💰 Starting Balance:</strong> New users can claim 10,000 coins with $starting command.</li>
          <li><strong>⏱️ Quick Commands:</strong> Use game aliases like <code>bj</code> (blackjack), <code>cf</code> (coinflip), <code>gt</code> (glasstiles), <code>dr</code> (diceroll), <code>hl</code> (highlow), etc.</li>
          <li><strong>💸 All-in Betting:</strong> Use <code>all</code> to bet your full balance. Max bet: ₹100,000.</li>
          <li><strong>⚡ Performance Improvements:</strong> Smoother and faster command execution.</li>
        </ul>
      </>
    ),
  },
  { 
    version: "2.7.0", 
    title: "Minor Bug Fixes", 
    date: "2024-12-15",
    type: "patch",
    description: "Resolved reported issues and minor inconsistencies." 
  },
  { 
    version: "2.6.0", 
    title: "Minor Bug Fixes", 
    date: "2024-12-10",
    type: "patch",
    description: "Internal cleanup and bug squashing." 
  },
  { 
    version: "2.5.0", 
    title: "Minor Bug Fixes", 
    date: "2024-12-05",
    type: "patch",
    description: "Fixed UI display glitches and corrected reward handling." 
  },
  { 
    version: "2.4.0", 
    title: "Minor Bug Fixes", 
    date: "2024-12-01",
    type: "patch",
    description: "Minor backend improvements and bug fixes." 
  },
  { 
    version: "2.3.0", 
    title: "Minor Bug Fixes", 
    date: "2024-11-25",
    type: "patch",
    description: "Enhanced command response reliability." 
  },
  { 
    version: "2.2.0", 
    title: "Minor Bug Fixes", 
    date: "2024-11-20",
    type: "patch",
    description: "Small issue resolutions for smoother gameplay." 
  },
  { 
    version: "2.1.0", 
    title: "Minor Bug Fixes", 
    date: "2024-11-15",
    type: "patch",
    description: "Stability updates and minor bug corrections." 
  },
  { 
    version: "2.0.0", 
    title: "Stable Launch", 
    date: "2024-11-10",
    type: "major",
    description: "Core features are now stable and publicly available." 
  },
  {
    version: "1.2.0",
    title: "New Game: Mines",
    date: "2024-11-05",
    type: "minor",
    description: (
      <>
        <p>New game <strong>MINES</strong> has been added to DYSE!</p>
        <p>Command: <code>$mines &lt;bet&gt; &lt;number of mines from 1 to 8&gt;</code></p>
      </>
    ),
  },
  { 
    version: "1.1.0", 
    title: "Minor Bug Fixes", 
    date: "2024-11-01",
    type: "patch",
    description: "Minor bug resolutions and game performance tuning." 
  },
  { 
    version: "1.0.0", 
    title: "Minor Bug Fixes", 
    date: "2024-10-25",
    type: "patch",
    description: "Polished core features and fixed gameplay edge cases." 
  },
  {
    version: "0.1.0",
    title: "Pre-release Beta",
    date: "2024-10-01",
    type: "major",
    description: (
      <>
        <p className="text-[#B9BBBE] mb-4">
          DYSE 2.0 entered beta testing with core functionality for selected users. This version focuses on collecting feedback for improvements.
        </p>

        <h3 className="text-lg font-semibold mb-2">Commands Added</h3>
        <ul className="list-disc list-inside text-[#B9BBBE] mb-4">
          <li><BadgeHelp className="inline w-5 h-5 mr-1 text-[#5865F2]" /> <strong>Help:</strong> Lists available commands and usage.</li>
          <li><Landmark className="inline w-5 h-5 mr-1 text-[#5865F2]" /> <strong>Balance & Bank:</strong> View your wallet, bank, and transactions.</li>
          <li><Coins className="inline w-5 h-5 mr-1 text-[#5865F2]" /> <strong>Casino Games:</strong> Includes Blackjack, Coinflip, and Gamble.</li>
          <li><Banknote className="inline w-5 h-5 mr-1 text-[#5865F2]" /> <strong>Rewards & Work:</strong> Claim daily/weekly rewards and earn via work.</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">Features Added</h3>
        <ul className="list-disc list-inside text-[#B9BBBE]">
          <li>Custom command prefix support using <code>$</code></li>
          <li>Firebase backend for secure data storage</li>
          <li>Economy system with wallet, bank, and currency</li>
          <li>Engaging casino-style games</li>
          <li>Daily and weekly reward system</li>
        </ul>
      </>
    ),
  },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'major': return 'bg-red-600 text-white';
    case 'minor': return 'bg-blue-600 text-white';
    case 'patch': return 'bg-green-600 text-white';
    default: return 'bg-gray-600 text-white';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'major': return Gamepad2;
    case 'minor': return Coins;
    case 'patch': return BadgeHelp;
    default: return Clock;
  }
};

export function ChangelogPage() {
  return (
    <div className="container px-4 mx-auto py-8 max-w-5xl">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Changelog</h1>
        <p className="text-xl text-gray-400">Stay updated with the latest DYSE features and improvements</p>
      </motion.div>

      <div className="space-y-8">
        {versionUpdates.map(({ version, title, description, date, type }, index) => {
          const TypeIcon = getTypeIcon(type || 'patch');
          
          return (
            <motion.div
              key={version}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="enhanced-card p-8 hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                      <TypeIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <h2 className="text-2xl font-bold text-white">Version {version}</h2>
                        <Badge className={getTypeColor(type || 'patch')}>
                          {type || 'patch'}
                        </Badge>
                      </div>
                      {date && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{date}</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-300 mb-4">{title}</h3>
                    
                    <div className="text-gray-300 leading-relaxed">
                      {typeof description === "string" ? <p>{description}</p> : description}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}