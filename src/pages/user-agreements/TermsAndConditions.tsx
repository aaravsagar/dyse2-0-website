import { DiscordCard } from '@/components/ui/discord-card';
import {
  Book,
  Users,
  Info,
  CheckCircle,
  Gavel,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';

export default function TermsAndConditions() {
  return (
    <div className="container px-4 mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms & Conditions</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        <DiscordCard>
          <div className="flex items-start gap-3">
            <Book className="w-6 h-6 text-[#5865F2] mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Introduction</h2>
              <p className="text-[#B9BBBE]">
                Welcome to DYSE 2.0! These Terms of Service govern your use of our Discord bot. By accessing or using DYSE 2.0, you agree to be bound by these terms. If you do not agree with any of them, you should not use our bot.
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
                You must be at least 13 years old to use DYSE 2.0. If you are under 18, parental or guardian consent is required. The bot contains simulated gambling-like features with in-game virtual currency only, with no link to real-world money.
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
                By using DYSE 2.0, you agree to follow these rules:
              </p>
              <ul className="list-disc list-inside space-y-2 text-[#B9BBBE] ml-4">
                <li>No exploiting bugs, glitches, or design flaws</li>
                <li>No use of automated systems such as macros or self-bots</li>
                <li>No harassment or abuse toward other users or developers</li>
                <li>No tampering with or manipulating the economy system</li>
                <li>All bugs or issues must be reported via official channels</li>
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
                DYSE 2.0 operates a virtual economy which holds no monetary or real-world value. The currency cannot be traded, sold, or redeemed for real assets. We reserve the right to reset, balance, or remove virtual currency at any time.
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
                Our moderators and administrators have the authority to restrict or revoke your access to DYSE 2.0 if you violate these terms or disrupt community standards. Decisions made by moderators are final but may be appealed via the support server.
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
                DYSE 2.0 is provided “as is” without warranties of any kind. We are not responsible for any losses, damages, or negative consequences caused by the use or inability to use the bot. Features may change or be removed without notice.
              </p>
            </div>
          </div>
        </DiscordCard>

        <DiscordCard>
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#5865F2] mt-1" />
            <div>
              <h2 className="text-xl font-bold mb-2">Reports, Access Revocation & Investigations</h2>
              <p className="text-[#B9BBBE] mb-3">
                We reserve the right to revoke access to DYSE 2.0 from any user or server upon receiving a valid or credible report regarding misconduct, rule violation, or abuse.
              </p>
              <p className="text-[#B9BBBE] mb-3">
                If a report is submitted — whether it concerns a bug, exploit, or a user/server issue — we hold full rights to investigate the matter thoroughly. This includes monitoring server activity or user behavior to determine if action is needed.
              </p>
              <p className="text-[#B9BBBE]">
                All reports will be handled confidentially. We will never disclose the identity or Discord ID of the reporting party to the subject of the investigation.
              </p>
            </div>
          </div>
        </DiscordCard>
      </div>
    </div>
  );
}
