import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dice5 } from 'lucide-react';

export default function Home() {
  return (
    <div className="container px-4 mx-auto">
      <div className="flex flex-col items-center justify-center min-h-[85vh] text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-36 h-36 rounded-full bg-gradient-to-br from-[#5865F2] to-[#7289DA] mb-8 flex items-center justify-center shadow-lg"
        >
          <Dice5 className="w-20 h-20 text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#5865F2] to-[#7289DA]"
        >
          DYSE 2.0 – The Loved Casino Bot Reimagined
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-[#B9BBBE] max-w-2xl mb-8"
        >
          A fun way to experience simulated gambling with 0% real-world risk.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="bg-[#5865F2] hover:bg-[#4752C4] font-semibold text-white px-8 py-6 text-lg"
            onClick={() => window.open('https://discord.com/oauth2/authorize?client_id=1322592306670338129&permissions=277025704000&scope=bot+applications.commands', '_blank')}
          >
            Invite to Server
          </Button>
        </motion.div>
      </div>
    </div>
  );
}