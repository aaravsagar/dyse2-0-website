import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

export default function Home() {
  return (
    <TooltipProvider>
      <div className="container px-4 mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center min-h-[85vh] text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-36 h-36 rounded-full overflow-hidden bg-gradient-to-br from-red-500 to-red-700 mb-8 shadow-lg"
          >
            <img
              src="https://cdn.discordapp.com/app-icons/1322592306670338129/daab4e79fea4d0cb886b1fc92e8560e3.png?size=512"
              alt="DYSE 2.0 Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#9B2C2C] to-[#B63E3E]"
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
            className="flex items-center gap-3"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="https://discord.com/oauth2/authorize?client_id=1322592306670338129&scope=bot&permissions=8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-red-600 hover:bg-red-700 font-semibold text-white px-8 py-6 text-lg">
                    Invite to Server
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-gray-700 text-white">
                Invite the bot to your server
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </div>
      </div>
    </TooltipProvider>
  );
}
