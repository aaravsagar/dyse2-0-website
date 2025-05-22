import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';

export default function Home() {
  const features = [
    {
      title: "Casino Games & Entertainment",
      description: "Experience the thrill of casino games with our virtual currency system. Play Blackjack, Roulette, and more without any real-world risk. Perfect for creating an engaging community atmosphere.",
      image: "https://images.pexels.com/photos/1871508/pexels-photo-1871508.jpeg"
    },
    {
      title: "Economy & Progression System",
      description: "Build your fortune through our comprehensive economy system. Work, trade, and invest your way to the top of the leaderboard. Features daily rewards, jobs, and various earning opportunities.",
      image: "https://images.pexels.com/photos/534216/pexels-photo-534216.jpeg"
    },
    {
      title: "Community & Competition",
      description: "Compete with other members in your server through our global leaderboard system. Show off your achievements, climb the ranks, and earn exclusive rewards.",
      image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
    }
  ];

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
                <span>
                  <Button
                    disabled
                    className="bg-gray-500 cursor-not-allowed font-semibold text-white px-8 py-6 text-lg"
                  >
                    Invite to Server
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-gray-700 text-white">
                Bot is under construction
              </TooltipContent>
            </Tooltip>

            <span className="bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
              🚧 Under Construction
            </span>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="py-16 space-y-32">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16`}
            >
              <div className="w-full lg:w-1/2">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
                </div>
              </div>
              
              <div className="w-full lg:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold text-white">{feature.title}</h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}