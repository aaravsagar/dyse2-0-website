import { DiscordCard } from '@/components/ui/discord-card';
import {
  Database,
  Lock,
  Server,
  Trash,
  Globe,
  Mail,
} from 'lucide-react';

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'; // ✅ Adjust this path based on your actual file structure

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
                Please refer to our Terms & Conditions page for detailed information regarding the rules, responsibilities, and agreements that govern the use of DYSE 2.0. It is important to review these terms carefully before using the service to ensure a clear understanding of your rights and obligations.
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
                  DYSE 2.0 collects certain information to provide its services effectively. This includes Discord user IDs and usernames to identify users uniquely within the Discord ecosystem. Additionally, we gather game-related data such as your statistics and currency balances to offer relevant features and maintain accurate leaderboards.
                </p>
                <p className="text-[#B9BBBE] mb-3">
                  We also track command usage history to monitor and improve bot performance. Server IDs where the bot operates are collected to manage guild-specific settings and data. It is important to note that we do not collect any sensitive personal information beyond what is available through the Discord API or explicitly provided by users themselves.
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
                  The data collected by DYSE 2.0 is used solely to support and enhance the bot's functionality. This involves providing core features such as displaying user statistics and maintaining accurate leaderboards to enrich your experience.
                </p>
                <p className="text-[#B9BBBE]">
                  Additionally, the data helps us detect and prevent misuse or abuse of the bot, ensuring a fair and safe environment for all users. We also utilize this information to continually improve the bot’s features and overall user experience.
                </p>
                <p className="text-[#B9BBBE]">
                  Finally, the data allows us to communicate with users regarding important updates, service interruptions, or other relevant information that impacts your use of DYSE 2.0.
                </p>
              </div>
            </div>
          </DiscordCard>

          <DiscordCard>
            <div className="flex items-start gap-3">
              <Server className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Storage & Retention</h2>
                <p className="text-[#B9BBBE]">
                  All collected data is stored securely using Firebase databases with industry-standard security practices in place. We are committed to protecting your information from unauthorized access, modification, or disclosure.
                </p>
                <p className="text-[#B9BBBE]">
                  Deleted messages, if message logging is enabled, are retained for a maximum of 7 days to allow for moderation and troubleshooting purposes. Data related to specific guilds is removed 30 days after the bot is removed from the server or after the server is deleted, ensuring no unnecessary data retention.
                </p>
                <p className="text-[#B9BBBE]">
                  While we take strong precautions to safeguard your data, please understand that no method of electronic transmission or storage is completely secure.
                </p>
              </div>
            </div>
          </DiscordCard>

          <DiscordCard>
            <div className="flex items-start gap-3">
              <Trash className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Data Deletion Rights</h2>
                <p className="text-[#B9BBBE]">
                  You have the right to manage and delete data associated with your guild. DYSE 2.0 provides commands that allow server administrators to remove all data collected from their servers at any time.
                </p>
                <p className="text-[#B9BBBE]">
                  Since we do not store personal user data beyond what is necessary for bot operation, individual user deletion requests are limited. However, we are always ready to assist with any concerns regarding data privacy or deletion.
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
                  DYSE 2.0 relies on trusted third-party services such as Firebase for secure data storage and Discord for bot functionality and user authentication.
                </p>
                <p className="text-[#B9BBBE]">
                  Your use of DYSE 2.0 is also governed by Discord’s own Privacy Policy and Terms of Service. We do not sell, trade, or share your data with any third parties except when legally required to do so.
                </p>
              </div>
            </div>
          </DiscordCard>

          <DiscordCard>
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-[#5865F2] mt-1" />
              <div>
                <h2 className="text-xl font-bold mb-2">Contact Information</h2>
                <p className="text-[#B9BBBE]">
                  If you have any questions, concerns, or requests related to this Privacy Policy or your data, please do not hesitate to contact us. Our support team is available at support@dysebot.app and will respond promptly to assist you.
                </p>
              </div>
            </div>
          </DiscordCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
