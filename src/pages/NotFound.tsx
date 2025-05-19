import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DiscordCard } from '@/components/ui/discord-card';
import { Home, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Update document title
    document.title = '404 - Page Not Found | DYSE 2.0';
    
    return () => {
      // Reset title when component unmounts
      document.title = 'DYSE 2.0';
    };
  }, []);
  
  return (
    <div className="container px-4 mx-auto">
      <div className="flex items-center justify-center min-h-[80vh]">
        <DiscordCard className="max-w-md w-full">
          <div className="flex flex-col items-center text-center p-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <AlertCircle className="h-24 w-24 text-[#ED4245] mb-6" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl font-bold mb-2">404</h1>
              <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
              
              <p className="text-[#B9BBBE] mb-8">
                The page you're looking for doesn't exist or has been moved.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className="border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white"
                >
                  Go Back
                </Button>
                
                <Button 
                  asChild
                  className="bg-[#5865F2] hover:bg-[#4752C4]"
                >
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Return Home
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </DiscordCard>
      </div>
    </div>
  );
}