import { DiscordCard } from '@/components/ui/discord-card';
import { Clock, BadgeHelp, Landmark, Coins, Banknote } from 'lucide-react';

const versionUpdates = [
  {
    version: "2.8.1",
    title: "Gameplay Enhancements & New Features",
    description: (
      <>
        <ul className="list-disc list-inside text-[#B9BBBE] mt-2 space-y-2">
          <li><strong>🌟 Leaderboard:</strong> Compete with others and track your rank.</li>
          <li><strong>🎲 Dice Roll Game:</strong> A quick, fun dice-based betting game.</li>
          <li><strong>🎰 Slots:</strong> Classic slot machine gameplay with payouts based on center-line matches.</li>
          <li><strong>⏱️ Quick Commands:</strong> Use game aliases like <code>bj</code> (blackjack), <code>cf</code> (coinflip), <code>gt</code> (glasstiles), <code>dr</code> (diceroll), etc.</li>
          <li><strong>💸 All-in Betting:</strong> Use <code>all</code> to bet your full balance. Max bet: ₹100,000.</li>
          <li><strong>⚡ Performance Improvements:</strong> Smoother and faster command execution.</li>
        </ul>
      </>
    ),
  },
  { version: "2.7.0", title: "Minor Bug Fixes", description: "Resolved reported issues and minor inconsistencies." },
  { version: "2.6.0", title: "Minor Bug Fixes", description: "Internal cleanup and bug squashing." },
  { version: "2.5.0", title: "Minor Bug Fixes", description: "Fixed UI display glitches and corrected reward handling." },
  { version: "2.4.0", title: "Minor Bug Fixes", description: "Minor backend improvements and bug fixes." },
  { version: "2.3.0", title: "Minor Bug Fixes", description: "Enhanced command response reliability." },
  { version: "2.2.0", title: "Minor Bug Fixes", description: "Small issue resolutions for smoother gameplay." },
  { version: "2.1.0", title: "Minor Bug Fixes", description: "Stability updates and minor bug corrections." },
  { version: "2.0.0", title: "Stable Launch", description: "Core features are now stable and publicly available." },
  {
    version: "1.2.0",
    title: "New Game: Mines",
    description: (
      <>
        <p>New game <strong>MINES</strong> has been added to DYSE!</p>
        <p>Command: <code>$mines &lt;bet&gt; &lt;number of mines from 1 to 8&gt;</code></p>
      </>
    ),
  },
  { version: "1.1.0", title: "Minor Bug Fixes", description: "Minor bug resolutions and game performance tuning." },
  { version: "1.0.0", title: "Minor Bug Fixes", description: "Polished core features and fixed gameplay edge cases." },
  {
    version: "0.1.0",
    title: "Pre-release Beta",
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

export default function Changelog() {
  return (
    <div className="container px-4 mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Changelog</h1>

      {versionUpdates.map(({ version, title, description }) => (
        <DiscordCard key={version} className="mb-6">
          <div className="flex items-start gap-3">
            <Clock className="w-6 h-6 text-[#5865F2] mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Version {version} – {title}</h2>
              <div className="text-[#B9BBBE]">{typeof description === "string" ? <p>{description}</p> : description}</div>
            </div>
          </div>
        </DiscordCard>
      ))}
    </div>
  );
}
