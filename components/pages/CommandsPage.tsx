'use client';

import { useState } from 'react';
import { commandData } from '@/data/commands';
import { Command as CommandType } from '@/types/command';
import { Search, HelpCircle, ChevronDown, ChevronUp, Settings, Gamepad2, TrendingUp, Users, Wrench, Banknote, Smile } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const categoryIcons = {
  casino: Gamepad2,
  earn: TrendingUp,
  Bank: Banknote,
  utility: Wrench,
  leaderboard: Users,
  admin: Settings,
  Fun: Smile,
};

const categoryColors = {
  casino: 'from-red-500 to-red-600',
  earn: 'from-green-500 to-green-600',
  Bank: 'from-blue-500 to-blue-600',
  utility: 'from-purple-500 to-purple-600',
  leaderboard: 'from-yellow-500 to-yellow-600',
  admin: 'from-gray-500 to-gray-600',
  Fun: 'from-pink-500 to-pink-600',
};

export function CommandsPage() {
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-[#0F172A] via-[#111827] to-[#1E293B] text-white">
      {/* Mobile Sidebar Toggle */}
      <Button
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-red-600 hover:bg-red-700 p-3 rounded-full shadow-2xl"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Settings className="w-6 h-6" />
      </Button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-80 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-r border-gray-800 
        transform lg:transform-none transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Categories</h2>
          <div className="space-y-3">
            {categories.map(cat => {
              const count = cat === 'all' ? commandData.length : commandsByCategory[cat]?.length ?? 0;
              const Icon = cat === 'all' ? HelpCircle : categoryIcons[cat as keyof typeof categoryIcons];
              const isSelected = selectedCategory === cat;
              
              return (
                <motion.div
                  key={cat}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-300 group
                      ${isSelected 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg' 
                        : 'hover:bg-gray-800/50 text-gray-300 hover:text-white'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                      <span className="capitalize font-medium">{cat}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${isSelected ? 'bg-white/20 text-white' : 'bg-gray-800 text-gray-300'}`}
                    >
                      {count}
                    </Badge>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
      
      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 w-full">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Command Format Guide */}
          <motion.section 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="enhanced-card p-6 lg:p-8 rounded-2xl"
          >
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 gradient-text">Command Format Guide</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Badge className="bg-red-600 text-white">Default Prefix</Badge>
                  <code className="bg-gray-800 px-3 py-1 rounded-lg text-sm font-mono">$</code>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-green-600 text-white">Example</Badge>
                  <code className="bg-gray-800 px-3 py-1 rounded-lg text-sm font-mono">$help</code>
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-red-400 text-sm font-medium">
                  📝 Note: If you change the bot's prefix, use that instead of $
                </p>
                <div className="space-y-2 text-sm">
                  <p><code className="text-red-400 bg-gray-800 px-2 py-1 rounded">&lt;&gt;</code> — required parameter</p>
                  <p className="text-gray-400 italic">(DO NOT TYPE THE BRACKETS)</p>
                </div>
              </div>
            </div>
          </motion.section>
          
          {/* Header + Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl lg:text-4xl font-bold gradient-text">Command List</h1>
              <p className="text-gray-400 mt-2">Discover all available DYSE bot commands</p>
            </motion.div>
            
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex gap-3"
            >
              <Button
                onClick={expandAll}
                variant="outline"
                className="border-gray-600 hover:bg-gray-800"
              >
                Expand All
              </Button>
              <Button
                onClick={collapseAll}
                variant="outline"
                className="border-gray-600 hover:bg-gray-800"
              >
                Collapse All
              </Button>
            </motion.div>
          </div>
          
          {/* Search Bar */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search commands..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-12 bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 h-12 text-lg rounded-xl"
            />
          </motion.div>
          
          {/* Command Cards */}
          {Object.keys(groupedFiltered).length > 0 ? (
            Object.entries(groupedFiltered).map(([cat, cmds], categoryIndex) => {
              const Icon = categoryIcons[cat as keyof typeof categoryIcons];
              const colorClass = categoryColors[cat as keyof typeof categoryColors];
              
              return (
                <motion.div 
                  key={cat} 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClass} flex items-center justify-center`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white capitalize">{cat} Commands</h3>
                    <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                      {cmds.length}
                    </Badge>
                  </div>
                  
                  <div className="grid gap-4">
                    {cmds.map((cmd, cmdIndex) => (
                      <motion.div 
                        key={cmd.name}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: cmdIndex * 0.05 }}
                        className="command-card enhanced-card rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => toggleExpand(cmd.name)}
                          className="w-full flex items-center justify-between p-6 hover:bg-gray-800/30 transition-all duration-300"
                        >
                          <div className="flex items-center flex-wrap gap-4">
                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${colorClass} flex items-center justify-center`}>
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                              <code className="bg-gray-800 px-3 py-1 rounded-lg text-sm font-mono text-red-400">
                                {cmd.name}
                              </code>
                              <span className="text-white font-medium">{cmd.title}</span>
                            </div>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedCommands[cmd.name] ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </motion.div>
                        </button>
                        
                        <AnimatePresence>
                          {expandedCommands[cmd.name] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden border-t border-gray-700"
                            >
                              <div className="p-6 space-y-6 bg-gray-900/30">
                                <div>
                                  <h4 className="text-sm font-bold text-red-400 mb-2">Usage:</h4>
                                  <code className="block bg-gray-800 p-4 rounded-lg text-sm font-mono text-green-400">
                                    {cmd.usage}
                                  </code>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-bold text-red-400 mb-2">Description:</h4>
                                  <p className="text-gray-300 leading-relaxed">{cmd.description}</p>
                                </div>
                                
                                <div>
                                  <h4 className="text-sm font-bold text-red-400 mb-2">Example:</h4>
                                  <code className="block bg-gray-800 p-4 rounded-lg text-sm font-mono text-blue-400">
                                    {cmd.example}
                                  </code>
                                </div>
                                
                                {cmd.tips && (
                                  <div>
                                    <h4 className="text-sm font-bold text-red-400 mb-2">💡 Tips:</h4>
                                    <p className="text-yellow-300 italic leading-relaxed">{cmd.tips}</p>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="enhanced-card p-12 text-center">
                <HelpCircle className="h-16 w-16 text-red-500 mb-6 mx-auto" />
                <h3 className="text-2xl font-bold mb-4">No commands found</h3>
                <p className="text-gray-400 text-lg">
                  No commands match your search term. Try a different keyword or clear the search.
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}