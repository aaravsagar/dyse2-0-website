import { useState } from 'react';
import { commandData } from '@/data/commands';
import { Command as CommandType } from '@/types/command';
import { Search, HelpCircle, ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DiscordCard } from '@/components/ui/discord-card';

export default function Commands() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCommands, setExpandedCommands] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Group commands by category
  const commandsByCategory = commandData.reduce((acc, command) => {
    (acc[command.category] ??= []).push(command);
    return acc;
  }, {} as Record<string, CommandType[]>);
  
  // Categories list
  const categories = ['all', ...Object.keys(commandsByCategory)];
  
  // Filter logic
  const filteredCommands = commandData.filter(cmd => {
    const term = searchTerm.toLowerCase();
    return (
      (cmd.name + cmd.title + cmd.description).toLowerCase().includes(term) &&
      (selectedCategory === 'all' || cmd.category === selectedCategory)
    );
  });
  
  const groupedFiltered = filteredCommands.reduce((acc, cmd) => {
    (acc[cmd.category] ??= []).push(cmd);
    return acc;
  }, {} as Record<string, CommandType[]>);
  
  // Expand / collapse handlers
  const toggleExpand = (key: string) =>
    setExpandedCommands(prev => ({ ...prev, [key]: !prev[key] }));
  const expandAll = () =>
    setExpandedCommands(Object.fromEntries(filteredCommands.map(c => [c.name, true])));
  const collapseAll = () => setExpandedCommands({});

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#111827] text-white">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#e11d48] p-3 rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Settings className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-[#1a1a1a] border-r border-gray-800 
        transform lg:transform-none transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <ul className="space-y-2">
            {categories.map(cat => {
              const count = cat === 'all' ? commandData.length : commandsByCategory[cat]?.length ?? 0;
              return (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-md transition-colors
                      ${selectedCategory === cat ? 'bg-[#e11d48] text-white' : 'hover:bg-gray-800'}`}
                  >
                    <span className="capitalize">{cat}</span>
                    <span className="bg-gray-800 text-xs px-2 py-1 rounded-full">{count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 w-full">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Command Format Guide */}
          <section className="bg-[#1f2937] p-4 lg:p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">Command Format Guide</h2>
            <div className="space-y-3">
              <p><code className="bg-gray-800 px-2 py-1 rounded text-sm">Default Prefix: $</code></p>
              <p><code className="bg-gray-800 px-2 py-1 rounded text-sm">Example: $help</code></p>
              <p className="text-[#e11d48] text-sm">Please note: If you change the bot's prefix, use that instead of $</p>
              <div className="mt-4 space-y-1 text-sm">
                <p><code className="text-[#e11d48]">&lt;&gt;</code> — required parameter</p>
              </div>
              <p className="text-sm text-gray-400 italic">(DO NOT TYPE THE BRACKETS)</p>
            </div>
          </section>
          
          {/* Header + Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold">Command List</h1>
            <div className="flex gap-3">
              <button
                onClick={expandAll}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium transition"
              >
                Expand All
              </button>
              <button
                onClick={collapseAll}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium transition"
              >
                Collapse All
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 bg-[#1f2937] border-[#374151] w-full"
            />
          </div>
          
          {/* Command Cards */}
          {Object.keys(groupedFiltered).length > 0 ? (
            Object.entries(groupedFiltered).map(([cat, cmds]) => (
              <div key={cat} className="space-y-4">
                <h3 className="text-xl font-bold text-gray-300 capitalize">{cat} Commands</h3>
                <div className="space-y-3">
                  {cmds.map(cmd => (
                    <div key={cmd.name} className="border border-gray-700 rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleExpand(cmd.name)}
                        className="w-full flex items-center justify-between p-4 bg-[#1f2937] hover:bg-[#2d3748] transition"
                      >
                        <div className="flex items-center flex-wrap gap-2">
                          <Settings className="h-5 w-5 text-[#e11d48] shrink-0" />
                          <code className="bg-gray-800 px-2 py-1 rounded text-sm text-white">
                            {cmd.name}
                          </code>
                          <span className="text-gray-300">{cmd.title}</span>
                        </div>
                        {expandedCommands[cmd.name] ? (
                          <ChevronUp className="h-5 w-5 text-gray-400 shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 shrink-0" />
                        )}
                      </button>
                      <div
                        className={`bg-[#1f2937] transition-all duration-300 overflow-hidden ${
                          expandedCommands[cmd.name]
                            ? 'max-h-[500px] opacity-100 border-t border-gray-700'
                            : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="p-4 space-y-4">
                          <div>
                            <h4 className="text-sm font-bold text-gray-400 mb-1">Usage:</h4>
                            <code className="block bg-gray-800 p-3 rounded-md text-sm font-mono">
                              {cmd.usage}
                            </code>
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-400 mb-1">Description:</h4>
                            <p className="text-gray-300">{cmd.description}</p>
                          </div>
                          {cmd.tips && (
                            <div>
                              <h4 className="text-sm font-bold text-gray-400 mb-1">Tips:</h4>
                              <p className="text-gray-300 italic">{cmd.tips}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <DiscordCard>
              <div className="flex flex-col items-center justify-center py-8">
                <HelpCircle className="h-16 w-16 text-[#e11d48] mb-4" />
                <h3 className="text-xl font-bold mb-2">No commands found</h3>
                <p className="text-gray-300 text-center">
                  No commands match your search term. Try a different keyword or clear the search.
                </p>
              </div>
            </DiscordCard>
          )}
        </div>
      </main>
    </div>
  );
}