import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { commandData } from '@/data/commands';
import { Gift, Clock, Calendar, Trophy } from 'lucide-react';

export default function Earn() {
  const earnCommands = commandData.filter(command => command.category === 'earn');
  
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bot Usage</h1>
      
      <Tabs defaultValue="earn" className="max-w-4xl mx-auto">
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
        
        <TabsContent value="casino">
          <div className="mt-6 text-center">
            <p className="text-[#B9BBBE]">
              Please navigate to the Casino tab to see information about casino games.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="earn" className="mt-6 space-y-8">
          <DiscordCard>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Gift className="w-10 h-10 text-[#5865F2]" />
              <h2 className="text-2xl font-bold">Earn DYSE Coins</h2>
            </div>
            <p className="text-[#B9BBBE] mb-4 text-center">
              Need more coins? Here are the ways you can earn DYSE coins without gambling!
            </p>
          </DiscordCard>
          
          {earnCommands.map((command, index) => (
            <DiscordCard key={index}>
              <div className="flex items-center mb-3">
                {command.name === 'daily' ? (
                  <Calendar className="h-6 w-6 mr-2 text-[#5865F2]" />
                ) : command.name === 'hourly' ? (
                  <Clock className="h-6 w-6 mr-2 text-[#5865F2]" />
                ) : (
                  <Gift className="h-6 w-6 mr-2 text-[#5865F2]" />
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
              <Trophy className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Streaks</h3>
                <p className="text-[#B9BBBE]">
                  Build up streaks by claiming daily rewards consistently. Each consecutive day increases your streak, which multiplies your rewards! Missing a day will reset your streak back to 1.
                </p>
              </div>
            </div>
          </DiscordCard>
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