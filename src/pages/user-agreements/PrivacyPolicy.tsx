import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DiscordCard } from '@/components/ui/discord-card';
import { 
  Database, 
  Lock, 
  Server, 
  Trash, 
  Globe, 
  Mail,
  Shield,
  AlertTriangle
} from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">User Agreements</h1>
      
      <Tabs defaultValue="privacy" className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-2 w-full bg-[#2F3136]">
          <TabsTrigger value="terms" className="data-[state=active]:bg-[#e11d48]">
            Terms & Conditions
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-[#e11d48]">
            Privacy Policy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="terms" className="mt-6">
          <DiscordCard>
            <div className="flex flex-col space-y-8">
              <h2 className="text-2xl font-bold text-center">Terms & Conditions</h2>
              <p className="text-[#B9BBBE]">
                Please refer to our Terms & Conditions page for detailed information regarding the rules, responsibilities, and agreements that govern the use of DYSE 2.0.
              </p>
            </div>
          </DiscordCard>
        </TabsContent>
        
        <TabsContent value="privacy" className="mt-6 space-y-6">
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-[#e11d48] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Privacy Policy Overview</h2>
                <p className="text-[#B9BBBE] mb-3">
                  This Privacy Policy explains how DYSE 2.0 collects, uses, and protects your information when you use our Discord bot. We are committed to ensuring that your privacy is protected and that you understand how your data is handled.
                </p>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Database className="w-6 h-6 text-[#e11d48] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Collection</h2>
                <p className="text-[#B9BBBE] mb-3">
                  We collect the following information:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 ml-4">
                  <li>Discord User ID and Username</li>
                  <li>Server IDs where the bot is used</li>
                  <li>Game statistics and currency balances</li>
                  <li>Command usage history</li>
                  <li>Bot interaction data</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-[#e11d48] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Security</h2>
                <p className="text-[#B9BBBE] mb-3">
                  We implement several security measures to maintain the safety of your personal information:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 ml-4">
                  <li>Secure data encryption in transit and at rest</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                  <li>Secure database management</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-[#e11d48] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Usage</h2>
                <p className="text-[#B9BBBE] mb-3">
                  Your data is used for:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 ml-4">
                  <li>Providing core bot functionality</li>
                  <li>Maintaining game progress and statistics</li>
                  <li>Improving user experience</li>
                  <li>Preventing abuse and ensuring fair play</li>
                  <li>Technical support and issue resolution</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Server className="w-6 h-6 text-[#e11d48] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Storage & Retention</h2>
                <p className="text-[#B9BBBE] mb-3">
                  We store your data securely using Firebase:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 ml-4">
                  <li>Data is stored in secure cloud databases</li>
                  <li>Regular backups are maintained</li>
                  <li>Inactive user data is archived after 6 months</li>
                  <li>Server data is removed 30 days after bot removal</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Trash className="w-6 h-6 text-[#e11d48] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Your Rights</h2>
                <p className="text-[#B9BBBE] mb-3">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 ml-4">
                  <li>Request access to your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                  <li>Request data portability</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Globe className="w-6 h-6 text-[#e11d48] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Third-Party Services</h2>
                <p className="text-[#B9BBBE] mb-3">
                  We use the following third-party services:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 ml-4">
                  <li>Discord API for bot functionality</li>
                  <li>Firebase for data storage</li>
                  <li>Analytics tools for performance monitoring</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
          
          <DiscordCard>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-[#e11d48] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                <p className="text-[#B9BBBE]">
                  For any privacy-related questions or concerns, please contact us at:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 mt-3 ml-4">
                  <li>Email: privacy@dysebot.app</li>
                  <li>Discord Support Server: discord.gg/dyse</li>
                </ul>
              </div>
            </div>
          </DiscordCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}