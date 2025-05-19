import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { 
  Book, 
  Users, 
  Info, 
  CheckCircle, 
  Gavel, 
  ShieldAlert 
} from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">User Agreements</h1>
      
      <Tabs defaultValue="terms" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-2 w-full bg-[#2F3136]">
          <TabsTrigger value="terms" className="data-[state=active]:bg-[#5865F2]">
            Terms & Conditions
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[#5865F2]">
            Privacy Policy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="terms" className="mt-6 space-y-6">
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Book className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Introduction</h2>
                <p className="text-[#B9BBBE]">
                  Welcome to DYSE 2.0! These Terms of Service govern your use of our Discord bot. By using DYSE 2.0, you agree to these terms in full. If you disagree with any part of these terms, please do not use our bot.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Users className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Eligibility</h2>
                <p className="text-[#B9BBBE]">
                  You must be at least 13 years old to use DYSE 2.0. If you are under 18, you must have permission from a parent or guardian. The bot simulates gambling activities with virtual currency only and does not involve real money.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Rules and Behavior</h2>
                <p className="text-[#B9BBBE] mb-3">
                  When using DYSE 2.0, you agree to follow these rules:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#B9BBBE]">
                  <li>Do not exploit bugs or glitches in the bot</li>
                  <li>Do not use automated scripts or macros with the bot</li>
                  <li>Do not harass other users or bot developers</li>
                  <li>Do not attempt to manipulate the economy system</li>
                  <li>Report any bugs or issues through proper channels</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Info className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Virtual Currency</h2>
                <p className="text-[#B9BBBE]">
                  DYSE 2.0 uses a virtual currency system that has no real-world value. We reserve the right to reset or modify currency balances at any time. Virtual currency cannot be traded for real money or items of value, and any attempts to do so will result in immediate termination of access.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Gavel className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Moderator Rights</h2>
                <p className="text-[#B9BBBE]">
                  DYSE 2.0 moderators and administrators have the right to ban users from using the bot for violations of these terms or for any other reason deemed appropriate. All moderator decisions are final, though you may appeal through the official support channels.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Liability</h2>
                <p className="text-[#B9BBBE]">
                  DYSE 2.0 is provided "as is" without any warranties, expressed or implied. We are not responsible for any losses, damages, or consequences that may arise from the use of our bot. We reserve the right to modify or terminate the bot at any time without notice.
                </p>
              </div>
            </div>
          </DiscordCard>
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-6">
          <DiscordCard>
            <div className="flex flex-col space-y-8">
              <h2 className="text-2xl font-bold text-center">Privacy Policy</h2>
              <p className="text-[#B9BBBE]">
                Please refer to our Privacy Policy page for information about how we collect, use, and protect your data.
              </p>
            </div>
          </DiscordCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}