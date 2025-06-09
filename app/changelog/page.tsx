import { Metadata } from 'next';
import { ChangelogPage } from '@/components/pages/ChangelogPage';

export const metadata: Metadata = {
  title: 'Changelog | DYSE Discord Bot Updates & Version History',
  description: 'Stay updated with the latest DYSE Discord bot features, improvements, and bug fixes. Complete version history and update notes.',
  keywords: [
    'Discord bot changelog',
    'DYSE updates',
    'Discord bot version history',
    'bot new features',
    'Discord bot improvements',
    'bot bug fixes',
    'Discord bot releases',
    'update notes'
  ],
  openGraph: {
    title: 'Changelog | DYSE Discord Bot Updates',
    description: 'Latest updates and version history for DYSE Discord bot.',
    url: 'https://dyse.vercel.app/changelog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app/changelog',
  },
};

export default function Changelog() {
  return <ChangelogPage />;
}