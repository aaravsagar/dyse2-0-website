import { Metadata } from 'next';
import { ReportPage } from '@/components/pages/ReportPage';

export const metadata: Metadata = {
  title: 'Report Issues | DYSE Discord Bot Bug Reports & User Reports',
  description: 'Report bugs, issues, or problematic users for DYSE Discord bot. Help us maintain a safe and functional bot experience.',
  keywords: [
    'Discord bot bug report',
    'DYSE bug report',
    'Discord bot issues',
    'report Discord bot problems',
    'Discord bot support',
    'bot troubleshooting',
    'Discord bot feedback'
  ],
  openGraph: {
    title: 'Report Issues | DYSE Discord Bot',
    description: 'Report bugs and issues to help improve DYSE Discord bot.',
    url: 'https://dyse.vercel.app/report',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app/report',
  },
};

export default function Report() {
  return <ReportPage />;
}