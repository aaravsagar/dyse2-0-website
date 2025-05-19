import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { commandData } from '@/data/commands';
import { Trophy, Medal, TrendingUp, Award } from 'lucide-react';

export default function Leaderboard() {
  const leaderboardCommands = commandData.filter(command => command.category === 'leaderboard');
  
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bot Usage</h1>
      
      <Tabs defaultValue="leaderboard" className="max-w-4xl mx-auto">
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
        
        <TabsContent value="earn">
          <div className="mt-6 text-center">
            <p className="text-[#B9BBBE]">
              Please navigate to the Earn tab to see information about earning coins.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-6 space-y-8">
          <DiscordCard>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Trophy className="w-10 h-10 text-[#5865F2]" />
              <h2 className="text-2xl font-bold">Leaderboards</h2>
            </div>
            <p className="text-[#B9BBBE] mb-4 text-center">
              Track your rankings and see who's on top in various categories!
            </p>
          </DiscordCard>
          
          {leaderboardCommands.map((command, index) => (
            <DiscordCard key={index}>
              <div className="flex items-center mb-3">
                {command.name === 'leaderboard' ? (
                  <Trophy className="h-6 w-6 mr-2 text-[#5865F2]" />
                ) : command.name === 'stats' ? (
                  <TrendingUp className="h-6 w-6 mr-2 text-[#5865F2]" />
                ) : (
                  <Medal className="h-6 w-6 mr-2 text-[#5865F2]" />
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
              <Award className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2">Seasonal Rankings</h3>
                <p className="text-[#B9BBBE]">
                  DYSE 2.0 features seasonal leaderboards that reset every month. Top players at the end of each season receive special rewards and recognition. Aim for the top spots to earn exclusive perks!
                </p>
              </div>
            </div>
          </DiscordCard>
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