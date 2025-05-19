import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { commandData } from '@/data/commands';
import { Command, Search, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

export default function Commands() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter commands based on search term
  const filteredCommands = commandData.filter(command => 
    command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    const category = command.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(command);
    return acc;
  }, {} as Record<string, typeof commandData>);
  
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Bot Usage</h1>
      
      <Tabs defaultValue="commands" className="max-w-4xl mx-auto">
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
        
        <TabsContent value="leaderboard">
          <div className="mt-6 text-center">
            <p className="text-[#B9BBBE]">
              Please navigate to the Leaderboard tab to see information about rankings.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="commands" className="mt-6 space-y-8">
          <DiscordCard>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Command className="w-10 h-10 text-[#5865F2]" />
              <h2 className="text-2xl font-bold">Command List</h2>
            </div>
            <p className="text-[#B9BBBE] mb-4 text-center">
              Here's a complete list of all DYSE 2.0 commands and how to use them.
            </p>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#B9BBBE]" size={18} />
              <Input
                type="text"
                placeholder="Search commands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#40444B] border-[#36393F] text-white"
              />
            </div>
          </DiscordCard>
          
          {Object.entries(groupedCommands).map(([category, commands]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-bold capitalize text-[#B9BBBE] px-2">{category} Commands</h3>
              
              {commands.map((command, index) => (
                <DiscordCard key={index}>
                  <div className="flex items-center mb-3">
                    <Command className="h-6 w-6 mr-2 text-[#5865F2]" />
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
            </div>
          ))}
          
          {filteredCommands.length === 0 && (
            <DiscordCard>
              <div className="flex flex-col items-center justify-center py-8">
                <HelpCircle className="h-16 w-16 text-[#5865F2] mb-4" />
                <h3 className="text-xl font-bold mb-2">No commands found</h3>
                <p className="text-[#B9BBBE] text-center">
                  No commands match your search term. Try a different keyword or clear the search.
                </p>
              </div>
            </DiscordCard>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}