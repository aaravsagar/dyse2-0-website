import { DiscordCard } from '@/components/ui/discord-card';
import { Clock, BadgeHelp, Landmark, Coins, Banknote } from 'lucide-react';

export default function Changelog() {
  return (
    <div className="container px-4 mx-auto py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Changelog</h1>

      <DiscordCard className="mb-6">
        <div className="flex items-start gap-3">
          <Clock className="w-6 h-6 text-[#5865F2] mt-1" />
          <div>
            <h2 className="text-xl font-bold mb-2">Version 0.1.0 - Pre-release Beta</h2>
            <p className="text-[#B9BBBE] mb-4">
              DYSE 2.0 is currently under development and available exclusively to selected users for testing purposes. This pre-release beta version introduces core features and commands to gather feedback and improve the bot before a public launch.
            </p>

            <h3 className="text-lg font-semibold mb-2">Commands Added</h3>
            <ul className="list-disc list-inside text-[#B9BBBE] mb-4">
              <li><BadgeHelp className="inline w-5 h-5 mr-1 text-[#5865F2]" /> <strong>Help:</strong> Displays a list of available commands and how to use them.</li>
              <li><Landmark className="inline w-5 h-5 mr-1 text-[#5865F2]" /> <strong>Balance & Bank:</strong> View wallet and bank balances with transactions.</li>
              <li><Coins className="inline w-5 h-5 mr-1 text-[#5865F2]" /> <strong>Casino Games:</strong> Includes Blackjack, Coinflip, and Gamble for money betting and playing games.</li>
              <li><Banknote className="inline w-5 h-5 mr-1 text-[#5865F2]" /> <strong>Rewards & Work:</strong> Claim daily/weekly rewards and simulate working to earn money.</li>
            </ul>

            <h3 className="text-lg font-semibold mb-2">Features Added</h3>
            <ul className="list-disc list-inside text-[#B9BBBE]">
              <li>Command prefix system using <code>$</code> with support for custom server prefixes.</li>
              <li>Secure data handling and storage using Firebase backend.</li>
              <li>Basic economy system including wallet, bank, and currency transactions.</li>
              <li>Interactive casino-style games for fun and engagement.</li>
              <li>Daily and weekly reward claim system to encourage regular use.</li>
            </ul>
          </div>
        </div>
      </DiscordCard>
    </div>
  );
}
