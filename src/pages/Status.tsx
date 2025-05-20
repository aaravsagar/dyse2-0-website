import { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2, XCircle, Clock, Database, Banknote,
  Users, AlertTriangle, Wifi, Coins, Landmark, BadgeHelp
} from 'lucide-react';
import { DiscordCard } from '@/components/ui/discord-card';
import { Progress } from '@/components/ui/progress';
import { botStatusRef, onValue, update } from '@/lib/firebase';
import { BotStatusType, CommandDetail } from '@/types';

// Commands
const commandDetails: Record<string, CommandDetail> = {
  help: {
    title: 'Help',
    usage: '$help',
    description: 'Displays a list of available commands and how to use them.',
    tips: 'Use this command if you need guidance on how to use the bot.',
    icon: BadgeHelp,
  },
  balance: {
    title: 'Balance',
    usage: '$balance',
    description: 'Shows your current wallet balance.',
    tips: 'Check how much money you have available to spend.',
    icon: Landmark,
  },
  bank: {
    title: 'Bank',
    usage: '$bank',
    description: 'Displays your bank balance and transactions.',
    tips: 'Securely store your money in the bank.',
    icon: Landmark,
  },
  blackjack: {
    title: 'Blackjack',
    usage: '$blackjack',
    description: 'Play a game of blackjack against the bot to win money.',
    tips: 'Try to get as close to 21 without going over!',
    icon: Coins,
  },
  coinflip: {
    title: 'Coinflip',
    usage: '$coinflip',
    description: 'Flip a coin and bet money on the outcome (heads or tails).',
    tips: '50/50 chance to double your bet or lose it.',
    icon: Coins,
  },
  gamble: {
    title: 'Gamble',
    usage: '$gamble',
    description: 'Place a bet to try your luck and potentially earn money.',
    tips: 'High risk, high reward — gamble wisely!',
    icon: Coins,
  },
  claim: {
    title: 'Claim',
    usage: '$claim',
    description: 'Claim your daily or weekly rewards.',
    tips: 'Remember to claim regularly for bonuses.',
    icon: Banknote,
  },
  work: {
    title: 'Work',
    usage: '$work',
    description: 'Simulate working to earn money with cooldowns.',
    tips: 'Work regularly to steadily increase your balance.',
    icon: Banknote,
  },
};

// Categories split including separate Bank commands
const commandCategories = {
  casino: ['blackjack', 'coinflip', 'gamble'],
  earn: ['claim', 'work'],
  general: ['help'],
  bank: ['balance', 'bank'],
};

const prefixInfoCard = {
  title: 'Command Prefix Info',
  content:
    'The default prefix for commands is `$`. This may vary depending on the server. Use `/version` to check your server’s custom prefix.',
  icon: Coins,
};

function formatUptime(seconds: number): string {
  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? 's' : ''}`;
  }
  const mins = Math.floor(seconds / 60);
  if (mins < 60) {
    const remSecs = seconds % 60;
    return `${mins} minute${mins !== 1 ? 's' : ''} ${remSecs}s`;
  }
  const hours = Math.floor(mins / 60);
  if (hours < 24) {
    const remMins = mins % 60;
    return `${hours} hour${hours !== 1 ? 's' : ''} ${remMins}m`;
  }
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  return `${days} day${days !== 1 ? 's' : ''} ${remHours}h`;
}

export function Status() {
  const [botStatusData, setBotStatusData] = useState<BotStatusType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBotActive, setIsBotActive] = useState(true);
  const [displayUptime, setDisplayUptime] = useState<string>('-');

  const prevUptimeRef = useRef<number | null>(null);

  // Listen to bot status changes from Firebase
  useEffect(() => {
    const unsubBotStatus = onValue(botStatusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setBotStatusData(data);
      setLoading(false);
    });
    return () => unsubBotStatus();
  }, []);

  // Check uptime and bot active status every 5 seconds, update Firebase status accordingly
  useEffect(() => {
    const interval = setInterval(() => {
      if (!botStatusData) {
        setIsBotActive(false);
        prevUptimeRef.current = null;
        setDisplayUptime('-');
        return;
      }

      const currentUptime = botStatusData.uptime ?? 0;

      if (prevUptimeRef.current === null) {
        prevUptimeRef.current = currentUptime;
        setIsBotActive(true);
        return;
      }

      if (currentUptime === prevUptimeRef.current) {
        // Uptime hasn't increased, mark offline
        if (botStatusData.status !== 'Offline') {
          update(botStatusRef, {
            status: 'Offline',
            downtimeSince: botStatusData.downtimeSince || new Date().toISOString(),
          }).catch(console.error);
        }
        setIsBotActive(false);
      } else {
        // Uptime increased, mark online
        if (botStatusData.status !== 'Online') {
          update(botStatusRef, { status: 'Online', downtimeSince: null }).catch(console.error);
        }
        setIsBotActive(true);
      }

      prevUptimeRef.current = currentUptime;
    }, 5000);

    return () => clearInterval(interval);
  }, [botStatusData]);

  // Update display uptime every second for smooth dynamic display
  useEffect(() => {
    if (!botStatusData) {
      setDisplayUptime('-');
      return;
    }
    let startUptime = botStatusData.uptime ?? 0;

    // Update display every second, incrementing uptime seconds
    const timer = setInterval(() => {
      setDisplayUptime(formatUptime(startUptime));
      startUptime++;
    }, 1000);

    return () => clearInterval(timer);
  }, [botStatusData]);

  const renderStat = (value: string | number | undefined | null) =>
    isBotActive && botStatusData?.status.toLowerCase() === 'online' ? value ?? '-' : '-';

  const renderCommandsByCategory = () => {
    return Object.entries(commandCategories).map(([category, commands]) => (
      <div key={category} className="mb-6">
        <h2 className="text-xl font-bold capitalize mb-3 text-[#FFFFFF]">{category} Commands</h2>
        {commands.map((cmd) => {
          const cmdInfo = commandDetails[cmd];
          const Icon = cmdInfo.icon || Coins;
          return (
            <DiscordCard key={cmd} animate={false} className="mb-4">
              <div className="flex items-center mb-2">
                <Icon className="h-6 w-6 mr-2 text-[#5865F2]" />
                <h3 className="text-lg font-bold">{cmdInfo.title}</h3>
              </div>
              <div className="mb-2 p-2 bg-[#2F3136] rounded">
                <code className="text-sm">{cmdInfo.usage}</code>
              </div>
              <p className="text-[#B9BBBE]">{cmdInfo.description}</p>
              {cmdInfo.tips && (
                <div className="mt-2 text-sm text-[#B9BBBE]">
                  <strong>Tips:</strong> {cmdInfo.tips}
                </div>
              )}
            </DiscordCard>
          );
        })}
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
      </div>
    );
  }

  if (!botStatusData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <DiscordCard>
          <div className="text-center py-8">
            <XCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Status Unavailable</h2>
            <p className="text-[#B9BBBE]">Unable to fetch bot status. Please try again later.</p>
          </div>
        </DiscordCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-4">
        <img
          src="https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512"
          alt="DYSE 2.0 Logo"
          className="w-24 h-24 rounded-full shadow-md"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">DYSE 2.0 Status</h1>

      <div className="max-w-3xl mx-auto">
        <DiscordCard className="mb-6">
          <div className="flex items-center mb-4">
            {isBotActive ? (
              <CheckCircle2 className="h-8 w-8 text-green-500 mr-3" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive mr-3" />
            )}
            <div>
              <h2 className="text-2xl font-bold">{isBotActive ? 'Online' : 'Offline'}</h2>
              <p className="text-[#B9BBBE]">
                {isBotActive ? 'DYSE 2.0 is operational' : 'DYSE 2.0 is currently offline'}
              </p>
            </div>
          </div>

          {isBotActive && (
            <>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Health Status</span>
                  <span className="text-sm font-medium">{botStatusData.health || 'Unknown'}</span>
                </div>
                <Progress
                  value={botStatusData.health?.toLowerCase() === 'good' ? 100 : 30}
                  className={`h-2 ${
                    botStatusData.health?.toLowerCase() === 'good' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Stat
                  icon={Clock}
                  label="Uptime"
                  value={displayUptime}
                />
                <Stat icon={Wifi} label="Latency (ms)" value={renderStat(botStatusData.latency)} />
                <Stat icon={Database} label="Commands" value={renderStat(botStatusData.commands?.length)} />
                <Stat icon={Users} label="Location" value={renderStat(botStatusData.location)} />
              </div>
            </>
          )}

          {!isBotActive && (
            <div className="mt-4 p-4 bg-red-500/10 rounded-md">
              <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
              <p className="text-red-500 font-semibold mb-2">DYSE 2.0 has been offline since:</p>
              <p>
                {botStatusData.downtimeSince
                  ? new Date(botStatusData.downtimeSince).toLocaleDateString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      dateStyle: 'medium',
                    })
                  : 'Unknown'}
              </p>
            </div>
          )}
        </DiscordCard>

        {/* Prefix Info */}
        <DiscordCard className="mb-6">
          <h2 className="text-lg font-bold mb-2">{prefixInfoCard.title}</h2>
          <p className="text-sm text-[#B9BBBE]">{prefixInfoCard.content}</p>
        </DiscordCard>

        {/* Command Categories */}
        {isBotActive && renderCommandsByCategory()}
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: any }) {
  return (
    <div className="flex items-center">
      <Icon className="h-5 w-5 mr-3 text-[#B9BBBE]" />
      <div>
        <div className="text-sm text-[#B9BBBE]">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}
