import { Metadata } from 'next';
import { StatusPage } from '@/components/pages/StatusPage';

export const metadata: Metadata = {
  title: 'Bot Status | DYSE Discord Bot Status & Uptime',
  description: 'Check the current status, uptime, and server count of DYSE Discord bot. Real-time monitoring of bot availability and performance.',
  keywords: [
    'Discord bot status',
    'DYSE bot status',
    'Discord bot uptime',
    'bot server count',
    'Discord bot monitoring',
    'bot availability',
    'Discord bot online status',
    'bot performance'
  ],
  openGraph: {
    title: 'Bot Status | DYSE Discord Bot Status',
    description: 'Real-time status monitoring for DYSE Discord bot including uptime and server statistics.',
    url: 'https://dyse.vercel.app/status',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app/status',
  },
};

export default function Status() {
  return <StatusPage />;
}