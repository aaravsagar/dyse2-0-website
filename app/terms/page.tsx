import { Metadata } from 'next';
import { TermsPage } from '@/components/pages/TermsPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions | DYSE Discord Bot Terms of Service',
  description: 'Read the terms and conditions for using DYSE Discord bot. Understand the rules, guidelines, and policies for bot usage.',
  keywords: [
    'Discord bot terms',
    'DYSE terms of service',
    'Discord bot rules',
    'bot usage policy',
    'Discord bot guidelines',
    'terms and conditions',
    'bot legal terms'
  ],
  openGraph: {
    title: 'Terms & Conditions | DYSE Discord Bot',
    description: 'Terms of service and usage guidelines for DYSE Discord bot.',
    url: 'https://dyse.vercel.app/terms',
    type: 'website',
  },
  alternates: {
    canonical: 'https://dyse.vercel.app/terms',
  },
};

export default function Terms() {
  return <TermsPage />;
}