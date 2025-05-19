import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { DiscordCard } from '@/components/ui/discord-card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

export default function Verify() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    } else if (currentUser.verified) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  return (
    <div className="container px-4 mx-auto py-16">
      <div className="max-w-md mx-auto">
        <DiscordCard>
          <div className="flex flex-col items-center justify-center text-center space-y-6 p-6">
            <MessageSquare className="w-16 h-16 text-[#5865F2]" />
            
            <h1 className="text-2xl font-bold">Check Your Discord DMs</h1>
            
            <p className="text-[#B9BBBE]">
              We've sent you a verification message on Discord. Please check your DMs and follow the instructions to verify your account.
            </p>
            
            <div className="space-y-4 w-full">
              <Button
                className="w-full bg-[#5865F2] hover:bg-[#4752C4]"
                onClick={() => window.location.reload()}
              >
                I've Verified
              </Button>
              
              <Button
                variant="outline"
                className="w-full border-[#5865F2] text-[#5865F2] hover:bg-[#5865F2] hover:text-white"
                onClick={() => navigate('/')}
              >
                Return Home
              </Button>
            </div>
          </div>
        </DiscordCard>
      </div>
    </div>
  );
}