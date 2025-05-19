import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { 
  Database, 
  Lock, 
  Server, 
  Trash, 
  Globe, 
  Mail 
} from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">User Agreements</h1>
      
      <Tabs defaultValue="privacy" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-2 w-full bg-[#2F3136]">
          <TabsTrigger value="terms" className="data-[state=active]:bg-[#5865F2]">
            Terms & Conditions
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[#5865F2]">
            Privacy Policy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="terms" className="mt-6">
          <DiscordCard>
            <div className="flex flex-col space-y-8">
              <h2 className="text-2xl font-bold text-center">Terms & Conditions</h2>
              <p className="text-[#B9BBBE]">
                Please refer to our Terms & Conditions page for information about the rules and agreements for using DYSE 2.0.
              </p>
            </div>
          </DiscordCard>
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-6 space-y-6">
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Database className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Collection</h2>
                <p className="text-[#B9BBBE] mb-3">
                  DYSE 2.0 collects the following information:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#B9BBBE]">
                  <li>Discord user IDs</li>
                  <li>Discord usernames</li>
                  <li>Game statistics and currency balances</li>
                  <li>Command usage history</li>
                  <li>Server IDs where the bot is used</li>
                </ul>
                <p className="text-[#B9BBBE] mt-3">
                  We do not collect personal information beyond what is available through the Discord API and what you voluntarily provide.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Usage</h2>
                <p className="text-[#B9BBBE]">
                  We use the collected data to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#B9BBBE]">
                  <li>Provide and maintain bot functionality</li>
                  <li>Track and display user statistics and leaderboards</li>
                  <li>Prevent abuse and enforce our Terms of Service</li>
                  <li>Improve bot features and user experience</li>
                  <li>Communicate with users about issues or updates</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Server className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Storage</h2>
                <p className="text-[#B9BBBE]">
                  All data is stored securely in Firebase databases. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Trash className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Deletion Rights</h2>
                <p className="text-[#B9BBBE]">
                  You have the right to request deletion of your data from our systems. To request data deletion, please contact us at support@dysebot.app. Please note that some data may be retained if required for legitimate purposes such as bot functionality, security, or compliance with legal obligations.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Globe className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Third-Party Services</h2>
                <p className="text-[#B9BBBE]">
                  DYSE 2.0 uses Firebase for data storage and Discord for bot functionality. Your use of the bot is also subject to Discord's Privacy Policy and Terms of Service. We do not sell or share your data with any other third parties except as required by law.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Contact</h2>
                <p className="text-[#B9BBBE]">
                  If you have any questions or concerns about our Privacy Policy or data practices, please contact us at support@dysebot.app.
                </p>
              </div>
            </div>
          </DiscordCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}