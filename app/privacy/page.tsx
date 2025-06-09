import { Metadata } from 'next';
import { PrivacyPage } from '@/components/pages/PrivacyPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | DYSE Discord Bot Data Protection & Privacy',
  description: 'Learn how DYSE Discord bot collects, uses, and protects your data. Comprehensive privacy policy and data protection information.',
  keywords: [
    'Discord bot privacy',
    'DYSE privacy policy',
    'Discord bot data protection',
    'bot data collection',
    'Discord bot security',
    'user privacy',
    'data usage policy'
  ],
  openGraph: {
    title: 'Privacy Policy | DYSE Discord Bot',
    description: 'Privacy policy and data protection information for DYSE Discord bot.',
    url: 'https://dyse.vercel.app/privacy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app/privacy',
  },
};

export default function Privacy() {
  return <PrivacyPage />;
}