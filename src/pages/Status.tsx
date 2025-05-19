import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, Clock, Activity, Database, Users, AlertTriangle, Gauge, Dice5 } from 'lucide-react';
import { DiscordCard } from '@/components/ui/discord-card';
import { Progress } from '@/components/ui/progress';
import { botStatusRef, onValue, update } from '@/lib/firebase';
import { BotStatusType, CommandDetail } from '@/types';

const OFFLINE_THRESHOLD_MS = 2000; // 2 seconds threshold

const commandDetails: Record<string, CommandDetail> = {
  help: {
    title: 'Help',
    usage: '/help',
    description: 'Shows help information about commands.',
    tips: 'Use this command if you need guidance on how to use the bot.',
    icon: Dice5,
  },
  slots: {
    title: 'Slots',
    usage: '/slots [amount]',
    description:
      'Spin the virtual slot machine with your bet amount. Match symbols to win multipliers of your original bet!',
    tips: 'Higher bets have slightly better odds, but also higher risk!',
    icon: Dice5,
  },
};

export function Status() {
  const [botStatusData, setBotStatusData] = useState<BotStatusType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBotActive, setIsBotActive] = useState(true);
  const prevUptimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Subscribe to botStatus in realtime DB
    const unsubBotStatus = onValue(botStatusRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBotStatusData(data);
      }
      setLoading(false);
    });

    return () => {
      unsubBotStatus();
    };
  }, []);

  useEffect(() => {
    // Check uptime updates every 5 seconds
    const interval = setInterval(() => {
      if (!botStatusData) {
        setIsBotActive(false);
        prevUptimeRef.current = null;
        return;
      }

      const currentUptime = botStatusData.uptime;

      if (prevUptimeRef.current === null) {
        // Initialize previous uptime
        prevUptimeRef.current = currentUptime;
        setIsBotActive(true);
        return;
      }

      if (currentUptime === prevUptimeRef.current) {
        // Uptime not changed since last check => offline
        if (botStatusData.status !== 'Offline') {
          update(botStatusRef, {
            status: 'Offline',
            downtimeSince: botStatusData.downtimeSince || new Date().toISOString(),
          }).catch(console.error);
        }
        setIsBotActive(false);
      } else {
        // Uptime updated => online
        if (botStatusData.status !== 'Online') {
          update(botStatusRef, {
            status: 'Online',
            downtimeSince: null,
          }).catch(console.error);
        }
        setIsBotActive(true);
      }

      prevUptimeRef.current = currentUptime;
    }, 5000);

    return () => clearInterval(interval);
  }, [botStatusData]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5865F2]"></div>
        </div>
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

  // Helper to show stats or fallback when offline
  const renderStat = (value: string | number | undefined | null) => {
    if (isBotActive && botStatusData.status.toLowerCase() === 'online') {
      return value ?? '-';
    }
    return '-';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center relative mb-4">
        <img
          src="https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512"
          alt="DYSE 2.0 Logo"
          className="w-24 h-24 rounded-full shadow-md"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">DYSE 2.0 Status</h1>

      <div className="max-w-3xl mx-auto">
        <DiscordCard className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="mr-3">
                {isBotActive && botStatusData.status.toLowerCase() === 'online' ? (
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                ) : (
                  <XCircle className="h-8 w-8 text-destructive" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">
                  {isBotActive && botStatusData.status.toLowerCase() === 'online' ? 'Online' : 'Offline'}
                </h2>
                <p className="text-[#B9BBBE]">
                  {isBotActive && botStatusData.status.toLowerCase() === 'online'
                    ? 'DYSE 2.0 is operational'
                    : 'DYSE 2.0 is currently offline'}
                </p>
              </div>
            </div>
          </div>

          {isBotActive && botStatusData.status.toLowerCase() === 'online' ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Health Status</span>
                  <span className="text-sm font-medium">{botStatusData.health || 'Unknown'}</span>
                </div>
                <Progress
                  value={botStatusData.health.toLowerCase() === 'good' ? 100 : 30}
                  className="h-2"
                  indicatorClassName={botStatusData.health.toLowerCase() === 'good' ? 'bg-green-500' : 'bg-red-500'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-3 text-[#B9BBBE]" />
                  <div>
                    <div className="text-sm text-[#B9BBBE]">Uptime</div>
                    <div className="font-medium">{renderStat(botStatusData.uptime?.toFixed(2))} Seconds</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Activity className="h-5 w-5 mr-3 text-[#B9BBBE]" />
                  <div>
                    <div className="text-sm text-[#B9BBBE]">Last Update</div>
                    <div className="font-medium">
                      {botStatusData.lastUpdated
                        ? new Date(botStatusData.lastUpdated).toLocaleString('en-IN', {
                            timeZone: 'Asia/Kolkata',
                            dateStyle: 'medium',
                            timeStyle: 'short',
                          })
                        : '-'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Gauge className="h-5 w-5 mr-3 text-[#B9BBBE]" />
                  <div>
                    <div className="text-sm text-[#B9BBBE]">Latency (ms)</div>
                    <div className="font-medium">{renderStat(botStatusData.latency)}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Database className="h-5 w-5 mr-3 text-[#B9BBBE]" />
                  <div>
                    <div className="text-sm text-[#B9BBBE]">Commands</div>
                    <div className="font-medium">{renderStat(botStatusData.commands?.length)}</div>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-3 text-[#B9BBBE]" />
                  <div>
                    <div className="text-sm text-[#B9BBBE]">Location</div>
                    <div className="font-medium">{renderStat(botStatusData.location)}</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-4 p-4 bg-red-500/10 rounded-md">
              <AlertTriangle className="h-6 w-6 text-red-500 mb-2" />
              <p className="mb-2 text-red-500 font-semibold">DYSE 2.0 has been offline since:</p>
              <p className="mb-1">
                {botStatusData.downtimeSince
                  ? new Date(botStatusData.downtimeSince).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })
                  : 'Unknown'}
              </p>

              <p className="mt-4 font-semibold">Available Status Details:</p>
              <ul className="list-disc list-inside">
                <li>Commands Available: {renderStat(botStatusData.commands?.length)}</li>
                <li>Latency: {renderStat(botStatusData.latency)}</li>
                <li>Health: {renderStat(botStatusData.health)}</li>
              </ul>
            </div>
          )}
        </DiscordCard>

        {/* Commands cards */}
        {botStatusData.commands && botStatusData.commands.length > 0 && isBotActive && botStatusData.status.toLowerCase() === 'online' && (
          <>
            {botStatusData.commands.map((cmd) => {
              const cmdInfo = commandDetails[cmd.toLowerCase()] || {
                title: cmd.charAt(0).toUpperCase() + cmd.slice(1),
                usage: `/${cmd}`,
                description: 'No description available.',
                icon: Dice5,
              };

              const Icon = cmdInfo.icon || Dice5;

              return (
                <DiscordCard key={cmd} animate={false} className="mb-6">
                  <div className="flex items-center mb-3">
                    <Icon className="h-6 w-6 mr-2 text-[#5865F2]" />
                    <h2 className="text-xl font-bold">{cmdInfo.title}</h2>
                  </div>
                  <div className="mb-3 p-3 bg-[#2F3136] rounded-md">
                    <code className="text-sm font-mono">{cmdInfo.usage}</code>
                  </div>
                  <p className="text-[#B9BBBE] mb-3">{cmdInfo.description}</p>
                  {cmdInfo.tips && (
                    <div className="text-sm text-[#B9BBBE]">
                      <span className="font-semibold">Tips:</span> {cmdInfo.tips}
                    </div>
                  )}
                </DiscordCard>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}