'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Gamepad2, 
  TrendingUp, 
  Shield, 
  Users, 
  Zap, 
  Star,
  ArrowRight,
  Play
} from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    icon: Gamepad2,
    title: 'Casino Games',
    description: 'Blackjack, Coinflip, Mines, High-Low, and more exciting games',
    color: 'from-red-500 to-red-600'
  },
  {
    icon: TrendingUp,
    title: 'Economy System',
    description: 'Complete virtual economy with banking and rewards',
    color: 'from-green-500 to-green-600'
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: '100% virtual currency with no real-world risk',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: Users,
    title: 'Community Features',
    description: 'Leaderboards, competitions, and social gaming',
    color: 'from-purple-500 to-purple-600'
  }
];

const stats = [
  { label: 'Active Servers', value: '1,000+', icon: Users },
  { label: 'Games Played', value: '50K+', icon: Gamepad2 },
  { label: 'Happy Users', value: '10K+', icon: Star },
  { label: 'Uptime', value: '99.9%', icon: Zap }
];

export function HomePage() {
  return (
    <TooltipProvider>
      <div className="container px-4 mx-auto">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[90vh] text-center relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 animate-pulse" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gradient-to-br from-red-500 to-red-700 mb-8 shadow-2xl mx-auto float-animation glow-animation">
              <Image
                src="https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512"
                alt="DYSE 2.0 Logo"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium bg-red-500/20 text-red-300 border-red-500/30">
              🎮 Most Popular Discord Casino Bot
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
              DYSE 2.0
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
              The Loved Casino Bot Reimagined
            </p>
            
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed">
              Experience the thrill of casino gaming in Discord with 100% virtual currency. 
              No real money, just pure entertainment and community fun.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://discord.com/oauth2/authorize?client_id=1322592306670338129&scope=bot&permissions=8"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="btn-primary font-bold text-white px-8 py-4 text-lg rounded-xl shadow-2xl group">
                      <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Invite to Server
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-gray-800 text-white border-gray-700">
                  Add DYSE to your Discord server
                </TooltipContent>
              </Tooltip>
              
              <Button 
                variant="outline" 
                className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg rounded-xl"
                asChild
              >
                <a href="/commands">
                  View Commands
                </a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="enhanced-card p-6 text-center hover:scale-105 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 text-red-500" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Why Choose DYSE?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Packed with features to make your Discord server the ultimate gaming destination
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="enhanced-card p-8 h-full hover:scale-105 transition-all duration-300 group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="enhanced-card p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Ready to Transform Your Server?
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of Discord servers already using DYSE to create engaging, 
                fun experiences for their communities.
              </p>
              <Button 
                className="btn-primary font-bold text-white px-10 py-4 text-lg rounded-xl shadow-2xl"
                asChild
              >
                <a
                  href="https://discord.com/oauth2/authorize?client_id=1322592306670338129&scope=bot&permissions=8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </Card>
          </motion.div>
        </section>
      </div>
    </TooltipProvider>
  );
}