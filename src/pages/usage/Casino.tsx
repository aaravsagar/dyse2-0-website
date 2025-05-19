import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { commandData } from '@/data/commands';
import { Dice3, Dice5, Coins, CreditCard } from 'lucide-react';

export default function Casino() {
  const casinoCommands = commandData.filter(command => command.category === 'casino');
  
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bot Usage</h1>
      
      <Tabs defaultValue="casino" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-4 w-full bg-[#2F3136]">
          <TabsTrigger value="casino" className="data-[state=active]:bg-[#5865F2]">
            Casino
          </TabsTrigger>
          <TabsTrigger value="earn" className="data-[state=active]:bg-[#5865F2]">
            Earn
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="data-[state=active]:bg-[#5865F2]">
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="commands" className="data-[state=active]:bg-[#5865F2]">
            Commands
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="casino" className="mt-6 space-y-8">
          <DiscordCard>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Dice5 className="w-10 h-10 text-[#5865F2]" />
              <h2 className="text-2xl font-bold">Casino Games</h2>
            </div>
            <p className="text-[#B9BBBE] mb-4 text-center">
              Test your luck with our virtual casino games! All games use DYSE coins, a virtual currency with no real-world value.
            </p>
          </DiscordCard>
          
          {casinoCommands.map((command, index) => (
            <DiscordCard key={index}>
              <div className="flex items-center mb-3">
                {command.name === 'slots' ? (
                  <Dice3 className="h-6 w-6 mr-2 text-[#5865F2]" />
                ) : command.name === 'flip' ? (
                  <Coins className="h-6 w-6 mr-2 text-[#5865F2]" />
                ) : (
                  <Dice5 className="h-6 w-6 mr-2 text-[#5865F2]" />
                )}
                <h3 className="text-xl font-bold">{command.title}</h3>
              </div>
              <div className="mb-3 p-3 bg-[#2F3136] rounded-md">
                <code className="text-sm font-mono text-white">{command.usage}</code>
              </div>
              <p className="text-[#B9BBBE] mb-3">{command.description}</p>
              {command.tips && (
                <div className="text-sm text-[#B9BBBE]">
                  <span className="font-semibold">Tips:</span> {command.tips}
                </div>
              )}
            </DiscordCard>
          ))}
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <CreditCard className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Betting Limits</h3>
                <p className="text-[#B9BBBE]">
                  Each game has minimum and maximum betting limits. These limits are in place to ensure fair play and to prevent economy inflation. Use the <code className="bg-[#2F3136] px-1 rounded">/limits</code> command to see current limits for all games.
                </p>
              </div>
            </div>
          </DiscordCard>
        </TabsContent>
        
        <TabsContent value="earn">
          <div className="mt-6 text-center">
            <p className="text-[#B9BBBE]">
              Please navigate to the Earn tab to see information about earning coins.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <div className="mt-6 text-center">
            <p className="text-[#B9BBBE]">
              Please navigate to the Leaderboard tab to see information about rankings.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="commands">
          <div className="mt-6 text-center">
            <p className="text-[#B9BBBE]">
              Please navigate to the Commands tab to see the full command list.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}