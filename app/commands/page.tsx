import { Metadata } from 'next';
import { CommandsPage } from '@/components/pages/CommandsPage';

export const metadata: Metadata = {
  title: 'Discord Bot Commands | DYSE Casino Bot Commands List',
  description: 'Complete list of DYSE Discord bot commands including casino games (blackjack, coinflip, mines, high-low), economy commands, admin settings, and utility functions.',
  keywords: [
    'Discord bot commands',
    'DYSE commands',
    'Discord casino commands',
    'blackjack command',
    'coinflip command',
    'mines command',
    'high low command',
    'Discord economy commands',
    'Discord admin commands',
    'Discord utility commands',
    'Discord gambling commands',
    'Discord game commands',
    'bot command list',
    'Discord bot help'
  ],
  openGraph: {
    title: 'Discord Bot Commands | DYSE Casino Bot Commands',
    description: 'Complete command reference for DYSE Discord bot - casino games, economy, admin tools and more.',
    url: 'https://dyse.vercel.app/commands',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app/commands',
  },
};

export default function Commands() {
  return <CommandsPage />;
}